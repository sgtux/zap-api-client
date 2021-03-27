import { useSelector } from 'react-redux'
import { SceneContainer } from '../../components'

export function Home() {

    const { apiKey, apiUrl } = useSelector(state => state.appState)

    return (
        <SceneContainer title="ZAP Client">
            <span>Api Key:</span>{apiKey}<br />
            <span>Api Url:</span>{apiUrl}<br />
        </SceneContainer>
    )
}