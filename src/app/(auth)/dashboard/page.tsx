"use client";
import AddUserButton from "@/components/adminComp/addUserBtn";
import AdminDashboard from "@/components/adminComp/admin-dashboard";
import ShowUserOnAdminPage from "@/components/adminComp/showuserOnAdminPage";
import UserUpdateButton from "@/components/adminComp/userupdate/userupdatebutton";
import { UserContext } from "@/components/contexts/userContext";
import AddProductButton from "@/components/productComp/addProduct";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useContext } from "react";

export default function AdminPage() {
  const { user } = useContext(UserContext);

  if (!user) return null;

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row gap-6 px-4 lg:px-12 py-6">
      {/* LEFT SECTION */}
      {user.role === "admin" ? (
        <div className="h-[80%] lg:w-[30%] min-w-[280px] w-full rounded-2xl shadow-2xl flex flex-col p-6 dark:bg-[#161616]/40">
          <div className="flex justify-between items-center text-2xl font-bold">
            User&apos;s lists
            <AddUserButton />
          </div>
          <div className="flex-1 mt-4 overflow-y-auto">
            <ShowUserOnAdminPage />
          </div>
        </div>
      ) : (
        <div className="lg:w-[30%] min-w-[280px] w-full rounded-2xl shadow-2xl p-6 dark:bg-[#161616]/40">
          <p className="text-muted-foreground font-semibold text-2xl mb-4">
            Your Profile:
          </p>
          {/* PROFILE CARD */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full">
            {/* Avatar */}
            <div className="avatar hover:scale-105 transition duration-200">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={user.avatar ? user.avatar : "/user.png"}
                  alt="profile"
                  height={128}
                  width={128}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex  items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <Badge
                    className={`px-3 py-1 rounded-lg text-sm ${
                      user.role === "manager" ? "bg-blue-500" : "bg-emerald-500"
                    } dark:text-white tracking-widest`}
                  >
                    {user.role}
                  </Badge>
                </div>
                <UserUpdateButton user={user} />
              </div>

              <p className="text-muted-foreground text-sm">@{user.username}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT SECTION */}
      <div className="h-[80%] lg:flex-1 w-full rounded-2xl dark:bg-[#161616]/40 shadow-2xl px-6 py-6 overflow-y-auto">
        {user.role === "admin" && <AdminDashboard />}
        <AddProductButton />
      </div>
    </main>
  );
}
