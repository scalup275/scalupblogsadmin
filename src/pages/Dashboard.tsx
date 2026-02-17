import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, TrendingUp, DollarSign, Eye, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const trafficData = [
  { name: "Jan", visitors: 4000, leads: 240 },
  { name: "Feb", visitors: 3000, leads: 139 },
  { name: "Mar", visitors: 5000, leads: 380 },
  { name: "Apr", visitors: 4500, leads: 290 },
  { name: "May", visitors: 6000, leads: 420 },
  { name: "Jun", visitors: 5500, leads: 380 },
  { name: "Jul", visitors: 7000, leads: 510 },
];

const blogPerformance = [
  { name: "Mon", views: 2400 },
  { name: "Tue", views: 1398 },
  { name: "Wed", views: 3800 },
  { name: "Thu", views: 3908 },
  { name: "Fri", views: 4800 },
  { name: "Sat", views: 3800 },
  { name: "Sun", views: 2300 },
];

const recentActivity = [
  { id: 1, action: "New lead from website", time: "2 minutes ago", type: "lead" },
  { id: 2, action: "Blog post published", time: "1 hour ago", type: "blog" },
  { id: 3, action: "Lead converted: TechCorp", time: "3 hours ago", type: "conversion" },
  { id: 4, action: "New comment on blog", time: "5 hours ago", type: "comment" },
  { id: 5, action: "Weekly report generated", time: "1 day ago", type: "report" },
];

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Leads"
            value="2,847"
            change="+12.5% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Blog Posts"
            value="156"
            change="+3 this week"
            changeType="positive"
            icon={FileText}
          />
          <StatCard
            title="Page Views"
            value="48.2K"
            change="+8.2% from last week"
            changeType="positive"
            icon={Eye}
          />
          <StatCard
            title="Revenue"
            value="$124,500"
            change="+23.1% from last month"
            changeType="positive"
            icon={DollarSign}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="h-5 w-5 text-primary" />
                Traffic & Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(28, 95%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(28, 95%, 55%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 0%, 8%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 0%, 8%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(28, 95%, 55%)"
                    strokeWidth={2}
                    fill="url(#colorVisitors)"
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="hsl(0, 0%, 8%)"
                    strokeWidth={2}
                    fill="url(#colorLeads)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="h-5 w-5 text-primary" />
                Blog Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={blogPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(28, 95%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {activity.type === "lead" && <Users className="h-5 w-5 text-primary" />}
                    {activity.type === "blog" && <FileText className="h-5 w-5 text-primary" />}
                    {activity.type === "conversion" && <DollarSign className="h-5 w-5 text-green-600" />}
                    {activity.type === "comment" && <FileText className="h-5 w-5 text-blue-600" />}
                    {activity.type === "report" && <TrendingUp className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
