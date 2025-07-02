import { z } from "zod";

const today = new Date();
const thirteenYearsAgo = new Date();
thirteenYearsAgo.setFullYear(today.getFullYear() - 13); // Calculate the date 13 years ago

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

    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser AAAA-MM-DD") // New regex for YYYY-MM-DD
      .refine(
        (val) => {
          const date = new Date(val);
          return (
            !isNaN(date.getTime()) && date < today && date <= thirteenYearsAgo
          );
        },
        {
          message:
            "Debe ser mayor de 13 años y la fecha debe ser anterior a hoy",
        }
      )
      .optional(),
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
