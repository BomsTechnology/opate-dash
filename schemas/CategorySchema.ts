import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod'

export const CategoryValidationSchema = toTypedSchema(z.object({
    name_fr: z.string(),
    name_en: z.string(),
}));
