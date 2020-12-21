import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { useLocation } from 'react-router-dom';
import downloadCSV from '../index';

const BootstrapInput = withStyles(theme => ({
  root: {
    '& svg': {
      right: 5,
    },
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects({ data, setPrint }) {
  const Location = useLocation();

  const fileName = Location.pathname.split('/')[3];

  const classes = useStyles();
  const handleChange = event => {
    if (Number(event.target.value) === 20) {
      setPrint(true);
    }
    if (Number(event.target.value) === 30) {
      downloadCSV({ fileName, exportType: 'csv', data });
    }
    if (Number(event.target.value) === 40) {
      downloadCSV({ fileName, exportType: 'xls', data });
    }
  };
  return (
    <FormControl className={classes.margin}>
      {data ? (
        <NativeSelect
          id="demo-customized-select-native"
          value=""
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value=" Export As"> Export As</option>
          <option value={20}>PDF</option>
          <option value={30}>CSV</option>
          <option value={40}>XLS</option>
        </NativeSelect>
      ) : (
        <NativeSelect
          id="demo-customized-select-native"
          value=""
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value="Export As"> Export As</option>
          <option value={20}>PDF</option>
        </NativeSelect>
      )}
    </FormControl>
  );
}
