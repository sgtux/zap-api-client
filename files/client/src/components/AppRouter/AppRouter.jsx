import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, HashRouter } from 'react-router-dom'

import {
  Context,
  Home,
  Scans,
  Scripts,
  ScanPolicy,
  Alerts
} from '../../scenes'
import { Toolbar, Footer, Sidebar, Loader, AlertDetailModel } from '../'
import { MainContainer } from './styles'

export const Routes = {
  HOME: '/',
  CONTEXTS: '/contexts',
  SCANS: '/scans',
  ALERTS: '/alerts',
  SCRIPTS: '/scripts',
  SCAN_POLICY: '/scan-policy'
}

export function AppRouter() {

  const { loading, alertDetail } = useSelector(state => state.appState)

  return (
    <HashRouter>
      <Toolbar />
      <MainContainer>
        <Sidebar />
        <Switch>
          <Route path={Routes.HOME} exact={true} component={Home} />
          <Route path={Routes.CONTEXTS} component={Context} />
          <Route path={Routes.SCANS} component={Scans} />
          <Route path={Routes.SCRIPTS} component={Scripts} />
          <Route path={Routes.SCAN_POLICY} component={ScanPolicy} />
          <Route path={Routes.ALERTS} component={Alerts} />
        </Switch>
      </MainContainer>
      <Footer />
      <Loader loading={loading} />
      <AlertDetailModel alertDetail={alertDetail} />
    </HashRouter>
  )
}