import React, { Component } from 'react'
import { withRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import withStyles from '@material-ui/core/styles/withStyles'

import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'
import styles from '@jss/layout'

const RouteSwitch = withRouter(({ location, routes }) => (
  <Switch>
    {routes.map((prop, key) =>
      prop.redirect ? 
        <Redirect from={prop.path} to={prop.to} key={key} /> :
          <Route 
            key={key}
            exact 
            path={prop.path}
            replace={prop.path === location.pathname}
            component={prop.component} 
          />
    )}
  </Switch>
))

let RouteLinks = ({ routes, classes, location, stores: { appState } }) => (
  <Tabs
    classes={{
      flexContainer: classes.tabsContainer,
      indicator: classes.tabsIndicator
    }}
    value={
      routes.reduce((prev, curr, index) => 
        curr.path === location.pathname ? index : prev, false)
    }
    textColor="inherit"
  >
    {
      routes.map((route, index) => 
        <Tab
          key={index}
          disabled={appState.isLoading}
          classes={{
            root: classes.tab,
            wrapper: classes.tabWrapper,
            labelIcon: classes.tabLabelIcon,
            label: classes.tabLabel,
            selected: classes.tabSelected
          }}
          icon={<route.icon />}
          label={route.title}
          component={Link}
          to={route.path}
        />
      )
    }
  </Tabs>
)
RouteLinks = observer(RouteLinks)
RouteLinks = withRouter(withStyles(styles)(RouteLinks))
RouteLinks = inject('stores')(RouteLinks)
  
const Layout = ({ classes, routes }) => (
  <Grid container justify="center">
    <Grid item xs={12} sm={6} md={8}>
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          title="Dossier App Demo"
          action={<RouteLinks routes={routes} />}
        />
        <CardContent>
          <RouteSwitch routes={routes} />
        </CardContent>
      </Card>
    </Grid>
    <ErrorMessage />
    <SuccessMessage />
  </Grid>
)

export default withStyles(styles)(Layout)
