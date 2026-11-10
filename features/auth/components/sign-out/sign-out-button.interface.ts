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
}
