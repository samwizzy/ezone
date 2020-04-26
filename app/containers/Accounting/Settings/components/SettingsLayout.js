import React, {memo} from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect';
import { 
  makeStyles, 
  Grid, 
} from '@material-ui/core';
import SettingsSideBar from './SettingsSideBar';
import AccountingPeriod from './AccountingPeriod';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	}
}))

const SettingsLayout = props => {
	const classes = useStyles()
	const {} = props 

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={2}>
					<SettingsSideBar />
				</Grid>
				<Grid item xs={10}>
					{/* <AccountingPeriod /> */}
					{props.children}
				</Grid>
			</Grid>
		</div>
	)
}

SettingsLayout.propTypes = {

};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo
)(SettingsLayout)