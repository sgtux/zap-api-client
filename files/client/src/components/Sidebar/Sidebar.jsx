import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Container, MenuItem } from './styles'
import { Routes } from '../'

export function Sidebar() {

    const [selected, setSelected] = useState('')

    const history = useHistory()
    history.listen(e => setSelected(e.pathname))

    useEffect(() => setSelected(history.location.pathname), [history])

    return (
        <Container>
            <MenuItem selected={selected === Routes.CONTEXTS} to={Routes.CONTEXTS}>Contexts</MenuItem>
            <MenuItem selected={selected === Routes.SCANS} to={Routes.SCANS}>Scans</MenuItem>
            <MenuItem selected={selected === Routes.ALERTS} to={Routes.ALERTS}>Alerts</MenuItem>
            <MenuItem selected={selected === Routes.SCRIPTS} to={Routes.SCRIPTS}>Scripts</MenuItem>
            <MenuItem selected={selected === Routes.SCAN_POLICY} to={Routes.SCAN_POLICY}>Scan Policies</MenuItem>
        </Container>
    )
}