import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle, Wrapper } from './components/styles/Global.styled';
import { Header } from './components/Header/Header';
import { Content } from './components/Content/Content';
import { Footer } from './components/Footer/Footer';



function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Content />
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

