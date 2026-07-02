import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {

    const load = async () => {

      try {

        const data = await fetchNotifications();

        setNotifications(data.notifications || []);

      } catch (err) {

        setError(true);

      } finally {

        setLoading(false);

      }

    };

    load();

  }, []);

  const total = notifications.length;
  const totalPages = 1;

  return {
    notifications,
    total,
    totalPages,
    loading,
    error
  };
}