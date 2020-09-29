import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
	root: {
		'& button:nth-child(n+1)': {
			marginLeft: theme.spacing(1),
		},
	},
	title: {
		flexGrow: 1
	},
	marked: {
		backgroundColor: green[500],
		color: theme.palette.common.white,
		'&:hover': {
			backgroundColor: green[600],
		},
	},
}));

const ControlledButtons = (props) => {
	const classes = useStyles(props)
	const { history, transferOrder, openEditTransferOrderDialog } = props

	const handleEditClick = () => {
		openEditTransferOrderDialog(transferOrder)
		history.push(`/inventory/transfer/${transferOrder.id}/edit`)
	}

	return (
		<Toolbar className={classNames(classes.root)}>
			<IconButton variant="outlined" onClick={() => history.push('/inventory/transfers')}>
				<ArrowBackIcon />
			</IconButton>

			<Typography variant="h6" className={classes.title}>
				{transferOrder && transferOrder.itemName}
			</Typography>

			<Button
				onClick={() => { }}
				className={classes.marked}
				variant="contained"
				color="primary"
				disableElevation
			>
				Mark as Received
			</Button>

			<IconButton variant="outlined" onClick={handleEditClick}>
				<EditOutlinedIcon />
			</IconButton>

			<IconButton variant="outlined" onClick={() => { }}>
				<DeleteSweepOutlinedIcon />
			</IconButton>
		</Toolbar>
	)
}

export default withRouter(ControlledButtons)