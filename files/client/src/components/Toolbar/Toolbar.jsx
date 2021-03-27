import React from 'react'
import { useDispatch } from 'react-redux'
import {
    FaSignOutAlt,
    FaBug,
    FaTools
} from 'react-icons/fa'

import { apiKeyChanged } from '../../store/actions'


import {
    ToolbarContainer,
    ToolbarMain,
    ToolbarTab,
    ToolbarRight,
    ToolbarButton,
    Logo
} from './styles'


export function Toolbar() {

    const dispatcher = useDispatch()

    function logout() {
        dispatcher(apiKeyChanged())
    }

    return (
        <ToolbarContainer>
            <div style={{ flex: 1 }}>
                <Logo src="zap.png" />
            </div>
            <ToolbarMain>
                <ToolbarTab>
                    <FaTools size={40} />
                </ToolbarTab>
                <ToolbarTab >
                    <FaBug size={40} />
                </ToolbarTab>
            </ToolbarMain>
            <ToolbarRight>
                <div>
                    <ToolbarButton onClick={() => logout()}>
                        <FaSignOutAlt />
                    </ToolbarButton>
                </div>
            </ToolbarRight>
        </ToolbarContainer>
    )
}