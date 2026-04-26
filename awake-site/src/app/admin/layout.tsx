import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";
import ToastContainer from "@/components/admin/toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0c0b0a] text-[#f0ece6]">
      <Sidebar />
      <div className="ml-[228px] flex flex-col min-h-screen">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
