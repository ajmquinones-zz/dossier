import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { MuiThemeProvider } from '@material-ui/core/styles';

import stores from '@/stores'
import routes from '@/routes'
import theme from '@/theme'

import Layout from './Layout'

const App = () => (
  stores.appState.isCritical ?
    <div style={{
      backgroundColor: "#1d1d1d",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }}>
      <h1 style={{
        color: "#fff"
      }}>
        { stores.appState.critical }
      </h1>
    </div> :
    <Provider stores={stores}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Layout routes={routes} />
        </MuiThemeProvider>
      </Router>
    </Provider>
)

export default App
