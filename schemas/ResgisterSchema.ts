import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod'

export const RegisterValidationSchema = toTypedSchema(z.object({
    email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters')
}));
