import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
    SceneContainer,
    Table,
    BoxContainer,
    BoxContainerContent,
    BoxContainerTitle,
    SpaceRow
} from '../../components'

import { zapApiService } from '../../services'
import { showLoader, hideLoader } from '../../store/actions'

export function ScanPolicy() {

    const [policyNames, setPolicyNames] = useState([])
    const [policies, setpolicies] = useState([])
    const [selected, setSelected] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showLoader())
        zapApiService.listScanPolicies()
            .then(res => setPolicyNames(res.data.scanPolicyNames))
            .catch(err => console.log(err))
            .finally(() => dispatch(hideLoader()))
    }, [])

    function showDetails(policyName) {
        if (policyName === selected) {
            setSelected('')
            return
        }
        setSelected(policyName)
        dispatch(showLoader())
        zapApiService.getScanPolicyDetails(policyName)
            .then(res => setpolicies(res.data.policies))
            .catch(err => console.log(err))
            .finally(() => dispatch(hideLoader()))
    }

    return (
        <SceneContainer title="Scan Policies">
            {policyNames.map((p, i) =>
                <BoxContainer key={i + ''}>
                    <BoxContainerTitle onClick={() => showDetails(p)}>{p}</BoxContainerTitle>
                    {selected === p &&
                        <BoxContainerContent>
                            <div style={{ marginLeft: 20, marginTop: 20 }}>
                                <span style={{ fontWeight: 'bold' }}>Policies:</span>
                                {
                                    <Table border="1">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Enabled</th>
                                                <th>Alert Threshold</th>
                                                <th>Attack Strength</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                policies.map((q, j) =>
                                                    <tr key={j + ''}>
                                                        <td>{q.id}</td>
                                                        <td>{q.name}</td>
                                                        <td>{q.enabled}</td>
                                                        <td>{q.alertThreshold}</td>
                                                        <td>{q.attackStrength}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                }
                            </div>
                            <SpaceRow />
                        </BoxContainerContent>
                    }
                </BoxContainer>
            )}
        </SceneContainer>
    )
}