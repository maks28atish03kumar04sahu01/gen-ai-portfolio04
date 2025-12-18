import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Gamepad2, Ghost, Play, Users, Eye, Clock, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const channelsData = [
  {
    id: "codedecode",
    name: "CodeDecode",
    tagline: "Decode the Future — Learn Practical Code in Minutes",
    description: "Master programming with bite-sized tutorials covering web development, algorithms, and modern tech stacks. Perfect for beginners and experienced developers alike.",
    icon: Code,
    stats: { subscribers: "180K", videos: "450", views: "20M", avgViews: "44K" },
    gradient: "from-codedecode-primary to-codedecode-accent",
    accentColor: "text-codedecode-accent",
    bgColor: "bg-codedecode-primary/10",
    borderColor: "border-codedecode-accent/30",
    hoverBorder: "hover:border-codedecode-accent",
    playlists: ["React Mastery", "TypeScript Deep Dive", "System Design", "DSA Bootcamp"],
    latestVideos: [
      { title: "Building a Full-Stack App", views: "125K", duration: "32:15" },
      { title: "Master TypeScript in 2024", views: "98K", duration: "55:20" },
      { title: "React Server Components", views: "76K", duration: "28:40" },
    ],
  },
  {
    id: "gamechanger",
    name: "GameChanger",
    tagline: "Play Fearlessly — Next-Gen Gaming Guides & Highlights",
    description: "Epic gameplay, in-depth reviews, and pro tips for the latest games. Level up your gaming experience with guides, walkthroughs, and entertainment.",
    icon: Gamepad2,
    stats: { subscribers: "220K", videos: "380", views: "18M", avgViews: "47K" },
    gradient: "from-gamechanger-primary to-gamechanger-accent",
    accentColor: "text-gamechanger-accent",
    bgColor: "bg-gamechanger-primary/10",
    borderColor: "border-gamechanger-accent/30",
    hoverBorder: "hover:border-gamechanger-accent",
    playlists: ["Boss Battles", "Game Reviews", "Speedruns", "Let's Play"],
    latestVideos: [
      { title: "Epic Boss Battle: Shadow King", views: "89K", duration: "18:42" },
      { title: "Stellar Odyssey Review", views: "156K", duration: "24:18" },
      { title: "100% Completion Guide", views: "134K", duration: "1:12:30" },
    ],
  },
  {
    id: "horror",
    name: "Horror Night With Raj",
    tagline: "Lights. Silence. Story. Welcome to the Dark.",
    description: "Spine-chilling stories told in the dead of night. Original horror tales, urban legends, and true scary stories that will keep you awake.",
    icon: Ghost,
    stats: { subscribers: "150K", videos: "200", views: "12M", avgViews: "60K" },
    gradient: "from-horror-primary to-horror-accent",
    accentColor: "text-horror-accent",
    bgColor: "bg-horror-primary/10",
    borderColor: "border-horror-accent/30",
    hoverBorder: "hover:border-horror-accent",
    playlists: ["Original Stories", "True Horror", "Urban Legends", "Creepypasta"],
    latestVideos: [
      { title: "The Abandoned Hospital", views: "210K", duration: "45:30" },
      { title: "3AM Challenge Gone Wrong", views: "185K", duration: "38:15" },
      { title: "The Faceless Stranger", views: "142K", duration: "52:00" },
    ],
  },
];

const Channels = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<{ [key: string]: string }>({});
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const filteredChannels = activeFilter
    ? channelsData.filter((c) => c.id === activeFilter)
    : channelsData;

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
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              All Channels
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold md:text-5xl">
              Explore the{" "}
              <span className="bg-gradient-to-r from-codedecode-accent via-gamechanger-accent to-horror-accent bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Three unique channels, each with its own personality and purpose. Find your favorite or explore them all.
            </p>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => setActiveFilter(null)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Filter className="h-4 w-4" />
              All Channels
            </button>
            {channelsData.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveFilter(channel.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === channel.id
                    ? `bg-gradient-to-r ${channel.gradient} text-white`
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <channel.icon className="h-4 w-4" />
                {channel.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Channels Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {filteredChannels.map((channel, index) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`overflow-hidden rounded-3xl border ${channel.borderColor} bg-card`}
                >
                  {/* Channel Header */}
                  <div className={`bg-gradient-to-r ${channel.gradient} p-8`}>
                    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                          <channel.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                            {channel.name}
                          </h2>
                          <p className="text-white/80">{channel.tagline}</p>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <Play className="h-4 w-4" />
                        Subscribe
                      </a>
                    </div>
                  </div>

                  {/* Channel Content */}
                  <div className="p-8">
                    {/* Stats */}
                    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                      {[
                        { icon: Users, value: channel.stats.subscribers, label: "Subscribers" },
                        { icon: Play, value: channel.stats.videos, label: "Videos" },
                        { icon: Eye, value: channel.stats.views, label: "Total Views" },
                        { icon: Clock, value: channel.stats.avgViews, label: "Avg. Views" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-secondary p-4 text-center">
                          <stat.icon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                          <div className={`font-heading text-xl font-bold ${channel.accentColor}`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 flex gap-2 border-b border-border">
                      {["Latest", "Playlists", "About"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab({ ...activeTab, [channel.id]: tab })}
                          className={`px-4 py-3 text-sm font-medium transition-colors ${
                            (activeTab[channel.id] || "Latest") === tab
                              ? `${channel.accentColor} border-b-2 border-current`
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {(activeTab[channel.id] || "Latest") === "Latest" && (
                        <motion.div
                          key="latest"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid gap-4 md:grid-cols-3"
                        >
                          {channel.latestVideos.map((video, i) => (
                            <div
                              key={i}
                              className="group cursor-pointer rounded-xl bg-secondary p-4 transition-colors hover:bg-accent"
                            >
                              <div className="mb-3 aspect-video rounded-lg bg-muted"></div>
                              <h4 className="mb-2 font-medium text-foreground group-hover:text-primary">
                                {video.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{video.views} views</span>
                                <span>{video.duration}</span>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {(activeTab[channel.id]) === "Playlists" && (
                        <motion.div
                          key="playlists"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid gap-3 md:grid-cols-2"
                        >
                          {channel.playlists.map((playlist, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-xl bg-secondary p-4 transition-colors hover:bg-accent"
                            >
                              <span className="font-medium">{playlist}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {(activeTab[channel.id]) === "About" && (
                        <motion.div
                          key="about"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-muted-foreground">{channel.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
            Ready to dive deeper?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Check out the channel statistics to see growth trends and popular content.
          </p>
          <Link to="/channels/stats">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground"
            >
              View Statistics
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Channels;
