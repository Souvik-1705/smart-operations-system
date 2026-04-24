"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, assignedTo }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Task created");
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Assign User ID"
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}