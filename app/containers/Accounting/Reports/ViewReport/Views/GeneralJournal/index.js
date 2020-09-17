import React, { useRef, memo, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../../../Banking/selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import saga from '../../saga';
import './style.css';
import Table from '../../Components/Table';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

const tableData = [
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
];
const TableHeadData = [
  'Account ID',
  'Account Description',
  'Last FYE Bal',
  'Current Bal',
  'Debit Adj',
  'Credit Adj',
  'End Bal',
  'Reference',
];

const GeneralJournal = () => {
  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);

  useInjectReducer({ key: 'reports', viewReportReducer });
  useInjectSaga({ key: 'reports', saga });

  console.log(
    'making stateuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuugggguuuuuuuuuuuuuu',
    viewReportReducer,
  );

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
      />
      <div ref={componentRef}>
        <Company
          Logo={Logo}
          name="General Journal"
          date="16th december, 2010"
        />

        <Table ref={tableRef} data={tableData} TableHeadData={TableHeadData} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalSuccesAction: () =>
    dispatch(Actions.getGeneralJournalSuccesAction(data)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GeneralJournal);
