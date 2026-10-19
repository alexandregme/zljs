import type { z } from "zod";
import type { loginSchema } from "./login-form.schema";

export type LoginFormData = z.infer<typeof loginSchema>;
