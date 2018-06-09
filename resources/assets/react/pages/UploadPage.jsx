import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  props: PropTypes.any
}

const defaultProps = {
}

class UploadPage extends Component {
  render() {
    return (
      <div>Uploads</div>
    )
  }
}

UploadPage.propTypes = propTypes
UploadPage.defaultProps = defaultProps

export default UploadPage
