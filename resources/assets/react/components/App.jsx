import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { MuiThemeProvider } from '@material-ui/core/styles';

import stores from '@/stores'
import routes from '@/routes'
import theme from '@/theme'

import Layout from './Layout'

const App = () => (
  <Provider stores={stores}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Layout routes={routes} />
      </MuiThemeProvider>
    </Router>
  </Provider>
)

export default App
