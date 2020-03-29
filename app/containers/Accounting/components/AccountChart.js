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
} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
// import LoadingIndicator from '../../../../components/LoadingIndicator';
import { AddButton } from './AddButton';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5, 5, 20),
    marginBottom: theme.spacing(4),
  },
  image: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    left: '150px',
    top: '180px',
    border: '1px solid #C4C4C4',
    borderRadius: '155px',
    padding: '25px',
  },
  edit: {
    position: 'absolute',
    height: '100px',
    left: '1280px',
    top: '180px',
    color: '#1A88E1',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '16px',
    // border: '2px solid #1A88E1',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      height: '100px',
      left: '265px',
      top: '150px',
      color: '#1A88E1',
    },
  },
  orgContainer: {
    padding: theme.spacing(0, 5, 0, 5),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  editButton: {
    width: '117px',
    height: '40px',
    background: '#1A88E1',
    borderRadius: '10px',
    align: 'right',
  },
  listFormat: {
    marginBottom: '10px',
    marginTop: '10px',
  },
}));

const AccountChart = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');


  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    console.log(id, "id value")
    const selectedAccount = chartOfAccountData && chartOfAccountData.find(acc => id === acc.id);
    setAccount(selectedAccount)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    openNewAccountDialogAction,
    editOpenAccountDialogAction,
    accountTypeData,
    chartOfAccountData,
  } = props;

  console.log('chartOfAccountData --> ', chartOfAccountData);
  console.log('accountTypeData --> ', accountTypeData);


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
            <FormControlLabel
              label={tableMeta.rowIndex + 1}
              control={<Icon />}
            />
          );
        },
      },
    },
    {
      name: 'accountNumber',
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
      name: 'description',
      label: 'Account Description',
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
    // {
    //   name: 'status',
    //   label: 'Status',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: value => {
    //       const Post = getAllPosts.find(post => value === post.id);

    //       if (value === '') {
    //         return '';
    //       }
    //       return (
    //         <FormControlLabel
    //           label="Edit"
    //           control={<Icon>create</Icon>}
    //           onClick={evt => {
    //             evt.stopPropagation();
    //             openEditPostDialog(Post);
    //           }}
    //         />
    //       );
    //     },
    //   },
    // },
    {
      name: 'id',
      label: '',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const AllCharts = chartOfAccountData && chartOfAccountData.find(post => value === post.id);
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
                  editOpenAccountDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  View Details
                </MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
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
      <AddButton 
        openNewAccountDialogAction={openNewAccountDialogAction} 
      />
    ),
  };

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   dispatchGetAllAccountTypeAction();
  // }, []);

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <React.Fragment>
      <MUIDataTable
        title="Charts Of Accounts"
        data={chartOfAccountData}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

AccountChart.propTypes = {
  loading: PropTypes.bool,
  openNewAccountDialogAction: PropTypes.func,
  editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  accountTypeData: Selectors.makeSelectAccountTypeData(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountChart);
