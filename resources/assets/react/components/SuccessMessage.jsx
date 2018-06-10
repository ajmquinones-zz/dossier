import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import cx from 'classnames'

import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import withStyles from '@material-ui/core/styles/withStyles'
import green from '@material-ui/core/colors/green'
import {
  CheckCircle  as CheckCircleIcon ,
  Close as CloseIcon
} from '@material-ui/icons'

const styles = theme => ({
  snackbar: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 10,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

@inject('stores')
@withStyles(styles)
@observer
class ComponentName extends Component {

  handleCloseSnackbar = () => {
    const { stores: { appState } } = this.props
    appState.clearMessages()
  }

  render() {
    const { 
      stores: {
        appState: {
          isSuccess,
          success
        }
      },
      classes
    } = this.props
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!isSuccess}
        onClose={this.handleCloseSnackbar}
      >
        <SnackbarContent
          className={classes.snackbar}
          aria-describedby="success-snackbar"
          message={
            <span id="success-snackbar" className={classes.message}>
              <CheckCircleIcon className={cx(classes.icon, classes.iconVariant)} />
              {success}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

export default ComponentName
