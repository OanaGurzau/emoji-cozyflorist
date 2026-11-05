"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function useAdminAuth() {

  const router = useRouter();

  const [loadingAuth, setLoadingAuth] =
    useState(true);

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {

    checkAdmin();

  }, []);

  async function checkAdmin() {

    const {
      data: { session }
    } = await supabase.auth
      .getSession();

    // not logged in
    if (!session) {

      router.push("/login");

      return;
    }

    // check role
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq(
          "id",
          session.user.id
        )
        .single();

    if (
      profile?.role !== "admin"
    ) {

      await supabase.auth.signOut();

      router.push("/login");

      return;
    }

    setIsAdmin(true);

    setLoadingAuth(false);
  }

  return {
    loadingAuth,
    isAdmin
  };
}