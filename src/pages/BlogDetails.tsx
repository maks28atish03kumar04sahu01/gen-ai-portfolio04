import { useParams, Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Code, Gamepad2, Ghost, Tag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const blogPostsData: { [key: string]: {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  image: string;
  content: string;
}} = {
  "react-server-components-guide": {
    title: "The Complete Guide to React Server Components",
    excerpt: "Dive deep into React Server Components and learn how they change the way we build modern web applications.",
    category: "CodeDecode",
    tags: ["React", "TypeScript", "Web Dev", "Server Components"],
    readTime: "12 min read",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    content: `
## Introduction

React Server Components (RSC) represent a paradigm shift in how we think about building React applications. By enabling components to run exclusively on the server, RSC opens up new possibilities for performance optimization and data fetching.

## What Are Server Components?

Server Components are a new type of React component that runs only on the server. Unlike traditional React components that execute in the browser, Server Components:

- **Never ship to the client** - Their code stays on the server
- **Can directly access backend resources** - Databases, file systems, internal APIs
- **Have zero impact on bundle size** - Dependencies stay server-side
- **Enable streaming** - Content renders progressively

\`\`\`typescript
// This is a Server Component
async function BlogPost({ id }: { id: string }) {
  const post = await db.posts.findUnique({ where: { id } });
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

## Benefits of Server Components

### 1. Improved Performance

Server Components eliminate the need to send component code to the client, reducing JavaScript bundle sizes significantly.

### 2. Direct Backend Access

You can query databases, read files, or call internal APIs directly in your components without building separate API routes.

### 3. Better SEO

Content rendered by Server Components is immediately available in the HTML, improving search engine indexing.

## When to Use Server Components

- Data fetching
- Accessing backend resources
- Large dependency usage
- Sensitive operations

## Conclusion

React Server Components are transforming how we build web applications. By understanding when and how to use them, you can create faster, more efficient React applications.
    `,
  },
  "gaming-setup-2024": {
    title: "Ultimate Gaming Setup Guide for 2024",
    excerpt: "Build the perfect gaming battlestation with our comprehensive guide covering everything from monitors to peripherals.",
    category: "GameChanger",
    tags: ["Gaming", "Setup", "Hardware", "Reviews"],
    readTime: "8 min read",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&h=600&fit=crop",
    content: `
## Building Your Dream Setup

Creating the ultimate gaming setup is about more than just having the best hardware—it's about creating an environment where you can perform at your best while enjoying every moment.

## Essential Components

### Monitor Selection

For competitive gaming, consider:
- **Response Time**: 1ms or lower
- **Refresh Rate**: 144Hz minimum, 240Hz for competitive
- **Resolution**: 1440p offers the best balance

### Keyboard & Mouse

Your input devices are crucial:
- Mechanical keyboards with linear switches for gaming
- Lightweight mice with good sensors
- Large mousepad for low sensitivity players

## Cable Management

Nothing ruins a setup like messy cables:
- Use cable trays under your desk
- Velcro straps for bundling
- Color-matched cables for aesthetics

## Lighting

RGB isn't just about looks:
- Bias lighting reduces eye strain
- Sync your lights with games
- Use warm white for streaming

## Conclusion

Your gaming setup should reflect your personality while providing the performance you need. Start with the essentials and upgrade over time.
    `,
  },
  "writing-horror-stories": {
    title: "The Art of Writing Spine-Chilling Horror Stories",
    excerpt: "Learn the techniques behind crafting horror narratives that keep your audience on the edge of their seats.",
    category: "Horror Night",
    tags: ["Writing", "Horror", "Storytelling", "Creative"],
    readTime: "10 min read",
    date: "Dec 2, 2024",
    image: "https://images.unsplash.com/photo-1512805121331-92b37f7ecd36?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `
## The Psychology of Fear

Horror works because it taps into our primal fears. Understanding what scares people is the first step to writing effective horror.

## Building Tension

The best horror isn't about jump scares—it's about sustained dread:

### Pacing
- Start slow, build gradually
- Use quiet moments to amplify loud ones
- Never rush the reveal

### Atmosphere
- Engage all senses in your descriptions
- Use weather and environment
- Create isolation

## Common Horror Tropes

While tropes exist for a reason, subverting them creates memorable stories:

- The haunted house
- The monster in the dark
- The unreliable narrator
- Body horror
- Psychological terror

## Writing Exercise

Try this: Write a scene where the horror comes from something completely ordinary. A child's toy. A phone notification. A familiar song playing at the wrong time.

## Conclusion

Horror is about more than monsters and gore. It's about understanding human psychology and using narrative craft to create an emotional experience your audience won't forget.
    `,
  },
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "CodeDecode":
      return Code;
    case "GameChanger":
      return Gamepad2;
    case "Horror Night":
      return Ghost;
    default:
      return Code;
  }
};

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

const relatedPosts = [
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    category: "CodeDecode",
    readTime: "15 min",
  },
  {
    id: "boss-battle-strategies",
    title: "Mastering Boss Battles: Pro Strategies",
    category: "GameChanger",
    readTime: "7 min",
  },
  {
    id: "urban-legends-explored",
    title: "10 Urban Legends That Turned Out to Be True",
    category: "Horror Night",
    readTime: "14 min",
  },
];

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { scrollYProgress } = useScroll();
  
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 font-heading text-4xl font-bold">Article Not Found</h1>
            <p className="mb-8 text-muted-foreground">The article you're looking for doesn't exist.</p>
            <Link to="/blogs" className="text-primary hover:underline">
              Back to Blogs
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const CategoryIcon = getCategoryIcon(post.category);
  const colors = getCategoryColor(post.category);

  return (
    <Layout>
      {/* Reading Progress */}
      <motion.div
        className="reading-progress"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />

      {/* Hero */}
      <section className="relative pt-24">
        <div className="absolute inset-0 h-[60vh]">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="container relative mx-auto px-4 py-20">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blogs"
              className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 ${colors.bg} ${colors.text}`}
            >
              <CategoryIcon className="h-4 w-4" />
              {post.category}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-6 font-heading text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Article content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-a:text-primary prose-code:rounded prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-pre:bg-secondary prose-pre:border prose-pre:border-border"
            >
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  return <ul><li key={index}>{paragraph.replace('- ', '')}</li></ul>;
                }
                if (paragraph.startsWith('```')) {
                  return null;
                }
                if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </motion.article>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-12 border-t border-border pt-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <Share2 className="h-4 w-4" />
                  Share this article
                </span>
                <div className="flex gap-3">
                  {[Twitter, Facebook, Linkedin].map((Icon, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold">Related Articles</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost, index) => {
              const relatedColors = getCategoryColor(relatedPost.category);
              return (
                <Link
                  key={relatedPost.id}
                  to={`/blogs/${relatedPost.id}`}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
                >
                  <span className={`mb-3 inline-block rounded-full px-2 py-0.5 text-xs ${relatedColors.bg} ${relatedColors.text}`}>
                    {relatedPost.category}
                  </span>
                  <h3 className="mb-2 font-medium text-foreground transition-colors group-hover:text-primary">
                    {relatedPost.title}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {relatedPost.readTime}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
