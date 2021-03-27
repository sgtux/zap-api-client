import styled from 'styled-components'
import { FaWindowClose } from 'react-icons/fa'

export const Container = styled.div`
    min-width: 500px;
    max-width: 1000px;
    height: 500px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #666;
    color: white;
    margin: 0 auto;
`

export const Title = styled.h2`
    margin: 0;
    background-color: white;
    color: #666;
    padding: 10px;
    box-shadow: 0 2px 5px black;
    display: flex;
    justify-content: space-between;
`

export const SubContainer = styled.div`
    padding: 20px;
    overflow-y: auto;
    height: 400px;
    & > div {
        & > label {
            font-weight: bold;
            font-size: 14px;
        }
        & > span {
            margin-left: 10px;
            font-size: 12px;
        }
    }
`

export const CloseButton = styled(FaWindowClose)`
    cursor: pointer;
    opacity: .8;
`