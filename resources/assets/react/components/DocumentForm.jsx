import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  InsertDriveFile as InsertDriveFileIcon,
  TouchApp as DropzoneIcon
} from '@material-ui/icons'
import Dropzone from 'react-dropzone'

const formStyles = theme => ({
  dropzoneContainer: {
    display: 'flex',
    justify: 'center'
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
    margin: 20,
    width: '100%',
    borderWidth: 3,
    borderColor: 'rgb(0, 0, 0, 0.15)',
    borderStyle: 'dashed',
    opacity: 0.9,
    transition: '0.3s ease all',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      opacity: 1,
    }
  },
  dropzoneItem: {
    marginTop: 10
  }
})

@inject('stores')
@withStyles(formStyles)
@withRouter
@observer
export default class DocumentForm extends Component {
  
  state = {
    title: '',
    file: null
  }

  handleDrop = (accepted, rejected) => {
    const { stores: { appState } } = this.props
    if (rejected.length) {
      appState.setError('Not a valid document type/size')
      return
    }
    
    if (accepted.length) {
      this.setState({
        file: accepted[0]
      })
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpload = () => {
    const { history, stores: { appState, documentStore } } = this.props
    documentStore.add(this.state.title, this.state.file, () => history.push('/'))
  }

  render() {
    const { classes, theme, stores: { appState } } = this.props
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          disabled={appState.isLoading}
          inputProps={{
            id: 'title',
            name: 'title'
          }}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Document title"
          helperText="Enter a good title for this document"
          fullWidth
          margin="dense"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <div className={classes.dropzoneContainer}>
          {
            this.state.file ?
              <div className={cx(classes.dropzone, classes.dropzoneAccept)}>
                <InsertDriveFileIcon color="secondary" className={classes.dropzoneItem} style={{ opacity: 0.75, fontSize: 64 }} />
                <Typography className={classes.dropzoneItem} variant="title">
                  {`${this.state.file.name} (${this.state.file.size} bytes)`}
                </Typography>
                <Button className={classes.dropzoneItem} variant="outlined" size="small" color="secondary">
                  Select a different file
                </Button>
              </div> :
              <Dropzone
                disabled={appState.isLoading}
                multiple={false}
                accept=".pdf,.doc,.rtf"
                maxSize={1000000}
                className={classes.dropzone} 
                activeClassName={classes.dropzoneActive} 
                acceptClassName={classes.dropzoneAccept} 
                rejectClassName={classes.dropzoneReject} 
                onDrop={this.handleDrop} 
              >
                <DropzoneIcon color="primary" className={classes.dropzoneItem} style={{ opacity: 0.75, fontSize: 64 }} />
                <Typography className={classes.dropzoneItem} variant="title">Drop your document here or click to upload</Typography>
                <Typography className={classes.dropzoneItem} variant="subheading">
                  <em style={{opacity: 0.5}}>
                    Only .pdf, .doc &amp; .rtf files &lt; 1MB
                  </em>
                </Typography>
              </Dropzone>
          }
        </div>

        <div>
          <Button disabled={appState.isLoading} onClick={this.handleUpload} size="large" color="primary" variant="raised" disabled={!this.state.title || !this.state.file}>
            Upload
          </Button>
        </div>
      </form>
    )
  }
}