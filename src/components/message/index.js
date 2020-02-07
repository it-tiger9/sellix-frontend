import React from 'react'
import { Alert } from 'reactstrap'

import './style.scss'

class Message extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {

    const {
      type,
      title,
      content
    } = this.props

    return (
      <div className="message-component">
        <Alert color={type}>
          <h5 className="alert-heading">{ title }</h5>
          <p>
            { content }
          </p>
        </Alert>
      </div>
    )
  }
}

export default Message


