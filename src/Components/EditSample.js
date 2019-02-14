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
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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
        maxWidth: 1200,
        padding: 20
    },           
      leftIcon: {
        marginRight: theme.spacing.unit,
        // fontSize: 25,
      },  
      navbar:{
        
      },
      button: {
        marginRight: theme.spacing.unit,
        marginBottom: 0,       
      },
      instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        textAlign: "center"
      },
      success :{
        fontSize: 30,
        color: "#43a047",       
        float: "left"
      },
      fail:{
        fontSize: 30,
        color: "#dd2c00",      
        float: "left"
      },
      updateIcon:{
        fontSize: 28,
        marginRight: theme.spacing.unit,
        float: "right"
      } 
    
});


class EditSample extends React.Component {
    state = {
        changesSubmitted : false,
        updateStatus : "",
        helperText: "",
        editFields: {
            alias : '',
            antibody: '',
            assayType: '',
            description: '',
            epitopeTag:'' ,
            featureName:'',
            genome:'',
            growthMedia:'',
            runId:'',
            sampleId:'', 
            sgdId:'',
            standardGeneName : '',
            treatments:'',
        },
        
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
                console.log(res.data.samples[0]);

                // creating an object that will be the fields in the form to edit.
                const editData = res.data.samples.map(sample => {
                    return {
                        alias :sample.alias,
                        antibody: sample.antibody,
                        assayType: sample.assayType,
                        description: sample.description,
                        epitopeTag: sample.epitopeTag,
                        featureName:sample.featureName,
                        genome:sample.genome,
                        growthMedia:sample.growthMedia,                        
                        runId: sample.runId,
                        sampleId: sample.sampleId,
                        sgdId:sample.sgdId,
                        standardGeneName : sample.standardGeneName,
                        treatments: sample.treatments,
                    }
                });

                this.setState({
                    editFields: editData[0]
                });    
            }) 

            // Setting the title of the browser tab
            document.title = " Edit Sample | YEP"
           
    }

        
    // function using the browser's history props from reactrouter
    goBack = () => {
        this.props.history.push('/');
    }

    // handle sync data based on Protein name, only works if it is a standard Genename
    handleSync = (editFields) => () => {

        // looking up in the entire SGD data
        let dataURL = Config.settings.apiURL + Config.settings.sgdEndpoint + "/" + editFields.standardGeneName
        console.log(dataURL);
        
        axios.get(dataURL)
            .then(res =>{
               
                // creating an object that will be the fields in the form to edit.
                const editData = res.data.sgdInfo.map(sample => {
                    return {
                        alias :sample.alias, 
                        description: sample.description,                        
                        featureName:sample.featureName,                        
                        sgdId:sample.sgdId,
                        standardGeneName : sample.standardGeneName,
                        commonName:sample.commonName                      
                    }
                });

                // changing only relevant values, we don't want to change sampleId
                // and other crucial information using autosync
                for(var key in editData[0]){
                    editFields[key] = editData[0][key]
                }
                
                console.log("sync Data");
                console.log(editFields);
                
                
                this.setState({
                    editFields: editFields,
                    helperText: ""
                });    
            }).catch(error => {
                console.log(error);
                this.setState({
                    helperText: "Use SGD Standard Names"
                });              
            }) 

            // Setting the title of the browser tab
            document.title = " Edit Sample | YEP"
    }


    handleSubmit = () => {
    
     // Submit the values if you dont have any errors
      if(this.state.helperText.length > 0 ){
          alert("Your errors will be overwritten");
      }      

        let id = this.props.match.params.sample_id;
        var patchURL = Config.settings.apiURL + Config.settings.samplesEndpoint + "/" +id;

        var updateArray = []       
        let submitData = this.state.editFields;

        for (var item in submitData){
            if(item === "standardGeneName"){
                updateArray.push({"propName": item,"value" : submitData[item].toUpperCase()})
            }
            else{
                updateArray.push({"propName": item,"value" : submitData[item]})
            }
            
        }
        console.log(updateArray);
        

        axios.patch(patchURL,updateArray).then(res =>{
            console.log(res);
                    
            if(res.statusText === "OK"){
                console.log("Sucess", updateArray);
                this.setState({
                    changesSubmitted: true,
                    updateStatus: "OK"
                });
            }
            else{
                // wondering when this would happen ?
                console.log("Sample Update Failed", updateArray); 
                this.setState({
                    changesSubmitted: true,
                    updateStatus: "Failed"
                });                                             
            }         
        })
      

                
      }

    handleChange = property => event => {
        
        //  retrieve the existing object
        const editFields = this.state.editFields;
        editFields[property] = event.target.value;
        
        // update the changes to respective fields
        this.setState({
            editFields: editFields
        });
        // console.log(this.state.editFields); 
    };

  render() {
    const { classes } = this.props;
    const {editFields, helperText} = this.state;
    
    const content = this.state.changesSubmitted ? 
    
        this.state.updateStatus === "OK" ?  <Typography variant="h6"> <CheckIcon className={classes.success}/>  Your Changes have been submitted successfully ! </Typography> :    <Typography variant="h6"> <ErrorIcon className={classes.fail}/> Unable to update the Sample. Please, Contact your Web Developer to resolve the bug ! </Typography>
    : 

     <CardContent>                        
        <Typography variant='h5' gutterBottom>
            Sample Editor
        </Typography>                            
        <Divider/>
        <br/>        
        
        <Grid container spacing={16} direction="row" 
            justify="flex-start" className={classes.mainContainer}> 
            <Grid item>
                <TextField   
                    id="standardGeneName"                 
                    label="Protein Name"                   
                    value={editFields.standardGeneName}
                    onChange={this.handleChange('standardGeneName')}
                    onBlur={this.handleSync(editFields)} 
                    type="text"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    error={helperText.length === 0 ? false : true }
                    helperText={helperText}
                    />  
            </Grid>
            <Grid item>
                <TextField   
                    id="featureName"                 
                    label="Feature Name"                   
                    value={editFields.featureName}
                    onChange={this.handleChange('featureName')} 
                    type="text"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    />  
            </Grid>
            <Grid item>
                <TextField   
                    id="Assay"                 
                    label="Assay Type"                   
                    value={editFields.assayType}
                    onChange={this.handleChange('assayType')} 
                    type="text"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    />  
            </Grid>                
            <Grid item>
                <TextField
                    id="Antibody"                 
                    label="Antibody"
                    className={classes.textField}
                    value={editFields.antibody}
                    type="text"
                    onChange={this.handleChange('antibody')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid> 
            <Grid item>
                <TextField
                    id="epitopeTag"                 
                    label="Epitope Tag"
                    className={classes.textField}
                    value={editFields.epitopeTag}
                    type="text"
                    onChange={this.handleChange('epitopeTag')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid>  
            <Grid item>
                <TextField
                    id="genome"                 
                    label="Genome"
                    className={classes.textField}
                    value={editFields.genome}
                    type="text"
                    onChange={this.handleChange('genome')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid> 
            <Grid item>
                <TextField
                    id="growthMedia"                 
                    label="Growth Media"
                    className={classes.textField}
                    value={editFields.growthMedia}
                    type="text"
                    onChange={this.handleChange('growthMedia')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid>  
            <Grid item>
                <TextField
                    id="treatments"                 
                    label="Treatments"
                    className={classes.textField}
                    value={editFields.treatments}
                    type="text"
                    onChange={this.handleChange('treatments')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid>  
            <Grid item>
                <TextField
                    id="runId"                 
                    label="Run ID"
                    className={classes.textField}
                    value={editFields.runId}
                    type="text"
                    onChange={this.handleChange('runId')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid>  
            <Grid item>
                <TextField
                    id="sampleId"                 
                    label="Sample ID"
                    className={classes.textField}
                    value={editFields.sampleId}
                    type="text"
                    onChange={this.handleChange('sampleId')} 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    margin="normal"        
                    variant="outlined"
                    />
            </Grid>                                               
        </Grid> 

        <TextField   
            id="alias"                 
            label="Alias"                   
            value={editFields.alias}
            onChange={this.handleChange('alias')} 
            type="text"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            />  

        <TextField   
            id="description"                 
            label="Description"                   
            value={editFields.description}
            onChange={this.handleChange('description')} 
            type="text"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
            multiline
            margin="normal"
            variant="outlined"
            /> 
        <br/>
        <br/>
        <Divider/> 
        <br/>
        <CardActions>            
            <Button
                variant="contained"
                color="primary"                        
                className={classes.button}
                onClick={this.handleSubmit}
                >
                Submit
            </Button>
            <Button
                variant="contained"
                color="secondary"                        
                className={classes.button}
                onClick={this.goBack}
                >
                Cancel
            </Button>
        </CardActions>        
    </CardContent>                    


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
                
               {/* Edit Form */}
                <div className={classes.center}>                    
                    <Card className={classes.card}>
                       {content} 
                    </Card>  
                </div>
            </div>
      )
  }

  
}

EditSample.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EditSample));
