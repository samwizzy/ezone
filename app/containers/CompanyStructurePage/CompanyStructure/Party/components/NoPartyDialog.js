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
import { Add } from '@material-ui/icons'


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
}));

const NoPartyDialog = props => {
	const classes = useStyles();
	const { dispatchOpenNewPartyGroupAction, loading } = props;

	return (
		<React.Fragment>
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
									You have no company structure yet
								</Typography>
							</Box>
						</CardContent>

						<CardActions>
							<Button
								variant="contained"
								color="primary"
								onClick={() => dispatchOpenNewPartyGroupAction()}
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
  
NoPartyDialog.propTypes = {
	dispatchOpenNewPartyGroupAction: PropTypes.func,
};

export default NoPartyDialog

