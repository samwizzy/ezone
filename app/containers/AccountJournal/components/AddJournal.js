import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
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
    padding: theme.spacing(5, 5, 5, 20),
    marginBottom: theme.spacing(4),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    textField: {
        margin: theme.spacing(1.5, 0),
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
  table: {
    minWidth: 650,
  },
}));

const AddJournal = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');


  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    // console.log("id value -> ", id);

    // const selectedAccount = chartOfAccountData && chartOfAccountData.find(acc => id === acc.id);
    // setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    // loading,
    // openNewAccountDialogAction,
    // editOpenAccountDialogAction,
    // deleteChartOfAccountAction,
    // accountTypeData,
    // chartOfAccountData,
  } = props;

//   console.log('chartOfAccountData --> ', chartOfAccountData);
//   console.log('accountTypeData --> ', accountTypeData);


  const columns = [
    // {
    //   name: 'Id',
    //   label: 'S/N',
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta) => {
    //       if (value === '') {
    //         return '';
    //       }
    //       return (
    //         <FormControlLabel
    //           label={tableMeta.rowIndex + 1}
    //           control={<Icon />}
    //         />
    //       );
    //     },
    //   },
    // },
    {
      name: 'accountName',
      label: 'Account',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Debit',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
        name: 'accountType',
        label: 'Credit',
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
                <MenuItem onClick={handleClose}>
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
        <h2>New Journal</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            id="standard-accountName"
            label="Transaction"
            type="name"
            variant="outlined"
            className={classes.textField}
            // value={values.accountName}
            // onChange={handleChange('accountName')}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="standard-accountName"
            label="Reference Number"
            type="name"
            variant="outlined"
            className={classes.textField}
            // value={values.accountName}
            // onChange={handleChange('accountName')}
            margin="normal"
            fullWidth
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-description"
            label="Notes"
            variant="outlined"
            className={classes.textField}
            // value={values.description}
            // onChange={handleChange('description')}
            margin="normal"
            fullWidth
            rows={4}
            multiline
            />
        </Grid>
      </Grid>
    </div>

      {/* <MUIDataTable
        title=""
        // data={chartOfAccountData}
        columns={columns}
        options={options}
      /> */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead >
                <TableRow>
                    <TableCell align="center">Account</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Debit</TableCell>
                    <TableCell align="center">Credit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center">
                        <TextField
                            id="standard-accountName"
                            label="Transaction"
                            type="name"
                            variant="outlined"
                            className={classes.textField}
                            // value={values.accountName}
                            // onChange={handleChange('accountName')}
                            margin="normal"
                            fullWidth
                        />
                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            id="standard-accountName"
                            label="Transaction"
                            type="name"
                            variant="outlined"
                            className={classes.textField}
                            // value={values.accountName}
                            // onChange={handleChange('accountName')}
                            margin="normal"
                            fullWidth
                        />
                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            id="standard-accountName"
                            label="Transaction"
                            type="name"
                            variant="outlined"
                            className={classes.textField}
                            // value={values.accountName}
                            // onChange={handleChange('accountName')}
                            margin="normal"
                            fullWidth
                        />
                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            id="standard-accountName"
                            label="Transaction"
                            type="name"
                            variant="outlined"
                            className={classes.textField}
                            // value={values.accountName}
                            // onChange={handleChange('accountName')}
                            margin="normal"
                            fullWidth
                        />
                    </TableCell>
                </TableRow>
                
            </TableBody>
        </Table>
      </TableContainer>


    </React.Fragment>
  );
};

AddJournal.propTypes = {
//   loading: PropTypes.bool,
//   openNewAccountDialogAction: PropTypes.func,
//   editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
//   loading: Selectors.makeSelectLoading(),
//   accountTypeData: Selectors.makeSelectAccountTypeData(),
//   chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    // openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    // editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
    // deleteChartOfAccountAction: evt => dispatch(Actions.deleteChartOfAccountAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddJournal);
