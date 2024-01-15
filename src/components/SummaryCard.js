import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    summaryCard: {
        width: '100%', // Full width on mobile devices
        maxWidth: '20rem',
        wordWrap: 'break-word',
        minHeight: '10rem',
    },
    muiButton: {
        width: '65%',
        margin: '0.625rem',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    roundImage: {
        borderRadius: '50%',
        backgroundSize: 'cover', // This will prevent the image from being stretched or squished
        backgroundPosition: 'center', // This will center the image
        width: '100%',
        paddingTop: '100%', // This will maintain the aspect ratio of the image
    },
});

export const SummaryCard = ({ children, imageUrl, viewComponentDetailsUrl }) => {
    const classes = useStyles();
    const history = useHistory();

    const onViewDetails = () => {
        history.push(`${viewComponentDetailsUrl}`);
    };

    return (
        <Paper elevation={2} className={`Pet ${classes.summaryCard}`}>
            <div
                className={`${classes.media} ${classes.roundImage}`}
                style={{ backgroundImage: `url(${imageUrl})` }}
                title="Placeholder Image"
            />
            <Grid container direction="column">
                {children}
                <Grid item xs={12} container justify="center">
                    <Button
                        className={classes.muiButton}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={onViewDetails}
                    >
                        VIEW DETAILS
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};