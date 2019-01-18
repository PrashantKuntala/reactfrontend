import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import SearchBox from './SearchBox';

import pennstatelogo from '../pennstatelogo.png';
import cegrlogo from '../CEGRlogo.png';

const styles =({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        background: 'linear-gradient(to bottom,#e8eaf6,#e8eaf6)'
        // fontFamily: 'Roboto Slab'             
    },
    content:{
        flex : '1 0 auto',       
        // textAlign: 'center',
    },
    footer: {
        /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
        flexShrink: 0,
        // height: '20vh',
        // background: '#344955',
        // color: "white"
        // border: '2px solid green'
      },
      jumbotron:{
          padding: '4rem 2rem',
          bottomMargin:'2rem',
        //   background: '#314d64',
        //   color: "white"
      },
      container:{
          maxWidth: '1140px',
          paddingRight: 15,
          paddingLeft: 15,
          margin: "auto"
      }, 
      center : {
        margin: 'auto',
        maxWidth: 1140,
        // padding: 10,  
        // border: '2px solid green'  
      },
});

const LandingPage = (props) => {
    const { classes } = props;

    return (
         
        <div className={classes.root}>
            
            <div className={classes.content}>
            <Paper elevation={1}>
            {/* Jumbotron or main message */}
                <div className={classes.jumbotron}>
                    <div className={classes.container}>
                        <Typography variant="h2" gutterBottom>
                            Yeast Epigenome Project
                        </Typography>
                        <Divider/>
                        <Typography variant="subtitle1" gutterBottom>
                        <em>Saccharomyces cerevisiae</em> epigenome                        
                        </Typography>
                        <Typography variant="caption" component="p" gutterBottom>
                        An improved understanding of how genes are regulated requires an improved understanding of where gene regulatory proteins are bound.
                        </Typography> 
                        <br/>
                        <br/>
                        <br/>
                        <SearchBox/>                                       
                    </div>
                </div> 
                </Paper>
                <br/>
                <Grid container spacing={0} direction="column" justify="space-evenly" >
                
                {/* Contributors Section */}
                    <Grid item className={classes.center}>                    
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    About
                                </Typography>
                                <Typography variant="body1">
                                The Yeast Epigenome Project (YEP) is an extensive study on 800 strains of yeast using the ChIP-exo assay. This Website hosts the results of data analysis from our galaxy workflows for each sample in the project.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sample Explore Table */}
                    <Grid item style={{padding: 20}}>                    
                        <Home/>
                    </Grid>

                    
                    {/* Footer  Section */}
                    <Grid item className={classes.center}> 
                        <Grid container spacing={40} alignItems={"center"} direction="row" justify="center" className={classes.footer}>
                            <Grid item>
                                <img src={pennstatelogo} alt="pennstateLogo" style={{width: 160}}/> 
                            </Grid>
                            <Grid item>
                                <img src={cegrlogo} alt="cegrlogo" style={{height: 55}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant='body2' style={{paddingLeft:28}}>
                                    &copy; 2019 Pennsylvania State University
                                </Typography>
                            </Grid>
                        </Grid>                       
                    </Grid>

                </Grid>                
            </div>

           
          
        </div>
        
       
    );
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
