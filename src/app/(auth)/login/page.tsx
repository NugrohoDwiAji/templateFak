"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username: form.username,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert variant="error">{error}</Alert>}
            <Input
              label="Username"
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            <Button type="submit" loading={loading} className="w-full">
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
