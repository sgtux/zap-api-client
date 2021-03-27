import { combineReducers } from 'redux'

import {
    API_KEY_CHANGED,
    HIDE_LOADER,
    SHOW_LOADER,
    ALERT_DETAIL_CHANGED
} from '../actions'

const ZAP_API_KEY = 'ZAP_API_KEY'
const ZAP_API_URL = 'ZAP_API_URL'

const INITIAL_STATE = {
    apiKey: localStorage.getItem(ZAP_API_KEY) || '',
    apiUrl: localStorage.getItem(ZAP_API_URL) || '',
    loading: false,
    alertDetail: null
}

const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case API_KEY_CHANGED:
            const { apiKey, apiUrl } = action.payload || {}
            localStorage.setItem(ZAP_API_KEY, apiKey || '')
            localStorage.setItem(ZAP_API_URL, apiUrl || '')
            return { ...state, apiKey, apiUrl }
        case HIDE_LOADER:
            return { ...state, loading: false }
        case SHOW_LOADER:
            return { ...state, loading: true }
        case ALERT_DETAIL_CHANGED:
            console.log(action.payload)
            return { ...state, alertDetail: action.payload }
        default:
            return state
    }
}

export const reducers = combineReducers({
    appState: appReducer
})