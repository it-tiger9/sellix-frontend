import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col
} from 'reactstrap'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { confirmAlert } from 'react-confirm-alert'; 
import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'
import {
  CommonActions,
} from 'services/global'

import * as Actions from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    user: state.auth,
    all_categories: state.category.all_categories
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    actions: bindActionCreators(Actions, dispatch)
  })
}

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.initializeData = this.initializeData.bind(this)
    this.gotoEditPage = this.gotoEditPage.bind(this)
    this.deleteCateogry = this.deleteCateogry.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.setState({ loading: true })
    this.props.actions.getCategoryList().catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  // Open Confirm Modal
  showConfirmModal() {
    this.setState({ openDeleteModal: true })
  }
  // Close Confirm Modal
  closeConfirmModal() {
    this.setState({ openDeleteModal: false })
  }

  gotoEditPage(e, id) {
    this.props.history.push({
      pathname: `/${user}/products/categories/edit/${id}`
    })
  }

  deleteCateogry(e, id) {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this category?',
      buttons: [
        {
          label: 'Yes, Delete it!',
          onClick: () => {
            this.setState({ loading: true })
            this.props.actions.deleteCategory({
              uniqid: id
            }).then(res => {
              this.props.actions.getCategoryList()
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

  renderOptions(cell, row) {
    return (
      <div className="d-flex actions">
        <a onClick={(e) => this.gotoEditPage(e, row.uniqid)}>
          <i className="fas fa-pen"/>
        </a>
        <a onClick={(e) => this.deleteCateogry(e, row.uniqid)}>
          <i className="fas fa-trash"/>
        </a>
      </div>
    )
  }

  render() {
    const { loading } = this.state
    const { all_categories } = this.props

    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Categories</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <Button className="ml-3" color="primary" 
                      onClick={() => this.props.history.push(`/${user}/products/categories/new`)}>Add Category</Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0">
              {
                loading ?
                  <Row>
                    <Col lg={12} className="mt-5">
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={ tableOptions() }
                          data={all_categories}
                          version="4"
                          pagination
                          totalSize={all_categories ? all_categories.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataSort
                          >
                            ID
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="title"
                            dataSort
                          >
                            Title
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="products_count"
                            dataSort
                            
                          >
                            Product Count
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
