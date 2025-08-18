"use client";

import { gqlClient } from "@/services/graphql";
import { gql } from "graphql-request";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "../../../generated/prisma";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import UserUpdateButton from "./userupdate/userupdatebutton";
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
export default function ShowUserOnAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data: { getAllUsers: User[] } = await gqlClient.request(
        GET_ALL_USERS
      );
      const users = data.getAllUsers;
      if (users) setUsers(users);
      else setUsers([]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <main className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full w-full flex flex-col gap-4 px-4 overflow-y-auto overflow-x-hidden">
      <div className="h-max w-full text-lg font-semibold "></div>
      <Separator orientation="horizontal" />
      {users.map((user) => {
        return (
          <div key={user.id} className="flex gap-1 items-center">
            <div>
              <div className="avatar hover:scale-108 transition duration-200">
                <div className="w-20 rounded-full">
                  <Image
                    src={user.avatar ? user.avatar : "/user.png"}
                    alt="image"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="card w-full  card-sm rounded-none p-0">
                <div className="card-body flex flex-col gap-1 w-full pe-0">
                  <div className="flex w-full justify-between items-center">
                    <h2 className="card-title font-bold">{user.name}</h2>{" "}
                    <Badge
                      className={`p-0 w-16 h-max ${
                        user.role === "manager"
                          ? "bg-blue-500"
                          : "bg-emerald-500"
                      } dark:text-white  tracking-widest`}
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    @{user.username}
                  </p>
                  <div className="w-full flex justify-between">
                    <p>{user.email}</p>
                    <UserUpdateButton user={user}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
