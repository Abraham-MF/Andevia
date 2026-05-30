"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">

      {/* Background glow sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="w-full max-w-[360px] space-y-8">

        {/* Logo + título */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl">
            🌊
          </div>
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
              Andevia
            </h1>
            <p className="text-[13px] text-muted-foreground mt-1">
              Sistema de gestión de instalaciones escolares
            </p>
          </div>
        </div>

        {/* Card del form */}
        <div className="rounded-xl border border-border bg-card shadow-xl shadow-black/10 p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="text-[15px] font-semibold text-foreground">
              Iniciar sesión
            </h2>
            <p className="text-[12px] text-muted-foreground">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[12px] font-medium text-foreground/80"
              >
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@andevia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-9 text-[13px] bg-background border-border focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-[12px] font-medium text-foreground/80"
              >
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-9 text-[13px] bg-background border-border focus-visible:ring-primary/50"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-[12px] text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-9 text-[13px] font-semibold gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {loading ? "Verificando..." : "Continuar"}
            </Button>
          </form>
        </div>

        {/* Cuentas de prueba */}
        <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-[11px] text-muted-foreground space-y-1.5">
          <p className="font-semibold text-foreground/60 uppercase tracking-wider text-[10px]">
            Cuentas de prueba
          </p>
          {[
            ["Admin",   "admin@andevia.com",   "123456"],
          ].map(([role, mail, pass]) => (
            <div key={role} className="flex items-center gap-1.5">
              <span className="font-medium text-foreground/50 w-14">{role}:</span>
              <button
                type="button"
                onClick={() => { setEmail(mail); setPassword(pass); }}
                className="text-primary/70 hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                {mail}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}