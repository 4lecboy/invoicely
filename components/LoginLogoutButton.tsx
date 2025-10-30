"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signout } from "@/lib/auth-actions";
import { createClient } from "@/lib/supabase/client";

const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  if (user) {
    return (
      <Button
        onClick={() => {
          signout();
          setUser(null);
        }}
      >
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;