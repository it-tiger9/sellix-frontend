import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { createBrowserHistory } from 'history'
import config from 'constants/config'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Input
} from 'reactstrap'
import { Loader } from 'components'
import {
  CommonActions
} from 'services/global'
import shop_brand from 'assets/images/brand/shop_brand.png'

import * as ProductActions from './actions'
import './style.scss'



const CURRENCY_LIST = { 
  'USD': '$',
  'EUR': '€',
  'AUD': '$',
  'GBP': '£',
  'JPY': '¥',
  'CAD': '$',
  'CHF': '₣',
  'CNY': '¥',
  'SEK': 'kr',
  'NZD': '$'
}

const mapStateToProps = (state) => {
  return ({
    user_categories: state.common.user_categories,
    user_products: state.common.user_products
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class ShopProducts extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      search_key: null,
      filter: this.props.match.params.id || 'all'
    }

    this.initializeData = this.initializeData.bind(this)
    this.filterProduct = this.filterProduct.bind(this)
    this.gotoDetail = this.gotoDetail.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.commonActions.getUserCategories(this.props.match.params.username).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    })

    const filter = this.props.match.params.id || 'all'

    if(filter == 'all')
      this.getAllProducts()
    else this.getCategoryProducts()
  }


  getAllProducts() {
    this.setState({loading:true})
    this.props.commonActions.getUserProducts(this.props.match.params.username).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  getCategoryProducts() {
    this.setState({loading: true})
    this.props.commonActions.getUserProductsByCategory(this.props.match.params.id).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  filterProduct(filter) {
    if(filter == 'all')
      this.props.history.push(`/u/${this.props.match.params.username}`)
    else {
      this.props.history.push(`/u/${this.props.match.params.username}/category/${filter}`)
      this.setState({filter: filter, loading: true})
      this.props.commonActions.getUserProductsByCategory(filter).catch(err => {
        this.props.commonActions.tostifyAlert('error', err.error)
      }).finally(() => {
        this.setState({loading: false})
      })
    }
  }

  gotoDetail(e, id) {
    this.props.history.push({
      pathname: `/product/${id}`
    })
  }

  render() {
    const { loading, filter, search } = this.state
    const { user_categories, user_products } = this.props

    return (
      <div className="shop-product-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row>
                <Col md={12} className="filter-button d-flex flex-wrap">
                  <Button color={filter == 'all'?'primary':'white'} className="mr-2" disabled={loading}
                    onClick={() => this.filterProduct('all')}>All</Button>
                  {
                    user_categories.map(category => 
                      <Button key={category.uniqid} color={filter == category.uniqid?'primary':'white'} className="mr-2" disabled={loading}
                        onClick={() => this.filterProduct(category.uniqid)}>{category.title}</Button>)
                  }
                </Col>
                <Col md={12} className="mt-4 mb-2">
                  <div className="d-flex justify-content-start">
                    <div className="searchbar white w-100">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search for a product..." 
                        className="header-search-input"
                        onChange={e => {this.setState({search_key: e.target.value})}}
                      ></Input>
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
                    {
                      user_products.map((pro, index) => 
                        <Col md={3} key={index}>
                          <Card className="bg-white p-0 product-card" onClick={(e) => this.gotoDetail(e, pro.uniqid)}>
                            <img src={config.API_ROOT_URL+'/attachments/image/'+pro.image_attachment} 
                              style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, 
                                      opacity: pro.image_attachment ? 1 : 0}}
                              alt=""
                              width="100%" height="150"/>
                            <div className="p-3">
                              <h5 className="mb-3 text-black">{pro.title}</h5>
                              <div className="d-flex justify-content-between mt-3 mb-2">
                                <span className="price">{`${CURRENCY_LIST[pro.currency]}${pro.price_display}`}</span>
                                <span className="stock">Stock: <span className="stock-size">
                                {pro.type == 'file'?(pro.file_stock == '-1'?<span style={{fontSize: 18}}>∞</span>:pro.file_stock):(pro.stock == '-1'?<span style={{fontSize: 18}}>∞</span>:pro.stock) || 0}
                                </span></span>
                              </div>
                            </div> 
                          </Card>
                        </Col>
                      )
                    }
                    {user_products.length == 0 && <p className="mt-4 mb-4 text-center text-grey w-100">No Products Found</p>}
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
