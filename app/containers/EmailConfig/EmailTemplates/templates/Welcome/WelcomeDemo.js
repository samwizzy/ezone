import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../../../../../images/logo.svg';
import WelcomeLogo from './welcome.png'
import EmptyLogo from './empty.svg'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2, 0)
    }
}))


const Welcome = props => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Helmet>
                <title>Welcome Template</title>
                <meta name="description" content="Description of Email Templates" />
            </Helmet>

            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                    <tr key="0">
                        <td bgcolor="#ffffff">
                            <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="right" valign="top">
                                            <a href="http://litmus.com" target="_blank">
                                                <img alt="Logo" src={Logo} height="30" style={{ display: 'block', verticalAlign: 'text-bottom' }} border="0" />
                                            </a>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                    <td align="left" valign="bottom">
                                        <a href="http://litmus.com" target="_blank">
                                            <img alt="Welcome Logo" src={WelcomeLogo} height="25" style={{display: 'block', verticalAlign: 'text-bottom'}} border="0" />
                                        </a>
                                    </td>
                                </tr> */}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style={{ paddingTop: "15px" }}>
                            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                                    <tr>
                                                        <th align="left" style={{ fontSize: "14px", fontFamily: "Raleway, Roboto, Helvetica, Arial, sans-serif", color: "#333333", paddingTop: "10px" }}>
                                                            <img alt="Welcome Logo" src={WelcomeLogo} height="25" style={{ display: 'inline-block', margin: "0 3px 0 0", verticalAlign: 'text-bottom' }} border="0" />
                                                        Sam,
                                                    </th>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ padding: "10px 0 0 0", fontSize: "14px", lineHeight: "25px", fontFamily: "Raleway, Helvetica, Arial, sans-serif", color: "#666666" }}>
                                                            Welcome to Ezone! &mdash; <em>We are happy to have you.</em>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td bgcolor="#ffffff">
                            <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "10px 0 0 0", borderTop: "1px dashed #aaaaaa" }}>
                                            <table cellSpacing="0" cellPadding="0" border="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top">
                                                            <table cellPadding="0" cellSpacing="0" border="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <table cellPadding="0" cellSpacing="0" border="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="left" style={{ fontFamily: "Raleway, Roboto, Arial, sans-serif", color: "#666666", fontSize: "14px" }}>
                                                                                            <p>Ezone is a ERP solution that help company to organize, lead and nurture their leads and customers. We are also here to provide tons of resources to get you set up for success. Let's get you in!</p>
                                                                                        </td>
                                                                                        <td align="right" style={{ fontFamily: "Raleway, Roboto, Arial, sans-serif", color: "#666666", fontSize: "14px" }}>
                                                                                            <img alt="Empty Logo" src={EmptyLogo} width="80" style={{ display: 'block', verticalAlign: 'text-bottom' }} border="0" />
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="left" colSpan="2" style={{ fontFamily: "Raleway, Roboto, Arial, sans-serif", color: "#666666", fontSize: "14px" }}>
                                                                                            <p>Join us for a webinar, <a href="">Get Started with Ezone CRM</a>. A User Success Coach will guide you through the Ezone CRM step-by-step to make sure you get the most value as-soon-as-possible.</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td bgcolor="#ffffff" align="center" style={{ padding: "10px" }}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td align="left" style={{ padding: "0 0 0 0", fontSize: "14px", lineHeight: "18px", fontFamily: "Helvetica, Arial, sans-serif", color: "#aaaaaa", fontStyle: "italic" }}>
                                            <p>We also have a variety of academic lessons to teach you how to use our Ezone <a href="#">Accounting</a>, <a href="#">CRM</a>, <a href="#">HR</a>, and <a href="#">Task Management</a></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td bgcolor="#ffffff" align="center" style={{ padding: "10px" }}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <table border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style={{ borderRadius: "3px" }} bgcolor="#1e88e5">
                                                            <a href="https://litmus.com" target="_blank" style={{ fontSize: "16px", fontFamily: "Helvetica, Arial, sans-serif", color: "#ffffff", textDecoration: "none", borderRadius: "3px", padding: "10px 35px", border: "1px solid #256F9C", display: "inline-block" }}>
                                                                Register Now
                                                </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style={{ padding: "20px 0px" }}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0" align="center" >
                                <tbody>
                                    <tr>
                                        <td align="center" style={{ fontSize: "12px", lineHeight: "18px", fontFamily: " Helvetica, Arial, sans-serif", color: "#666666" }}>
                                            1234 Main Street, Anywhere, MA 01234, USA
                                    <br />
                                            <a href="http://litmus.com" target="_blank" style={{ color: "#666666", textDecoration: "none" }}>Unsubscribe</a>
                                            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#444444" }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                            <a href="http://litmus.com" target="_blank" style={{ color: "#666666", textDecoration: "none" }}>View this email in your browser</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default Welcome