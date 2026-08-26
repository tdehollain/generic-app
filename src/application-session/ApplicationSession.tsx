import { type FormEvent, type ReactNode, useState } from 'react';
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
import { useProductionApplicationSession } from './productionAdapter';

export type SessionError = {
  code: 'invalid-credentials' | 'rate-limited' | 'incomplete' | 'unknown';
  message: string;
};

export type SignInResult =
  | { status: 'accepted' }
  | { status: 'rejected'; error: SessionError };

export type ApplicationSessionState =
  | { status: 'loading' }
  | {
      status: 'signed-out';
      signInWithPassword(input: {
        email: string;
        password: string;
      }): Promise<SignInResult>;
      signInWithGoogle(): Promise<SignInResult>;
    }
  | { status: 'signed-in' };

export type ApplicationSessionAdapter = () => ApplicationSessionState;

type ApplicationSessionProps = {
  adapter?: ApplicationSessionAdapter;
  children: ReactNode;
};

export function ApplicationSession({
  adapter: useSession = useProductionApplicationSession,
  children,
}: ApplicationSessionProps) {
  const session = useSession();

  if (session.status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p role="status" className="sr-only">
          Loading session...
        </p>
      </main>
    );
  }

  if (session.status === 'signed-out') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <SignInForm session={session} />
      </main>
    );
  }

  return children;
}

type SignedOutSession = Extract<
  ApplicationSessionState,
  { status: 'signed-out' }
>;

function SignInForm({
  className,
  session,
  ...props
}: React.ComponentProps<'div'> & { session: SignedOutSession }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResult = (result: SignInResult) => {
    if (result.status === 'rejected') {
      setErrorMessage(result.error.message);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await session.signInWithPassword({ email, password });
      handleResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await session.signInWithGoogle();
      handleResult(result);
    } finally {
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleGoogleSignIn}
                >
                  Login with Google
                </Button>
                {errorMessage ? (
                  <p role="alert" className="text-sm text-destructive">
                    {errorMessage}
                  </p>
                ) : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
