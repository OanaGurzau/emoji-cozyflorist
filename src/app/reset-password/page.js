"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {

  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleResetPassword(
    e
  ) {

    e.preventDefault();

    setError("");

    if (!password) {

      setError(
        "Password is required."
      );

      return;
    }

    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth
        .updateUser({
          password
        });

    if (error) {

      setError(error.message);

      setLoading(false);

      return;
    }

    router.push("/");

    router.refresh();

    setLoading(false);
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
        onSubmit={
          handleResetPassword
        }
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
          Reset Password
        </h1>

        <p
          className="
            text-sm
            text-[#7A8A73]
            mt-2
          "
        >
          Choose a new password for
          your admin account.
        </p>

        <div className="mt-6 space-y-4">

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
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
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
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
            ? "Saving..."
            : "Save Password"}
        </button>

      </form>

    </div>

  );
}