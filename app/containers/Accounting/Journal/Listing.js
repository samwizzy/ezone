import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
  Grid,
} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
// import LoadingIndicator from '../../../components/LoadingIndicator';
// import { AddButton } from './AddButton';


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
  // button: {
  //   '&.favorite': { color: orange[300]},
  //   '&.shared': { color: orange[500]},
  // },
  // iconButton: {
  //   '&.favorite': { color: orange[300]},
  //   '&.shared': { color: orange[500]},
  //   '&.delete': { color: theme.status.danger},
  // },
  // icon: {
  //   '&.favorite': { color: orange[300]},
  //   '&.shared': { color: orange[500]},
  //   '&.delete': { color: theme.status.danger},
  // },
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

const JournalListing = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');


  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    console.log("id value -> ", id);

    const selectedAccount = chartOfAccountData && chartOfAccountData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllAccountPeriodAction();
  }, []);

  const {
    accountPeriodData,
    dispatchGetAllAccountPeriodAction
  } = props;

  console.log('accountPeriodData -> ', accountPeriodData);


  const columns = [
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          if (value === '') {
            return '';
          }
          return (
            <div>
              <FormControlLabel
                label={tableMeta.rowIndex + 1}
                control={<Icon />}
              />
            </div>
          );
        },
      },
    },
    {
      name: 'accountNumber',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountName',
      label: 'Reference number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Created by',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: '.',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          if (value === '') {
            return '';
          }
          return (
            <div>
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
                //   editOpenAccountDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem 
                    // onClick={handleClose}
                >
                  View Details
                </MenuItem>
                <MenuItem onClick={() => {
                //   deleteChartOfAccountAction(account);
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
    // customToolbar: () => (
    //   <AddButton 
    //     openNewAccountDialogAction={openNewAccountDialogAction} 
    //   />
    // ),
  };

//   if (loading) {
//     return <LoadingIndicator />;
//   }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <MUIDataTable
              title="Journal"
            //   data={chartOfAccountData}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

JournalListing.propTypes = {
//   loading: PropTypes.bool,
//   openNewAccountDialogAction: PropTypes.func,
//   editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
//   loading: Selectors.makeSelectLoading(),
  accountPeriodData: Selectors.makeSelectGetAllAccountPeriodData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllAccountPeriodAction: () => dispatch(Actions.getAllAccountPeriodAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JournalListing);
