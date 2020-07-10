/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
	Backdrop,
	CircularProgress,
	FormControlLabel,
	Icon,
	Button,
	Typography,
} from '@material-ui/core';
import { Add, Visibility, DeleteOutline } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	button: {
		marginLeft: theme.spacing(2),
	},
	datatable: {
		whiteSpace: "nowrap",
		'& .MuiTableRow-root:hover': {
			cursor: 'pointer'
		},
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
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	}
}));

const LeadTagsList = props => {
	const classes = useStyles();

	const {
		loading,
		leadTags,
		openNewLeadTagDialog,
		openEditLeadTagDialog,
	} = props;

	const columns = [
		{
			name: 'id',
			label: ' ',
			options: {
				display: 'excluded',
				filter: true,
			},
		},
		{
			name: 'Id',
			label: 'S/N',
			options: {
				filter: true,
				customBodyRender: (value, tableMeta) => {
					return (
						<FormControlLabel
							label={tableMeta.rowIndex + 1}
							control={<Icon />}
						/>
					);
				},
			},
		},
		{
			name: 'name',
			label: 'Tag Name',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: 'date',
			label: 'Date',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: 'createdBy',
			label: 'Created By',
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: 'id',
			label: 'Action',
			options: {
				filter: true,
				sort: false,
				customBodyRender: value => {
					const data = leads.find(lead => value === lead.id);
					return (
						<Button variant="outlined" size="small" color="primary" onClick={() => openEditLeadTagDialog(data)}>
							Edit
						</Button>
					);
				},
			},
		},
		{
			name: 'id',
			label: 'Action',
			options: {
				filter: true,
				sort: false,
				customBodyRender: value => {
					const data = leads.find(contact => value === contact.id);
					return (
						<FormControlLabel
							control={<Visibility fontSize="small" />}
							onClick={() => { }}
						/>
					);
				},
			},
		},
		{
			name: 'id',
			label: 'Action',
			options: {
				filter: true,
				sort: false,
				customBodyRender: value => {
					const data = allLeads.find(contact => value === contact.id);
					return (
						<IconButton variant="outlined" size="small" color="primary" onClick={() => openEditLeadTagDialog(data)}>
							<DeleteOutline />
						</IconButton>
					);
				},
			},
		},
	];

	const options = {
		filterType: 'checkbox',
		responsive: 'scrollMaxHeight',
		selectableRows: 'none',
		customToolbar: () => (
			<Button
				variant="contained"
				color="primary"
				size="small"
				className={classes.button}
				startIcon={<Add />}
				onClick={() => openNewLeadTagDialog()}
			>
				New
			</Button>
		),
		elevation: 0
	};

	return (
		<React.Fragment>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<MUIDataTable
				className={classes.datatable}
				title="Lead Tags"
				data={[]}
				columns={columns}
				options={options}
			/>
		</React.Fragment>
	);
};

LeadTagsList.propTypes = {
	loading: PropTypes.bool,
	openNewLeadTagDialog: PropTypes.func,
	openEditLeadTagDialog: PropTypes.func,
	leads: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
	leadTags: Selectors.makeSelectLeadTags(),
});

function mapDispatchToProps(dispatch) {
	return {
		openNewLeadTagDialog: () => dispatch(Actions.openNewLeadTagDialog()),
		openEditLeadTagDialog: data => dispatch(Actions.openEditLeadTagDialog(data)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(LeadTagsList);
