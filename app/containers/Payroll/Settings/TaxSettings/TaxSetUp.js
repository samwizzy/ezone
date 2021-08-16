import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Icon,
  IconButton,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  table: {
    whiteSpace: 'nowrap',
    '& tr': {
      '& td:first-child': {
        // width: 80,
      },
    },
    '& .MuiTextField-root': {
      width: 300,
    },
    '& td': {
      borderBottom: 0,
      padding: theme.spacing(1),
    },
  },
}));

const TaxSetUp = props => {
  const classes = useStyles(props);
  const { taxSettings, openNewTaxDialog, openEditTaxDialog } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [form, setForm] = useState({
    taxNumber: '',
    empCode: '',
    NHFNumber: '',
    NHISCode: '',
    ITFNumber: '',
    NSITFNumber: '',
    taxMethod: '',
  });
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedTax(_.find(taxSettings, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleClose();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Tax settings"
        action={
          <IconButton>
            <Icon>edit</Icon>
          </IconButton>
        }
      />

      <CardContent>
        <Table className={classes.table} size="small">
          <TableBody>
            <TableRow>
              <TableCell item>Company Tax Payer Number</TableCell>
              <TableCell>
                <TextField
                  id="tax-number"
                  name="taxNumber"
                  label="Tax number"
                  variant="outlined"
                  size="small"
                  value={form.taxNumber}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pension Employer’s Code</TableCell>
              <TableCell>
                <TextField
                  id="emp-code"
                  name="empCode"
                  label="Employer's code"
                  variant="outlined"
                  size="small"
                  value={form.empCode}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NHF Number</TableCell>
              <TableCell>
                <TextField
                  id="nhfn-number"
                  name="NHFNumber"
                  label="NHF number"
                  variant="outlined"
                  size="small"
                  value={form.NHFNumber}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NHIS Code</TableCell>
              <TableCell>
                <TextField
                  id="nhis-number"
                  name="NHISCode"
                  label="NHIS code"
                  variant="outlined"
                  size="small"
                  value={form.NHISCode}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITF Number</TableCell>
              <TableCell>
                <TextField
                  id="itfn-number"
                  name="ITFNumber"
                  label="ITF number"
                  variant="outlined"
                  size="small"
                  value={form.ITFNumber}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NSITF Number</TableCell>
              <TableCell>
                <TextField
                  id="nsitf-number"
                  name="NSITFNumber"
                  label="NSITF number"
                  variant="outlined"
                  size="small"
                  value={form.NSITFNumber}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax Calculation Method</TableCell>
              <TableCell>
                <TextField
                  id="tax-method"
                  name="taxMethod"
                  label="Tax calculation method"
                  variant="outlined"
                  size="small"
                  value={form.taxMethod}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  taxSettings: Selectors.makeSelectGetTaxSettingsData(),
});

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
)(TaxSetUp);
