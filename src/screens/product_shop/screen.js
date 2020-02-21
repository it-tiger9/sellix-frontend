import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { createBrowserHistory } from 'history'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Input
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as ProductActions from './actions'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    product_list: state.product.product_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    productActions: bindActionCreators(ProductActions, dispatch)
  })
}

class ShopProducts extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      filter: new URLSearchParams(this.props.location.search).get('filter') || 'all',
      search: new URLSearchParams(this.props.location.search).get('search') || ''
    }

    this.initializeData = this.initializeData.bind(this)
    this.filterProduct = this.filterProduct.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    // this.props.productActions.getProductList().then(res => {
    //   if (res.status === 200) {
    //     this.setState({ loading: false })
    //   }
    // })
    this.props.productActions.getProductList()
    this.setState({ loading: false })
  }

  renderProductInfo (cell, row) {
    if (
      row.info && row.id
    ) {
      return (
        <div>
          <p>{row.info}</p>
          <p className="caption">{row.id}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderProductType (cell, row) {
    if (
      row.type
    ) {
      return (
        <div className="badge badge-normal">
          {row.type}
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderProductRevenue(cell, row) {
    if (
      row.revenue
    ) {
      return (
        <p>
          ${row.revenue}
        </p>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOptions(cell, row) {
    return (
      <div className="d-flex actions">
        <a>
          <i className="fas fa-pen"/>
        </a>
        <a>
          <i className="fas fa-bar-chart"/>
        </a>
        <a>
          <i className="fas fa-trash"/>
        </a>
      </div>
    )
  }

  filterProduct(filter) {
    this.props.history.push({
      pathname: '/shop/products',
      search: `?filter=${filter}&search=${this.state.search}`
    })

    this.setState({
      filter: filter,
    })
  }

  render() {
    const { loading, filter, search } = this.state
    const { product_list } = this.props

    return (
      <div className="shop-product-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row>
                <Col md={12} className="d-flex flex-wrap">
                  <Button color={filter == 'all'?'primary':'white'} className="mr-2" 
                    onClick={() => this.filterProduct('all')}>All</Button>
                  <Button color={filter == 'hack'?'primary':'white'} className="mr-2" 
                    onClick={() => this.filterProduct('hack')}>Hack</Button>
                  <Button color={filter == 'f-skins'?'primary':'white'} className="mr-2" 
                    onClick={() => this.filterProduct('f-skins')}>Fortnite Skins</Button>
                  <Button color={filter == 'f-account'?'primary':'white'} className="mr-2" 
                    onClick={() => this.filterProduct('f-account')}>Fortnite Account</Button>
                  <Button color={filter == 'cs'?'primary':'white'} className="mr-2" 
                    onClick={() => this.filterProduct('cs')}>CS:GO Knife</Button>
                </Col>
                <Col md={12} className="mt-4 mb-2">
                  <div className="d-flex justify-content-start">
                    <div className="searchbar white w-100">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search..." className="header-search-input"></Input>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={ tableOptions() }
                          data={product_list}
                          version="4"
                          hover
                          pagination
                          totalSize={product_list ? product_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="info"
                            dataFormat={this.renderProductInfo}
                            dataSort
                          >
                            Info
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="type"
                            dataFormat={this.renderProductType}
                            dataSort
                          >
                            Type
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="stock"
                            dataSort
                          >
                            Stock
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="revenue"
                            dataAlign="right"
                            dataFormat={this.renderProductRevenue}
                            dataSort
                          >
                            Revenue
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="id"
                            dataAlign="right"
                            dataFormat={this.renderOptions}
                          >
                            Options
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProducts)
