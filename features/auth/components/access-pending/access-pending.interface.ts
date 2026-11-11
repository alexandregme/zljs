export interface AccessPendingProps {
  title?: string;
  message?: string;
  /** The accessible name of the sign-out button. */
  signOutLabel?: string;
  /** The question of the modal the button opens. */
  confirmTitle?: string;
  /** The button of the modal that signs out. */
  confirmLabel?: string;
  /** The button of the modal that keeps the user signed in. */
  cancelLabel?: string;
  /** The toast when signing out fails. */
  errorMessage?: string;
}
