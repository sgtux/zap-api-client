import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { zapApiService } from '../../services'
import { SceneContainer, Select, Table, SpaceRow, LightButton, RiskSpan } from '../../components'
import { StartScanContainer } from './styles'
import { alertDetailChanged, showLoader, hideLoader } from '../../store/actions'

export function Alerts() {

    const [alerts, setAlerts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [urls, setUrls] = useState([])
    const [risk, setRisk] = useState('')

    const dispatch = useDispatch()

    useEffect(() => refreshAlerts(''), [])

    useEffect(() => {
        let updated = false
        for (const item of alerts) {
            const url = item.url.substring(0, item.url.replace('/', '.').replace('/', '.').indexOf('/'))
            if (!urls.includes(url)) {
                urls.push(url)
                updated = true
            }
        }
        if (updated)
            setUrls(urls)
    }, [alerts, urls])

    function refreshAlerts(baseUrl) {
        dispatch(showLoader())
        zapApiService.listAlerts(baseUrl === 'Select' ? '' : baseUrl || '')
            .then(res => setAlerts(res.data.alerts))
            .catch(err => console.log(err))
            .finally(() => dispatch(hideLoader()))
    }

    useEffect(() => {
        if (risk && risk !== 'Select') {
            setFiltered(alerts.filter(p => p.risk === risk))
        } else {
            setFiltered(alerts)
        }
    }, [alerts, risk])

    return (
        <SceneContainer title="Alerts">

            <StartScanContainer>
                <Select onChange={e => refreshAlerts(e.target.value)}>
                    <option>Select</option>
                    {urls.map((p, i) => <option key={'' + i}>{p}</option>)}
                </Select>
                <Select onChange={e => setRisk(e.target.value)}>
                    <option>Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </Select>
                <span style={{ color: 'white' }}>TOTAL: {filtered.length}</span>
            </StartScanContainer>

            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Confidence</th>
                        <th>Risk</th>
                        <th>Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtered.map((p, i) =>
                            <tr key={'' + i}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.confidence}</td>
                                <td>
                                    <RiskSpan risk={p.risk}>{p.risk}</RiskSpan>
                                </td>
                                <td>{p.method}</td>
                                <td>
                                    <LightButton onClick={() => dispatch(alertDetailChanged(p))}>SHOW</LightButton>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <SpaceRow />
        </SceneContainer >
    )
}