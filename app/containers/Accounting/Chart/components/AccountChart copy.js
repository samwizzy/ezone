import React, { memo, useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CSVReader } from 'react-papaparse';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Grid,
  Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ImportIcon from '@material-ui/icons/GetApp';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import NewAccountDialog from './NewAccountDialog';
import * as Endpoints from '../../../../components/Endpoints';
import axios from "axios";
import * as saga from '../saga';
import ConfirmDeleteAccountDialog from './ConfirmDeleteAccountDialog';
import { ChartContext } from '..';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const buttonRef = React.createRef()

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AccountChart = props => {
  const classes = useStyles();
  const chartContext = useContext(ChartContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [account, setAccount] = useState('');
  const [allCoa, setAllCoa] = useState([])
  const [loadingChart, setLoadingChart] = useState(true);
  const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
  const [accessToken] = useState(localStorage.getItem('access_token'))
  const [refresh, setRefresh] = useState(true);
  const [accountType, setAccountType] = useState([])



  //Load AccTypes
  useEffect(() => {
    let mounted = true
    async function getAllAccountChartFSev() {

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      };



      await axios
        .get(`${Endpoints.GetAllChartOfAccountApi}/${credentials.organisation.orgId}`,
          config)
        .then((res) => {
          let coaData = res.data;
          console.log(`All chart of account for org ${JSON.stringify(coaData)}`)
          let data = []

          for (let i = 0; i < coaData.length; i++) {
            if (i === 0) {
              data = [{
                accountCode: coaData[i].accountCode,
                accountName: coaData[i].accountName, accountNumber: coaData[i].accountNumber,
                accountType: (coaData[i].accountType === null ? 'Bank' : coaData[i].accountType.accountType),
                accountTypeId: coaData[i].accountType === null ? 14 : coaData[i].accountType.id, bankBalance: coaData[i].bankBalance,
                openingBalance: coaData[i].openingBalance,
                bankName: coaData[i].bankName,
                description: coaData[i].description, id: coaData[i].id
              }]
            }
            else {
              data = [...data, {
                accountCode: coaData[i].accountCode,
                accountName: coaData[i].accountName, accountNumber: coaData[i].accountNumber,
                accountType: (coaData[i].accountType === null ? 'Bank' : coaData[i].accountType.accountType),
                accountTypeId: coaData[i].accountType === null ? 14 : coaData[i].accountType.id, bankBalance: coaData[i].bankBalance,
                openingBalance: coaData[i].accountType === null ? coaData[i].bankBalance : coaData[i].openingBalance,
                bankName: coaData[i].bankName,
                description: coaData[i].description, id: coaData[i].id
              }]
            }
          }
          setAllCoa(data.reverse())
          chartContext.chartDispatch({ type: 'PAYLOAD', payload: data });
          //setIsEmpty(chatData.length > 0 ?false :true);
          //setchartOfAccountData(chatData)
          chartContext.chartDispatch({ type: 'REFRESH', refresh: false })
          setLoadingChart(false);
        })

        .catch((err) => {
          console.log(`error ocurr at ChartofAccount ${err}`);
          setLoadingChart(false);
        })
    }

    if (mounted) {
      getAllAccountTypeFSev();
      getAllAccountChartFSev();
    }
    return () => {
      mounted = false
    };

  }, [chartContext.chartState.refresh]);


  async function getAllAccountTypeFSev() {

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    };

    await axios
      .get(`${Endpoints.GetAllAccountTypeApi}`,
        config)
      .then((res) => {
        let accType = res.data;
        setAccountType(accType);
        setAccountParentType(accType);
      })

      .catch((err) => {
        console.log(`error ocurr at NewAccountDialog ${err}`);
      });

  }

  function onlyNumber(value) {
    let result = 0;
    console.log(`value called ${value} accountType ${JSON.stringify(accountType)}`)
    for (let i = 0; i < accountType.length; i++) {
      if (accountType[i].accountType === value) {
        result = accountType[i].id
      }
    }
    return result;
  }

  async function createChartOfAccountHandler(value) {
    let postData = {
      accountCode: value.accountCode,
      accountName: value.accountName,
      accountNumber: "",
      accountTypeId: onlyNumber(value.accountType),
      bankBalance: 0,
      bankName: "",
      description: value.accountDescription,
      id: credentials.id,
      openingBalance: Number(value.amount),
      orgId: credentials.organisation && credentials.organisation.orgId,
      parentId: null,
      rate: 0,
      status: true,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    }

    console.log(`post data befo4 ${postData}`)

    await axios.post(`${Endpoints.CreateChartOfAccountApi}`, postData, config)
      .then((res) => {
        let chatOfAccResponse = res.data;
        chartContext.chartDispatch({ type: 'REFRESH', refresh: true })
        swal("Success", "Chart of Account created successfully", "success");
      })

      .catch((err) => {
        console.log(`error ocurr in Chart of Account ${err}`);
        swal("Error", "Something went wrong. Please try again", "error");

      });
  }


  const {
    loading,
    history,
    openNewAccountDialogAction,
    openDeleteAccountDialogAction,
    editOpenAccountDialogAction,
    chartOfAccountData,
  } = props;

  const handleClick = (event, id) => {
    console.log("id value --> ", id);
    localStorage.setItem("ezone-editable", `${id}`);
    setAnchorEl(event.currentTarget);
    const selectedAccount = allCoa &&
      allCoa.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };


  function handleOpenDialog(e) {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  function handleOnFileLoad(data) {
    console.log('---------------------------')
    for (let i = 0; i < data.length; i++) {
      try {
        if (data[i].data.accountCode.length > 1 &&
          data[i].data.accountName.length > 1 &&
          data[i].data.accountType.length > 1 &&
          data[i].data.financialStatement.length > 1) {
          createChartOfAccountHandler(data[i].data)
        }
        else {
          swal("Error", "File table does not match format", "error");
          break;
        }
      }
      catch (error) {
        swal("Error", "File table does not match format", "error");
      }
    }
    console.log('---------------------------')
  }

  function handleOnError(err, file, inputElem, reason) {
    console.log(`File upload error${err}`)
  }

  function handleOnRemoveFile(data) {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  function handleRemoveFile(e) {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fileInput = useRef();

  const columns = [
    {
      name: 'accountCode',
      label: 'Account Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountName',
      label: 'Account Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Account Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'openingBalance',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'financialstatement',
      label: 'Financial Statement',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'debitcredit',
      label: 'Debit/Credit',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: '',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => handleClick(event, value)}
            >
              Options
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    // customToolbar: () => (
    //   <Tooltip title="Import and Create">
    //     <CSVReader
    //       ref={buttonRef}
    //       onFileLoad={handleOnFileLoad}
    //       onError={handleOnError}
    //       noClick
    //       noDrag
    //       config={{
    //         header: true,
    //         skipEmptyLines: true
    //       }
    //       }
    //       onRemoveFile={handleOnRemoveFile}
    //     >
    //       {({ file }) => (
    //         <aside
    //           style={{
    //             display: 'flex',
    //             flexDirection: 'row',
    //             marginBottom: 10
    //           }}
    //         >
    //           <Button
    //             type='button'
    //             variant="contained"
    //             color="primary"
    //             size="small"
    //             onClick={handleOpenDialog}
    //             className={classes.button}
    //             startIcon={<ImportIcon />}
    //           >
    //             Import
    //           </Button>
    //         </aside>
    //       )}
    //     </CSVReader>

    //     <Button
    //       variant="contained"
    //       color="primary"
    //       size="small"
    //       className={classes.button}
    //       startIcon={<AddIcon />}
    //       onClick={() => openNewAccountDialogAction()}
    //     >
    //       New Account
    //     </Button>
    //   </Tooltip>
    // ),
    elevation: 0
  };

  return (

    <React.Fragment>
      <NewAccountDialog />
      <ConfirmDeleteAccountDialog />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              title="Account Charts"
              data={allCoa}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => {
          editOpenAccountDialogAction(account);
          localStorage.setItem("ezone-editable", '392');
        }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          history.push({ pathname: '/account/charts/details' })
        }}>
          View Details
        </MenuItem>
        <MenuItem>
          Mark as Active
        </MenuItem>
        <MenuItem onClick={() => {
          openDeleteAccountDialogAction(account);
        }}>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

AccountChart.propTypes = {
  // loading: PropTypes.bool,
  openNewAccountDialogAction: PropTypes.func,
  editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newAccountDialog: Selectors.makeSelectNewAccountDialog(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    openDeleteAccountDialogAction: evt => dispatch(Actions.openDeleteAccountDialog(evt)),
    editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AccountChart);
