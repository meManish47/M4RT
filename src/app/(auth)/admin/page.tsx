import AddUserButton from "@/components/adminComp/addUserBtn";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <main className="h-screen w-screen flex px-30 gap-8 mt-4">
      <div className="h-[80%] w-[30%] rounded-4xl bg-[#282828] shadow-2xl flex flex-col  p-6">
        <div className="w-full h-[15%] bg-[#131313] flex items-end justify-end">
          <AddUserButton />
        </div>
        <div className="w-full h-[85%] bg-[#181818]"></div>
      </div>
      <div className="h-[80%] w-[70%] rounded-4xl bg-[#282828] shadow-2xl"></div>
    </main>
  );
}
