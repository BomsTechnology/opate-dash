import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod'

export const CategoryValidationSchema = toTypedSchema(z.object({
    name: z.string(),
    iso_code: z.string(),
}));
