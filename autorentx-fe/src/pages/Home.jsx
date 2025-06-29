import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonials";


const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection/>
      <Banner/>
      <Testimonial/>
    </>
  );
};

export default Home;
