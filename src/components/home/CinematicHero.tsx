import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Bell, ChevronRight, Users, Eye, Video } from "lucide-react";

const channels = [
  {
    id: 'codedecode',
    name: 'CodeDecode',
    tagline: 'Decode the Future',
    subtitle: 'Learn Practical Code in Minutes',
    stats: { subs: '245K', views: '12M', videos: '342' },
    cta: 'Start Learning',
    gradient: 'from-codedecode-primary/20 via-transparent to-transparent',
    accent: 'text-codedecode-primary',
    accentBg: 'bg-codedecode-primary',
  },
  {
    id: 'gamechanger',
    name: 'GameChanger',
    tagline: 'Play Fearlessly',
    subtitle: 'Next-Gen Gaming Guides & Highlights',
    stats: { subs: '189K', views: '8.5M', videos: '215' },
    cta: 'Watch Now',
    gradient: 'from-gamechanger-primary/20 via-transparent to-transparent',
    accent: 'text-gamechanger-primary',
    accentBg: 'bg-gamechanger-primary',
  },
  {
    id: 'horror',
    name: 'Horror Night With Raj',
    tagline: 'Welcome to the Dark',
    subtitle: 'Lights. Silence. Story.',
    stats: { subs: '312K', views: '18M', videos: '178' },
    cta: 'Enter the Dark',
    gradient: 'from-horror-primary/20 via-transparent to-transparent',
    accent: 'text-horror-primary',
    accentBg: 'bg-horror-primary',
  },
];

const CinematicHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % channels.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeChannel = channels[activeIndex];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Dynamic Background Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChannel.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-r ${activeChannel.gradient}`}
        />
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`particle ${activeChannel.accentBg} opacity-20`}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 30% 50%, hsl(var(--${activeChannel.id === 'codedecode' ? 'codedecode' : activeChannel.id === 'gamechanger' ? 'gamechanger' : 'horror'}-glow) / 0.1) 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Channel Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-1">
                {channels.map((ch, i) => (
                  <motion.button
                    key={ch.id}
                    onClick={() => {
                      setActiveIndex(i);
                      setIsAutoPlaying(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-3 h-3 rounded-full border-2 border-background transition-all ${
                      i === activeIndex 
                        ? `${ch.accentBg} scale-125` 
                        : 'bg-muted hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {activeIndex + 1} of {channels.length} Channels
              </span>
            </motion.div>

            {/* Main Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChannel.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className={activeChannel.accent}>{activeChannel.tagline}</span>
                  <br />
                  <span className="text-foreground">{activeChannel.subtitle}</span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Stats Row */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-${activeChannel.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center gap-2">
                  <Users className={`h-5 w-5 ${activeChannel.accent}`} />
                  <span className="text-lg font-semibold text-foreground">{activeChannel.stats.subs}</span>
                  <span className="text-muted-foreground">Subscribers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className={`h-5 w-5 ${activeChannel.accent}`} />
                  <span className="text-lg font-semibold text-foreground">{activeChannel.stats.views}</span>
                  <span className="text-muted-foreground">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className={`h-5 w-5 ${activeChannel.accent}`} />
                  <span className="text-lg font-semibold text-foreground">{activeChannel.stats.videos}</span>
                  <span className="text-muted-foreground">Videos</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="subscribe-btn group"
              >
                <Bell className="h-5 w-5" />
                <span>Subscribe Now</span>
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.button
                  key={`cta-${activeChannel.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-secondary/50 text-foreground font-semibold hover:bg-secondary transition-colors group"
                >
                  <Play className="h-5 w-5" />
                  <span>{activeChannel.cta}</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Channel Preview Cards */}
          <div className="relative h-[500px] hidden lg:block">
            {channels.map((channel, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <motion.div
                  key={channel.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  animate={{
                    x: offset * 40,
                    y: offset * 20,
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                    zIndex: isActive ? 30 : 20 - Math.abs(offset),
                    rotateY: offset * -5,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 cursor-pointer"
                >
                  <div className={`cine-card h-full p-8 flex flex-col justify-between ${
                    isActive ? 'border-primary/30' : ''
                  }`}>
                    {/* Channel Header */}
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${channel.accentBg}/10 ${channel.accent} text-sm font-medium mb-4`}>
                        <span className={`w-2 h-2 rounded-full ${channel.accentBg}`} />
                        {channel.name}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        {channel.tagline}
                      </h3>
                      <p className="text-muted-foreground">
                        {channel.subtitle}
                      </p>
                    </div>

                    {/* Fake Video Thumbnail */}
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-secondary my-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-full ${channel.accentBg}/20 flex items-center justify-center`}>
                          <Play className={`h-8 w-8 ${channel.accent}`} />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-background/80 text-xs font-medium">
                        12:34
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {channel.stats.subs} subscribers
                      </span>
                      <span className={channel.accent}>
                        {channel.stats.views} views
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
        <motion.div
          key={activeIndex}
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlaying ? "100%" : "0%" }}
          transition={{ duration: 6, ease: "linear" }}
          className={`h-full ${activeChannel.accentBg}`}
        />
      </div>
    </section>
  );
};

export default CinematicHero;
