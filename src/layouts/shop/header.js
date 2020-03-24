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
import sellix_logo from 'assets/images/Sellix_logo.svg'
import avatar from 'assets/images/avatars/6.jpg'
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
        <AppNavbarBrand
          className="p-2"
          href="/"
          full={{ src: sellix_logo, width: 106, height: 25, alt: 'CoreUI Logo' }}
        />
        <Nav className="ml-auto shop-header" navbar style={{flex:1, justifyContent: 'flex-end'}}>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle className="user-name" nav>
              <div>
                <img src={avatar} width="35" height="35" className="img-avatar" alt="admin@bootstrapmaster.com" />
              </div>
            </DropdownToggle>

            <DropdownMenu right className="mt-2">
              <DropdownItem onClick={() => this.props.history.push(`/sellix/${userId}`)}>
                 Dashboard
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('/shop')}>
                 Your Shop
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
