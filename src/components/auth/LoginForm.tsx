import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useClerk, useSignIn } from '@clerk/react';
import { isClerkAPIResponseError } from '@clerk/react/errors';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const clerk = useClerk();
  const { fetchStatus, signIn } = useSignIn();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const syncInFlightRef = useRef(false);

  const activateSessionAndRoute = useCallback(
    async (sessionId: string) => {
      await clerk.setActive({ session: sessionId });
      await navigate({ to: '/', replace: true });
    },
    [clerk, navigate]
  );

  const getSessionIdFromError = (error: unknown) => {
    if (!isClerkAPIResponseError(error)) {
      return null;
    }

    const [firstError] = error.errors;
    const sessionExistsMeta = firstError?.meta as
      | {
          client?: {
            last_active_session_id?: string | null;
          };
        }
      | undefined;

    return (
      clerk.client?.lastActiveSessionId ??
      sessionExistsMeta?.client?.last_active_session_id ??
      null
    );
  };

  useEffect(() => {
    if (!clerk.loaded) {
      return;
    }

    const refreshClerkSession = async () => {
      if (syncInFlightRef.current) {
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
        // Keep the login page usable even if Clerk reload fails while the tab is refocused.
      } finally {
        syncInFlightRef.current = false;
      }
    };

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
  }, [activateSessionAndRoute, clerk]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!clerk.loaded) {
      setErrorMessage('Sign in is not ready. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await signIn.password({
        identifier: email,
        password,
      });

      if (error) {
        throw error;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize();
        await navigate({ to: '/', replace: true });
      } else if (signIn.existingSession) {
        await activateSessionAndRoute(signIn.existingSession.sessionId);
      } else {
        setErrorMessage('Please complete the remaining sign in steps.');
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const [firstError] = error.errors;

        if (firstError?.code === 'session_exists') {
          const sessionId = getSessionIdFromError(error);

          if (sessionId) {
            await activateSessionAndRoute(sessionId);
            return;
          }
        }

        setErrorMessage(
          firstError?.longMessage ?? firstError?.message ?? 'Sign in failed.'
        );
      } else {
        setErrorMessage('Unexpected error while signing in.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!clerk.loaded) {
      setErrorMessage('Sign in is not ready. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await signIn.sso({
        strategy: 'oauth_google',
        redirectUrl: '/',
        redirectCallbackUrl: '/',
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const [firstError] = error.errors;
        setErrorMessage(
          firstError?.longMessage ??
            firstError?.message ??
            'Google sign in failed.'
        );
      } else {
        setErrorMessage('Unexpected error while signing in with Google.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  autoComplete="email"
                  disabled={
                    isSubmitting || fetchStatus === 'fetching' || !clerk.loaded
                  }
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  disabled={
                    isSubmitting || fetchStatus === 'fetching' || !clerk.loaded
                  }
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || fetchStatus === 'fetching' || !clerk.loaded
                  }
                >
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={
                    isSubmitting || fetchStatus === 'fetching' || !clerk.loaded
                  }
                  onClick={handleGoogleSignIn}
                >
                  Login with Google
                </Button>
                {errorMessage ? (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                ) : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
