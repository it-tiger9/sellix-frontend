import React, {Component} from 'react'
import {Pie,  Doughnut} from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody
} from 'reactstrap'
import { DateRangePicker2 } from 'components'
import moment from 'moment'
import './style.scss'

const expenseOption = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend: {
    display: true,
    position: 'right',
    labels: {
    usePointStyle: true,
    padding: 10
    }
  },
  maintainAspectRatio: true
}

const ranges =  {
  'Today': [moment(), moment()],
  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

class RevenueAndExpense extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('0'),
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  componentDidMount() {
    this.props.DashboardActions.getRevenuesGraphData('2019-01-01', '2019-05-01')
    this.props.DashboardActions.getExpensesGraphData('2019-01-01', '2019-05-01')
    
  }

  render() {
    const pie1 = {
      labels: this.props.revenue_graph.labels || [],
      datasets: [
        {
        data: this.props.revenue_graph.data,
        backgroundColor: [
          'rgba(32, 168, 216, 0.7)',
          'rgba(77, 189, 116, 0.7)',
          'rgba(248, 108, 107, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(99, 194, 222, 0.7)',
          'rgba(200, 206, 211, 0.7)',
          'rgba(102, 16, 242, 0.7)',
          'rgba(111, 66, 193, 0.7)',
          'rgba(232, 62, 140, 0.7)',
          'rgba(32, 201, 151, 0.7)'
        ],
        hoverBackgroundColor: [
          'rgba(32, 168, 216, 1)',
          'rgba(77, 189, 116, 1)',
          'rgba(248, 108, 107, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(99, 194, 222, 1)',
          'rgba(200, 206, 211, 1)',
          'rgba(102, 16, 242, 1)',
          'rgba(111, 66, 193, 1)',
          'rgba(232, 62, 140, 1)',
          'rgba(32, 201, 151, 1)'
        ],
        }],
    };

    const pie2 = {
      labels: this.props.expense_graph.labels || [],
      datasets: [
        {
        data: this.props.expense_graph.data,
        backgroundColor: [
          'rgba(32, 168, 216, 0.7)',
          'rgba(77, 189, 116, 0.7)',
          'rgba(248, 108, 107, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(99, 194, 222, 0.7)',
          'rgba(200, 206, 211, 0.7)',
          'rgba(102, 16, 242, 0.7)',
          'rgba(111, 66, 193, 0.7)',
          'rgba(232, 62, 140, 0.7)',
          'rgba(32, 201, 151, 0.7)'
        ],
        hoverBackgroundColor: [
          'rgba(32, 168, 216, 1)',
          'rgba(77, 189, 116, 1)',
          'rgba(248, 108, 107, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(99, 194, 222, 1)',
          'rgba(200, 206, 211, 1)',
          'rgba(102, 16, 242, 1)',
          'rgba(111, 66, 193, 1)',
          'rgba(232, 62, 140, 1)',
          'rgba(32, 201, 151, 1)'
        ],
        }],
    };

    return (
      <div className="animated fadeIn">
        <Card className='expenses-card'>
          <CardBody className="tab-card">
            <div className="flex-wrapper">
              <Nav tabs>
                <NavItem>
                  <NavLink
                  active={this.state.activeTab[0] === '0'}
                  onClick={() => { this.toggle(0, '0'); }}
                  >
                  Top 10 Revenues
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                  >
                  Top 10 Expenses
                  </NavLink>
                </NavItem>
                
              </Nav>
              <div className="card-header-actions">
                <DateRangePicker2 ranges={ranges}/>
              </div>
            </div>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="0">
                <div className="flex-wrapper" style={{paddingLeft: 20}}>
                  <div className="data-info" style={{border: 'none', marginBottom: 12}}>
                  
                  </div>
                  <div className="data-info">
                  <div className="data-item">
                    <div>
                    <h3>$12,640</h3>
                    <p>OUTSTANDING</p>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <Pie data={pie1} options={expenseOption} datasetKeyProvider={() => {return Math.random()}}/>
                </div>
              </TabPane>
              <TabPane tabId="1">
                <div className="flex-wrapper" style={{paddingLeft: 20}}>
                  <div className="data-info" style={{border: 'none', marginBottom: 12}}>
                  <button className="btn-instagram btn-brand mr-1 mb-1 btn btn-secondary btn-sm">
                    <i className="nav-icon icon-speech"></i><span>New Expense</span>
                  </button>
                  </div>
                  <div className="data-info">
                  <div className="data-item">
                    <div>
                    <h3>$12,640</h3>
                    <p>OUTSTANDING</p>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <Doughnut data={pie2} options={expenseOption} datasetKeyProvider={() => {return Math.random()}}/>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="chart-wrapper">
                  <div className="scroll-view">
                    <div className="data-info bills">
                      <div className="data-item">
                      <div className='expense-date'><p className="date">01</p><p className="month">JUN</p></div>
                      <div>
                        <h3 className="bank-type"> Current Account</h3>
                        <p style={{fontWeight: 500}}>Last updated on 01/20/2019</p>
                      </div>
                      
                      </div>
                      <div className="data-item">
                      <div className='price'>$22,945,30</div>
                      </div>
                    </div>
                    <div className="data-info bills">
                      <div className="data-item">
                      <div className='expense-date'><p className="date">28</p><p className="month">JUN</p></div>
                      <div>
                        <h3 className="bank-type"> Current Account</h3>
                        <p style={{fontWeight: 500}}>Last updated on 01/20/2019</p>
                      </div>
                      
                      </div>
                      <div className="data-item">
                      <div className='price'>$22,945,30</div>
                      </div>
                    </div>
                    <div className="data-info bills">
                      <div className="data-item">
                      <div className='expense-date'><p className="date">28</p><p className="month">JUN</p></div>
                      <div>
                        <h3 className="bank-type"> Current Account</h3>
                        <p style={{fontWeight: 500}}>Last updated on 01/20/2019</p>
                      </div>
                      
                      </div>
                      <div className="data-item">
                      <div className='price'>$22,945,30</div>
                      </div>
                    </div>
                    <div className="data-info bills">
                      <div className="data-item">
                      <div className='expense-date'><p className="date">28</p><p className="month">JUN</p></div>
                      <div>
                        <h3 className="bank-type"> Current Account</h3>
                        <p style={{fontWeight: 500}}>Last updated on 01/20/2019</p>
                      </div>
                      
                      </div>
                      <div className="data-item">
                      <div className='price'>$22,945,30</div>
                      </div>
                    </div>
                    <div className="data-info bills">
                      <div className="data-item">
                      <div className='expense-date'><p className="date">28</p><p className="month">JUN</p></div>
                      <div>
                        <h3 className="bank-type"> Current Account</h3>
                        <p style={{fontWeight: 500}}>Last updated on 01/20/2019</p>
                      </div>
                      
                      </div>
                      <div className="data-item">
                      <div className='price'>$22,945,30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default RevenueAndExpense;