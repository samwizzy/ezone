import React from "react"
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import CrmDashImage1 from '../../../../images/crmDash.jpg'
import CrmDashImage2 from '../../../../images/crmDash2.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 4,
    backgroundImage: `url(${CrmDashImage2})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center bottom`,
    backgroundSize: 'cover',
    "& .MuiCardActions-root": {
      justifyContent: "center",
      backgroundColor: theme.palette.common.white,
      fontSize: theme.typography.subtitle1.fontSize
    },
    "& .MuiCardContent-root": {
      minHeight: 180,
    }
  },
  table: {
    whiteSpace: 'nowrap',
    "& .MuiTableFooter-root": {
      borderTop: `1px solid ${theme.palette.divider} !important`,
    },
    "& .MuiTableCell-root": {
      borderBottom: "none !important"
    },
    '& .MuiTableCell-body': {
      color: theme.palette.common.white,
      fontSize: theme.typography.fontSize
    },
  }
}));


const Widget2 = ({ companies }) => {
  const classes = useStyles()

  if (!companies) {
    return ''
  }

  const leadCompanies = companies && companies.filter(company => company.lifeStage === 'LEAD')
  const opportunityCompanies = companies && companies.filter(company => company.lifeStage === 'OPPORTUNITY')
  const contactCompanies = companies && companies.filter(company => company.lifeStage === 'CONTACT')
  const subscriberCompanies = companies && companies.filter(company => company.lifeStage === 'SUBSCRIBER')

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" align="center">
                  <Typography variant="h2">{companies.length}</Typography>
                  <Typography variant="h5">Companies</Typography>
                </TableCell>
                <TableCell align="right">
                  <Table size="small" align="right">
                    <TableBody>
                      <TableRow><TableCell align="left">{contactCompanies.length} Contacts</TableCell></TableRow>
                      <TableRow><TableCell align="left">{leadCompanies.length} Leads</TableCell></TableRow>
                      <TableRow><TableCell align="left">{opportunityCompanies.length} Opportunity</TableCell></TableRow>
                      <TableRow><TableCell align="left">{subscriberCompanies.length} Subscribers</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Divider />

        <CardActions>
          <Button component={Link} to='/crm/companies'>
            View All Companies
					</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Widget2
