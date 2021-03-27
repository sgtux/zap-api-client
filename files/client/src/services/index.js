import axios from 'axios'

const DEFAULT_CONFIG_URL = '/default'
const PROXY_URL = '/proxy'

let _apiUrl = ''
let _apiKey = ''

export const zapApiService = {
    getDefaultData: () => axios.get(DEFAULT_CONFIG_URL),
    setApiData: (apiUrl, apiKey) => {
        _apiKey = apiKey
        _apiUrl = apiUrl
    },
    init: (apiUrl = '', apiKey) => {
        _apiKey = apiKey
        _apiUrl = apiUrl
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/context/view/technologyList?apikey=${_apiKey}`
        })
    },
    getAllContexts: () => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/context/view/contextList?apikey=${_apiKey}`
        })
    },
    getContextDetails: contextName => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/context/view/context?apikey=${_apiKey}&contextName=${contextName}`
        })
    },
    getScans: () => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/ascan/view/scans?apikey=${_apiKey}`
        })
    },
    getUsers: contextId => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/users/view/usersList?apikey=${_apiKey}&contextId=${contextId}`
        })
    },
    startScan: (contextId, userId, policyName) => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/ascan/action/scanAsUser?apikey=${_apiKey}&contextId=${contextId}&userId=${userId}&recurse=true&scanPolicyName=${policyName}`
        })
    },
    statusScan: scanId => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/ascan/view/status?apikey=${_apiKey}&scanId=${scanId}`
        })
    },
    loadScripts: () => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/script/view/listScripts?apikey=${_apiKey}`
        })
    },
    changeScriptEnabled: script => {
        const action = script.enabled === 'true' ? 'disable' : 'enable'
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/script/action/${action}?apikey=${_apiKey}&scriptName=${script.name}`
        })
    },
    listScanPolicies: () => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/ascan/view/scanPolicyNames?apikey=${_apiKey}`
        })
    },
    getScanPolicyDetails: policyName => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/ascan/view/policies?apikey=${_apiKey}&scanPolicyName=${policyName}`
        })
    },
    listAlerts: baseUrl => {
        return axios.post(PROXY_URL, {
            url: `${_apiUrl}/alert/view/alerts?apikey=${_apiKey}&baseurl=${baseUrl}&start=&count=&riskId=`
        })
    }
}