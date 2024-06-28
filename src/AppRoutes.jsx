import React from "react";
import HomePage from "./pages/Home/HomePage";
import { Route, Routes } from "react-router-dom";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/Cart" element={<CartPage />} />
    </Routes>
  );
}
