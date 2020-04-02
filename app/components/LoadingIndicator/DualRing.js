import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    loadingSpinner: {
        width: '100%',
        height: '100%',
        display: "inline-block",
        overflow: "hidden",
        background: '#f1f2f3'
    },
    loader: {
        width: "100%",
        height: "100%",
        position: "relative",
        transform: "translateZ(0) scale(1)",
        backfaceVisibility: "hidden",
        transformOrigin: "0 0", /* see note above */
        "& div": { boxSizing: "border-box!important" },
        "& > div": {
            position: "absolute",
            width: "144px",
            height: "144px",
            top: "28px",
            left: "28px",
            borderRadius:" 50%",
            border: "16px solid #000",
            borderColor: "#0099e5 transparent #0099e5 transparent",
            animation: "loader 1s linear infinite",
        },
        "& > div:nth-child(2)": { borderColor: "transparent" },
        "& > div:nth-child(2) div": {
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotate(45deg)",
        },
        "& > div:nth-child(2) div:before, & > div:nth-child(2) div:after": { 
            content: "",
            display: "block",
            position: "absolute",
            width: "16px",
            height: "16px",
            top: "-16px",
            left: "48px",
            backgroundColor: "#0099e5",
            borderRadius: "50%",
            boxShadow: "0 128px 0 0 #0099e5",
        },
        "& > div:nth-child(2) div:after": { 
            left: "-16px",
            top: "48px",
            boxShadow: "128px 0 0 0 #0099e5",
        },
        "& div": { boxSizing: "content-box" } 
    },
    "@keyframes loader": {
        "0%": { transform: "rotate(0)" },
        "100%": { transform: "rotate(360deg)" }
    },     
}))

const DualRing = () => {
    const classes = useStyles()

    return (
        <div className={classes.loadingSpinner}>
            <div className={classes.loader}>
                <div></div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default DualRing