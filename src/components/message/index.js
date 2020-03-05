import React from 'react'
import { Alert } from 'reactstrap'

import './style.scss'

class Message extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  onDismiss = () => {
    this.setState({
      visible: false
    })
  }

  componentWillMount() {
    
  }

  componentWillReceiveProps(){
    this.setState({visible:true})
  }

  render() {
    
    const {
      type,
      title=null,
      content
    } = this.props

    return (
      <div className="message-component">
        <Alert color={type} isOpen={this.state.visible} toggle={this.onDismiss}>
          {title && <h5 className="alert-heading">{ title }</h5> }
          <p>
            { content }
          </p>
        </Alert>
      </div>
    )
  }
}

export default Message


