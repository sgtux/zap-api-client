import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { zapApiService } from '../../services'
import {
    SceneContainer,
    Table,
    BoxContainer,
    BoxContainerContent,
    BoxContainerTitle,
    SpaceRow
} from '../../components'

import { showLoader, hideLoader } from '../../store/actions'

export function Context() {

    const [contexts, setContexts] = useState([])
    const [details, setDetails] = useState({})
    const [users, setUsers] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showLoader())
        zapApiService.getAllContexts()
            .then(res => setContexts(res.data.contextList))
            .catch(err => console.log(err))
            .finally(() => dispatch(hideLoader()))
    }, [dispatch])

    function showDetails(contextName) {
        if (details.name === contextName)
            setDetails({})
        else {
            dispatch(showLoader())
            zapApiService.getContextDetails(contextName)
                .then(res => zapApiService.getUsers(res.data.context.id)
                    .then(res2 => {
                        setUsers(res2.data.usersList)
                        setDetails(res.data.context)
                    })
                    .catch(err2 => console.log(err2))
                    .finally(() => dispatch(hideLoader())))
                .catch(err => console.log(err))
                .finally(() => dispatch(hideLoader()))
        }
    }

    return (
        <SceneContainer title="Contexts">
            {contexts.map((p, i) =>
                <BoxContainer key={i + ''}>
                    <BoxContainerTitle onClick={() => showDetails(p)}>{p}</BoxContainerTitle>
                    {details.name === p &&
                        <BoxContainerContent>
                            {
                                Object.keys(details).map((q, j) =>
                                    <div key={j + ''}>
                                        <label>{q}:</label>
                                        <span>{details[q]}</span>
                                    </div>
                                )
                            }
                            <div style={{ marginLeft: 20, marginTop: 20 }}>
                                <span style={{ fontWeight: 'bold' }}>Users:</span>
                                {
                                    <Table border="1">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Enabled</th>
                                                <th>ContextId</th>
                                                <th>Credentials</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((q, j) =>
                                                    <tr key={j + ''}>
                                                        <td>{q.id}</td>
                                                        <td>{q.name}</td>
                                                        <td>{q.enabled}</td>
                                                        <td>{q.contextId}</td>
                                                        <td style={{ wordWrap: 'anywhere' }}>{q.credentials}</td>
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