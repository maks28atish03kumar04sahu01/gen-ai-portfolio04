import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Gamepad2, Ghost, Youtube, Twitter, Instagram, Github, Award, Heart, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";

const milestones = [
  { year: "2019", title: "CodeDecode Launch", description: "Started sharing coding tutorials" },
  { year: "2020", title: "100K Subscribers", description: "CodeDecode hits first milestone" },
  { year: "2021", title: "GameChanger Born", description: "Expanded into gaming content" },
  { year: "2022", title: "Horror Night Debut", description: "First horror story uploaded" },
  { year: "2023", title: "500K Combined", description: "Half million across all channels" },
  { year: "2024", title: "The Journey Continues", description: "New content, new horizons" },
];

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const channelsRef = useRef(null);
  const timelineRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true });
  const isChannelsInView = useInView(channelsRef, { once: true });
  const isTimelineInView = useInView(timelineRef, { once: true });

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        
        <div className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              About Raj
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
              Building Worlds Through{" "}
              <span className="bg-gradient-to-r from-codedecode-accent via-gamechanger-accent to-horror-accent bg-clip-text text-transparent">
                Content
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              From clean code to chilling tales and high-octane gameplay — three channels, one creator: consistent quality, uniquely styled.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
                The Story Behind RajHub
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  It all started with a simple idea: share knowledge and entertain. What began as coding tutorials quickly evolved into something much bigger — a multi-channel content empire spanning technology, gaming, and storytelling.
                </p>
                <p>
                  Every video is crafted with passion, whether it's breaking down complex programming concepts, conquering the latest games, or weaving spine-chilling tales in the darkness of night.
                </p>
                <p>
                  The mission is simple: create content that educates, entertains, and inspires. Join the journey and become part of a growing community of curious minds and adventurous souls.
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                {[
                  { icon: Youtube, href: "#", label: "YouTube" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Github, href: "#", label: "GitHub" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-codedecode-primary via-gamechanger-primary to-horror-primary p-1">
                <div className="h-full w-full rounded-3xl bg-card p-8">
                  <div className="flex h-full flex-col items-center justify-center">
                    {/* Stats grid */}
                    <div className="grid w-full grid-cols-2 gap-6">
                      {[
                        { icon: Award, value: "5+", label: "Years Creating" },
                        { icon: Heart, value: "500K+", label: "Subscribers" },
                        { icon: Zap, value: "1000+", label: "Videos" },
                        { icon: Youtube, value: "3", label: "Channels" },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="rounded-xl bg-secondary p-4 text-center"
                        >
                          <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                          <div className="font-heading text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Channels Overview */}
      <section ref={channelsRef} className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isChannelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              The Three Pillars
            </h2>
            <p className="text-muted-foreground">Each channel serves a unique purpose and audience</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Code,
                name: "CodeDecode",
                tagline: "Learn. Build. Create.",
                description: "Programming tutorials that cut through the noise. Learn practical skills with real-world projects and modern tech stacks.",
                color: "codedecode",
              },
              {
                icon: Gamepad2,
                name: "GameChanger",
                tagline: "Play. Win. Repeat.",
                description: "Gaming content that goes beyond gameplay. Reviews, guides, and epic moments from the latest and greatest games.",
                color: "gamechanger",
              },
              {
                icon: Ghost,
                name: "Horror Night",
                tagline: "Listen. Fear. Survive.",
                description: "Original horror stories told in atmospheric settings. Perfect for those dark, sleepless nights.",
                color: "horror",
              },
            ].map((channel, index) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isChannelsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30"
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${channel.color}-primary/20`}>
                  <channel.icon className={`h-7 w-7 text-${channel.color}-accent`} />
                </div>
                <h3 className={`mb-2 font-heading text-xl font-bold text-${channel.color}-accent`}>
                  {channel.name}
                </h3>
                <p className="mb-3 font-medium text-foreground">{channel.tagline}</p>
                <p className="text-sm text-muted-foreground">{channel.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              The Journey So Far
            </h2>
            <p className="text-muted-foreground">Key milestones in the RajHub story</p>
          </motion.div>

          <div className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-2.5 top-1 h-3 w-3 rounded-full bg-primary md:left-auto ${
                  index % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
                }`} />
                
                <div className="rounded-xl bg-secondary p-4">
                  <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  <h4 className="font-heading font-semibold">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
