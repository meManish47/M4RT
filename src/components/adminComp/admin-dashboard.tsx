import RecentActivity from "./admin-dashboard/recent-activity";
import UsersCount from "./admin-dashboard/usercount";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col w-full gap-6 p-4">
      <p className="text-2xl lg:text-3xl font-bold">Admin Dashboard</p>
      <UsersCount />

      <RecentActivity />
    </div>
  );
}
