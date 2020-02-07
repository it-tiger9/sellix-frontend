import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Row,
  Input,
  ButtonGroup,
  Col,
  Form, 
  FormGroup,
  Label,
  Table
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'

import moment from 'moment'
import Select from 'react-select'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './style.scss'

import { Formik } from 'formik';
import * as Yup from "yup";

import * as TransactionActions from './actions'

const mapStateToProps = (state) => {
  return ({
    transaction_list: state.transaction.transaction_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    transactionActions: bindActionCreators(TransactionActions, dispatch)
  })
}

class Currency extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      openCurrencyModal: false,
      loading: false,
      currencies: [
        {name: 'AED- UAE Dirham', symbol: 'AED'},
        {name: 'AUD- Australian Dollar', symbol: '$'},
      ]
    }

    this.closeCurrencyModal = this.closeCurrencyModal.bind(this)
    this.showCurrencyModal = this.showCurrencyModal.bind(this)
    this.goToDetail = this.goToDetail.bind(this)

    this.options = {
      onRowClick: this.goToDetail,
      paginationPosition: 'top'
    }

    this.selectRowProp = {
      mode: 'checkbox',
      bgColor: 'rgba(0,0,0, 0.05)',
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll
    }
  }

  componentDidMount() {
  }

  // Show Invite User Modal
  showCurrencyModal() {
    this.setState({ openCurrencyModal: true })
  }
  // Cloase Confirm Modal
  closeCurrencyModal() {
    this.setState({ openCurrencyModal: false })
  }

  goToDetail(row) {
    this.showCurrencyModal()
  }

  render() {
    const { loading, currencies, openCurrencyModal } = this.state;
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="transaction-category-screen">
        <div className="animated fadeIn">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            style={containerStyle}
          />

          <Card>
            <CardHeader>
              <div className="h4 mb-0 d-flex align-items-center">
                <i className="nav-icon fas fa-money" />
                <span className="ml-2">Currencies</span>
              </div>
            </CardHeader>
            <CardBody>
            {
              loading ?
                <Loader></Loader>: 
                <Row>
                  <Col lg="12">
                    <div className="mb-3 d-flex justify-content-end">
                      <ButtonGroup className="toolbar" size="sm">
                        <Button
                          color="success"
                          className="btn-square"
                        >
                          <i className="fa glyphicon glyphicon-export fa-download mr-1" />
                          Export to CSV
                        </Button>
                        <Button
                          color="primary"
                          className="btn-square"
                          onClick={this.showCurrencyModal}
                        >
                          <i className="fas fa-plus mr-1" />
                          New Currency
                        </Button>
                        <Button
                          color="warning"
                          className="btn-square"
                        >
                          <i className="fa glyphicon glyphicon-trash fa-trash mr-1" />
                          Bulk Delete
                        </Button>
                      </ButtonGroup>
                    </div>
          
                    <BootstrapTable 
                      data={currencies} 
                      hover
                      pagination
                      version="4"
                      search={false}
                      selectRow={ this.selectRowProp }
                      options={this.options}
                      trClassName="cursor-pointer"
                    >
                      <TableHeaderColumn
                        isKey
                        dataField="name"
                        dataSort
                      >
                        Currency Name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="symbol"
                        dataSort
                      >
                        Symbol
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </Col>
                </Row>
            }
            </CardBody>
          </Card>

          <Modal isOpen={openCurrencyModal}
            className={"modal-success " + this.props.className}
          >
            <Formik
              initialValues={this.state.initCurrencyValue}
              onSubmit={(values, {resetForm}) => {
                this.projectHandleSubmit(values)
                resetForm(this.state.initCurrencyValue)

                this.setState({
                  selectedContactCurrency: null,
                  selectedCurrency: null,
                  selectedInvoiceLanguage: null
                })
              }}
              validationSchema={Yup.object().shape({
                projectName: Yup.string()
                  .required("Project Name is Required"),
                contact: Yup.string()
                  .required("Contact is Required"),
                currency: Yup.string()
                  .required("Currency is Required"),
                invoiceLanguageCode: Yup.string()
                  .required("Invoice Language is Required")
              })}>
                {props => (
                  <Form name="simpleForm">
                    <ModalHeader toggle={this.toggleDanger}>Create & Update Currency</ModalHeader>
                    <ModalBody>
                      
                        <FormGroup>
                          <Label htmlFor="categoryCode">Currency Code</Label>
                          <Select
                            className="select-min-width"
                            options={[]}
                            placeholder="User Role"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="categoryName"><span className="text-danger">*</span>Currency Name</Label>
                          <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            placeholder="Enter Name"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="categoryCode"><span className="text-danger">*</span>Symbol</Label>
                          <Input
                            type="text"
                            id="categoryCode"
                            name="categoryCode"
                            placeholder="Enter Symbol"
                            required
                          />
                        </FormGroup>
                      
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" className="btn-square">Save</Button>&nbsp;
                      <Button color="secondary" className="btn-square" onClick={this.closeCurrencyModal}>Cancel</Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
