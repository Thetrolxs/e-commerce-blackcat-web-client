"use client";

import { useAuthContext } from "@/contexts/authContext";
import { useProfile } from "@/hooks/useProfile";
import { EditProfileForm } from "@/components/user/EditProfileForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ProfileView = () => {
  const { user } = useAuthContext();
  const { profile, loading, error, updateProfile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push("/login");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full mt-6" />
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>Error: {error}</p>
        <p>
          No se pudo cargar la información del perfil. Inténtalo de nuevo más
          tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <EditProfileForm
        initialData={profile}
        onSubmit={updateProfile}
        isLoading={loading}
      />
    </div>
  );
};
