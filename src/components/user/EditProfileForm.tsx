"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileRequest, profileSchema } from "@/interfaces/ProfileRequest"; // Asegúrate de que esta ruta sea correcta
import { ProfileResponse } from "@/interfaces/ProfileResponse"; // Asegúrate de que esta ruta sea correcta
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/contexts/authContext"; // Asumiendo que tienes este contexto para logout

interface EditProfileFormProps {
  initialData: ProfileResponse;
  onSubmit: (data: ProfileRequest) => Promise<void>;
  isLoading: boolean;
}

export const EditProfileForm = ({
  initialData,
  onSubmit,
  isLoading,
}: EditProfileFormProps) => {
  const { logout } = useAuthContext();

  const form = useForm<ProfileRequest>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firtsName: initialData.firtsName || "",
      lastName: initialData.lastName || "",
      email: initialData.email || "",
      thelephone: initialData.thelephone || "",
      birthDate: initialData.birthDate
        ? format(new Date(initialData.birthDate), "yyyy-MM-dd")
        : "",
    },
  });

  const handleFormSubmit = async (values: ProfileRequest) => {
    await onSubmit(values);
  };

  const handleChangePassword = () => {
    console.log("Navegar a cambiar contraseña");
  };

  const handleChangeAddress = () => {
    console.log("Navegar a cambiar dirección");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-start w-full px-4">
      <Card className="w-full max-w-2xl p-6 bg-[#D9D9D9] dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-900 dark:text-gray-50">
            Editar Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firtsName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu nombre"
                          {...field}
                          className="bg-white dark:bg-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu apellido"
                          {...field}
                          className="bg-white dark:bg-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@correo.com"
                        {...field}
                        className="bg-white dark:bg-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="thelephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+56912345678"
                          {...field}
                          className="bg-white dark:bg-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-white dark:bg-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#404040] hover:bg-[#505050] text-white"
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 w-full md:w-[200px] mt-6 md:mt-[95px]">
        <Button
          onClick={handleChangePassword}
          className="w-full bg-[#404040] hover:bg-[#505050] text-white"
        >
          Cambiar contraseña
        </Button>

        <Button
          onClick={handleChangeAddress}
          className="w-full bg-[#404040] hover:bg-[#505050] text-white"
        >
          Cambiar dirección
        </Button>
        <Button
          onClick={handleLogout}
          className="w-full bg-[#404040] hover:bg-[#505050] text-white"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
