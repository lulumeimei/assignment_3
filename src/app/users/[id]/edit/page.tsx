// src/app/users/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserById, updateUser } from "./userService";
import { User } from "@/types/user";
import UserForm from "./UserForm";

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setResolvedParams(resolved);
    }

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams || !resolvedParams.id) return;

    const fetchUser = async () => {
      try {
        const data = await fetchUserById(resolvedParams.id);
        setUser(data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [resolvedParams]);

  const handleSubmit = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser);
      router.push(`/users/${updatedUser.id}`);
    } catch (err) {
      setError("Failed to update user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit User</h1>
      {user && <UserForm user={user} onSubmit={handleSubmit} />}
    </div>
  );
}
