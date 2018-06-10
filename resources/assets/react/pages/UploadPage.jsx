import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import DocumentForm from '@/components/DocumentForm'

const styles = theme => ({
  container: {
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center'
  }
})

@withStyles(styles)
export default class UploadPage extends Component {

  constructor() {
    super()
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.container}>
        <Grid item xs={8}>
          <DocumentForm />
        </Grid>
      </Grid>
    )
  }
}
