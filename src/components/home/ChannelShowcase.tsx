import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Gamepad2, Ghost, Play, Users, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const channels = [
  {
    id: "codedecode",
    name: "CodeDecode",
    tagline: "Decode the Future — Learn Practical Code in Minutes",
    description: "Master programming with bite-sized tutorials covering web development, algorithms, and modern tech stacks.",
    icon: Code,
    stats: { subscribers: "180K", videos: "450", views: "20M" },
    gradient: "from-codedecode-primary to-codedecode-accent",
    accentColor: "text-codedecode-accent",
    bgColor: "bg-codedecode-primary/10",
    borderColor: "border-codedecode-accent/30",
    glowClass: "glow-codedecode",
  },
  {
    id: "gamechanger",
    name: "GameChanger",
    tagline: "Play Fearlessly — Next-Gen Gaming Guides & Highlights",
    description: "Epic gameplay, in-depth reviews, and pro tips for the latest games. Level up your gaming experience.",
    icon: Gamepad2,
    stats: { subscribers: "220K", videos: "380", views: "18M" },
    gradient: "from-gamechanger-primary to-gamechanger-accent",
    accentColor: "text-gamechanger-accent",
    bgColor: "bg-gamechanger-primary/10",
    borderColor: "border-gamechanger-accent/30",
    glowClass: "glow-gamechanger",
  },
  {
    id: "horror",
    name: "Horror Night With Raj",
    tagline: "Lights. Silence. Story. Welcome to the Dark.",
    description: "Spine-chilling stories told in the dead of night. Original horror tales that will keep you awake.",
    icon: Ghost,
    stats: { subscribers: "150K", videos: "200", views: "12M" },
    gradient: "from-horror-primary to-horror-accent",
    accentColor: "text-horror-accent",
    bgColor: "bg-horror-primary/10",
    borderColor: "border-horror-accent/30",
    glowClass: "glow-horror",
  },
];

const ChannelCard = ({ channel, index }: { channel: typeof channels[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      id={channel.id}
      className="group relative"
    >
      <div className={`channel-card h-full p-8 ${channel.borderColor} hover:${channel.glowClass}`}>
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
        
        {/* Icon */}
        <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${channel.bgColor}`}>
          <channel.icon className={`h-8 w-8 ${channel.accentColor}`} />
        </div>

        {/* Content */}
        <h3 className={`mb-2 font-heading text-2xl font-bold ${channel.accentColor}`}>
          {channel.name}
        </h3>
        <p className="mb-4 font-medium text-foreground">
          {channel.tagline}
        </p>
        <p className="mb-6 text-muted-foreground">
          {channel.description}
        </p>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { icon: Users, value: channel.stats.subscribers, label: "Subs" },
            { icon: Play, value: channel.stats.videos, label: "Videos" },
            { icon: Eye, value: channel.stats.views, label: "Views" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <stat.icon className="h-3 w-3 text-muted-foreground" />
                <span className="font-heading font-bold text-foreground">{stat.value}</span>
              </div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/channels">
          <motion.button
            whileHover={{ x: 5 }}
            className={`group/btn flex items-center gap-2 font-medium ${channel.accentColor}`}
          >
            Explore Channel
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

const ChannelShowcase = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-20 lg:py-32">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            The Channels
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Three Worlds, One Creator
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore content that spans from technical tutorials to thrilling entertainment. Each channel offers a unique experience.
          </p>
        </motion.div>

        {/* Channel cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel, index) => (
            <ChannelCard key={channel.id} channel={channel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChannelShowcase;
