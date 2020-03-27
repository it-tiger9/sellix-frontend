import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


import pageNotFound from 'assets/images/page-not-found.jpg'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

class NotFound extends Component {
  
  render() {

    return (
      <React.Fragment>
        <div className="bg-white d-flex align-items-center justify-content-center w-100" style={{height: '100vh'}}>
          <img src={pageNotFound} style={{width: '100%', maxWidth: 350}}/>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound
