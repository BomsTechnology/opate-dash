import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod'

export const PostValidationSchema = toTypedSchema(z.object({
    word: z.string(),
    level: z.string(),
    answer: z.string(),
    word1: z.string(),
    word2: z.string(),
    word3: z.string(),
    meaning: z.string(),
}));
