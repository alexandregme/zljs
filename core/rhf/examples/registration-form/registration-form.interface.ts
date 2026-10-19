import type { z } from "zod";
import type { registrationSchema } from "./registration-form.schema";

export type RegistrationFormData = z.infer<typeof registrationSchema>;
