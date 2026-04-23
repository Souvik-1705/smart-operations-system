"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const role = typeof window !== "undefined" && localStorage.getItem("role");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Buttons */}
      <div className="mb-4 flex gap-2">
        {(role === "admin" || role === "manager") && (
          <button
            onClick={() => router.push("/create-task")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Task
          </button>
        )}

        {role === "admin" && (
          <button
            onClick={() => router.push("/logs")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            View Logs
          </button>
        )}
      </div>

      {/* Task List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-3">Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="border p-3 mb-2 rounded"
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">
                Status: {task.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}