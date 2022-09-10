import styled from 'styled-components'
import { Routes, Route } from "react-router-dom"
import { Container } from '../styles/Global.styled'
import { HomePage } from './HomePage/HomePage'

export const Content = () => {
    return (
        <StyledContent>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />}/>

                    ///dopisujemy swoje podstrony

                    <Route
                    path="*"
                    element={
                    <h2 style={{ padding: '10px' }}>Ups, Strona nie istnieje</h2>}/>
                </Routes>
            </Container>
        </StyledContent>
    )
}


//do wydzielenia do osobnego komponentu pozniej
export const StyledContent = styled.div`
    display: flex;
    flex: 1;
    background: #fff;
    `;