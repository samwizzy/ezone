import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Button,
  Divider,
  List,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
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
import Logo from '../../../images/logo.svg';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0)
  },
  paper: {
    padding: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  table: {
    '& .MuiTableCell-body': {
      border: 0,
    },
  },
  box: {
    textAlign: "center",
    border: `1px solid ${theme.palette.grey[100]}`
  }
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

        <Grid container justify="center" alignItems="center">
          <Grid item xs={6}>
              <Paper square elevation={0}  className={classes.paper}>
                <Box p={2} my={2} className={classes.box}>
                  <Typography variant="h4" color="textSecondary">
                    Welcome To <img src={Logo} height="40" />  Accounting
                  </Typography>
                </Box>
                <Box p={2} my={2} className={classes.box}>  
                  <Typography variant="h6" color="textSecondary">SetUp Your Accounting Structure</Typography>
                </Box>
              </Paper>
              <Divider />

              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    <TableRow>
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="textSecondary">Financial year starts</Typography>
                      </TableCell>
                      <TableCell align="left">
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
                      <TableCell align="right"></TableCell>
                      <TableCell align="left">
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
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="textSecondary">Accounting method</Typography>
                      </TableCell>
                      <TableCell align="left">
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
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="textSecondary">Tax Type</Typography>
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
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="textSecondary">Tax year starts</Typography>
                      </TableCell>
                      <TableCell align="left">
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
                      <TableCell align="right">
                      </TableCell>
                      <TableCell align="left">
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
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="textSecondary">Currency</Typography>
                      </TableCell>
                      <TableCell align="left">
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
                      <TableCell align="right">
                      </TableCell>
                      <TableCell align="left">
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
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => {}} style={{align: "right"}}>Save and Continue</Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
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
