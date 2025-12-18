import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import CinematicHero from "@/components/home/CinematicHero";
import ChannelGrid from "@/components/home/ChannelGrid";
import StatsCounter from "@/components/home/StatsCounter";
import SubscribeCTA from "@/components/home/SubscribeCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>RajHub - Three Channels, One Creator | CodeDecode, GameChanger, Horror Night</title>
        <meta name="description" content="Explore coding tutorials, gaming content, and horror stories from Raj. Subscribe to 3 unique YouTube channels and join 746K+ subscribers." />
      </Helmet>
      
      <Layout>
        <CinematicHero />
        <ChannelGrid />
        <StatsCounter />
        <SubscribeCTA />
      </Layout>
    </>
  );
};

export default Index;
