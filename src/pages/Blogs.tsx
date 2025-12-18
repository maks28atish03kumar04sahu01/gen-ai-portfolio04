import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Code, Gamepad2, Ghost, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const blogPosts = [
  {
    id: "react-server-components-guide",
    title: "The Complete Guide to React Server Components",
    excerpt: "Dive deep into React Server Components and learn how they change the way we build modern web applications.",
    category: "CodeDecode",
    tags: ["React", "TypeScript", "Web Dev"],
    readTime: "12 min read",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    featured: true,
  },
  {
    id: "gaming-setup-2024",
    title: "Ultimate Gaming Setup Guide for 2024",
    excerpt: "Build the perfect gaming battlestation with our comprehensive guide covering everything from monitors to peripherals.",
    category: "GameChanger",
    tags: ["Gaming", "Setup", "Hardware"],
    readTime: "8 min read",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&h=450&fit=crop",
    featured: true,
  },
  {
    id: "writing-horror-stories",
    title: "The Art of Writing Spine-Chilling Horror Stories",
    excerpt: "Learn the techniques behind crafting horror narratives that keep your audience on the edge of their seats.",
    category: "Horror Night",
    tags: ["Writing", "Horror", "Storytelling"],
    readTime: "10 min read",
    date: "Dec 2, 2024",
    image: "https://images.unsplash.com/photo-1512805121331-92b37f7ecd36?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    excerpt: "Master TypeScript with these essential best practices that will make your code more robust and maintainable.",
    category: "CodeDecode",
    tags: ["TypeScript", "Best Practices"],
    readTime: "15 min read",
    date: "Nov 28, 2024",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    featured: false,
  },
  {
    id: "boss-battle-strategies",
    title: "Mastering Boss Battles: Pro Strategies",
    excerpt: "From Dark Souls to Elden Ring, learn the universal strategies that will help you defeat any boss.",
    category: "GameChanger",
    tags: ["Gaming", "Strategy", "Tips"],
    readTime: "7 min read",
    date: "Nov 25, 2024",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    featured: false,
  },
  {
    id: "urban-legends-explored",
    title: "10 Urban Legends That Turned Out to Be True",
    excerpt: "Sometimes the scariest stories are the ones that actually happened. Explore these terrifying true tales.",
    category: "Horror Night",
    tags: ["Horror", "True Stories"],
    readTime: "14 min read",
    date: "Nov 20, 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop",
    featured: false,
  },
];

const categories = [
  { name: "All", icon: null },
  { name: "CodeDecode", icon: Code },
  { name: "GameChanger", icon: Gamepad2 },
  { name: "Horror Night", icon: Ghost },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "CodeDecode":
      return { bg: "bg-codedecode-primary/20", text: "text-codedecode-accent" };
    case "GameChanger":
      return { bg: "bg-gamechanger-primary/20", text: "text-gamechanger-accent" };
    case "Horror Night":
      return { bg: "bg-horror-primary/20", text: "text-horror-accent" };
    default:
      return { bg: "bg-primary/20", text: "text-primary" };
  }
};

const BlogCard = ({ post, index, featured = false }: { post: typeof blogPosts[0]; index: number; featured?: boolean }) => {
  const colors = getCategoryColor(post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group ${featured ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      <Link to={`/blogs/${post.id}`}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
              {post.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>

            <h3 className="mb-2 font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Read Article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

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
              Blog & Articles
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold md:text-5xl">
              Insights &{" "}
              <span className="bg-gradient-to-r from-codedecode-accent via-gamechanger-accent to-horror-accent bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Tutorials, guides, reviews, and behind-the-scenes content from all three channels.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-6 font-heading text-xl font-bold">Featured</h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuredPosts.map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              {regularPosts.length > 0 && (
                <div>
                  <h2 className="mb-6 font-heading text-xl font-bold">All Articles</h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {regularPosts.map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
