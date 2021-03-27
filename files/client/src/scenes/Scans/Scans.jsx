import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { zapApiService } from '../../services'
import { SceneContainer, Table, SuccessButton, Select, SpaceRow } from '../../components'
import { StartScanContainer, BlinkText } from './styles'
import { hideLoader, showLoader } from '../../store/actions'

const ScanTableRow = ({ scan }) => {
    return (
        <tr>
            <td>{scan.id}</td>
            <td>{scan.reqCount}</td>
            <td>{scan.progress}%</td>
            <td>{scan.alertCount}</td>
            <td>{scan.newAlertCount}</td>
            <td>
                {scan.state === 'RUNNING' ? <BlinkText>{scan.state}</BlinkText> : scan.state}
            </td>
        </tr>
    )
}

let intervalId

export function Scans() {

    const [scans, setScans] = useState([])
    const [contexts, setContexts] = useState([])
    const [details, setDetails] = useState({})
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [policy, setPolicy] = useState('')
    const [policies, setPolicies] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        updateScans(true)
        intervalId = setInterval(() => updateScans(), 5000)
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        zapApiService.getAllContexts()
            .then(res => setContexts(res.data.contextList))
            .catch(err => console.log(err))
        zapApiService.listScanPolicies()
            .then(res => setPolicies(res.data.scanPolicyNames))
            .catch(err => console.log(err))
    }, [details])

    useEffect(() => setPolicy(policies[0] || ''), [policies])

    useEffect(() => setUser(null), [users, details])

    function updateScans(loader) {
        if (loader)
            dispatch(showLoader())
        zapApiService.getScans()
            .then(res => {
                const temp = res.data.scans.filter(p => p.state === 'RUNNING')
                setScans(temp.concat(res.data.scans.filter(p => p.state !== 'RUNNING')))
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(hideLoader()))
    }

    function contextDetails(contextName) {
        if (contextName === 'Select') {
            setUsers([])
            setDetails({})
            return
        }
        setUser(null)
        zapApiService.getContextDetails(contextName)
            .then(res => zapApiService.getUsers(res.data.context.id)
                .then(res2 => {
                    setUsers(res2.data.usersList)
                    setDetails(res.data.context)
                })
                .catch(err2 => console.log(err2)))
            .catch(err => console.log(err))
    }

    function startScan() {
        const userId = users.filter(p => p.name === user)[0].id
        zapApiService.startScan(details.id, userId, policy)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <SceneContainer title="Scans">

            <StartScanContainer>
                <Select onChange={e => contextDetails(e.target.value)}>
                    <option>Select</option>
                    {contexts.map((p, i) => <option key={'' + i}>{p}</option>)}
                </Select>
                <Select value={user || ''} onChange={e => setUser(e.target.value)}>
                    <option>Select</option>
                    {users.map((p, i) => <option key={'' + i}>{p.name}</option>)}
                </Select>
                <Select value={policy || ''} onChange={e => setPolicy(e.target.value)}>
                    <option>Select</option>
                    {policies.map((p, i) => <option key={'' + i}>{p}</option>)}
                </Select>
                <SuccessButton disabled={!user} type="button" onClick={() => startScan()}>Start Scan</SuccessButton>
            </StartScanContainer>

            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Requests</th>
                        <th>Progress</th>
                        <th>Alerts</th>
                        <th>New Alerts</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scans.map((p, i) => <ScanTableRow key={'' + i} scan={p} />)
                    }
                </tbody>
            </Table>
            <SpaceRow />
        </SceneContainer>
    )
}