import { Routes, Route } from "react-router-dom";
import { Container } from "../../utils/styles/Global.styled";
import { HomePage } from "./HomePage/HomePage";
import { ListRecipes } from "./ListRecipes/ListRecipes";
import { Login } from "./Authorization/Login";
import { UserProfile } from "./Account/UserProfile/UserProfile";
import { Search } from "./Search/Search";
import { SingleRecipe } from "./SingleRecipe/SingleRecipe";
import Register from "./Authorization/Register";
import ForgotPassword from "./Authorization/ForgotPassword";
import Redirect from "./Authorization/Redirect";
import ProtectedRoute from "./Authorization/ProtectedRoute";
import { StyledContent } from "./Content.styled";
import AdminPage from "./Account/AdminPage/AdminPage";
import { useContext } from "react";
import { UserDataContext } from "../../App";
import { UserRecipes } from "./Account/UserProfile/UserRecipes";
import { UserFollowing } from "./Account/UserProfile/UserFollowing";

import { DisplayUserData } from "./Account/UserPanel/DisplayUserData";
import { AddRecipeNew } from "./AddRecipes/AddRecipeNew";
import { ErrorMessage } from "../../utils/Message";

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
          <Route path="/search" element={<Search />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect="/login">
                <DisplayUserData />
              </ProtectedRoute>
            }
          />
          <Route path="/recipe/:id" element={<SingleRecipe />} />

          <Route path="/user/:id" element={<UserProfile />}>
            <Route path="added" element={<UserRecipes />} />
            <Route path="following" element={<UserFollowing />} />
          </Route>

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
                <AddRecipeNew />
              </ProtectedRoute>
            }
          />
          <Route path="/ListRecipes" element={<ListRecipes />}>
            <Route path=":tag" element={<ListRecipes />} />
          </Route>

          <Route
            path="*"
            // element={<StyledH2>Ups, Website does not exist</StyledH2>}
            element={<ErrorMessage />}
          />
        </Routes>
      </Container>
    </StyledContent>
  );
};
