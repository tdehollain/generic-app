import { useCallback, useState } from 'react';
import type {
  ApplicationSessionAdapter,
  ApplicationSessionState,
  SignInResult,
} from './ApplicationSession';

type PasswordInput = {
  email: string;
  password: string;
};

type TestApplicationSessionOptions = {
  initialStatus: ApplicationSessionState['status'];
  passwordSignIn?: (input: PasswordInput) => Promise<SignInResult>;
  googleSignIn?: () => Promise<SignInResult>;
};

const ACCEPTED: SignInResult = { status: 'accepted' };

export function createTestApplicationSessionAdapter({
  initialStatus,
  passwordSignIn = async () => ACCEPTED,
  googleSignIn = async () => ACCEPTED,
}: TestApplicationSessionOptions): ApplicationSessionAdapter {
  return function useTestApplicationSession() {
    const [status, setStatus] = useState(initialStatus);

    const signInWithPassword = useCallback(
      async (input: PasswordInput) => {
        const result = await passwordSignIn(input);

        if (result.status === 'accepted') {
          setStatus('signed-in');
        }

        return result;
      },
      []
    );

    const signInWithGoogle = useCallback(async () => {
      const result = await googleSignIn();

      if (result.status === 'accepted') {
        setStatus('signed-in');
      }

      return result;
    }, []);

    if (status === 'loading') {
      return { status };
    }

    if (status === 'signed-in') {
      return { status };
    }

    return { status, signInWithPassword, signInWithGoogle };
  };
}
