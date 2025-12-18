import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Gamepad2, 
  Ghost, 
  Home, 
  User, 
  Tv, 
  BarChart3, 
  FileText, 
  Mail,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Bell
} from "lucide-react";

type Channel = 'codedecode' | 'gamechanger' | 'horror' | null;

interface CommandSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeChannel: Channel;
  onChannelChange: (channel: Channel) => void;
}

const channels = [
  { 
    id: 'codedecode' as Channel, 
    name: 'CodeDecode', 
    icon: Code, 
    tagline: 'Learn to Code',
    subs: '245K'
  },
  { 
    id: 'gamechanger' as Channel, 
    name: 'GameChanger', 
    icon: Gamepad2, 
    tagline: 'Gaming & More',
    subs: '189K'
  },
  { 
    id: 'horror' as Channel, 
    name: 'Horror Night', 
    icon: Ghost, 
    tagline: 'With Raj',
    subs: '312K'
  },
];

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Channels", path: "/channels", icon: Tv },
  { name: "Stats", path: "/channels/stats", icon: BarChart3 },
  { name: "Blogs", path: "/blogs", icon: FileText },
  { name: "Contact", path: "/contact", icon: Mail },
];

const CommandSidebar = ({ isOpen, onToggle, activeChannel, onChannelChange }: CommandSidebarProps) => {
  const location = useLocation();
  const [hoveredChannel, setHoveredChannel] = useState<Channel>(null);

  const displayChannel = hoveredChannel || activeChannel;

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={`command-sidebar flex flex-col ${isOpen ? '' : 'collapsed'}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-command-border">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-codedecode-primary to-horror-primary" />
            <span className="relative font-display text-lg font-bold text-primary-foreground">
              R
            </span>
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display text-lg font-bold text-foreground"
              >
                Raj<span className="text-primary">Hub</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </motion.button>
      </div>

      {/* Channel Switcher */}
      <div className="p-4 border-b border-command-border">
        <AnimatePresence>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3"
            >
              Channels
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-2">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isActive = activeChannel === channel.id;

            return (
              <motion.button
                key={channel.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredChannel(channel.id)}
                onMouseLeave={() => setHoveredChannel(null)}
                onClick={() => onChannelChange(isActive ? null : channel.id)}
                className={`channel-orb ${channel.id} ${isActive ? 'active' : ''} ${isOpen ? 'w-full justify-start gap-3 px-3' : 'mx-auto'}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex flex-col items-start overflow-hidden"
                    >
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">{channel.name}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{channel.subs} subs</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Subscribe CTA */}
        <AnimatePresence>
          {isOpen && displayChannel && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4"
            >
              <button className="subscribe-btn w-full text-sm">
                <Bell className="h-4 w-4" />
                <span>Subscribe</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3"
            >
              Navigate
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  } ${!isOpen ? 'justify-center' : ''}`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* YouTube Link */}
      <div className="p-4 border-t border-command-border">
        <motion.a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors ${!isOpen ? 'justify-center' : ''}`}
        >
          <Youtube className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Watch on YouTube
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </motion.aside>
  );
};

export default CommandSidebar;
