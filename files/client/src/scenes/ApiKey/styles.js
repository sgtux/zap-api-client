import styled from 'styled-components'

export const ErrorMessage = styled.div`
    color: #9c0606;
    font-size: 18px;
    margin-top: 20px;
`

export const Container = styled.div`
    color: white;
`

export const Title = styled.h1`
    margin-top: 200px;
    text-align: center;
`

export const FormContainer = styled.div`
    box-shadow: 0px 0px 6px black;
    border-radius: 5px;
    width: 300px;
    background-color: #7e7e7e;
    margin: 0 auto;
    margin-top: 40px;
    padding: 20px; 
    text-align: center; 
`

export const GoButton = styled.button`
    margin-left: 8px;
    &:hover {
        cursor: pointer;
        opacity: .8;
    }
    &:disabled {
        cursor: default;
        opacity: .8;
    }
`