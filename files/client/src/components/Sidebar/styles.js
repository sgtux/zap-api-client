import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    width: 200px;
    background-color: #242526;
    margin-top: 2px;
`

export const MenuItem = styled(Link)`
    display: block;
    padding: 10px;
    transition: 200px;
    text-decoration: none;
    text-align: center;
    color: #903acb;
    transition: 200ms;
    border-radius: 0 20px 20px 0;
    background-color: ${({ selected }) => selected ? '#999' : '#242526'};
    &:hover {
        background-color: ${({ selected }) => selected ? '#999' : '#37393a'};
        cursor: pointer;
    }
`