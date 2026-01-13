import { z } from "zod";
import { loginSchema } from "./login-form.schema";

export type LoginFormData = z.infer<typeof loginSchema>;
