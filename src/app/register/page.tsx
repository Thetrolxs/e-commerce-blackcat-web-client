"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 flex items-center justify-center p-4">
        <RegisterForm />
      </main>
    </div>
  );
}
