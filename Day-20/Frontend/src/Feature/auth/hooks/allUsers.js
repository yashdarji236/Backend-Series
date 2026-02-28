import { useEffect, useState } from "react";
import { GetAllusers } from "../service/auth.sevice";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetAllusers();
        
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};