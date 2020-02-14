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

import logo from 'assets/images/home/logo.png'
import avatar from 'assets/images/avatars/6.jpg'
import chevron from 'assets/images/chevron-down-solid.png'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

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

  render() {
    const { children, ...attributes } = this.props

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          className="p-2"
          full={{ src: logo, width: 106, height: 25, alt: 'CoreUI Logo' }}
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
            <i className="fa icon-question nav-icon" style={{fontSize: 22, fontWeight: 'bold'}}></i>
            </DropdownToggle>
            
            <DropdownMenu right>
              <DropdownItem onClick={() => this.props.history.push('/admin/profile')}>
                 Dashboard
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('/admin/settings/general')}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav direction="down" className="d-sm-down-none mr-3">
            <DropdownToggle className="user-name" nav>
              <i className="fas fa-bell nav-icon"></i>
            </DropdownToggle>
            
            <DropdownMenu right>
              <DropdownItem onClick={() => this.props.history.push('/admin/profile')}>
                 Dashboard
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('/admin/settings/general')}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
 
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle className="user-name" nav>
              <div className="d-md-down-none">
                WickedChoco <i className="fas fa-chevron-down"/>
              </div>
              <div className="d-lg-none">
                <img src={avatar} width="35" height="35" className="img-avatar" alt="admin@bootstrapmaster.com" />
              </div>
            </DropdownToggle>

            <DropdownMenu right>
              <DropdownItem onClick={() => this.props.history.push('/admin/profile')}>
                 Dashboard
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('/admin/settings/general')}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className="d-md-down-none">
            <img src={avatar} width="35" height="35" className="img-avatar" alt="admin@bootstrapmaster.com" />
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
