import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Input
} from 'reactstrap'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { Loader } from 'components'
import { confirmAlert } from 'react-confirm-alert'; 
import { tableOptions } from 'constants/tableoptions'
import {
  CommonActions,
} from 'services/global'

import * as ProductActions from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    all_products: state.product.all_products
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(ProductActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}


class Product extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      search_key: null
    }

    this.initializeData = this.initializeData.bind(this)
    this.gotoEditPage = this.gotoEditPage.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.setState({ loading: true })
    this.props.actions.getProductList().catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  gotoEditPage(e, id){
    this.props.history.push({
      pathname: `/sellix/${user}/products/all/edit`,
      search: `?id=${id}`
    })
  }

  deleteProduct(e, id) {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this product?',
      buttons: [
        {
          label: 'Yes, Delete it!',
          onClick: () => {
            this.setState({ loading: true })
            this.props.actions.deleteProduct({
              uniqid: id
            }).then(res => {
              this.props.actions.getProductList()
              this.props.commonActions.tostifyAlert('success', res.message)
            }).catch(err => {
              this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
            }).finally(() => {
              this.setState({ loading: false })
            })
          }
        },
        {
          label: 'No',
          onClick: () => {return true}
        }
      ]
    });
  }

  renderProductInfo (cell, row) {
    if (
      row.title && row.uniqid
    ) {
      return (
        <div>
          <p><a href="#">{row.title}</a></p>
          <p className="caption">{row.uniqid}</p>
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
        <a onClick={(e) => this.gotoEditPage(e, row.uniqid)}>
          <i className="fas fa-pen"/>
        </a>
        <a>
          <i className="fas fa-bar-chart"/>
        </a>
        <a onClick={(e) => this.deleteProduct(e, row.uniqid)}>
          <i className="fas fa-trash"/>
        </a>
      </div>
    )
  }

  searchProducts(products) {
    const { search_key } = this.state
    const search_fields = ['title', 'type', 'stock', 'revenue']

    const data = products.filter(product => {
      for(let i=0; i<search_fields.length; i++)
        if(product[search_fields[i]] && product[search_fields[i]].includes(search_key))
          return true
      return false
    })

    return data
  }

  render() {
    const { loading, search_key } = this.state
    const all_products = search_key?this.searchProducts(this.props.all_products):this.props.all_products

    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Products</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <div className="searchbar white">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search..." 
                        className="header-search-input"
                        onChange={(e) => {
                          this.setState({search_key: e.target.value})
                        }}
                      ></Input>
                    </div>
                    <Button className="ml-3" color="primary" onClick={() => this.props.history.push(`/sellix/${user}/products/all/new`)}>
                      Add Product</Button>
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
                          responsive
                          options={ tableOptions() }
                          data={all_products}
                          version="4"
                          pagination
                          totalSize={all_products ? all_products.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="uniqid"
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

export default connect(mapStateToProps, mapDispatchToProps)(Product)
