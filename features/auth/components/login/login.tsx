"use client";
import { Button } from "../../../../core/button";
import { Card } from "../../../../core/card";
import { useToastStore } from "../../../toaster/state";
import { useAuth } from "../../hooks/use-auth";
import { loginVendors } from "./login.const";
import type {
  LoginProps,
  LoginProviderButtonProps,
  LoginVendor,
} from "./login.interface";
import { login } from "./login.styles";

const LoginProviderButton = ({
  id,
  label,
  onSignIn,
}: LoginProviderButtonProps) => {
  const signIn = () => {
    onSignIn(id);
  };

  return (
    <Button size="lg" fullWidth onClick={signIn}>
      {label}
    </Button>
  );
};

export const Login = <V extends LoginVendor>({
  vendor,
  providers,
  title = "Sign in",
  message = "Choose how to sign in",
  providerLabel = "Continue with",
  errorMessage = "Could not sign in. Try again.",
}: LoginProps<V>) => {
  const { signInWithOAuth } = useAuth();
  const { options } = login();
  const names: Record<string, string> = loginVendors[vendor];

  const signIn = (id: string) => {
    signInWithOAuth(id).catch(() => {
      useToastStore.getState().error(errorMessage);
    });
  };

  return (
    <Card title={title} titleLevel={1} message={message}>
      <div className={options()}>
        {providers.map((provider) => {
          const id = String(provider);

          return (
            <LoginProviderButton
              key={id}
              id={id}
              label={`${providerLabel} ${names[id]}`}
              onSignIn={signIn}
            />
          );
        })}
      </div>
    </Card>
  );
};
