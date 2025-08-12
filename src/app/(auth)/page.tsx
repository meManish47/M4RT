import AddProductButton from "@/components/productComp/addProduct";
import { ModeToggle } from "@/components/ui/mode-toogle";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <AddProductButton />
    </main>
  );
}
