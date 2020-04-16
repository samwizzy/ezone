import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Button,
  Card, CardContent, CardActions,
  Divider,
  List,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/Send';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import moment from 'moment'
import ModuleLayout from '../components/ModuleLayout'
import Widget1 from './widgets/Widget1'
import Widget2 from './widgets/Widget2'
import Widget3 from './widgets/Widget3'
import Widget4 from './widgets/Widget4'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: "space-between",
    // borderBottom: `1px solid ${theme.palette.divider}`,
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(3, 2),
    }
  },
  table: {
    "& .MuiTableFooter-root": {
        borderTop: `1px solid ${theme.palette.grey[400]} !important`
    },
    "& .MuiTableCell-root": {
        borderBottom: "none !important"
    },
    '& .MuiTableCell-body': {
        border: 0,
        color: theme.palette.text.secondary,
        fontSize: theme.typography.fontSize + 2
    },
  }
}));

const AccountDashBoard = props => {
    const classes = useStyles();
    const {} = props;

    return (
        <ModuleLayout>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container className={classes.grid}>
                            <Grid item xs={6}>
                                <Widget1 />
                            </Grid>
                            <Grid item xs={6}>
                                <Widget2 />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className={classes.grid}>
                            <Grid item xs={8}>
                                <Widget3 />
                            </Grid>
                            <Grid item xs={4}>
                                <Widget4 />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </ModuleLayout>
    );
};

AccountDashBoard.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountDashBoard);
