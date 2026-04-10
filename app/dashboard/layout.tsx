import LeftSidebar from "@/components/LeftSidebar";
import { TopNav } from "@/components/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#111111] min-h-screen text-white font-sans flex text-sm">
      <LeftSidebar />
      <div className="flex-1 ml-[280px] min-h-screen flex flex-col">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
