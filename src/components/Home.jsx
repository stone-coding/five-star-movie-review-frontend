import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";
import { useNavigate } from "react-router";
import NotVerified from "./User/NotVerified";
import TopRatedMovies from "./User/TopRatedMovies";
import TopRatedWebSeries from "./User/TopRatedWebSeries";
import TopRatedTVSeries from "./User/TopRatedTVSeries";
import HeroSlideShow from "./User/HeroSlideShow";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className='px-2 xl:p-0'>
        <NotVerified />
        {/* slider */}
        <HeroSlideShow/>
        {/* Most rated movies */}
        <div className="space-y-3 py-8">
        <TopRatedMovies />
        <TopRatedWebSeries />
        <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
}
