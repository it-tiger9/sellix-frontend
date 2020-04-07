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
import config from 'constants/config'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'
import { NewReportModal } from './sections'
import {
  CommonActions,
} from 'services/global'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import moment from 'moment'
import * as ReportActions from './actions'
import './style.scss'

JavascriptTimeAgo.locale(en)

const mapStateToProps = (state) => {
  return ({
    report_list: state.report.report_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(ReportActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class Reports extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openModal: false,
      search_key: null
    }

    this.initializeData = this.initializeData.bind(this)
    this.renderPeriod = this.renderPeriod.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.setState({ loading: true })
    this.props.actions.getReports().catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  renderPeriod (cell, row) { 
      const fromDate = moment(new Date(row.from_time*1000/1)).format('MMM DD, YYYY')
      const toDate = moment(new Date(row.to_time*1000/1)).format('MMM DD, YYYY')

      return (
        <div>
          <a>
            {fromDate} - {toDate}</a>
        </div>
      )  
  }
  

  renderRevenue(cell, row) {
    return(<p>${row.revenue}</p>)
  }

  renderCreatedAt(cell, row){
    return (<ReactTimeAgo date={row.created_at*1000/1} locale="en"/>)
  }

  openNewReportModal() {
    this.setState({openModal: true})
  }

  closeNewReportModal() {
    this.setState({openModal: false})
  }


  searchReports(reports) {
    const { search_key } = this.state
    const search_fields = ['from_string', 'to_string', 'products_sold', 'revenue']

    const data = reports.filter(report => {
      for(let i=0; i<search_fields.length; i++)
        if(report[search_fields[i]] && report[search_fields[i]].toLowerCase().includes(search_key.toLowerCase()))
          return true
      return false
    })

    return data
  }

  render() {
    const { loading, openModal, search_key } = this.state
    let  report_list = search_key?this.searchReports(this.props.report_list):this.props.report_list

    report_list.sort((a, b) => {
      return b.date-a.date
    })

    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <NewReportModal openModal={openModal} closeModal={this.closeNewReportModal.bind(this)}/>
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Reports</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <div className="searchbar white">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search..." className="header-search-input" 
                        onChange={(e) => {
                          this.setState({search_key: e.target.value})
                      }}></Input>
                    </div>
                    <Button className="ml-3" color="primary" onClick={this.openNewReportModal.bind(this)}>
                      New Report</Button>
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
                          options={{...tableOptions(), onRowClick: (row) => {
                            window.open(`${config.API_ROOT_URL}/analytics/pdf/${row.secret}/${row.uniqid}`, '_blank')}
                          }}
                          data={report_list}
                          version="4"
                          pagination
                          totalSize={report_list ? report_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="uniqid"
                            dataSort
                            dataFormat={this.uniqid}
                            width="30%"
                          >
                            ID
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="from_time"
                            dataSort
                            dataFormat={this.renderPeriod}
                            width="30%"
                          >
                            Period
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="products_sold"
                            dataAlign="center"
                            width="10%"
                            dataSort
                          >
                            Products Sold
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="revenue"
                            dataAlign="right"
                            width="15%"
                            dataFormat={this.renderRevenue}
                            dataSort
                          >
                            Revenue
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="date"
                            dataFormat={this.renderCreatedAt}
                            dataSort
                            width="20%"
                            dataAlign="right"
                          >
                            Created At
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
