import { z } from "zod";
import { profileSchema } from "./profile-form.schema";

export type ProfileFormData = z.infer<typeof profileSchema>;
