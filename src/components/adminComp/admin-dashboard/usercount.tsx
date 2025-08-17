"use client";

import { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { User } from "../../../../generated/prisma";
import { gqlClient } from "@/services/graphql";
const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      name
      email
      id
      avatar
      username
      role
    }
  }
`;
export default function UsersCount() {
  const [users, setUsers] = useState<User[]>([]);
  const [staffCount, setStaffCount] = useState<number>();
  const [managerCount, setManagerCount] = useState<number>();

  useEffect(() => {
    (async () => {
      const data: { getAllUsers: User[] } = await gqlClient.request(
        GET_ALL_USERS
      );
      const users = data.getAllUsers;
      if (users) {
        setUsers(users);
        const managers = users.filter((user) => user.role === "manager");
        const staffs = users.filter((user) => user.role === "staff");
        setManagerCount(managers.length);
        setStaffCount(staffs.length);
      } else setUsers([]);
    })();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 w-full">
      <div className="flex-1 min-w-[140px] p-4 rounded-2xl shadow bg-white/5 dark:bg-black/20">
        <h2 className="text-xl font-bold">{users.length}</h2>
        <p className="text-sm text-gray-500">Total Users</p>
      </div>
      <div className="flex-1 min-w-[140px] p-4 rounded-2xl shadow bg-white/5 dark:bg-black/20">
        <h2 className="text-xl font-bold">{staffCount ? staffCount : 0}</h2>
        <p className="text-sm text-gray-500">Staff</p>
      </div>
      <div className="flex-1 min-w-[140px] p-4 rounded-2xl shadow bg-white/5 dark:bg-black/20">
        <h2 className="text-xl font-bold">{managerCount ? managerCount : 0}</h2>
        <p className="text-sm text-gray-500">Managers</p>
      </div>
      <div className="flex-1 min-w-[140px] p-4 rounded-2xl shadow bg-white/5 dark:bg-black/20">
        <h2 className="text-xl font-bold">1</h2>
        <p className="text-sm text-gray-500">Admins</p>
      </div>
    </div>
  );
}
