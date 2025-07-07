"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { userClient } from "@/services/userClient";
import { ProfileResponse } from "@/interfaces/ProfileResponse";
import { ProfileRequest } from "@/interfaces/ProfileRequest";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userClient.getProfile();
      setProfile(data as unknown as ProfileResponse);
    } catch (err: any) {
      setError(err.message || "No se pudo cargar el perfil.");
      toast.error("Error al cargar el perfil", { description: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (data: ProfileRequest) => {
    setLoading(true);
    try {
      const updatedProfile = await userClient.updateProfile(data);
      setProfile(updatedProfile as unknown as ProfileResponse);
      toast.success("Perfil actualizado con éxito.");
    } catch (err: any) {
      toast.error("Error al actualizar el perfil", {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { profile, loading, error, fetchProfile, updateProfile };
};
