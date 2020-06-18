import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Breadcrumbs, Box, Button, Divider, IconButton, Link, List, ListItem, ListItemText, ListItemAvatar, Table, TableRow, TableCell, TableBody, TextField, MenuItem, Grid, Paper, Typography, Toolbar } from '@material-ui/core';
import MUIDataTable from 'mui-datatables'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { darken } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import LensIcon from '@material-ui/icons/Lens';
import Check from '@material-ui/icons/Check';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TodayIcon from '@material-ui/icons/Today'
import { Widget11_Report } from './../widgets'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(4, 6),
		margin: theme.spacing(1, 0)
	},
	toolbar: theme.mixins.toolbar,
	datatable: {
		'& .MuiTableHead-root': {
			'& .MuiTableCell-head': {
				color: theme.palette.common.white,
			},
			'& .MuiTableCell-root:nth-child(odd)': {
				backgroundColor: theme.palette.primary.main,
			},
			'& .MuiTableCell-root:nth-child(even)': {
				backgroundColor: darken(theme.palette.primary.main, 0.1),
			},
		},
	},
}));

const groups = ['Department', 'Branch', 'Roles', 'Location'];

const GenderProfileReport = props => {
	const classes = useStyles();
	const { loading } = props;
	const [group, setGroup] = React.useState('')

	React.useEffect(() => {
	}, []);

	const handleChange = event => setGroup(event.target.value)

	const columns = [
		{
			name: 'uuId',
			label: 'Id',
			options: {
				display: 'excluded',
				filter: true,
			},
		},
		{
			name: 'name',
			label: 'Department Name',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'employees',
			label: 'Employee count',
			options: {
				filter: true,
				sort: true,
				customBodyRender: employees => {
					return <span>{employees && employees.length}</span>
				}
			},
		},
		{
			name: 'dateCreated',
			label: 'Created',
			options: {
				filter: true,
				sort: true,
				customBodyRender: value => moment(value).format('lll')
			},
		},
	];

	const options = {
		filterType: 'checkbox',
		responsive: 'scrollMaxHeight',
		selectableRows: 'none',
		print: false,
		download: true,
		viewColumns: false,
		filter: false,
		customToolbar: () =>
			<TextField
				id="group-select"
				size="small"
				select
				label="Filter By"
				name="group"
				value={group}
				variant="outlined"
				onChange={handleChange}
				style={{ width: 250 }}
			>
				{groups.map((group, i) =>
					<MenuItem key={i} value={group}>
						{group}
					</MenuItem>
				)}
			</TextField>,
		rowsPerPage: 10,
		rowsPerPageOptions: [10, 25, 50, 100],
		elevation: 0
	};

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<AppBar position="static" color="inherit" elevation={1}>
						<Toolbar variant="dense">
							<Typography variant="h6" className={classes.title}>
								Gender Profile Report
              </Typography>
						</Toolbar>
					</AppBar>
				</Grid>
				<Grid item md={12}>
					<Widget11_Report />
				</Grid>
				<Grid item md={12}>
					<MUIDataTable
						className={classes.datatable}
						title=" "
						data={[]}
						columns={columns}
						options={options}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

GenderProfileReport.propTypes = {
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
)(GenderProfileReport);
