import React from 'react'
import { observer } from 'mobx-react'

import IconButton from '@material-ui/core/IconButton'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import withStyles from '@material-ui/core/styles/withStyles'
import FileDownloadIcon from '@material-ui/icons/FileDownload'
import DeleteIcon from '@material-ui/icons/Delete'

import Document from '@/stores/models/Document'
import styles from '@jss/table'

export default withStyles(styles)(observer(({ classes, index, document }) => (
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
      <IconButton styles={{ margin: 10 }} aria-label="Download">
        <FileDownloadIcon />
      </IconButton>
      <IconButton styles={{ margin: 10 }} aria-label="Delete">
        <DeleteIcon color="error" />
      </IconButton>
    </TableCell>
  </TableRow>
)))
