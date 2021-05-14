import React, { Fragment, memo, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Actions from "../actions"
import * as AppSelectors from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import { useRavePayment } from "react-ravepayment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: theme.palette.grey[50],
    },
    '&::-webkit-scrollbar-track': {
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
      backgroundColor: theme.palette.primary.main,
    },
  },
  button: {
    padding: theme.spacing(1, 4),
    borderRadius: '50px',
    marginLeft: theme.spacing(1),
  },
  grid: {
    margin: theme.spacing(1, 0),
    border: `1px solid ${theme.palette.grey[50]}`,
  },
  box: {
    position: 'relative',
    width: theme.spacing(20),
    height: theme.spacing(20),
    flex: '1 1 10em', // flex-grow flex-shrink flex-basis
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '&.color': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '& img': {
      height: '70px',
      marginBottom: theme.spacing(1),
    },
    '& p': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const initialConfig = {
  txref: "",
  customer_email: "",
  customer_phone: "",
  amount: 2000,
  PBFPubKey: "",
  production: false,
};

const PaymentDetails = props => {
  const { history, user, paymentDetails, paymentGateways, verifyPayment } = props;
  const classes = useStyles();

  const [config, setConfig] = useState({ ...initialConfig });

  console.log(user, "user")

  useEffect(() => {
    if (paymentGateways.length) {
      setConfig((state) => ({
        ...state,
        customer_email: user && user.emailAddress,
        customer_phone: user && user.phoneNumber,
        txref: paymentDetails && paymentDetails.groupTransactionRef,
        amount: paymentDetails && paymentDetails.totalAmount,
        PBFPubKey: paymentGateways[0].publicKey,
      }));
    }
  }, [paymentGateways, paymentDetails]);

  const onSuccess = ({tx: { txRef }}) => {
    console.log(txRef, "reference");
    verifyPayment({ txRef, paymentGateway: paymentGateways[0].name })
    history.push("/applications");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const RaveButton = () => {
    const { initializePayment } = useRavePayment(config);
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          disabled={!paymentGateways.length}
          onClick={() => initializePayment(onSuccess, onClose)}
        >
          Pay {paymentGateways.length && `with ${paymentGateways[0].name}`}
        </Button>
      </div>
    );
  };

  console.log(paymentDetails, "paymentDetails") // publicKey
  console.log(paymentGateways, "paymentGateways")
  console.log(config, "config")

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid justify="space-between" container>
          <Grid item xs={12}>
            <Grid container justify="space-between" className={classes.grid}>
           
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container justify="space-between" className={classes.grid}>
              <Grid item sm={12} md={8}>
                <Grid
                  container
                  justify="space-between"
                  className={classes.grid}
                >
                  <Grid item xs={6} md={6}>
                    <Typography variant="h5" component="h3">
                      Payment Details
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                      Payment registered summary
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <RaveButton />
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item sm={12} md={12} lg={12}>
                    <div>
                      <Table>
                        <TableHead>
                          <TableRow>  
                            <TableCell>Amount</TableCell>
                            <TableCell>{paymentDetails && paymentDetails.totalAmount}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            paymentDetails && paymentDetails.moduleOffers.map(module => (
                              <Fragment key={module.id}>
                                <TableRow>
                                  <TableCell>Module Name</TableCell>
                                  <TableCell>{module.moduleName}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Cost</TableCell>
                                  <TableCell>{module.cost}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Duration In Months</TableCell>
                                  <TableCell>{module.durationInMonths}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Currency</TableCell>
                                  <TableCell>{module.currency}</TableCell>
                                </TableRow>
                              </Fragment>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={4} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

PaymentDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  user: AppSelectors.makeSelectCurrentUser()
});

function mapDispatchToProps(dispatch) {
  return {
    verifyPayment: (data) => dispatch(Actions.verifyPayment(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(PaymentDetails);
