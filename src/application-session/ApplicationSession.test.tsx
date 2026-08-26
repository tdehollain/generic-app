import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ApplicationSession } from './ApplicationSession';
import { createTestApplicationSessionAdapter } from './testAdapter';

describe('ApplicationSession', () => {
  it('renders the loading state', () => {
    render(
      <ApplicationSession
        adapter={createTestApplicationSessionAdapter({
          initialStatus: 'loading',
        })}
      >
        <p>Application content</p>
      </ApplicationSession>
    );

    expect(screen.getByRole('status')).toHaveTextContent('Loading session...');
    expect(screen.queryByText('Application content')).not.toBeInTheDocument();
  });

  it('renders the sign-in form for a signed-out session', () => {
    render(
      <ApplicationSession
        adapter={createTestApplicationSessionAdapter({
          initialStatus: 'signed-out',
        })}
      >
        <p>Application content</p>
      </ApplicationSession>
    );

    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.queryByText('Application content')).not.toBeInTheDocument();
  });

  it('submits credentials and renders application content after sign-in', async () => {
    const user = userEvent.setup();
    const passwordSignIn = vi.fn().mockResolvedValue({ status: 'accepted' });

    render(
      <ApplicationSession
        adapter={createTestApplicationSessionAdapter({
          initialStatus: 'signed-out',
          passwordSignIn,
        })}
      >
        <p>Application content</p>
      </ApplicationSession>
    );

    await user.type(screen.getByLabelText('Email'), 'user@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(passwordSignIn).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret',
    });
    expect(await screen.findByText('Application content')).toBeInTheDocument();
  });

  it('shows a stable error and stays signed out after failed sign-in', async () => {
    const user = userEvent.setup();

    render(
      <ApplicationSession
        adapter={createTestApplicationSessionAdapter({
          initialStatus: 'signed-out',
          passwordSignIn: async () => ({
            status: 'rejected',
            error: {
              code: 'invalid-credentials',
              message: 'Email or password is incorrect.',
            },
          }),
        })}
      >
        <p>Application content</p>
      </ApplicationSession>
    );

    await user.type(screen.getByLabelText('Email'), 'user@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Email or password is incorrect.'
    );
    expect(screen.queryByText('Application content')).not.toBeInTheDocument();
  });

  it('renders application content for a signed-in session', () => {
    render(
      <ApplicationSession
        adapter={createTestApplicationSessionAdapter({
          initialStatus: 'signed-in',
        })}
      >
        <p>Application content</p>
      </ApplicationSession>
    );

    expect(screen.getByText('Application content')).toBeInTheDocument();
    expect(screen.queryByText('Login to your account')).not.toBeInTheDocument();
  });

  it('starts Google sign-in through the same session seam', async () => {
    const user = userEvent.setup();
    const googleSignIn = vi.fn().mockResolvedValue({ status: 'accepted' });

    render(
      <ApplicationSession
        adapter={createTestApplicationSessionAdapter({
          initialStatus: 'signed-out',
          googleSignIn,
        })}
      >
        <p>Application content</p>
      </ApplicationSession>
    );

    await user.click(
      screen.getByRole('button', { name: 'Login with Google' })
    );

    expect(googleSignIn).toHaveBeenCalledOnce();
    expect(await screen.findByText('Application content')).toBeInTheDocument();
  });
});
