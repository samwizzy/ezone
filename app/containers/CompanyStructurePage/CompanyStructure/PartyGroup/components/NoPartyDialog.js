/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
	Backdrop,
	CircularProgress,
	Card, CardContent, CardActions,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Grid,
	Button,
	Typography,
	Box,
	FormControlLabel,
	Icon,
	ListItemSecondaryAction,
	IconButton,
	Paper
} from '@material-ui/core';
import { Add } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		minHeight: `calc(100vh - 120px)`,
	},
	card: {
		padding: theme.spacing(5),
		"& .MuiCardActions-root": {
			justifyContent: "center"
		}
	},
	button: {
		borderRadius: theme.shape.borderRadius * 5,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const NoPartyGroupDialog = props => {
	const classes = useStyles();
	const { openNewPartyGroupDialog, loading } = props;

	return (
		<React.Fragment>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Grid
				container
				justify="center"
				alignItems="center"
				className={classes.root}
			>
				<Grid item>
					<Card square className={classes.card}>
						<CardContent>
							<Box my={2}>
								<Typography variant="h6" component="h1" gutterBottom>
									You don't have a party group yet
								</Typography>
							</Box>
						</CardContent>

						<CardActions>
							<Button
								variant="contained"
								color="primary"
								onClick={() => openNewPartyGroupDialog()}
								className={classes.button}
								disableElevation
								startIcon={<Add />}
							>
								Create Party Group
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

NoPartyGroupDialog.propTypes = {
	openNewPartyGroupDialog: PropTypes.func,
};

export default NoPartyGroupDialog

