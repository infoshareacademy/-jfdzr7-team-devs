import { Routes, Route } from "react-router-dom";
import { Container } from "../styles/Global.styled";
import { HomePage } from "./HomePage/HomePage";
import { ListRecipes } from "./ListRecipes/ListRecipes";
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
import AddRecipePage from "./Account/AddRecipePage";
import AdminPage from "./Account/AdminPage";
import { useContext } from "react";
import { UserDataContext } from "../../App";

export const Content = ({ isLoggedIn }) => {
  const userData = useContext(UserDataContext);

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
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn && userData?.role === "admin"}
                redirect="/account"
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addRecipe"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect="/login">
                <AddRecipePage />
              </ProtectedRoute>
            }
          />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/ListRecipes" element={<ListRecipes />} />

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
