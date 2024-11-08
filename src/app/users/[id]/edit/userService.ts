// src/app/users/[id]/edit/userService.ts
import { User } from "@/types/user";

export async function fetchUserById(id: string) {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
        throw new Error("User not found");
    }
    return response.json();
}

export async function updateUser(user: User) {
    console.log(JSON.stringify(user));
    const response = await fetch(`/api/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("Failed to update user");
    }
    return response.json();
}
