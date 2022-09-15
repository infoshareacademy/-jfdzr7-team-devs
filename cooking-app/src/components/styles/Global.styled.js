import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --color-gray: #585757;
    --color-little-light-gray: #f2f2f2 ;
    --color-light-gray: #989898;
    --color-orange:  #fab01f;
    --font-family: 'Montserrat', sans-serif;
  }

  body{
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }`

export const Wrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`
