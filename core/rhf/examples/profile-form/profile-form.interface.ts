import type { z } from "zod";
import type { profileSchema } from "./profile-form.schema";

export type ProfileFormData = z.infer<typeof profileSchema>;
