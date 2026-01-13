import { z } from "zod";
import { registrationSchema } from "./registration-form.schema";

export type RegistrationFormData = z.infer<typeof registrationSchema>;
