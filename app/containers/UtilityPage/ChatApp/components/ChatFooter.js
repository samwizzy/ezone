import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  AppBar,
  InputAdornment,
  Icon,
  IconButton,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import SettingsVoice from '@material-ui/icons/SettingsVoice';
import AttachFile from '@material-ui/icons/AttachFile';
import * as Actions from './../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  textField: {
    flex: 1,
  },
  appBar: {
    bottom: 0,
    top: 'inherit',
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  toolbar: {},
  grow: {
    flexGrow: 1,
  },
  bootstrapFormLabel: {
    color: theme.palette.text.secondary,
  },
}));

const ChatFooter = props => {
  const classes = useStyles();
  const { postMsg } = props;

  const [values, setValues] = React.useState({
    message: '',
    recipientId: '',
    recipientName: '',
    senderId: '',
    senderName: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onMessageSubmit = evt => {
    evt.preventDefault();
    if (
      values.message === '' &&
      values.recipientId === '' &&
      values.senderId === ''
    ) {
      return;
    }

    postMsg(values);
    setValues({ ...values, message: '' });
  };

  return (
    <div className={classes.root}>
      <form
        onSubmit={onMessageSubmit}
      >
        <AppBar className={classes.appBar} position="absolute" color="inherit" elevation={0}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AttachFile />
            </IconButton>
            <Paper
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: 0,
                padding: 0,
                borderRadius: '50px',
              }}
            >
              <TextField
                autoFocus={false}
                id="filled-full-message"
                name="message"
                style={{ margin: 8 }}
                fullWidth
                value={values.message}
                onChange={handleChange('message')}
                size="small"
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                  autoComplete: 'off',
                  startAdornment: (
                    <InputAdornment position="start"> </InputAdornment>
                  ),
                  classes: {
                    root: classes.textField,
                    input: '',
                  },
                  placeholder: 'Type your message',
                }}
                InputLabelProps={{
                  shrink: false,
                  className: classes.bootstrapFormLabel,
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
              onClick={() => {}}
            >
              <Icon color="action">send</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </form>
    </div>
  );
};

ChatFooter.propTypes = {
  postMsg: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    postMsg: evt => dispatch(Actions.postMsg(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChatFooter);
