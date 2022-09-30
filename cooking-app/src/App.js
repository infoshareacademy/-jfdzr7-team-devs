import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, Wrapper } from "./components/styles/Global.styled";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./api/firebase";
import { createContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Loader } from "./utils/Loader";

export const UserDataContext = createContext({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  uid: "",
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
          {isLoggedIn === null ? (
            <Loader />
          ) : (
            <Content isLoggedIn={isLoggedIn} />
          )}
          <Footer />
        </Wrapper>
      </UserDataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
