import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import NotFound from "./pages/NotFound/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
