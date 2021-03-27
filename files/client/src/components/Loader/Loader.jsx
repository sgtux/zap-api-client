import { LoaderSpin } from './styles'
import { Overlay } from '../'

export function Loader({ loading }) {
    return (
        <Overlay show={loading}>
            <LoaderSpin />
        </Overlay>
    )
}