import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { apiKeyChanged } from '../../store/actions'
import { Footer } from '../../components'
import { Container, FormContainer, Title, GoButton, ErrorMessage } from './styles'
import { zapApiService } from '../../services'

export function ApiKey() {

    const [apiUrl, setApiUrl] = useState('')
    const [apiKey, setApiKey] = useState('')
    const [error, setError] = useState('')

    useEffect(() => zapApiService.getDefaultData()
        .then(res => {
            const { zapApiUrl, zapApiKey } = res.data
            setApiUrl(zapApiUrl)
            setApiKey(zapApiKey)
        }), [])

    useEffect(() => setError(''), [apiKey, apiUrl])

    const dispatcher = useDispatch()

    function sendApiKey() {
        const url = `${apiUrl.endsWith('/') ? apiUrl : apiUrl + '/'}JSON`
        zapApiService.init(url, apiKey)
            .then(res => dispatcher(apiKeyChanged({ apiUrl: url, apiKey })))
            .catch(err => {
                console.log(err)
                setError('Invalid url or api key')
            })
    }

    return (
        <Container>
            <Title>ZAP Client</Title>
            <FormContainer>
                <input type="text"
                    placeholder="Host Ex.: http://localhost/"
                    value={apiUrl}
                    onChange={e => setApiUrl(e.target.value)} />
                <br />
                <br />
                <input type="text"
                    placeholder="ZAP Api Key"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)} /><br />
                <br />
                <GoButton disabled={!apiKey || !apiUrl} onClick={() => sendApiKey()} type="button">GO!</GoButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </FormContainer>
            <Footer />
        </Container>
    )
}