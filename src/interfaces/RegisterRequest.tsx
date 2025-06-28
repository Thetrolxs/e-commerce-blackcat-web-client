import { z } from "zod";

export const registerSchema = z
  .object({
    firtsName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Correo inválido"),

    thelephone: z
      .string()
      .regex(/^\+56\d{9}$/, "Debe ser un número chileno válido (+569...)"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número")
      .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

    confirmPassword: z.string(),

    birthday: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    commune: z.string().optional(),
    region: z.string().optional(),
    postalCode: z
      .string()
      .length(7, "Debe tener 7 dígitos")
      .regex(/^\d+$/, "Solo se permiten números")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type RegisterRequest = z.infer<typeof registerSchema>;
