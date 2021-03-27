import styled from 'styled-components'

export const ToolbarContainer = styled.div`
    background-color: #242526;
    height: 60px;
    box-shadow: 0px 0px 2px white;
    display: flex;
`

export const Logo = styled.img`
    margin-left: 10px;
    margin-top: 10px;
    height: 40px;
    width: 40px;
`

export const ToolbarMain = styled.div`
    flex: 4;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`

export const ToolbarTab = styled.a`
    display: flex;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    width: 100px;
    color: ${props => props.selected ? '#2d88ff' : 'white'};
    border-bottom: ${props => props.selected ? 'solid 3px #2d88ff' : 'none'} ;
    transition: 200ms;
    text-decoration: none;
    &:hover {
        background-color: #3a3b3c;
        cursor: pointer;
    }
`

export const ToolbarRight = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
    > div {
        display: flex;
        margin-top: 12px;
        margin-right: 10px;
        justify-content: space-between;
        width: 40px;
    }
`

export const ToolbarButton = styled.button`
    border-radius: 50%;
    background-color: #3a3b3c;
    width: 35px;
    height: 35px;
    border: none;
    color: white;
    transition: 200ms;
    &:hover {
        background-color: #535252;
        cursor: pointer;
    }
`

export const ToolbarUserPhoto = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
`