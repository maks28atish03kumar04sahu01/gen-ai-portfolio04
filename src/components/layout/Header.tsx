import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, Gamepad2, Ghost } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Channels", path: "/channels" },
  { name: "Stats", path: "/channels/stats" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-codedecode-accent via-gamechanger-accent to-horror-accent opacity-80" />
            <span className="relative font-heading text-lg font-bold text-background">
              R
            </span>
          </motion.div>
          <span className="hidden font-heading text-xl font-bold tracking-tight text-foreground sm:block">
            Raj<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link px-4 py-2 font-medium transition-colors ${
                location.pathname === link.path
                  ? "active text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Channel Quick Links */}
        <div className="hidden items-center gap-2 md:flex lg:ml-4">
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="#codedecode"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-codedecode-primary/20 text-codedecode-accent transition-colors hover:bg-codedecode-primary/30"
          >
            <Code className="h-4 w-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            href="#gamechanger"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gamechanger-primary/20 text-gamechanger-accent transition-colors hover:bg-gamechanger-primary/30"
          >
            <Gamepad2 className="h-4 w-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href="#horror"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-horror-primary/20 text-horror-accent transition-colors hover:bg-horror-primary/30"
          >
            <Ghost className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary lg:hidden"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass absolute left-0 right-0 top-full overflow-hidden lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-2 px-4 py-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block rounded-lg px-4 py-3 font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Channels:</span>
                <a
                  href="#codedecode"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-codedecode-primary/20 text-codedecode-accent"
                >
                  <Code className="h-4 w-4" />
                </a>
                <a
                  href="#gamechanger"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gamechanger-primary/20 text-gamechanger-accent"
                >
                  <Gamepad2 className="h-4 w-4" />
                </a>
                <a
                  href="#horror"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-horror-primary/20 text-horror-accent"
                >
                  <Ghost className="h-4 w-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
