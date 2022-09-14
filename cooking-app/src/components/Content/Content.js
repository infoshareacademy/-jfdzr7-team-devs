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

export const Content = ({ isLoggedIn }) => {
  return (
    <StyledContent>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              !isLoggedIn ? <Login /> : <Navigate replace to="/account" />
            }
          />
          <Route
            path="/register"
            element={
              !isLoggedIn ? <Register /> : <Navigate replace to="/account" />
            }
          />
          <Route path="/tips" element={<Tips />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/account"
            element={
              !isLoggedIn ? <Navigate replace to="/login" /> : <Account />
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
            element={
              <h2 style={{ padding: "10px", textAlign: "center" }}>
                Ups, Website is not exists
              </h2>
            }
          />
        </Routes>
      </Container>
    </StyledContent>
  );
};

//do wydzielenia do osobnego komponentu pozniej
export const StyledContent = styled.div`
  display: flex;
  flex: 1;
  background: #fff;
`;
