import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CompanyReportList from './components/CompanyReportList'
import ContactReportList from './components/ContactReportList'
import ScheduleReportList from './components/ScheduleReportList'

const AntTabs = withStyles({
	root: {
		borderBottom: '1px solid #e8e8e8',
	},
	indicator: {
		backgroundColor: '#1890ff',
	},
})(Tabs);

const AntTab = withStyles((theme) => ({
	root: {
		textTransform: 'none',
		minWidth: 72,
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(4),
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			color: '#40a9ff',
			opacity: 1,
		},
		'&$selected': {
			color: '#1890ff',
			fontWeight: theme.typography.fontWeightMedium,
		},
		'&:focus': {
			color: '#40a9ff',
		},
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	padding: {
		padding: theme.spacing(3),
	},
	demo1: {
		backgroundColor: theme.palette.background.paper,
	},
	demo2: {
		backgroundColor: '#2e1534',
	},
}));

function ReportsList() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<div className={classes.demo1}>
				<AntTabs value={value} onChange={handleChange} aria-label="ant example">
					<AntTab label="Contact Reports" />
					<AntTab label="Company Reports" />
				</AntTabs>

				{value === 0 && <ContactReportList />}
				{value === 1 && <CompanyReportList />}
				{value === 2 && <ScheduleReportList />}
			</div>
		</div>
	);
}

ReportsList.propTypes = {
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
)(ReportsList);