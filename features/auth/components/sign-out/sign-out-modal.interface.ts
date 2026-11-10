export interface SignOutModalProps {
  /** The question the modal asks. */
  title?: string;
  /** The button that signs out. */
  confirmLabel?: string;
  /** The button that keeps the user signed in. */
  cancelLabel?: string;
  /** The toast when signing out fails. */
  errorMessage?: string;
}
