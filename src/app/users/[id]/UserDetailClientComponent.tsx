// src/app/users/[id]/UserDetailClientComponent.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

async function fetchUserById(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export default function UserDetailClientComponent({
  user: initialUser,
}: {
  user: User | null;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);

  const refreshUserData = async (id: string) => {
    const updatedUser = await fetchUserById(id);
    setUser(updatedUser);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (user?.id) {
        refreshUserData(user.id.toString());
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          User not found
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        User Detail
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </h2>
          <button
            onClick={async () => {
              router.replace(`/users/${user.id}/edit`);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
          >
            Edit
          </button>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Back
        </button>
      </div>
    </div>
  );
}
