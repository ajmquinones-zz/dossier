import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import cx from 'classnames'

import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  Error as ErrorIcon,
  Close as CloseIcon
} from '@material-ui/icons'

const styles = theme => ({
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
          isError,
          error
        }
      },
      classes
    } = this.props
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!isError}
        onClose={this.handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'error-snackbar',
        }}
        message={
          <span id="error-snackbar" className={classes.message}>
            <ErrorIcon className={cx(classes.icon, classes.iconVariant)} />
            {error}
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
    )
  }
}

export default ComponentName
