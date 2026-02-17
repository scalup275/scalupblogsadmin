import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, Clock, MousePointer, Globe, Smartphone, Monitor, Tablet } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const pageViewsData = [
  { date: "Jan 1", views: 4000, uniqueVisitors: 2400, sessions: 3200 },
  { date: "Jan 2", views: 3000, uniqueVisitors: 1398, sessions: 2200 },
  { date: "Jan 3", views: 5000, uniqueVisitors: 3800, sessions: 4100 },
  { date: "Jan 4", views: 4500, uniqueVisitors: 2900, sessions: 3700 },
  { date: "Jan 5", views: 6000, uniqueVisitors: 4200, sessions: 5000 },
  { date: "Jan 6", views: 5500, uniqueVisitors: 3800, sessions: 4600 },
  { date: "Jan 7", views: 7000, uniqueVisitors: 5100, sessions: 5800 },
];

const trafficSources = [
  { name: "Organic Search", value: 4500, color: "hsl(28, 95%, 55%)" },
  { name: "Direct", value: 3200, color: "hsl(0, 0%, 8%)" },
  { name: "Social Media", value: 2100, color: "hsl(28, 90%, 65%)" },
  { name: "Referral", value: 1800, color: "hsl(0, 0%, 45%)" },
  { name: "Email", value: 900, color: "hsl(30, 10%, 70%)" },
];

const deviceData = [
  { name: "Desktop", value: 55, icon: Monitor },
  { name: "Mobile", value: 35, icon: Smartphone },
  { name: "Tablet", value: 10, icon: Tablet },
];

const topPages = [
  { page: "/", title: "Homepage", views: 15420, avgTime: "2:45" },
  { page: "/blog", title: "Blog Index", views: 8932, avgTime: "3:12" },
  { page: "/services", title: "Services", views: 6721, avgTime: "2:30" },
  { page: "/about", title: "About Us", views: 4521, avgTime: "1:58" },
  { page: "/contact", title: "Contact", views: 3214, avgTime: "1:15" },
];

const topCountries = [
  { country: "United States", visitors: 12453, flag: "🇺🇸" },
  { country: "United Kingdom", visitors: 5432, flag: "🇬🇧" },
  { country: "Germany", visitors: 3421, flag: "🇩🇪" },
  { country: "Canada", visitors: 2987, flag: "🇨🇦" },
  { country: "Australia", visitors: 2156, flag: "🇦🇺" },
];

export default function Analytics() {
  return (
    <AdminLayout title="Analytics" subtitle="Track your website performance">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Visitors"
            value="48,234"
            change="+15.3% vs last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Page Views"
            value="156,892"
            change="+22.1% vs last month"
            changeType="positive"
            icon={Eye}
          />
          <StatCard
            title="Avg. Session Duration"
            value="3:24"
            change="-2.4% vs last month"
            changeType="negative"
            icon={Clock}
          />
          <StatCard
            title="Bounce Rate"
            value="42.3%"
            change="-5.2% vs last month"
            changeType="positive"
            icon={MousePointer}
          />
        </div>

        {/* Main Chart */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={pageViewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(28, 95%, 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(28, 95%, 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 0%, 8%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(0, 0%, 8%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Page Views"
                  stroke="hsl(28, 95%, 55%)"
                  strokeWidth={2}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="uniqueVisitors"
                  name="Unique Visitors"
                  stroke="hsl(0, 0%, 8%)"
                  strokeWidth={2}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Secondary Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Traffic Sources */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Globe className="h-5 w-5 text-primary" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-sm text-muted-foreground">{source.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{source.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deviceData.map((device) => (
                  <div key={device.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <device.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{device.name}</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">{device.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${device.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={page.page}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.page}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{page.views.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{page.avgTime} avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="font-medium text-foreground">{country.country}</p>
                        <p className="text-sm text-muted-foreground">Rank #{index + 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {country.visitors.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">visitors</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
