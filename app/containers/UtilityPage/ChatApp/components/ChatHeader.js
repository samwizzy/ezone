import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Avatar,
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import VideocamSharp from '@material-ui/icons/VideocamSharp';
import Phone from '@material-ui/icons/Phone';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  },
}));

const ChatHeader = props => {
    const classes = useStyles();

    const handleMenu = () => {}

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="relative" color="inherit">
                    <Toolbar>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                        <Typography variant="h6" className={classes.title}>
                            Christian
                        </Typography>

                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <VideocamSharp />
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Phone />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
    );
};

ChatHeader.propTypes = {};

const mapStateToProps = createStructuredSelector({});

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
)(ChatHeader);
