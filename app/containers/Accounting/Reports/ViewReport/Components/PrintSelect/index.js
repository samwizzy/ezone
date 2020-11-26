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
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 100,
    height: 15,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
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
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    if (Number(event.target.value) === 20) {
      setPrint(true);
    }
    if (Number(event.target.value) === 30) {
      console.log('================>', data);
      downloadCSV({ fileName, exportType: 'csv', data });
    }
    if (Number(event.target.value) === 40) {
      downloadCSV({ fileName, exportType: 'xls', data });
    }
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        {data ? (
          <NativeSelect
            id="demo-customized-select-native"
            value={age}
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
            value={age}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option value=" Export As"> Export As</option>
            <option value={20}>PDF</option>
          </NativeSelect>
        )}
      </FormControl>
    </div>
  );
}
