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
import { Loader } from 'components'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';

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

class Product extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      product_list: []
    }

    this.initializeData = this.initializeData.bind(this)
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentDidMount () {
    this.initializeData()
  }

  async initializeData () {
    // this.props.productActions.getProductList().then(res => {
    //   if (res.status === 200) {
    //     this.setState({ loading: false })
    //   }
    // })
    await this.props.productActions.getProductList()

    this.setState({
      product_list: this.props.product_list,
      loading: false
    })
  }

  handleRLDDChange(reorderedItems) {
    this.setState({ product_list: reorderedItems });
  }

  render() {
    const { loading, product_list } = this.state

    return (
      <div className="productsort-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Sort Products</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <Button className="ml-3" color="primary">
                      Update Product Order</Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
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
                        <RLDD
                          cssClasses="product-list"
                          items={product_list}
                          itemRenderer={(product) => (
                            <div className="item">
                              <p className="body mb-0"><i className="fa fa-bars mr-3"></i>{product.info}</p>
                            </div>
                          )}
                          onChange={this.handleRLDDChange}
                        />
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
