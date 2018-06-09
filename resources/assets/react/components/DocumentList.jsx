import React from 'react'
import cx from 'classnames'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import withStyles from '@material-ui/core/styles/withStyles'

import styles from '@jss/table'
import DocumentListItem from './DocumentListItem'

const tableHeads = [
  '#',
  'Title',
  'Type',
  'Size',
  'Actions'
]

export default withStyles(styles)(({ classes, documents }) => (
  <div className={classes.tableResponsive}>
    <Table className={classes.table}>
      <TableHead className={classes.tableHeader}>
        <TableRow>
        {tableHeads.map((label, key) => (
          <TableCell
            className={cx(classes.tableCell, classes.tableHeadCell)}
            key={key}
          >
            {label}
          </TableCell>
        ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {documents.map((document, index) => (
          <DocumentListItem key={index} index={index+1} document={document} />
        ))}
      </TableBody>
    </Table>
  </div>
))
