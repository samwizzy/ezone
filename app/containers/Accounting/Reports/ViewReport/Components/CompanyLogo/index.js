import React from 'react';
import moment from 'moment';
import EzoneUtils from '../../../../../../utils/EzoneUtils';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import OfficeLogo from '../../../../../../images/office.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    '& img': {
      height: '52px',
      marginBottom: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const Company = ({ logo, name, date }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={logo ? `data:image/png;base64,${logo}` : OfficeLogo}
        alt="logo"
      />
      <Typography variant="subtitle1" gutterBottom>
        {EzoneUtils.toTitleCase(name)}
      </Typography>
      {date.startDate && (
        <Typography variant="subtitle2">
          {moment(date.startDate, 'YYYY/MM/DD').format('ll')}{' '}
          {date.endDate &&
            `— ${moment(date.endDate, 'YYYY/MM/DD').format('ll')}`}
        </Typography>
      )}
    </div>
  );
};

export default Company;
