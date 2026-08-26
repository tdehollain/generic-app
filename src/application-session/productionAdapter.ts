import { useCallback, useEffect, useRef } from 'react';
import { useClerk, useSignIn } from '@clerk/react';
import { isClerkAPIResponseError } from '@clerk/react/errors';
import { useNavigate } from '@tanstack/react-router';
import { useConvexAuth } from 'convex/react';
import type {
  ApplicationSessionState,
  SessionError,
  SignInResult,
} from './ApplicationSession';

const READY_ERROR: SignInResult = {
  status: 'rejected',
  error: {
    code: 'unknown',
    message: 'Sign in is not ready. Please try again.',
  },
};

export function useProductionApplicationSession(): ApplicationSessionState {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();
  const syncInFlightRef = useRef(false);

  const routeIntoApplication = useCallback(
    async () => navigate({ to: '/', replace: true }),
    [navigate]
  );

  const activateSessionAndRoute = useCallback(
    async (sessionId: string) => {
      await clerk.setActive({ session: sessionId });
      await routeIntoApplication();
    },
    [clerk, routeIntoApplication]
  );

  const refreshClerkSession = useCallback(async () => {
    if (!clerk.loaded || syncInFlightRef.current) {
      return;
    }

    syncInFlightRef.current = true;

    try {
      const refreshedClient = await clerk.client?.reload();
      const sessionId =
        refreshedClient?.lastActiveSessionId ??
        clerk.client?.lastActiveSessionId ??
        null;

      if (!refreshedClient?.signedInSessions.length || !sessionId) {
        return;
      }

      await activateSessionAndRoute(sessionId);
    } catch {
      // A failed background refresh must not make the sign-in form unusable.
    } finally {
      syncInFlightRef.current = false;
    }
  }, [activateSessionAndRoute, clerk]);

  useEffect(() => {
    if (!clerk.loaded || isAuthenticated) {
      return;
    }

    const handleFocus = () => {
      void refreshClerkSession();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void refreshClerkSession();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clerk.loaded, isAuthenticated, refreshClerkSession]);

  const signInWithPassword = useCallback(
    async (input: {
      email: string;
      password: string;
    }): Promise<SignInResult> => {
      if (!clerk.loaded) {
        return READY_ERROR;
      }

      try {
        const { error } = await signIn.password({
          identifier: input.email,
          password: input.password,
        });

        if (error) {
          throw error;
        }

        if (signIn.status === 'complete') {
          await signIn.finalize();
          await routeIntoApplication();
          return { status: 'accepted' };
        }

        if (signIn.existingSession) {
          await activateSessionAndRoute(signIn.existingSession.sessionId);
          return { status: 'accepted' };
        }

        return {
          status: 'rejected',
          error: {
            code: 'incomplete',
            message: 'Please complete the remaining sign in steps.',
          },
        };
      } catch (error) {
        if (getClerkErrorCode(error) === 'session_exists') {
          const sessionId = getExistingSessionId(error, clerk.client);

          if (sessionId) {
            try {
              await activateSessionAndRoute(sessionId);
              return { status: 'accepted' };
            } catch {
              return rejected(translateClerkError(error, 'password'));
            }
          }
        }

        return rejected(translateClerkError(error, 'password'));
      }
    },
    [activateSessionAndRoute, clerk, routeIntoApplication, signIn]
  );

  const signInWithGoogle = useCallback(async (): Promise<SignInResult> => {
    if (!clerk.loaded) {
      return READY_ERROR;
    }

    try {
      const { error } = await signIn.sso({
        strategy: 'oauth_google',
        redirectUrl: '/',
        redirectCallbackUrl: '/',
      });

      if (error) {
        throw error;
      }

      return { status: 'accepted' };
    } catch (error) {
      return rejected(translateClerkError(error, 'google'));
    }
  }, [clerk.loaded, signIn]);

  if (!clerk.loaded || isLoading) {
    return { status: 'loading' };
  }

  if (isAuthenticated) {
    return { status: 'signed-in' };
  }

  return {
    status: 'signed-out',
    signInWithPassword,
    signInWithGoogle,
  };
}

function rejected(error: SessionError): SignInResult {
  return { status: 'rejected', error };
}

function getClerkErrorCode(error: unknown) {
  if (!isClerkAPIResponseError(error)) {
    return null;
  }

  return error.errors[0]?.code ?? null;
}

function getExistingSessionId(
  error: unknown,
  client: { lastActiveSessionId?: string | null } | undefined
) {
  if (!isClerkAPIResponseError(error)) {
    return null;
  }

  const sessionExistsMeta = error.errors[0]?.meta as
    | {
        client?: {
          last_active_session_id?: string | null;
        };
      }
    | undefined;

  return (
    client?.lastActiveSessionId ??
    sessionExistsMeta?.client?.last_active_session_id ??
    null
  );
}

function translateClerkError(
  error: unknown,
  method: 'password' | 'google'
): SessionError {
  if (!isClerkAPIResponseError(error)) {
    return {
      code: 'unknown',
      message:
        method === 'google'
          ? 'Unexpected error while signing in with Google.'
          : 'Unexpected error while signing in.',
    };
  }

  const code = error.errors[0]?.code;

  if (
    code === 'form_password_incorrect' ||
    code === 'form_identifier_not_found' ||
    code === 'form_param_format_invalid'
  ) {
    return {
      code: 'invalid-credentials',
      message: 'Email or password is incorrect.',
    };
  }

  if (code === 'too_many_requests' || code === 'rate_limit_exceeded') {
    return {
      code: 'rate-limited',
      message: 'Too many sign-in attempts. Please try again later.',
    };
  }

  return {
    code: 'unknown',
    message:
      method === 'google' ? 'Google sign in failed.' : 'Sign in failed.',
  };
}
