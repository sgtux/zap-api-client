import { useDispatch } from 'react-redux'

import { Overlay, RiskSpan } from '../'
import { Container, Title, SubContainer, CloseButton } from './styles'
import { alertDetailChanged } from '../../store/actions'
import { firstLetterToUpper } from '../../utils'

export function AlertDetailModel({ alertDetail }) {

    const dispatch = useDispatch()

    return (
        <Overlay show={!!alertDetail}>
            {
                alertDetail &&
                <Container>
                    <Title>{alertDetail.id} - {alertDetail.name}<CloseButton onClick={() => dispatch(alertDetailChanged())} /></Title>
                    <SubContainer>
                        <div>
                            <label>Id:</label>
                            <span>{alertDetail.id}</span>
                        </div>
                        <div>
                            <label>SourceId:</label>
                            <span>{alertDetail.sourceid}</span>
                        </div>
                        <div>
                            <label>Other:</label>
                            <span>{alertDetail.other}</span>
                        </div>
                        <div>
                            <label>Method:</label>
                            <span>{alertDetail.method}</span>
                        </div>
                        <div>
                            <label>Evidence:</label>
                            <span>{alertDetail.evidence}</span>
                        </div>
                        <div>
                            <label>Plugin Id:</label>
                            <span>{alertDetail.pluginId}</span>
                        </div>
                        <div>
                            <label>Cwe Id:</label>
                            <span>{alertDetail.cweid}</span>
                        </div>
                        <div>
                            <label>Confidence:</label>
                            <span>{alertDetail.confidence}</span>
                        </div>
                        <div>
                            <label>Wasc Id:</label>
                            <span>{alertDetail.wascid}</span>
                        </div>
                        <div>
                            <label>Description:</label>
                            <span>{alertDetail.description}</span>
                        </div>
                        <div>
                            <label>Message Id:</label>
                            <span>{alertDetail.messageId}</span>
                        </div>
                        <div>
                            <label>Url:</label>
                            <span>{alertDetail.url}</span>
                        </div>
                        <div>
                            <label>Reference:</label>
                            <span>{alertDetail.reference}</span>
                        </div>
                        <div>
                            <label>Solution:</label>
                            <span>{alertDetail.solution}</span>
                        </div>
                        <div>
                            <label>Alert:</label>
                            <span>{alertDetail.alert}</span>
                        </div>
                        <div>
                            <label>Param:</label>
                            <span>{alertDetail.param}</span>
                        </div>
                        <div>
                            <label>Attack:</label>
                            <span>{alertDetail.attack}</span>
                        </div>
                        <div>
                            <label>Name:</label>
                            <span>{alertDetail.name}</span>
                        </div>
                        <div>
                            <label>Risk:</label>
                            <RiskSpan risk={alertDetail.risk}>{alertDetail.risk}</RiskSpan>
                        </div>
                        <div>
                            <label>Alert Ref:</label>
                            <span>{alertDetail.alertRef}</span>
                        </div>
                    </SubContainer>
                </Container>
            }
        </Overlay>
    )
}