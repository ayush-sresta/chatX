"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsersForSidebar } from "@/store/slices/chatSlice";
import { RootState } from "@/store";

export const useUsersForSidebar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${API_URL}/api/message/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          dispatch(setUsersForSidebar(res.data.users));
        }
      } catch (error: any) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message,
        );
      }
    };

    fetchUsers();
  }, [token, dispatch]);
};
