import React from 'react'
import { observer } from 'mobx-react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import withStyles from '@material-ui/core/styles/withStyles'

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
    <TableCell></TableCell>
  </TableRow>
)))
