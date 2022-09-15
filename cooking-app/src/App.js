import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, Wrapper } from "./components/styles/Global.styled";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { AddRecipe } from "./components/Content/AddRecipes/AddRecipe";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, usersCollection } from "./api/firebase";
import { createContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Loader } from "./utils/Loader";

export const UserDataContext = createContext("ulabula");

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
        getDoc(doc(db, "users", user.uid)).then((querySnaphot) => {
          const tempData = querySnaphot.data();
          setUserData({
            firstName: tempData.firstName,
            lastName: tempData.lastName,
            email: tempData.email,
            role: tempData.role,
            uid: tempData.uid,
          });
        });
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserDataContext.Provider value={userData}>
        <Wrapper>
          <Header isLoggedIn={isLoggedIn} />
          {isLoggedIn === null ? <Loader /> : <Content isLoggedIn={isLoggedIn} />}
          <Footer />
        </Wrapper>
      </UserDataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
