export interface SignOutButtonProps {
  /** The accessible name of the icon button. */
  label?: string;
  /** The question of the modal a click opens. */
  confirmTitle?: string;
  /** The button of the modal that signs out. */
  confirmLabel?: string;
  /** The button of the modal that keeps the user signed in. */
  cancelLabel?: string;
  /** The toast when signing out fails. */
  errorMessage?: string;
  /**
   * Signs the user out, for an app with no `AuthProvider`. It is called when
   * the user confirms in the modal. Without it, the button signs out through
   * the adapter of `AuthProvider`.
   */
  onSignOut?: () => void | Promise<void>;
}
