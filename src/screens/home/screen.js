import React, { Suspense } from 'react'
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
import {
  AppHeader
} from '@coreui/react'

import './style.scss'

import {
  Loading
} from 'components'

import top1 from 'assets/images/home/top1.svg'
import service1 from 'assets/images/home/service1.svg'
import service2 from 'assets/images/home/service2.svg'
import service3 from 'assets/images/home/service3.svg'
import undraw from 'assets/images/home/undraw.svg'
import undraw1 from 'assets/images/home/undraw_wallet_aym5.svg'
import sellix_logo from 'assets/images/Sellix_logo.svg'

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
          <header className="pt-2 pb-2 ">
          <Navbar  color="white" light expand="lg">
              <NavbarBrand href="/">
                <img className="logo" src={sellix_logo}/>
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
                    <NavLink href="/login">Sign In</NavLink>
                  </NavItem>
                  <NavItem className="d-xl-none">
                    <NavLink href="/register">Sign Up</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <div className="d-lg-down-none">
                <Link to="/login">
                  <Button className="mr-3" color="secondary" >Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button color="primary">Sign Up</Button>
                </Link>
                
              </div>
            </Navbar>
          </header>
          <div className="section white" style={{paddingTop: 50, paddingBottom: 100}}>
              <Container className="home-container p-0" fluid>
                <Row className="flex-row align-items-center">
                  <Col md={6} className="mb-5">
                    <h1>Sell Digital Goods Online</h1>
                    <p className="large pr-3">
                      E-commerce is easy with Sellix. Create your own online store with a couple of clicks.
                    </p>
                    <Button color="primary">Get Started for Free</Button>
                  </Col>
                  <Col md={6}>
                    <img src={top1} className="digital-img"/>
                  </Col>
                </Row>
              </Container>
            </div>
          <div className="section pt-5 pb-5 text-center">
            <Container className="home-container" fluid>
              <h3>E-commerce, Your Way!</h3>
              <p className="large">
                Put the ability to create a full customizable online storefront right at your fingertips
              </p>
              <Row className="service-row">
                <Col md={4}>
                  <img className="service-img" src={service1}/>
                  <h4 className="mt-4">Customizable Shop</h4>
                  <p className="small">
                  Our platforms offers coupons, blacklist, tickets, 
                  automated delivery, webhooks and many more features 
                  that you can fully customize for your needs.
                  </p>
                </Col>
                <Col md={4}>
                  <img className="service-img" src={service2}/>
                  <h4 className="mt-4">Payment Flexibility</h4>
                  <p className="small">
                  Looking for a specific type of payment option? Don't look further. 
                  We provide PayPal, Stripe, PerfectMoney and every popular cryptocurrencie for your store.
                  </p>
                </Col>
                <Col md={4}>
                  <img className="service-img" src={service3}/>
                  <h4 className="mt-4">All-in-One Platform</h4>
                  <p className="small">
                  With Sellix you got everything in one platform. 
                  Various statistics about your online store and features are making sure you know everything 
                  about your orders and success.
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
                    <h1>Reliable Payment Processing</h1>
                    <p className="small">
                    Sellix uses the newest payment processing technologies to ensure your
                     payment gets processed with the lowest cost of transaction fees at any time.
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
                    <h1>Cheap Payment Fees</h1>
                    <p className="small">
                      We provide very low fees for each transaction. With our unique payment processing method, 
                      we keep transaction fees at the lowest amount. Find out more about our fees.
                    </p>
                    <NavLink className="p-0" href="/fees"><Button color="primary">Our  Fees</Button></NavLink>
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
                    <NavbarBrand className="p-0" href="/">
                      <img src={sellix_logo} style={{width: 88, height: 25}}/>
                    </NavbarBrand>
                    <p className="mt-2">Copyright © 2020, Sellix.io.</p>
                  </div>
                  <div className="mb-3" style={{maxWidth: 295}}>
                    <h5 className="mb-3">About Us</h5>
                    <p className="mt-4">Sellix is an online e-commerce payment processing 
                    website that lets your create your own store with a couple of clicks.</p>
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
                        <NavLink href="/terms">Terms</NavLink>
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
                      <NavItem>
                        <NavLink href="/fees">Fees</NavLink>
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
