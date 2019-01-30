import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';

// retrieve app configuration settings
import Config from '../Config';

const styles = theme => ({
          
    center : {
        margin: 'auto',      
        maxWidth: 1200,
        padding: 10,
        // border: '2px solid green'
      },
    card: {
        maxWidth: 1200
    },           
      leftIcon: {
        marginRight: theme.spacing.unit,
        // fontSize: 25,
      },  
      navbar:{
        
      },
      button: {
        marginRight: theme.spacing.unit,
        marginBottom: 0
      },
      instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        textAlign: "center"
      }, 
    
});

// util functions
function getSteps() {
    return ['Make Changes', 'Review Changes', 'Apply Changes'];
  }

class EditSample extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
        sampleData : [],
        value: ""
    }

    // you would access the route parameter here and then maybe fetch stuff
    componentDidMount(){
        console.log("edit sample fetching data");
        
        // you automatically get the props for class based components.
        // console.log(this.props);
        
        let id = this.props.match.params.sample_id;
        let dataURL = Config.settings.apiURL + Config.settings.samplesEndpoint + '/edit/' + id
        axios.get(dataURL)
            .then(res =>{
                console.log("SampleData");                
                console.log(res.data.samples);
             
                this.setState({
                   sampleData: res.data.samples[0]
                });    
            }) 

            // Setting the title of the browser tab
            document.title = " Edit | YEP"
           
    }

        
    // function using the browser's history props from reactrouter
    goBack = () => {
        this.props.history.goBack();
    }

    // to check if the step is skipped
    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    // to handle next step
    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    // To go back one step
    handleBack = () => {
        this.setState(state => ({
        activeStep: state.activeStep - 1,
        }));
    };

    // to edit again
    handleReset = () => {
        this.setState({
        activeStep: 0,
        });
    };

    handleSubmit = (event) => {
        console.log(this.state);     
        event.preventDefault();
      }

      handleChange = (event) => {
        // this.setState({value: event.target.value});
        console.log(event.target.value);
        
      }


  render() {
    const { classes } = this.props;
    const {sampleData} = this.state;
    const steps = getSteps();
    const { activeStep } = this.state;

    const getStepContent = (activeStep) => {
        switch (activeStep) {
          case 0:
            return (
                               
                <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                    id="standardGeneName"
                    label="Gene Name"
                    style={{ margin: 8 }}
                    placeholder={sampleData.standardGeneName}
                    margin="normal"
                    variant="outlined"                    
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </form>
                
            );
          case 1:
            return 'What is an ad group anyways?';
          case 2:
            return 'This is the bit I really care about!';
          default:
            return 'Unknown step';
        }
      }

      return (
            <div style={{ background: 'linear-gradient(to bottom,#e8eaf6,#e8eaf6)'}}>  
                {/* Navbar */}
                <Paper elevation={1} className={classes.navbar}>
                    <CardActions>                        
                        <Grid container spacing={16} direction="row" wrap="nowrap"  justify="flex-start">
                            <Grid item sm={"auto"}>
                                <Tooltip title="Go Back" aria-label="Go Back">
                                    <Button size="small" color="primary" onClick={this.goBack}>
                                        <ArrowBack className={classes.leftIcon}/>
                                    </Button> 
                                </Tooltip>       
                            </Grid>        
                        </Grid>   
                    </CardActions>
                </Paper>
                
                {/* Sample Edit Steps */}
                <Typography component="div" className={classes.center}>
                    
                        <Card className={classes.card}>
    
                                {/* Creating Steps */}
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {

                                        const props = {};
                                        const labelProps = {};                                    

                                        if (this.isStepSkipped(index)) {
                                        props.completed = false;
                                        }
                                        
                                        return (
                                        <Step key={label} {...props}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                        );

                                    })}
                                </Stepper>

                                {/* Creating Step Content */}
                                {activeStep === steps.length ? (
                                    <CardContent>
                                        <Typography variant="h6" 
                                        gutterBottom className={classes.instructions}>
                                            All steps completed - you&apos;re sample is updated
                                        </Typography>
                                        <br/>
                                        <Divider/>
                                        <CardActions>                                 
                                            <Button size="small" variant="contained" color="primary" onClick={this.handleReset} className={classes.button}>
                                                Edit again 
                                            </Button>
                                        </CardActions>  
                                    </CardContent>
                                ) : (
                                    <CardContent>
                                    
                                        {/* Retrieve step content here  */}
                                        <Typography variant="h6" className={classes.instructions}>
                                            {getStepContent(activeStep)}
                                        </Typography>
                                        <br/>
                                        <Divider/>                   
                                        
                                        <CardActions> 
                                            <Button
                                            size="small"
                                            variant="contained"
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                            >
                                                Back
                                            </Button>                                        

                                            <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                            </Button>

                                        </CardActions>   
                                        </CardContent>                                
                                )}
                        </Card>  
                </Typography>
            </div>
      )
  }

  
}

EditSample.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EditSample));
