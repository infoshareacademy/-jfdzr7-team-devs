import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, Wrapper } from "./components/styles/Global.styled";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { AddRecipe } from "./components/Content/AddRecipes/AddRecipe";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("logged in status changed", user);
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Wrapper>
        <Header isLoggedIn={isLoggedIn} />
        <Content isLoggedIn={isLoggedIn} />

        {/* <AddRecipe /> */}

        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
