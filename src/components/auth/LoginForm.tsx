"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  UserRoundPen,
} from "lucide-react";

// Schema validasi Zod untuk Login
const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal terdiri dari 3 karakter")
    .trim(),
  password: z
    .string()
    .min(4, "Kata sandi minimal terdiri dari 4 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Data kredensial riil yang diverifikasi dari https://dummyjson.com/users
const DUMMY_ACCOUNTS = [
  {
    name: "Emily Johnson",
    username: "emilys",
    password: "emilyspass",
    role: "Sales Manager",
    recommended: true,
  },
  {
    name: "Michael Williams",
    username: "michaelw",
    password: "michaelwpass",
    role: "Support Specialist",
  },
];

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    const result = await login({
      username: values.username,
      password: values.password,
    });

    if (result.success) {
      router.push("/dashboard");
    } else {
      setApiError(result.error || "Gagal masuk. Periksa kembali kredensial Anda.");
    }
  };

  const handleSelectAccount = (username: string, password: string) => {
    setValue("username", username, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
    setApiError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-sm overflow-hidden">
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500" />

        <CardHeader className="space-y-2 text-center pb-4 pt-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-600/20">
            <span className="font-extrabold text-xl tracking-wider">DL</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[11px] font-semibold text-blue-700 dark:text-blue-300 mb-1 border border-blue-100 dark:border-blue-900">
              <ShieldCheck className="h-3 w-3" /> Distrilink SAP &bull;
              Urbansolv
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Selamat Datang
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Masuk untuk memantau performa harian tim salesman
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-6">
          {/* Animated Error Alert */}
          <AnimatePresence mode="wait">
            {apiError && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/90 dark:bg-rose-950/50 p-3.5 text-rose-800 dark:text-rose-200"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">Autentikasi Gagal</p>
                  <p className="mt-0.5">{apiError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Input with Zod validation */}
            <Input
              label="Username"
              id="username"
              placeholder="Contoh: emilys"
              {...register("username")}
              error={errors.username?.message}
              icon={<User className="h-4 w-4" />}
              disabled={isLoading}
            />

            {/* Password Input with Zod validation */}
            <div className="relative">
              <Input
                label="Kata Sandi"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Masukkan kata sandi"
                {...register("password")}
                error={errors.password?.message}
                icon={<Lock className="h-4 w-4" />}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1 transition-colors"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-sm font-semibold shadow-md bg-blue-600 hover:bg-blue-700 text-white mt-2 group"
              isLoading={isLoading}
            >
              {isLoading ? (
                "Memverifikasi ke Server..."
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Accounts Selection from DummyJSON */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <UserRoundPen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Pilih Akun Demo
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Klik untuk isi
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DUMMY_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() =>
                    handleSelectAccount(acc.username, acc.password)
                  }
                  className={`text-left p-2 rounded-xl border transition-all cursor-pointer text-xs group ${
                    acc.recommended
                      ? "border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/70 dark:hover:bg-blue-900/50"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {acc.name.split(" ")[0]}
                    </span>
                    {acc.recommended && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-600 text-white px-1.5 py-0.2 rounded">
                        Utama
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {acc.username}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
