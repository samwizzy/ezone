import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
		display: 'flex',
		justifyContent: "space-between",
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  FormControlLabel: {
    padding: "0 10px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
	const classes = useStyles();
	const [state, setState] = React.useState({text: true})
	
	const handleChange = event => {}

  return (
    <Paper component="form" className={classes.root} elevation={0}>
      <FormControlLabel
				control={<Checkbox checked={state.text} onChange={handleChange} name="text" />}
				label="Text"
				className={classes.FormControlLabel}
			/>
    
			<AvatarGroup max={3} className={classes.FormControlLabel}>
				<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
				<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
				<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
				<Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
				<Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
			</AvatarGroup>
    </Paper>
  );
}