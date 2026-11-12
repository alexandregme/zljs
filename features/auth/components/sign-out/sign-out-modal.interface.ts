export interface SignOutModalProps {
  /** The question the modal asks. */
  title?: string;
  /** The button that signs out. */
  confirmLabel?: string;
  /** The button that keeps the user signed in. */
  cancelLabel?: string;
  /** The toast when signing out fails. */
  errorMessage?: string;
  /**
   * Signs the user out, for an app with no `AuthProvider`. Without it, the
   * modal signs out through the adapter of `AuthProvider`.
   */
  onSignOut?: () => void | Promise<void>;
}
