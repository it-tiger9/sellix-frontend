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
  ButtonGroup,
  Input
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'
import { NewWebhookModal } from './sections'

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

class Webhooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      openModal: false
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

  renderStatus (cell, row) {
    if (
      row.status
    ) {
      return (
        <div className={`badge badge-${row.status.toLowerCase()}`}>
          {row.status}
        </div>
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
          <i className="fas fa-trash"/>
        </a>
      </div>
    )
  }

  openNewWebhookModal() {
    this.setState({openModal: true})
  }

  closeNewWebhookModal() {
    this.setState({openModal: false})
  }

  render() {
    const { loading, openModal } = this.state
    const { product_list } = this.props


    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <NewWebhookModal openModal={openModal} closeModal={this.closeNewWebhookModal.bind(this)}/>
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Webhook Endpoints</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <div className="searchbar white">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search..." className="header-search-input"></Input>
                    </div>
                    <Button className="ml-3" color="primary" onClick={this.openNewWebhookModal.bind(this)}>
                      Webhook Endpoints</Button>
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
                            dataField="url"
                            dataSort
                          >
                            Webhook URL
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="events"
                            dataSort
                          >
                            Events
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="status"
                            dataSort
                            dataFormat={this.renderStatus}
                          >
                            Status
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

export default connect(mapStateToProps, mapDispatchToProps)(Webhooks)
