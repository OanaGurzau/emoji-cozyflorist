"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    setError("");

    setLoading(true);

    const {
      data,
      error
    } = await supabase.auth
      .signInWithPassword({
        email,
        password
      });

    if (error) {

      setError(error.message);

      setLoading(false);

      return;
    }

    // check profile role
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq(
          "id",
          data.user.id
        )
        .single();

    if (
      profile?.role !== "admin"
    ) {

      setError(
        "You are not an admin."
      );

      await supabase.auth.signOut();

      setLoading(false);

      return;
    }

    router.push("/");

    router.refresh();

    setLoading(false);
  }

  async function handleResetPassword() {

  if (!email) {
    setError(
      "Enter your email first."
    );

    return;
  }

const { error } =
  await supabase.auth
    .resetPasswordForEmail(
      email,
      {
        redirectTo:
          `${window.location.origin}/reset-password`
      }
    );
    
  if (error) {

    setError(error.message);

    return;
  }

  setError(
    "Password reset email sent."
  );
}

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#f6f5ef]
        p-4
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-md
          bg-white
          border
          border-[#ECE6DA]
          rounded-3xl
          p-8
          shadow-sm
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-[#21443B]
          "
        >
          Admin Login
        </h1>

        <p
          className="
            text-sm
            text-[#7A8A73]
            mt-2
          "
        >
          Sign in to manage rewards
        </p>

        <div className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-[#DDECCF]
              px-4
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-[#DDECCF]
              px-4
              outline-none
            "
          />

        </div>

        {error && (

          <p
            className="
              text-sm
              text-[#C05673]
              mt-4
            "
          >
            {error}
          </p>

        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            mt-6
            bg-[#4FA36B]
            hover:bg-[#438B5B]
            text-white
            py-3
            rounded-2xl
            font-semibold
            transition

            disabled:opacity-70
          "
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>
        <button
  type="button"
  onClick={handleResetPassword}
  className="
    mt-4
    text-sm
    text-[#4FA36B]
    hover:underline
  "
>
  Forgot password?
</button>

      </form>

    </div>

  );
}