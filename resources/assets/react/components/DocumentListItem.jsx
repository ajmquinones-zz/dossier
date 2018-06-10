import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import withStyles from '@material-ui/core/styles/withStyles'
import FileDownloadIcon from '@material-ui/icons/FileDownload'
import DeleteIcon from '@material-ui/icons/Delete'

import Document from '@/stores/models/Document'
import styles from '@jss/table'

@inject('stores')
@withStyles(styles)
@observer
export default class DocumentListItem extends Component {

  handleDelete = uid => {
    const { stores: { documentStore } } = this.props
    if (confirm('Delete this document?')) {
      documentStore.remove(uid)
    }
  }

  handleDownload = url => {
    window.location = url
  }

  render() {
    const { classes, index, document, stores: { appState } } = this.props
    return (
      <TableRow>
        <TableCell className={classes.tableCell}>
          {index}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {document.title}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {document.type}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {document.size}
        </TableCell>
        <TableCell>
          <IconButton 
            styles={{ margin: 10 }} 
            aria-label="Download"
            onClick={() => this.handleDownload(document.url)}
            disabled={appState.isLoading}
          >
            <FileDownloadIcon />
          </IconButton>
          <IconButton 
            styles={{ margin: 10 }} 
            aria-label="Delete" 
            onClick={() => {
              this.handleDelete(document.uid)
            }}
            disabled={appState.isLoading}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}
