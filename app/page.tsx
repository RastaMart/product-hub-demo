import { Card } from "@/components/ui/card";
import {
  Store,
  Package,
  Megaphone,
  Tv,
  TrendingUp,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Package className="h-6 w-6 text-[#1a237e]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-pink-100">
              <Megaphone className="h-6 w-6 text-[#ff5252]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Promotions</p>
              <p className="text-2xl font-semibold">56</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100">
              <Store className="h-6 w-6 text-[#7c4dff]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Markets</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <TrendingUp className="h-4 w-4 text-[#1a237e]" />
                </div>
                <div>
                  <p className="font-medium">New product added</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}