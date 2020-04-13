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
import { Loader, Spin } from 'components'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import {
  CommonActions,
} from 'services/global'


import * as CategoryActions from './actions'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    category_list: state.category.category_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(CategoryActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class CategorySort extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      saving: false,
      category_list: []
    }

    this.initializeData = this.initializeData.bind(this)
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentDidMount () {
    this.initializeData()
  }

  async initializeData () {
    this.setState({ loading: true })
    this.props.actions.getCategoryList().then(res => {
      this.setState({category_list: res.data.categories, loading: false})
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
      this.setState({ loading: false })
    })
  }

  handleRLDDChange(reorderedItems) {
    this.setState({ category_list: reorderedItems });
  }


  saveOrder() {
    const order = this.state.category_list.map(category => category.uniqid).join()

    this.setState({saving: true})
    this.props.actions.saveCategoryOrder({
      categories_ids: order
    }).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.setState({ saving: false })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
      this.setState({ saving: false })
    })
  }

  render() {
    let { loading, category_list, saving } = this.state

    category_list = category_list.map((category, key) => {
      return {...category, id: parseInt(category.id)}
    })

    return (
      <div className="categorysort-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Sort Categories</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                  <Button className="ml-3" color="primary" onClick={this.saveOrder.bind(this)} disabled={saving}>
                      {saving?<Spin/>:'Update Category Order'}</Button>
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
                          items={category_list}
                          itemRenderer={(category) => (
                            <div className="item">
                              <p className="body mb-0"><i className="fa fa-bars mr-3"></i>{category.title}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategorySort)
