import styled from 'styled-components'

export const StartScanContainer = styled.div`
    margin-left: 20px;
    & > select {
        margin-right: 10px;
    }
`

export const BlinkText = styled.span`
    animation: blink-text-animate 1s linear infinite;
    color: #a22;
    font-weight: bold;
`