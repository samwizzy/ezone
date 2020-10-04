import React from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import Logo from './logo-2.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2, 0)
    }
}))

const Receipt = props => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Helmet>
                <title>Email Template</title>
                <meta name="description" content="Description of Email Templates" />
            </Helmet>

            {/* <div style={{display: "none", fontSize: "1px", color: "#fefefe", lineHeight: "1px", fontFamily: "Helvetica, Arial, sans-serif", maxHeight: "0px", maxWidth: "0px", opacity: 0, overflow: "hidden"}}>
                Entice the open with some amazing preheader text. Use a little mystery and get those subscribers to read through...
            </div> */}

            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                    <tr>
                        <td bgcolor="#ffffff" align="center">
                            <table align="center" border="0" cellSpacing="0" cellPadding="0" >
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top" >
                                            <a href="http://litmus.com" target="_blank">
                                                <img alt="Logo" src={Logo} width="60" height="60" style={{ display: "block", fontFamily: " Helvetica, Arial, sans-serif", color: "#ffffff", fontSize: "16px" }} border="0" />
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="center" style={{ paddingTop: "15px" }}>
                            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                                    <tr>
                                                        <th align="center" style={{ fontSize: "20px", fontFamily: "Helvetica, Arial, sans-serif", color: "#333333", paddingTop: "10px" }}>
                                                            Your order is on its way!
                                                    </th>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" style={{ padding: "10px 0 0 0", fontSize: "16px", lineHeight: "25px", fontFamily: "Helvetica, Arial, sans-serif", color: "#666666" }}>

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
                                                                                        <td align="left" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "14px" }}>
                                                                                            Purchased Item (1)
                                                                                        </td>
                                                                                        <td align="right" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "14px" }}>
                                                                                            <code>$XX.XX</code>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="left" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "14px" }}>
                                                                                            Brochure Design
                                                                                        </td>
                                                                                        <td align="right" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "14px" }}>
                                                                                            <code>$XX.XX</code>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="left" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "14px" }}>
                                                                                            Web Design Packages(Template) - Basic
                                                                                        </td>
                                                                                        <td align="right" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "14px" }}>
                                                                                            <code>$XX.XX</code>
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
                                        <td style={{ padding: "10px 0 0px 0", borderTop: "1px solid #eaeaea", borderBottom: "1px dashed #aaaaaa" }}>
                                            <table cellPadding="0" cellSpacing="0" border="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="left" style={{ fontFamily: "Arial, sans-serif", color: "#333333", fontSize: "16px", fontWeight: "bold" }}>Total</td>
                                                        <td align="right" style={{ fontFamily: "Arial, sans-serif", color: "#7ca230", fontSize: "16px", fontWeight: "bold" }}>$XX.XX</td>
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
                        <td bgcolor="#ffffff" align="center" style={{ padding: "15px" }}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td align="left" style={{ padding: "0 0 0 0", fontSize: "14px", lineHeight: "18px", fontFamily: "Helvetica, Arial, sans-serif", color: "#aaaaaa", fontStyle: "italic" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est. Aenean at mollis ipsum.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td bgcolor="#ffffff" align="center" style={{ padding: "15px" }}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td align="center" style={{ paddingTop: "25px" }}>
                                            <table border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style={{ borderRadius: "3px" }} bgcolor="#256F9C">
                                                            <a href="https://litmus.com" target="_blank" style={{ fontSize: "16px", fontFamily: "Helvetica, Arial, sans-serif", color: "#ffffff", textDecoration: "none", borderRadius: "3px", padding: "15px 25px", border: "1px solid #256F9C", display: "inline-block" }}>
                                                                Let Us Know
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


export default Receipt