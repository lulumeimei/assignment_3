// src/app/users/[id]/page.tsx
import { Metadata } from "next";
import UserDetailClientComponent from "./UserDetailClientComponent";

// Ensure the fetch URL uses an absolute path for server-side requests
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${params.id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        title: "User Not Found",
      };
    }

    const user = await response.json();

    return {
      title: `${user.firstName} ${user.lastName} - User Details`,
    };
  } catch (error) {
    console.error("Failed to fetch user for metadata:", error);
    return {
      title: "User Not Found",
    };
  }
}

export default async function UserDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${params.id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return <UserDetailClientComponent user={null} />;
    }

    const user = await response.json();

    return <UserDetailClientComponent user={user} />;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return <UserDetailClientComponent user={null} />;
  }
}
