import React, { Fragment, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import classNames from 'classnames';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import ControlledButtons from './components/ControlledButtons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginBottom: theme.spacing(1),
    '& .MuiCardActions-root': {
      justifyContent: 'flex-start',
      padding: theme.spacing(2)
    }
  },
  title: { flexGrow: 1 },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: 0,
  },
  img: {
    height: "50px",
    marginRight: theme.spacing(1)
  },
  noTable: {
    display: 'flex',
    '& td, & th': {
      paddingLeft: 0
    }
  },
  table: {
    border: '1px solid #ccc',
    minWidth: '200px !important',
    whiteSpace: 'nowrap',
    '& .MuiToolbar-regular': {
      paddingLeft: 0
    },
    '& td, & th': {
      border: 0,
      width: '50%',
    }
  },
  blue: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const PayrunPayslip = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const { history, payrollSetupData, payrun, currentUser } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePayrunTo = () => {
    setAnchorEl(null);
  }

  const handlePayrunFrom = () => {
    setAnchorEl(null);
  }

  const handleBack = () => {
    history.goBack()
  }

  console.log(payrun, "payrun")
  console.log(payrollSetupData, "payrollSetupData")
  console.log(currentUser, "currentUser")

  if (!payrun) {
    // return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <Toolbar className={classes.toolbar}>
              <IconButton color="primary" onClick={handleBack}><PictureAsPdfIcon /></IconButton>
              <IconButton color="primary" onClick={handleBack}><PrintIcon /></IconButton>
              <IconButton color="primary" onClick={handleBack}><DeleteOutlineIcon /></IconButton>
              <IconButton color="primary" onClick={handleBack}><MailOutlineIcon /></IconButton>
            </Toolbar>
          }
        />

        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <ListItem>
                <ListItemIcon>
                  <img src={`data:image/jpg;base64,${currentUser.organisation.logo}`} className={classes.img} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="subtitle1">{currentUser.organisation.companyName}</Typography>
                  <Typography variant="subtitle2">{currentUser.organisation.industry}</Typography>
                </ListItemText>
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Payslip #34567</Typography>
              <Typography variant="subtitle1">Salary Month: March 2019</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1">John Doe</Typography>
                      <Typography variant="subtitle2" gutterBottom><strong>Web Designer</strong></Typography>
                      <Table size="small" className={classes.noTable}>
                        <TableBody>
                          <TableRow>
                            <TableCell>Joining Date:</TableCell>
                            <TableCell align="right">3rd Jun, 2020</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Employee ID:</TableCell>
                            <TableCell align="right">00000089JD</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell className={classes.blue}>
                      <div>
                        <Typography variant="subtitle1" gutterBottom>Net Salary</Typography>
                        <Typography variant="h6" gutterBottom>N 60,000</Typography>
                        <Typography variant="caption" gutterBottom>Sixty thousand only.</Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" gutterBottom>Salary</Typography>
                      <Typography variant="subtitle1" gutterBottom>Gross Salary</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" gutterBottom>Amount</Typography>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Toolbar>
                <Typography variant="h6" gutterBottom>Benefit Summary</Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" gutterBottom>Pension</Typography>
                      <Typography variant="subtitle1" gutterBottom>Pension</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" gutterBottom>Amount</Typography>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom><strong>Total</strong></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Toolbar>
                <Typography variant="h6" gutterBottom>Earnings Summary</Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" gutterBottom></Typography>
                      <Typography variant="subtitle1" gutterBottom>Overtime</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" gutterBottom>Amount</Typography>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom><strong>Total</strong></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Toolbar>
                <Typography variant="h6" gutterBottom>Deductions Summary</Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" gutterBottom></Typography>
                      <Typography variant="subtitle1" gutterBottom>Loan</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" gutterBottom>Amount</Typography>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom><strong>Total</strong></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Toolbar>
                <Typography variant="h6" gutterBottom>Tax Summary</Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>Total Tax</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Toolbar>
                <Typography variant="h6" gutterBottom>PAYE</Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>Total PAYE</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>N 60,000</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

          </Grid>
        </CardContent>

        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handlePayrunFrom}>
            <ListItemText primary="Option 1" secondary="Option 1" />
          </MenuItem>
          <MenuItem onClick={handlePayrunTo}>
            <ListItemText primary="Option 2" secondary="Option 2" />
          </MenuItem>
        </Menu>
      </Card>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  payrun: Selectors.makeSelectPayrunByIdData(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayrunById: data => dispatch(Actions.getPayrunById(data)),
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
)(PayrunPayslip);
