import AddUserButton from "@/components/adminComp/addUserBtn";
import ShowUserOnAdminPage from "@/components/adminComp/showuserOnAdminPage";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <main className="h-screen w-screen flex px-30 gap-8 mt-4">
      <div className="h-[80%] w-[30%] rounded-4xl  shadow-2xl flex flex-col  p-6 dark:bg-[#161616]/40">
        <div className="w-full h-max  flex flex-col justify-end items-end ">
          <div className="w-full h-full text-2xl font-bold  flex justify-between items-center px-2">
            User's lists
            <AddUserButton />
          </div>
        </div>
        <div className="w-full h-[85%]  mt-2 ">
          <ShowUserOnAdminPage />
        </div>
      </div>
      <div className="h-[80%] w-[70%] rounded-4xl dark:bg-[#161616]/40 shadow-2xl"></div>
    </main>
  );
}
