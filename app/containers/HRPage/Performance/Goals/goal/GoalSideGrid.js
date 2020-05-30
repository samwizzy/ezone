import React from 'react';
import {makeStyles, Button, IconButton, Menu, MenuItem, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LensIcon from '@material-ui/icons/Lens';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	table: {
		"& td": {
			border: 0,
			paddingLeft: theme.spacing(0)
		}
	}
}))

export default function GoalSideGrid() {
	const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>  
				<IconButton>
					<EditOutlinedIcon />  
				</IconButton>
				<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
					Open Menu <ExpandMoreIcon />
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</div>

			<Table size="small" className={classes.table}>
				<TableBody>
					<TableRow>
						<TableCell>Priority:</TableCell>
						<TableCell><LensIcon fontSize="small" /> Low</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Due Date:</TableCell>
						<TableCell>3rd Jul, 2020</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Category:</TableCell>
						<TableCell>Customer Improvement</TableCell>
					</TableRow>
				</TableBody>
			</Table>
    </div>
  );
}