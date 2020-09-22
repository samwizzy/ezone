import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { green, orange } from '@material-ui/core/colors';
import { Button, ButtonGroup } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Adjust from '@material-ui/icons/Adjust';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles(theme => ({
	icon: {
		color: theme.palette.grey[800],
		'&.approved': { color: theme.palette.primary.main },
		'&.inProgress': { color: orange[500] },
		'&.done': { color: green[500] },
	},
	buttonGroup: {
		textAlign: "right",
	},
}));

const ControlButtons = ({ history, itemById, openEditItemDialog, }) => {
	const classes = useStyles();

	const handleEditClick = () => {
		openEditItemDialog(itemById)
		history.push(`/inventory/item/${itemById.id}/${itemById.sku}/edit`)
	}

	return (
		<div className={classes.buttonGroup}>
			<ButtonGroup
				size="small"
				aria-label="small outlined button group"
			>
				<Button
					onClick={handleEditClick}
					startIcon={<EditOutlinedIcon className={classes.icon} />}
				>
					Edit
				</Button>
				<Button
					onClick={() => { }}
					startIcon={<Adjust className={classes.icon} />}
				>
					Adjust Stock
				</Button>
				<Button endIcon={<KeyboardArrowDown className={classes.icon} />}>
					More
				</Button>
			</ButtonGroup>
		</div>
	)
}

export default withRouter(ControlButtons)