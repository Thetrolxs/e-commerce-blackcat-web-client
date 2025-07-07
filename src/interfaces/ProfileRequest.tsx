import z from "zod";

const today = new Date();
const thirteenYearsAgo = new Date();
thirteenYearsAgo.setFullYear(today.getFullYear() - 13); // Calculate the date 13 years ago

export const profileSchema = z.object({
  firtsName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  thelephone: z
    .string()
    .regex(/^\+56\d{9}$/, "Debe ser un número chileno válido (+569...)"),
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
        message: "Debe ser mayor de 13 años y la fecha debe ser anterior a hoy",
      }
    )
    .optional(),
});

export type ProfileRequest = z.infer<typeof profileSchema>;
