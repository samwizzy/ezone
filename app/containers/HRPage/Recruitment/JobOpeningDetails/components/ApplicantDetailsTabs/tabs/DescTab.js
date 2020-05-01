import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import * as Actions from '../../../../../actions';
import * as Selectors from '../../../../../selectors';
import * as AppSelectors from '../../../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: { 
    "& .MuiTableCell-root": {
      border: "0 !important"
    },
  },
  box: {
    backgroundColor: theme.palette.grey[50]
  },
  icon: {
    "&.active": {
      color: green[500]
    }
  },
}));

const DescTab = props => {
  const classes = useStyles();
	const { loading } = props;

  React.useEffect(() => {
  }, []);

  const handleRoute = () => {}

  return (
    <div className={classes.root}>
			<Typography variant="subtitle1">Hiring Workflow</Typography>

			<Table className={classes.table} aria-label="a dense table">
				<TableBody>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography variant="subtitle1">Name</Typography>
							<Box p={1} className={classes.box}>Mike Adenuga</Box>
						</TableCell>
						<TableCell component="th" scope="row">
							<Typography variant="subtitle1">Phone Number</Typography>
							<Box p={1} className={classes.box}>08108899789</Box>
						</TableCell>
						<TableCell></TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography variant="subtitle1">Gender</Typography>
							<Box p={1} className={classes.box}>Male</Box>
						</TableCell>
						<TableCell component="th" scope="row">
							<Typography variant="subtitle1">Location</Typography>
							<Box p={1} className={classes.box}>Lagos</Box>
						</TableCell>
						<TableCell></TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography variant="subtitle1">Email</Typography>
							<Box p={1} className={classes.box}>ezone@optisoft.ng</Box>
						</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableBody>
			</Table>
    </div>
  );
};

DescTab.propTypes = {
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
	withRouter,
	withConnect,
	memo,
)(DescTab);
