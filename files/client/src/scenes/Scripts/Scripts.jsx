import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { SceneContainer, Table } from '../../components'

import { zapApiService } from '../../services'
import { showLoader, hideLoader } from '../../store/actions'

export function Scripts() {

    const [scripts, setScripts] = useState([])
    const [enabled, setEnabled] = useState(false)
    const [filter, setFilter] = useState('')
    const [filtered, setFiltered] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showLoader())
        zapApiService.loadScripts()
            .then(res => setScripts(res.data.listScripts))
            .catch(err => console.log(err))
            .finally(() => dispatch(hideLoader()))
    }, [])

    function contains(script, text) {
        return script.name.includes(text) || script.description.includes(text) || script.type.includes(text)
    }

    useEffect(() => {
        if (enabled && filter)
            setFiltered(scripts.filter(p => p.enabled && contains(p, filter)))
        else if (filter)
            setFiltered(scripts.filter(p => contains(p, filter)))
        else if (enabled)
            setFiltered(scripts.filter(p => p.enabled))
        else
            setFiltered(scripts)
    }, [filter, enabled, scripts])

    function changeEnabled(script) {
        zapApiService.changeScriptEnabled(script).then(() =>
            zapApiService.loadScripts()
                .then(res => setScripts(res.data.listScripts))
                .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    return (
        <SceneContainer title="Scripts">
            <input style={{ marginLeft: 20, marginRight: 20 }} placeholder="Search" onChange={e => setFilter(e.target.value)} />
            <span style={{ color: 'white', marginRight: 6 }}>Enable</span>
            <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
            <Table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Engine</th>
                        <th>Error</th>
                        <th>Enabled</th>
                        <th>Last Error</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtered.map((p, i) =>
                            <tr key={i}>
                                <td>{p.type}</td>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>{p.engine}</td>
                                <td>{p.error}</td>
                                <td>{p.enabled && <input checked={p.enabled === 'true'} type="checkbox" onChange={() => changeEnabled(p)} />}</td>
                                <td>{p.lastError}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </SceneContainer>
    )
}