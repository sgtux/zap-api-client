import React, { useState, useEffect } from 'react'
import { useSelector, Provider } from 'react-redux'

import { ApiKey } from './scenes'
import Store from './store'
import { AppRouter } from './components'
import { zapApiService } from './services'

function App() {

  const [logged, setLogged] = useState(false)

  const { apiKey, apiUrl } = useSelector(state => state.appState)

  useEffect(() => {
    if (apiKey && apiUrl)
      zapApiService.setApiData(apiUrl, apiKey)
    setLogged(!!(apiKey && apiUrl))
  }, [apiKey, apiUrl])

  return (
    <Provider store={Store}>
      {logged ? <AppRouter /> : <ApiKey />}
    </Provider>
  )
}

export default App