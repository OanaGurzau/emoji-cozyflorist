"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function useAdminStatus() {

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

    if (!session) {
      return;
    }

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
      profile?.role === "admin"
    ) {
      setIsAdmin(true);
    }
  }

  return isAdmin;
}