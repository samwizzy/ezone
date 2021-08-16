import React from 'react';
// import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    color: props => (props.color ? props.color : '#1F2937'),
    fontWeight: props => (props.fontWeight ? props.fontWeight : 600),
    fontSize: props => (props.fontSize ? props.fontSize : 18),
    margin: theme.spacing(1, 0),
  },
}));

function Title(props) {
  const { className } = props;
  const classes = useStyles(props);

  return (
    <h2 className={classNames(classes.root, className)}>{props.children}</h2>
  );
}

export default Title;
