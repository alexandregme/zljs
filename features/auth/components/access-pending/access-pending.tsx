"use client";
import { Card } from "../../../../core/card";
import { Text } from "../../../../core/text";
import { useAuth } from "../../hooks/use-auth";
import { SignOutButton } from "../sign-out";
import type { AccessPendingProps } from "./access-pending.interface";
import { accessPending } from "./access-pending.styles";

export const AccessPending = ({
  title = "Waiting for approval",
  message = "Your access to this app has not been approved yet.",
  signOutLabel,
  confirmTitle,
  confirmLabel,
  cancelLabel,
  errorMessage,
}: AccessPendingProps) => {
  const { user } = useAuth();
  const { account } = accessPending();

  if (!user) {
    return null;
  }

  return (
    <Card title={title} titleLevel={1} message={message}>
      <div className={account()}>
        <Text variant="caption" color="muted">
          {user.email}
        </Text>
        <SignOutButton
          label={signOutLabel}
          confirmTitle={confirmTitle}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          errorMessage={errorMessage}
        />
      </div>
    </Card>
  );
};
