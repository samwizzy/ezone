import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
// import LoadingIndicator from '../../../components/LoadingIndicator';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AccountSetting = props => {
  const classes = useStyles();
  const { } = props;

  const smsProviderData = [{ name: 'Nigeria'}];


//   if (loading) {
//     return <LoadingIndicator />;
//   }

  return (
    <React.Fragment>
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}>xs=3</Paper> */}
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <h4>Financial year starts</h4>
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Month"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    {/* <h4>Financial year starts</h4> */}
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Day"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h4>Accounting method</h4>
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Day"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h4>Tax Type</h4>
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Day"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h4>Tax year starts</h4>
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Day"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    {/* <h4>Tax year starts</h4> */}
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Day"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h4>Currency</h4>
                  </TableCell>
                  <TableCell align="center">
                    <Autocomplete
                      id="combo-box-demo"
                      options={smsProviderData}
                      getOptionLabel={option => option.name}
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Day"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    {/* <h4>Currency</h4> */}
                  </TableCell>
                  <TableCell align="center">
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="end"
                        control={<Checkbox color="primary" />}
                        label="Enable Multicurrency"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}>xs=3</Paper> */}
        </Grid>
      </Grid>
    </div>
    </React.Fragment>
  );
};

AccountSetting.propTypes = {
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
)(AccountSetting);
