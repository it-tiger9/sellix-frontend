import React from 'react'

class DataTable extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    const {
      data
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

export default DataTable


