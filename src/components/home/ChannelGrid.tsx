import { motion } from "framer-motion";
import { Code, Gamepad2, Ghost, Youtube, Bell, ExternalLink, TrendingUp } from "lucide-react";

const channels = [
  {
    id: 'codedecode',
    name: 'CodeDecode',
    tagline: 'Learn Practical Code in Minutes',
    description: 'Master programming with hands-on tutorials. From JavaScript to Python, algorithms to system design.',
    icon: Code,
    stats: { subs: '245K', growth: '+12%' },
    latestVideo: 'Building a Full-Stack App with React & Node.js',
    color: {
      bg: 'bg-codedecode-bg',
      primary: 'text-codedecode-primary',
      accent: 'bg-codedecode-primary',
      border: 'border-codedecode-primary/30',
      glow: 'hover:shadow-[0_0_60px_-15px] hover:shadow-codedecode-glow',
    }
  },
  {
    id: 'gamechanger',
    name: 'GameChanger',
    tagline: 'Next-Gen Gaming Guides & Highlights',
    description: 'Epic gameplay, pro strategies, and the hottest gaming content. Level up your game.',
    icon: Gamepad2,
    stats: { subs: '189K', growth: '+18%' },
    latestVideo: 'GTA 6 Trailer Breakdown - Everything You Missed',
    color: {
      bg: 'bg-gamechanger-bg',
      primary: 'text-gamechanger-primary',
      accent: 'bg-gamechanger-primary',
      border: 'border-gamechanger-primary/30',
      glow: 'hover:shadow-[0_0_60px_-15px] hover:shadow-gamechanger-glow',
    }
  },
  {
    id: 'horror',
    name: 'Horror Night With Raj',
    tagline: 'Welcome to the Dark',
    description: 'Spine-chilling stories told in the dead of night. Every tale will haunt your dreams.',
    icon: Ghost,
    stats: { subs: '312K', growth: '+24%' },
    latestVideo: 'The Abandoned Hospital - A True Story',
    color: {
      bg: 'bg-horror-bg',
      primary: 'text-horror-primary',
      accent: 'bg-horror-primary',
      border: 'border-horror-primary/30',
      glow: 'hover:shadow-[0_0_60px_-15px] hover:shadow-horror-glow',
    }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  },
};

const ChannelGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Youtube className="h-4 w-4" />
            Featured Channels
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Three Worlds, <span className="text-cinematic">One Creator</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore diverse content across coding, gaming, and horror storytelling. 
            Each channel offers a unique experience.
          </p>
        </motion.div>

        {/* Channel Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {channels.map((channel) => {
            const Icon = channel.icon;
            
            return (
              <motion.div
                key={channel.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group relative rounded-2xl border ${channel.color.border} ${channel.color.bg} overflow-hidden transition-all duration-500 ${channel.color.glow}`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />

                <div className="relative p-8">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl ${channel.color.accent}/10`}>
                      <Icon className={`h-8 w-8 ${channel.color.primary}`} />
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">{channel.stats.growth}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {channel.name}
                  </h3>
                  <p className={`text-sm font-medium ${channel.color.primary} mb-3`}>
                    {channel.tagline}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {channel.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{channel.stats.subs}</p>
                      <p className="text-xs text-muted-foreground">Subscribers</p>
                    </div>
                  </div>

                  {/* Latest Video */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Latest Video</p>
                    <p className="text-sm text-foreground line-clamp-2">{channel.latestVideo}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="subscribe-btn flex-1 text-sm py-2.5"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Subscribe</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-full border border-border bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelGrid;
