import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "../styles/Global.styled";
import { HomePage } from "./HomePage/HomePage";
import { ListRecipes } from "./ListRecipes/ListRecipes";
import { RecipeBreakfast } from "./ListRecipes/RecipeBreakfast";
import { RecipeLunch } from "./ListRecipes/RecipeLunch";
import { RecipeDinner } from "./ListRecipes/RecipeDinner";
import { RecipeDessert } from "./ListRecipes/RecipeDessert";
import { Login } from "./Authorization/Login";
import { Tips } from "./Tips/Tips";
import { Ebook } from "./Ebook/Ebook";
import { Search } from "./Search/Search";
import { SingleRecipe } from "./SingleRecipe/SingleRecipe";
import Account from "./Account/Account";
import Register from "./Authorization/Register";
import ForgotPassword from "./Authorization/ForgotPassword";
import Redirect from "./Authorization/Redirect";
import ProtectedRoute from "./Authorization/ProtectedRoute";
import { StyledContent, StyledH2 } from "./Content.styled";

export const Content = ({ isLoggedIn }) => {
  return (
    <StyledContent>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <Redirect isLoggedIn={isLoggedIn} redirect="/account">
                <Login />
              </Redirect>
            }
          />
          <Route
            path="/register"
            element={
              <Redirect isLoggedIn={isLoggedIn} redirect="/account">
                <Register />
              </Redirect>
            }
          />
          <Route
            path="/forgot"
            element={
              <Redirect isLoggedIn={isLoggedIn} redirect="/account">
                <ForgotPassword />
              </Redirect>
            }
          />
          <Route path="/tips" element={<Tips />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect="/login">
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/ListRecipes" element={<ListRecipes />} />
          <Route path="/ListRecipes/breakfast" element={<RecipeBreakfast />} />
          <Route path="/ListRecipes/lunch" element={<RecipeLunch />} />
          <Route path="/ListRecipes/dinner" element={<RecipeDinner />} />
          <Route path="/ListRecipes/dessert" element={<RecipeDessert />} />

          <Route
            path="*"
            element={<StyledH2>Ups, Website does not exist</StyledH2>}
          />
        </Routes>
      </Container>
    </StyledContent>
  );
};

//do wydzielenia do osobnego komponentu pozniej
