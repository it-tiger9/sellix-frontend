import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  UncontrolledDropdown,
  Input,
  Badge
} from 'reactstrap'
import PropTypes from 'prop-types'

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler
} from '@coreui/react'

import './style.scss'


import sellix_logo from 'assets/images/Sellix_logo.svg'
import avatar from 'assets/images/avatars/6.png'
import chevron from 'assets/images/chevron-down-solid.png'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

const userId = window.localStorage.getItem('userId')

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }

    this.signOut = this.signOut.bind(this)
  }

  signOut () {
    this.props.authActions.logOut()
    this.props.history.push('/login')
  }

  setTheme(){
    this.props.changeTheme()
  }

  render() {
    const { user, children, theme, ...attributes } = this.props

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          className="p-2"
          href="/"
          full={{ src: sellix_logo, width: 106, height: 25, alt: 'CoreUI Logo' }}
        />
        <Nav className="ml-auto" navbar style={{flex:1, justifyContent: 'flex-end'}}>
          <NavItem className="d-md-down-none mr-5" style={{flex: 3}}>
            <div className="searchbar">
              <i className="fas fa-search"/>
              <Input placeholder="Search..." className="header-search-input"></Input>
            </div>
          </NavItem>
          <UncontrolledDropdown nav direction="down" className="d-sm-down-none ml-3 mr-3">
            <DropdownToggle className="user-name" nav>
              <i className="fa icon-question nav-icon" style={{fontSize: 22, fontWeight: 'bold', marginTop: 2}}></i>
            </DropdownToggle>
            
            <DropdownMenu right className="mt-2">
              <DropdownItem onClick={() => this.props.history.push('/admin')}>
                 Help Center
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('/shop')}>
                 Tickets
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('/shop/contact')}>
                 Contact Us
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav direction="down" className="d-sm-down-none mr-3">
            <DropdownToggle className="user-name" nav>
              <i className="fas fa-bell nav-icon"></i>
            </DropdownToggle>
            
            <DropdownMenu right className="mt-2" style={{width: 300}}>
              <DropdownItem>
                <div className="d-flex justify-content-between">
                  <span className="text-primary d-flex">Notification</span>
                  <span className="d-flex text-grey">Mark as Read</span>
                </div>
              </DropdownItem>
              <DropdownItem >
                 <p className="text-grey text-center pt-3">You have no notification.</p>
              </DropdownItem>
              
            </DropdownMenu>
          </UncontrolledDropdown>
 
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle className="user-name" nav>
              <div>
                <i className="fa fa-user-circle text-primary avatar-icon"/>
              </div>
            </DropdownToggle>

            <DropdownMenu right className="mt-2">
              <DropdownItem onClick={() => this.props.history.push(`/${userId}`)}>
                 Dashboard
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push(`/shop/${userId}`)}>
                 Your Shop
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push(`/${userId}/settings`)}>
                 Settings
              </DropdownItem>
              <DropdownItem onClick={this.setTheme.bind(this)}>
                 {(theme || 'light') == 'light'?'Dark Mode':'Light Mode'}
              </DropdownItem>
              <DropdownItem onClick={() => this.signOut()}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          
        </Nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
