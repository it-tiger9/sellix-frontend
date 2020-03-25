import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
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


import top1 from 'assets/images/home/top1.svg'
import service1 from 'assets/images/crypto/b_paypal.jpg'
import service2 from 'assets/images/crypto/b_btc.jpg'
import service3 from 'assets/images/crypto/b_ltc.jpg'
import service4 from 'assets/images/crypto/b_skrill.jpg'
import undraw from 'assets/images/home/undraw.svg'
import undraw1 from 'assets/images/home/undraw2.svg'
import sellix_logo from 'assets/images/Sellix_logo.svg'

class Fees extends React.Component {
  
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
      <div className="fees-screen">
        <div className="animated fadeIn">
          <header className="pt-2 pb-2">
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

          <div className="section text-center " style={{paddingTop: 100, paddingBottom: 50}}>
            <Container className="home-container" fluid>
              <h3>Fees</h3>
              <p className="large">
                How much we charge over orders
              </p>
            </Container>
          </div>
          <div className="section text-center bg-white" style={{paddingBottom:50}}>
              <Container className="home-container">
                <Row className="service-row ">
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Paypal</h4>
                                <img className="service-img" src={service1}/>
                            </div>
                            <div className="content">
                                <p className="small text-primary">
                                Sellix does not take any
                                additional fee to process
                                PayPal invoices.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Bitcoin</h4>
                                <img className="service-img" src={service2}/>
                            </div>
                            <div className="content">
                                <p className="small1 text-primary">
                                    Transaction Fees: <b>$0.040</b>
                                </p>
                                <p className="small1 text-primary">Sellix Fees: <img src={service2} width="25" height="25"/>
                                    <b>0.0000060 ($0.03659)</b>
                                </p>
                                <p className="small1 text-primary">
                                if the order is less than $1.83, else 2.00% over the total.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Litecoin</h4>
                                <img className="service-img" src={service3}/>
                            </div>
                            <div className="content">
                                <p className="small1 text-primary">
                                    Transaction Fees: <b>$0.005</b>
                                </p>
                                <p className="small1 text-primary">Sellix Fees: <img src={service3} width="25" height="25"/>
                                    <b>0.0006540 ($0.02942)</b>
                                </p>
                                <p className="small1 text-primary">
                                if the order is less than $1.47, else 2.00% over the total.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Ethereum</h4>
                                <img className="service-img" src={service4}/>
                            </div>
                            <div className="content">
                                <p className="small1 text-primary">
                                    Transaction Fees: <b>0.0000630 ($0.00915)</b>
                                </p>
                                <p className="small1 text-primary">Sellix Fees: <img src={service4} width="25" height="25"/>
                                    <b>2.00% over the total</b>
                                </p>
                                
                            </div>
                        </div>
                    </Col>
                </Row>
              </Container>
          </div>

          <footer>
            <div className="section text-center" style={{paddingBottom: 100, paddingTop: 100}}>
              <Container className="home-container" fluid>
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

export default Fees
