"use client";
import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/activity/logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} className="border p-3 mb-2 rounded">
            <p className="font-semibold">{log.action}</p>
            <p className="text-sm text-gray-600">
              User: {log.user?.name}
            </p>
            <p className="text-sm text-gray-600">
              Task: {log.task?.title}
            </p>
          </div>
        ))
      )}
    </div>
  );
}