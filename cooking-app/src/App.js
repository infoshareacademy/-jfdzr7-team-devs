import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, Wrapper } from "./utils/styles/Global.styled";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./api/firebase";
import { createContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Loader } from "./utils/Loader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NavBar } from "./components/Header/NavBar"

export const UserDataContext = createContext({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  uid: "",
  favourites: [],
  avatarUrl: "",

  avatarUrlId: "", // potrzebne

});

export const theme = createTheme({
  palette: {
    primary: {
      light: "#fff263",
      main: "#f9c02d",
      dark: "#c29000",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffffff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#757575",
    },
    neutral: {
      main: "#000000",
    },
  },
});

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        getDoc(doc(db, "users", user.uid)).then((querySnaphot) => {
          const tempData = querySnaphot.data();
          setUserData({
            firstName: tempData.firstName,
            lastName: tempData.lastName,
            email: tempData.email,
            role: tempData.role,
            uid: tempData.uid,
            avatarUrl: tempData.avatarUrl,
            favourites: tempData.favourites,
            avatarUrlId: tempData.avatarUrlId,
          });
        });
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <UserDataContext.Provider value={userData}>
          <Wrapper>
            <NavBar isLoggedIn={isLoggedIn}/>
            {isLoggedIn === null ? (
              <Loader />
            ) : (
              <Content isLoggedIn={isLoggedIn} />
            )}
            <Footer />
          </Wrapper>
        </UserDataContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
