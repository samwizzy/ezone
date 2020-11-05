import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import ReportSaga from '../../saga';
import Table from '../../Components/Table';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import * as Select from '../../../../../App/selectors';
import './style.css';

const StatementOfFinancialPostion = ({ time, user, dispatchCleanUpAction }) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);

  const { organisation } = user;
  const { startDate, endDate } = time;
  // dispatchGetGeneralLedgerTimeAction
  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const handleData = () => {
    // dispatchGetAllGeneralLedgerTypeAction();
    // console.log('=============================================>');
    setDisplay(true);
  };
  const TableHeadData = ['Account', '', '', '', '', 'Total'];
  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;
  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate}
      />
      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={display && `As at ${moment(endDate).format('MMM Do YYYY')}`}
        />
        <div className="financialTable">
          <table ref={tableRef} className="table_id">
            <thead className="myTableHeader">
              <tr className="throw">
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="head1" colspan={'2'}>
                  ASSETS
                </td>
              </tr>
              <tr>
                <td className="head2" colspan={'2'}>
                  NON-CURRENT ASSETS:
                </td>
              </tr>
              <tr>
                <td>Property, Plant and Equipment </td>
                <td />{' '}
              </tr>
              <tr>
                <td>Capital Work in Progress</td>
                <td />{' '}
              </tr>
              <tr className="head2">
                <td>TOTAL NON-CURRENT ASSETS </td>
                <td />{' '}
              </tr>
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr className="head2">
                <td className="head2">CURRENT ASSETS:</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Inventories</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Trade & Other receivables</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Cash and cash equivalent</td>
                <td />{' '}
              </tr>
              <tr>
                <td className="head2">TOTAL CURRENT ASSETS </td>
                <td />{' '}
              </tr>
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2">TOTAL ASSETS</td>
                <td />{' '}
              </tr>{' '}
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2" colspan={'2'}>
                  EQUITY AND LIABILITIES
                </td>
              </tr>
              <tr>
                <td className="head2" colspan={'2'}>
                  CAPITAL AND RESERVES:
                </td>
              </tr>
              <tr>
                <td>Share Capital</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Revaluation Reserves</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Retained earnings</td>
                <td />{' '}
              </tr>
              <tr>
                <td className="head2">TOTAL EQUITY</td> <td />
              </tr>{' '}
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2" colspan={'2'}>
                  NON-CURRENT LIABILITIES:
                </td>
              </tr>
              <tr>
                <td>Long Term Borrowings</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Deposit for Shares</td>
                <td />{' '}
              </tr>
              <tr>
                <td className="head2">TOTAL NON-CURRENT LIABILITIES </td> <td />
              </tr>{' '}
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2" colspan={'2'}>
                  CURRENT LIABILITIES:
                </td>
              </tr>
              <tr>
                <td>Trade and other payables</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Short-term Loan</td>
                <td />{' '}
              </tr>
              <tr>
                <td>Current tax Payable</td>
                <td />{' '}
              </tr>{' '}
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2">TOTAL CURRENT LIABILITIES:</td>
                <td />
              </tr>{' '}
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>TOTAL EQUITY AND LIABILITIES:</td>

                <td />
              </tr>
              <tr />
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectTime(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralJournalAction()),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StatementOfFinancialPostion);
// {display && (
//   <Table
//     ref={tableRef}
//     // data={tableData}
//     // TableHeadData={TableHeadData}
//     // TableFooterData={TableFooterData}
//   />
// )}
