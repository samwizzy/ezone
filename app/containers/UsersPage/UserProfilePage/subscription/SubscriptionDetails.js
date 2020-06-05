/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
	makeStyles,
	Button,
	Card,
	CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
	IconButton,
	Typography
} from '@material-ui/core';
import * as Actions from '../../actions';
import * as AppSelectors from './../../../App/selectors'
import subscriptionIcon from '../../../../images/subscriptionIcon.svg'

const useStyles = makeStyles(theme => ({
  root: {
		flexGrow: 1,
		margin: theme.spacing(2)
  },
  card: {
		flexGrow: 1,
		"& .MuiCardActions-root": {
			borderTop: `1px solid ${theme.palette.divider}`,
			justifyContent: "flex-end"
		}
  },
}));

const SubscriptionDetails = props => {
	const classes = useStyles();
	const { loading, currentUser } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
				<CardHeader
					title="Subscriptions"
				/>
        <CardContent style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
					<Typography variant="body2" component="p">
						You are currently on Basic Licence Plan 
          </Typography>
					<img alt="" src={subscriptionIcon} />
        </CardContent>
				<CardActions>
					<Button color="primary">Manage Subscriptions</Button>
				</CardActions>
      </Card>
    </div>
  );
};

SubscriptionDetails.prototypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
	currentUser: AppSelectors.makeSelectCurrentUser()
});

function mapDispatchToProps(dispatch) {
  return {
    openSignatureDialog: evt =>  dispatch(Actions.openSignatureDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SubscriptionDetails);
