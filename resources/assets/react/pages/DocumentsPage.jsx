import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import DocumentListFilters from '@/components/DocumentListFilters'
import DocumentList from '@/components/DocumentList'

@inject('stores')
@observer
class DocumentsPage extends Component {
  render() {
    const { stores: { documentStore } } = this.props
    return (
      <div>
        <DocumentListFilters />
        <DocumentList documents={documentStore.documents} />
      </div>
    )
  }
}

export default DocumentsPage
