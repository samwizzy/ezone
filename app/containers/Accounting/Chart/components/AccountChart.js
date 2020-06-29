import React, { memo, useEffect,useState,useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
import ConfirmDeleteAccountDialog from './ConfirmDeleteAccountDialog';
// import LoadingIndicator from '../../../../components/LoadingIndicator';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [account, setAccount] = useState('');
  const [allCoa,setAllCoa] = useState([])
  const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
  const [accessToken] = useState(localStorage.getItem('access_token'))



  //Load AccTypes
  useEffect(() => {
    async function getAllAccountChartFSev() {
      console.log(`org ${credentials.organisation.orgId}`)
      const config = {
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', }
    };

    await axios
    .get(`${Endpoints.GetAllChartOfAccountApi}/${credentials.organisation.orgId}`,
    config)
    .then((res) => {
      let coaData = res.data;
      let data = []
      for(let i=0;i<coaData.length;i++){
        if(i === 0){
         data = [{accountCode:coaData[i].accountCode,accountName:coaData[i].accountName,accountType:coaData[i].accountType.accountType,amount:coaData[i].openingBalance,description:coaData[i].description,id:coaData[i].id}]
        }
        else
        data = [...data,{accountCode:coaData[i].accountCode,accountName:coaData[i].accountName,accountType:coaData[i].accountType.accountType,amount:coaData[i].openingBalance,description:coaData[i].description,id:coaData[i].id}]
      }
      setAllCoa(data)
      //setIsEmpty(chatData.length > 0 ?false :true);
      //setchartOfAccountData(chatData)
      console.log(`All AccountChart ${JSON.stringify(data)}`)
    })

    .catch((err) => {
      console.log(`error ocurr at ChartofAccount ${err}`);
    });
    


    }

    getAllAccountChartFSev() ;

    return () => {
      getAllAccountChartFSev()
    };

  },[]);

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
    setAnchorEl(event.currentTarget);
    const selectedAccount = chartOfAccountData && 
    chartOfAccountData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  function importCsvFile(e){
    let selecetdFile = e.target.files[0];
    let x = selecetdFile.type + "";
    let fileType = x.substr(x.indexOf("/") + 1) + "";
    let isfile = new RegExp("csv").test(fileType);
    console.log(`format ${isfile} ${fileType} file ${x}`)
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
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Account Description',
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
          if (value === '') {
            return '';
          }
          return (
            <div style={{margin:'5px'}}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, value)}
              >
                Options
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  editOpenAccountDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => {
                  history.push({
                    pathname: '/account/chart/details',
                    chartDetailsData: account,
                  });
                }}>
                  View Details
                </MenuItem>
                <MenuItem onClick={() => {
                  openDeleteAccountDialogAction(account);
                }}>
                  Delete 
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Tooltip title="Import and Create">
        <div style={{margin:'5px'}}>
          <div style={{float:'right'}}>
          <Grid container spacing={2}>
            <Grid item >
          <div style={{marginBottom:'3px'}}>
          <input
            style={{ display: "none" }}
              type="file"
              accept=".csv"
                onChange={importCsvFile}
                ref={fileInput}
                  />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<ImportIcon />}
          onClick={() => fileInput.current.click()}
        >
          Import
        </Button>
        </div>
        </Grid>
        <Grid item >
        <div style={{marginBottom:'3px'}}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => openNewAccountDialogAction()}
        >
          New COA
        </Button>
        </div>
        </Grid>
        </Grid>
        </div>
        </div>
       
      </Tooltip>
    ),
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
    </React.Fragment>
  );
};

AccountChart.propTypes = {
  // loading: PropTypes.bool,
  openNewAccountDialogAction: PropTypes.func,
  editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
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
