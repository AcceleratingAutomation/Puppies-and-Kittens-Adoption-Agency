import React from 'react';
import { Grid, Container } from "@material-ui/core";
import DisplayImage from "../DisplayImage";

const RescueDetailsLayout = ({ rescue }) => {
    const { name, type, gender, breed, hasFoster, hasVet, isSterilized, isVaccinated, isAdoptable, image, bio } = rescue;
    
    return (
        <Container maxWidth="lg">
            <Grid container justify="center" alignItems="center" direction="row">
                <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
                    <Grid container>
                        <Grid item xs={6}><strong>Type</strong></Grid>
                        <Grid item xs={6}>{type}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>Gender</strong></Grid>
                        <Grid item xs={6}>{gender}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>Breed</strong></Grid>
                        <Grid item xs={6}>{breed}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>Foster</strong></Grid>
                        <Grid item xs={6}>{hasFoster ? 'Yes' : 'No'}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>Veternarian</strong></Grid>
                        <Grid item xs={6}>{hasVet ? 'Yes' : 'No'}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>{gender === 'Female' ? 'Spayed' : 'Neutered'}</strong></Grid>
                        <Grid item xs={6}>{isSterilized ? 'Yes' : 'No'}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>Vaccinated</strong></Grid>
                        <Grid item xs={6}>{isVaccinated ? 'Yes' : 'No'}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}><strong>Ready To Adopt</strong></Grid>
                        <Grid item xs={6}>{isAdoptable ? 'Yes' : 'No'}</Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
                    <DisplayImage
                        type={type}
                        image={image}
                        name={name}
                        width='12rem'
                        height='12rem'
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={3} style={{ textAlign: 'left' }}>
                    <p>{bio}</p>
                </Grid>
            </Grid>
        </Container>
    );
};


export default RescueDetailsLayout;