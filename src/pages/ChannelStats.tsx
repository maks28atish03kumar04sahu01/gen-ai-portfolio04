import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Gamepad2, Ghost, TrendingUp, TrendingDown, Users, Eye, Play, Clock, BarChart3 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

const subscriberData = [
  { month: "Jan", codedecode: 145000, gamechanger: 180000, horror: 120000 },
  { month: "Feb", codedecode: 150000, gamechanger: 188000, horror: 125000 },
  { month: "Mar", codedecode: 158000, gamechanger: 195000, horror: 130000 },
  { month: "Apr", codedecode: 162000, gamechanger: 200000, horror: 135000 },
  { month: "May", codedecode: 168000, gamechanger: 208000, horror: 140000 },
  { month: "Jun", codedecode: 175000, gamechanger: 215000, horror: 145000 },
  { month: "Jul", codedecode: 180000, gamechanger: 220000, horror: 150000 },
];

const viewsData = [
  { month: "Jan", views: 2500000 },
  { month: "Feb", views: 2800000 },
  { month: "Mar", views: 3200000 },
  { month: "Apr", views: 3000000 },
  { month: "May", views: 3500000 },
  { month: "Jun", views: 3800000 },
  { month: "Jul", views: 4200000 },
];

const engagementData = [
  { category: "Likes", codedecode: 850000, gamechanger: 920000, horror: 780000 },
  { category: "Comments", codedecode: 125000, gamechanger: 145000, horror: 180000 },
  { category: "Shares", codedecode: 45000, gamechanger: 52000, horror: 38000 },
];

const channelStats = [
  {
    id: "codedecode",
    name: "CodeDecode",
    icon: Code,
    color: "#00d4ff",
    stats: {
      subscribers: { value: "180K", change: "+8.5%", trending: true },
      views: { value: "20M", change: "+12.3%", trending: true },
      watchTime: { value: "2.5M hrs", change: "+5.2%", trending: true },
      avgViews: { value: "44K", change: "-2.1%", trending: false },
    },
  },
  {
    id: "gamechanger",
    name: "GameChanger",
    icon: Gamepad2,
    color: "#e11d48",
    stats: {
      subscribers: { value: "220K", change: "+10.2%", trending: true },
      views: { value: "18M", change: "+8.7%", trending: true },
      watchTime: { value: "1.8M hrs", change: "+6.8%", trending: true },
      avgViews: { value: "47K", change: "+3.5%", trending: true },
    },
  },
  {
    id: "horror",
    name: "Horror Night",
    icon: Ghost,
    color: "#dc2626",
    stats: {
      subscribers: { value: "150K", change: "+15.4%", trending: true },
      views: { value: "12M", change: "+18.2%", trending: true },
      watchTime: { value: "1.2M hrs", change: "+22.1%", trending: true },
      avgViews: { value: "60K", change: "+8.9%", trending: true },
    },
  },
];

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-heading text-3xl font-bold md:text-4xl"
    >
      {value.toLocaleString()}{suffix}
    </motion.span>
  );
};

const ChannelStats = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const heroRef = useRef(null);
  const chartsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isChartsInView = useInView(chartsRef, { once: true });

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <BarChart3 className="h-4 w-4" />
              Analytics Dashboard
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold md:text-5xl">
              Channel{" "}
              <span className="bg-gradient-to-r from-codedecode-accent via-gamechanger-accent to-horror-accent bg-clip-text text-transparent">
                Statistics
              </span>
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Track growth, engagement, and performance across all three channels with real-time analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Channel Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedChannel(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedChannel === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All Channels
            </button>
            {channelStats.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedChannel === channel.id
                    ? "text-white"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  backgroundColor: selectedChannel === channel.id ? channel.color : undefined,
                }}
              >
                <channel.icon className="h-4 w-4" />
                {channel.name}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {channelStats
              .filter((c) => !selectedChannel || c.id === selectedChannel)
              .map((channel, index) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${channel.color}20` }}
                    >
                      <channel.icon className="h-6 w-6" style={{ color: channel.color }} />
                    </div>
                    <h3 className="font-heading text-lg font-bold">{channel.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(channel.stats).map(([key, stat]) => (
                      <div key={key} className="rounded-lg bg-secondary p-3">
                        <div className="mb-1 flex items-center gap-1">
                          {key === "subscribers" && <Users className="h-3 w-3 text-muted-foreground" />}
                          {key === "views" && <Eye className="h-3 w-3 text-muted-foreground" />}
                          {key === "watchTime" && <Clock className="h-3 w-3 text-muted-foreground" />}
                          {key === "avgViews" && <Play className="h-3 w-3 text-muted-foreground" />}
                          <span className="text-xs capitalize text-muted-foreground">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                        <div className="font-heading text-lg font-bold">{stat.value}</div>
                        <div className={`flex items-center gap-1 text-xs ${stat.trending ? "text-green-500" : "text-red-500"}`}>
                          {stat.trending ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section ref={chartsRef} className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Subscriber Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isChartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-6 font-heading text-lg font-bold">Subscriber Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subscriberData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="codedecode" stroke="#00d4ff" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="gamechanger" stroke="#e11d48" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="horror" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-codedecode-accent" />
                  <span className="text-sm text-muted-foreground">CodeDecode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gamechanger-accent" />
                  <span className="text-sm text-muted-foreground">GameChanger</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-horror-accent" />
                  <span className="text-sm text-muted-foreground">Horror Night</span>
                </div>
              </div>
            </motion.div>

            {/* Total Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isChartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-6 font-heading text-lg font-bold">Monthly Views (All Channels)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, "Views"]}
                    />
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorViews)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Engagement Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isChartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
            >
              <h3 className="mb-6 font-heading text-lg font-bold">Engagement Breakdown</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="codedecode" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="gamechanger" fill="#e11d48" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="horror" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isChartsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-r from-codedecode-primary/20 via-gamechanger-primary/20 to-horror-primary/20 p-8 text-center"
          >
            <h3 className="mb-8 font-heading text-2xl font-bold">Combined Impact</h3>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { label: "Total Subscribers", value: 550000, suffix: "+" },
                { label: "Total Views", value: 50000000, suffix: "+" },
                { label: "Videos Published", value: 1030, suffix: "" },
                { label: "Watch Hours", value: 5500000, suffix: "" },
              ].map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ChannelStats;
