import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod'

export const PostValidationSchema = toTypedSchema(z.object({
    title: z.string(),
    description: z.string(),
    category_id: z.string(),
}));
