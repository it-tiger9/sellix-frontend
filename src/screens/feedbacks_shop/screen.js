import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import StarRatings from 'react-star-ratings';
import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'

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

class ShopFeedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

    this.initializeData = this.initializeData.bind(this)
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

  renderFeedback (cell, row) {
    return (
      <div className="d-flex flex-row align-items-center">
        { row.feedback?<i className="fa fa-thumbs-up fa-lg mr-3" style={{color: '#2BB224'}}></i>:
          <i className="fa fa-thumbs-down fa-lg mr-3" style={{color: '#B22424'}}></i>
        }
        <div>
          <p>{row.title}</p>
          <p className="text-primary">{row.id}</p>
        </div>
      </div>
    )  
  }

  renderOption (cell, row) {
    return (
      <Button color="default">Reply</Button>
    )
  }

  renderRating (cell, row) {
    return(
      <StarRatings
          rating={2}
          starRatedColor={row.feedback?'#2BB224':'#B22424'}
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          name='rating'
        />
    )
  }


  render() {
    const { loading } = this.state
    const { product_list } = this.props

    return (
      <div className="feedback-shop-screen">
        <div className="animated fadeIn">
        {
            loading ?
              <Row>
                <Col lg={12}>
                  <Loader />
                </Col>
              </Row>
            :
              <Row className="pt-3">
                {
                  product_list.map(pro => 
                    <Col lg={3}>
                      <Card className="">
                        <CardBody className="p-3 bg-white d-flex flex-column align-items-center justify-content-between">
                          <StarRatings
                            rating={pro.rating}
                            starRatedColor={pro.feedback?'#2BB224':'#B22424'}
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="2px"
                            name='rating'
                          />
                          <p>{pro.message}</p>
                          <div className="d-flex flex-row justify-content-between w-100">
                            <p><i className="fas fa-check feedback-checked"></i> Verified Purchase</p>
                            <p>{pro.time}</p>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>)
                }
              </Row>
            }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFeedback)
