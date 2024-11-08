// src/app/users/create/page.tsx
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateUserForm from "./CreateUserForm";

export default function CreateUserPage() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Create User</h1>
      <CreateUserForm />
      <ToastContainer />
    </div>
  );
}
