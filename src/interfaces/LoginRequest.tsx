import z from "zod";

// login schema for LoginRequest
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido."),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginRequest = z.infer<typeof loginSchema>;
