import { Container, Title } from './styles'

export function SceneContainer({ title, children }) {
    return (
        <Container>
            <Title>{title}</Title>
            {children}
        </Container>
    )
}