import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Bell, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-codedecode-primary/20 via-gamechanger-primary/20 to-horror-primary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Youtube className="h-10 w-10 text-primary" />
          </motion.div>

          {/* Heading */}
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-codedecode-accent via-gamechanger-accent to-horror-accent bg-clip-text text-transparent">
              Community
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Subscribe to all three channels and never miss a video. Join thousands of viewers who have made RajHub their go-to destination for quality content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-xl bg-destructive px-8 py-4 font-semibold text-destructive-foreground shadow-lg shadow-destructive/25 transition-all hover:shadow-xl hover:shadow-destructive/30"
            >
              <Youtube className="h-5 w-5" />
              Subscribe on YouTube
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary"
              >
                <Bell className="h-5 w-5" />
                Get Notified
              </motion.button>
            </Link>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-muted to-accent"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">500K+</span> happy subscribers
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
