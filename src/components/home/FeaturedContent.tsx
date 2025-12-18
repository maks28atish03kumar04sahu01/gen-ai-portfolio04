import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Clock, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const featuredVideos = [
  {
    id: 1,
    title: "Building a Full-Stack App with React & Node.js",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    channel: "CodeDecode",
    views: "125K",
    duration: "32:15",
    color: "codedecode",
  },
  {
    id: 2,
    title: "Epic Boss Battle: Defeating the Shadow King",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    channel: "GameChanger",
    views: "89K",
    duration: "18:42",
    color: "gamechanger",
  },
  {
    id: 3,
    title: "The Abandoned Hospital - A True Horror Story",
    thumbnail: "https://images.unsplash.com/photo-1509248961895-40e8d9e0bd2c?w=800&h=450&fit=crop",
    channel: "Horror Night",
    views: "210K",
    duration: "45:30",
    color: "horror",
  },
  {
    id: 4,
    title: "Master TypeScript in 2024 - Complete Guide",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    channel: "CodeDecode",
    views: "98K",
    duration: "55:20",
    color: "codedecode",
  },
  {
    id: 5,
    title: "New Game Review: Stellar Odyssey",
    thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=800&h=450&fit=crop",
    channel: "GameChanger",
    views: "156K",
    duration: "24:18",
    color: "gamechanger",
  },
];

const VideoCard = ({ video, index }: { video: typeof featuredVideos[0]; index: number }) => {
  const colorClasses = {
    codedecode: {
      badge: "bg-codedecode-primary/80 text-codedecode-accent",
      glow: "group-hover:shadow-codedecode-accent/20",
    },
    gamechanger: {
      badge: "bg-gamechanger-primary/80 text-gamechanger-accent",
      glow: "group-hover:shadow-gamechanger-accent/20",
    },
    horror: {
      badge: "bg-horror-primary/80 text-horror-accent",
      glow: "group-hover:shadow-horror-accent/20",
    },
  };

  const colors = colorClasses[video.color as keyof typeof colorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative min-w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-2xl ${colors.glow} sm:min-w-[350px]`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
          >
            <Play className="h-6 w-6 fill-current" />
          </motion.div>
        </div>
        {/* Duration */}
        <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className={`mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
          {video.channel}
        </div>
        <h4 className="mb-2 line-clamp-2 font-medium text-foreground transition-colors group-hover:text-primary">
          {video.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {video.views} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {video.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedContent = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Featured
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Latest & Greatest
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary transition-colors hover:bg-accent disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary transition-colors hover:bg-accent disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Video carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scrollbar-hide -mx-4 flex gap-6 overflow-x-auto px-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
