import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Col,
  Container,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

import './style.scss'

import logo from 'assets/images/home/logo.png'
import top1 from 'assets/images/home/top1.svg'
import service1 from 'assets/images/home/service1.svg'
import service2 from 'assets/images/home/service2.svg'
import service3 from 'assets/images/home/service3.svg'
import undraw from 'assets/images/home/undraw.svg'
import undraw1 from 'assets/images/home/undraw2.svg'

class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const { isOpen } = this.state

    return (
      <div className="home-screen">
        <div className="animated fadeIn">
          <header>
            <div className="section white" style={{paddingBottom: 100}}>
              <Container className="home-container p-0" fluid>
                <Navbar className="mb-5 pt-4 p-0" color="white" light expand="lg">
                  <NavbarBrand href="/">
                    <img className="logo" src={logo}/>
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle.bind(this)} />
                  <Collapse className="mr-5" isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem className="active">
                        <NavLink href="/">Home</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/">About Us</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/">Features</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/">Get Started</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/"></NavLink>
                      </NavItem>
                      <NavItem className="d-xl-none">
                        <NavLink href="/">Sign In</NavLink>
                      </NavItem>
                      <NavItem className="d-xl-none">
                        <NavLink href="/">Sign Up</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                  <div className="d-lg-down-none">
                    <Button className="mr-3" color="secondary" >Sign In</Button>
                    <Button  color="primary">Sign Up</Button>
                  </div>
                </Navbar>

                <Row className="flex-row align-items-center">
                  <Col md={6} className="mb-5">
                    <h1>Sell Digital Goods Online</h1>
                    <p className="large">
                      E-commerce is easy with Selly. Create your own customizable online store today.
                    </p>
                    <Button color="primary">Get Started for Free</Button>
                  </Col>
                  <Col md={6}>
                    <img src={top1}/>
                  </Col>
                </Row>
              </Container>
            </div>
          </header>
          
          <div className="section pt-5 pb-5 text-center">
            <Container className="home-container" fluid>
              <h3>E-commerce, Your Way!</h3>
              <p className="large">
                Put the ability to create a full customizable online storefront right at your fingertips
              </p>
              <Row className="service-row">
                <Col md={4}>
                  <img className="service-img" src={service1}/>
                  <h4 className="mt-4">Customizable Storefront</h4>
                  <p className="small">
                    Other platforms stifle brand creativity – we
                    encourage I Our team takes care of the
                    infrastructure of your stor but what you do
                    with it is entirely up to you.
                  </p>
                </Col>
                <Col md={4}>
                  <img className="service-img" src={service2}/>
                  <h4 className="mt-4">Payment Flexibility</h4>
                  <p className="small">
                    Looking for a specific type of payment
                    option? No problem. Our platform integrates
                    with a variety of payment gateways,
                    including cryptocurrencies.
                  </p>
                </Col>
                <Col md={4}>
                  <img className="service-img" src={service3}/>
                  <h4 className="mt-4">All-in-One Platform</h4>
                  <p className="small">
                    Think flexibility has to come with a cost?
                    Think again. In addition to flexibility,
                    we offer leading order fulfillment
                    options and management.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="section white pt-5 pb-5" style={{paddingBottom: 100}}>
            <Container className="home-container p-0" fluid>
              <Row className="flex-row align-items-center">
                <Col md={6} className="mb-3">
                  <div style={{width: '75%'}}>
                    <h1>Built for this
                      generation, and
                      the next</h1>
                    <p className="small">
                      With Selly, you get access to cryptocurrency
                        support, cutting edge e-commerce tools, and our
                        forward-thinking, proactive support team.
                    </p>
                  </div>
                  
                </Col>
                <Col md={6} className="text-right">
                  <img className="undraw-img" src={undraw}/>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="section white pt-5 pb-5" style={{paddingBottom: 100}}>
            <Container className="home-container p-0" fluid>
              <Row className="flex-row align-items-center">
                <Col md={7} className="mb-5">
                  <img className="pc-img" src={undraw1}/>
                </Col>
                <Col md={5}>
                  <div className="float-right" style={{maxWidth: 447}}>
                    <h1>Your business is 
                      unique. You need 
                      a platform that 
                      understands that.</h1>
                    <p className="small">
                      Fed up with the one size fits all cookie cutter approach to e-commerce? 
                      We were too. 
                      That’s why Selly puts the power back in the hands of digital entrepreneurs like you, 
                      with tools like our Shop Theme customizer with full HTML (Liquid) and CSS support
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="section purple text-center" style={{paddingBottom: 100, paddingTop: 100}}>
            <h1>Ready to start selling?</h1>
            <p className="small">Create an account and get started</p>
            <Button color="secondary">Get Started for Free</Button>
          </div>

          <footer>
            <div className="section text-center" style={{paddingBottom: 100, paddingTop: 100}}>
              <Container className="home-container p-0" fluid>
                <div className="d-flex justify-content-between text-left flex-wrap">
                  <div className="mb-3">
                    <img className="logo mb-3" src={logo}/>
                    <p className="mt-2">Copyright © 2020, Selly LLC</p>
                  </div>
                  <div className="mb-3" style={{maxWidth: 295}}>
                    <h5 className="mb-3">About Us</h5>
                    <p className="mt-4">Accept payments, sell digital products
                      from your own store and more, all through
                      one simple yet extensive platform</p>
                  </div>
                  <div className="mb-3">
                    <h5 className="mb-3">Name</h5>
                    <Nav vertical>
                      <NavItem>
                        <NavLink href="#">Dashboard</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Register</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Terms</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Privacy Policy</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Cookie Policy</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Refund Policy</NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <div className="mb-3">
                    <h5 className="mb-3">Products</h5>
                    <Nav vertical>
                      <NavItem>
                        <NavLink href="#">E-commerce</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Payments</NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <div className="mb-3">
                    <h5 className="mb-3">Help</h5>
                    <Nav vertical>
                      <NavItem>
                        <NavLink href="#">Help Center</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Contact Us</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Twitter</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">States</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Report Abuse</NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
              </Container>
            </div>
          
          </footer>
        </div>
      </div>
    )
  }
}

export default Home
