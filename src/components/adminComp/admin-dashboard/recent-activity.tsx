export default function RecentActivity() {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl shadow bg-white/5 dark:bg-black/20">
      <h3 className="font-semibold">Recent Activity</h3>
      <ul className="text-sm text-gray-400 space-y-1">
        <li>Deepak added a new sale — 2d ago</li>
        <li>Harmeet updated prices — 3d ago</li>
        <li>Baljeet added a new sale — 4d ago</li>
      </ul>
    </div>
  );
}
