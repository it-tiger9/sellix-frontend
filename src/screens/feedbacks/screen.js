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

class Feedbacks extends React.Component {
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
      <div className="product-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Feedback</h1>
                </Col>
                <Col md={8}>
                  
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
                            dataField="title"
                            dataSort
                            width="20%"
                            dataFormat={this.renderFeedback}
                          >
                            Feedback
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="message"
                            dataSort
                            width = "30%"
                          >
                            Message
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="rating"
                            dataSort
                            dataFormat={this.renderRating}
                          >
                            Rating
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="id"
                            dataSort
                            dataFormat={this.renderOption}
                          >
                            Option
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="time"
                            dataAlign="right"
                            dataSort
                          >
                            Time
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks)
