import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import cx from 'classnames'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { FilterList as FilterIcon } from '@material-ui/icons'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  filterItems: {
    flex: '0 0 auto',
    marginRight: 15
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

@inject('stores')
@withStyles(styles)
@observer
export default class DocumentListFilters extends Component {
  state = {
    title: '',
    type: ''
  }

  constructor() {
    super()
  }

  handleChange = event => {
    const { stores: { documentStore } } = this.props
    documentStore.setFilter(event.target.name, event.target.value)
  }

  render() {
    const { classes, stores: { documentStore } } = this.props
    return (
      <Toolbar classes={{ root: classes.root }}>
        <Typography variant="subheading" className={classes.filterItems}>
          <FilterIcon color="primary" style={{ marginRight: 5 }} />
          Filters
        </Typography>
        <FormControl className={cx(classes.formControl, classes.filterItems)}>
          <InputLabel htmlFor="filter-type">By Type</InputLabel>
          <Select
            value={documentStore.filters.get('type') || ''}
            onChange={this.handleChange}
            inputProps={{
              id: 'filter-type',
              name: 'type'
            }}
          >
            <MenuItem value="">
              <em>-All-</em>
            </MenuItem>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="DOC">DOC</MenuItem>
            <MenuItem value="RTF">RTF</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={cx(classes.formControl, classes.filterItems)}>
          <InputLabel htmlFor="filter-title">By Title</InputLabel>
          <TextField
            id="filter-title"
            name="title"
            margin="normal"
            style={{ marginBottom: 0 }}
            value={documentStore.filters.get('title') || ''}
            onChange={this.handleChange}
          />
        </FormControl>
      </Toolbar>
    )
  }
}
