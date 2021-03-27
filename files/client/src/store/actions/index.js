export const API_KEY_CHANGED = 'API_KEY_CHANGED'
export const SHOW_LOADER = 'SHOW_POST_MODAL'
export const HIDE_LOADER = 'HIDE_MODAL'
export const ALERT_DETAIL_CHANGED = 'ALERT_DETAIL_CHANGED'

export const hideLoader = () => ({ type: HIDE_LOADER })

export const showLoader = () => ({ type: SHOW_LOADER })

export const apiKeyChanged = apiKey => ({ type: API_KEY_CHANGED, payload: apiKey })

export const alertDetailChanged = alertDetail => ({ type: ALERT_DETAIL_CHANGED, payload: alertDetail })