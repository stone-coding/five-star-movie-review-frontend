import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "../admin/Dashboard";
import Movies from "../admin/Movies";
import Actors from "../admin/Actors";
import NotFound from "../NotFound";
import Narbar from "../admin/Narbar";
import Header from "../admin/Header";
import MovieUpload from "../admin/MovieUpload";
import ActorUpload from "../modals/ActorUpload";
import SearchMovies from "../admin/SearchMovies";

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <Narbar />
        <div className="flex-1 max-w-screen-xl">
          <Header onAddMovieClick={displayMovieUploadModal} 
          onAddActorClick={displayActorUploadModal}/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/search" element={<SearchMovies/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />

    <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
}
