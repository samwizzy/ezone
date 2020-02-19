import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  AppBar,
  Icon,
  IconButton,
  Paper,
  TextField,
  Toolbar
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SettingsVoice from '@material-ui/icons/SettingsVoice';
import AttachFile from '@material-ui/icons/AttachFile';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  },
  textField: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  bootstrapFormLabel: {
    color: theme.palette.text.secondary
  }
}));

const ChatFooter = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
          <div className={classes.root}>
            <AppBar
              position="absolute"
              color="inherit"
              style={{ bottom: 0, top: 'inherit', backgroundColor: 'transparent'}}
            >
              <Toolbar style={{border: '1px solid blue'}}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AttachFile />
                </IconButton>
                <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: 0, padding: 0, borderRadius: '50px'}}>
                  <TextField
                    autoFocus={false}
                    id="filled-full-width"
                    style={{ margin: 8 }}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputProps={{
                      disableUnderline: true,
                      classes         : {
                          root : classes.textField,
                          input: ""
                      },
                      placeholder: "Type your message"
                    }}
                    InputLabelProps={{
                        shrink   : false,
                        className: classes.bootstrapFormLabel
                    }}
                  />
                </Paper>

                <div className={classes.grow} />
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <SettingsVoice />
                </IconButton>

                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  type="submit"
                >
                  <Icon color="action">send</Icon>
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </React.Fragment>
    );
};

ChatFooter.propTypes = {};

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
)(ChatFooter);
