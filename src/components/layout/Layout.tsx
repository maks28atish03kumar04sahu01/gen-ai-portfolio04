import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommandSidebar from "./CommandSidebar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";

type Channel = 'codedecode' | 'gamechanger' | 'horror' | null;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChannel, setActiveChannel] = useState<Channel>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get channel-specific background class
  const getChannelBg = () => {
    switch (activeChannel) {
      case 'codedecode':
        return 'bg-gradient-codedecode';
      case 'gamechanger':
        return 'bg-gradient-gamechanger';
      case 'horror':
        return 'bg-gradient-horror';
      default:
        return 'bg-gradient-cinematic';
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Cinematic background with channel-aware color shift */}
      <motion.div
        key={activeChannel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed inset-0 ${getChannelBg()} -z-10`}
      />

      {/* Film grain overlay */}
      <div className="fixed inset-0 bg-noise opacity-50 pointer-events-none -z-10" />

      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(220 15% 2% / 0.5) 100%)'
        }}
      />

      {/* Command Sidebar (Desktop) */}
      <div className="hidden lg:block">
        <CommandSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          activeChannel={activeChannel}
          onChannelChange={setActiveChannel}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden command-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <CommandSidebar
          isOpen={true}
          onToggle={() => setMobileMenuOpen(false)}
          activeChannel={activeChannel}
          onChannelChange={setActiveChannel}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className={`min-h-screen flex flex-col transition-all duration-500 ${
          sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[72px]'
        }`}
      >
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 glass-dark">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-codedecode-primary to-horror-primary">
                <span className="font-display text-sm font-bold text-primary-foreground">R</span>
              </div>
              <span className="font-display font-bold text-foreground">
                Raj<span className="text-primary">Hub</span>
              </span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 pb-24 lg:pb-0"
        >
          {children}
        </motion.main>

        <Footer />
      </motion.div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
};

export default Layout;
