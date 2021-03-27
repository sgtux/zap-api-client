import styled from 'styled-components'

export const Table = styled.table`
    margin-left: 20px;
    width: 95%;
    & > tbody > tr > td, & > thead > tr > th {
            text-align: center;
            padding: 8px;
            color: #d0d0d0;
        }
    }
    & > tbody > tr:nth-child(odd) {
        background-color: #555;
    }
`

export const BoxContainer = styled.div`
    background-color: #333;
    color: white;
    margin: 0 20px 0 20px;
    /* border-radius: 10px; */
    box-shadow: 1px 1px 4px black;
`

export const BoxContainerTitle = styled.h3`
    padding: 10px;
    &:hover{
        cursor: pointer;
        opacity: .7;
    }
`

export const BoxContainerContent = styled.div`
    margin: 20px;
    & > div > label {
        font-weight: bold;
        margin-right: 10px;
    }
`

const Button = styled.button`
    border-radius: 6px;
    padding: 10px;
    font-size: 16px;
    box-shadow: 1px ​1px 6px black;
    border: none;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        opacity: .8;
    }
    &:disabled {
        opacity: .7;
        cursor: default;
    }
`

export const SuccessButton = styled(Button)`
    color: white;
    background-color: #28a745;
`

export const InfoButton = styled(Button)`
    color: white;
    background-color: #17a2b8;
`

export const PrimaryButton = styled(Button)`
    color: white;
    background-color: #007bff;
`

export const DangerButton = styled(Button)`
    color: white;
    background-color: #dc3545;
`

export const LightButton = styled(Button)`
    color: #666;
    background-color: #f8f9fa;
`

export const Select = styled.select`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 4px;
`

export const SpaceRow = styled.div`
    padding: 10px;
`

export const Overlay = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    display: ${({ show }) => show ? 'flex' : 'none'};
    transition: 300ms;
`

export const RiskSpan = styled.span`
    font-weight: bold;
    color: ${({ risk }) => risk === 'High' ? '#F00' : risk === 'Medium' ? '#F80' : risk === 'Low' ? '#FF0' : '#00F'} !important;
`