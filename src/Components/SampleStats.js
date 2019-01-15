import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CardActions from '@material-ui/core/CardActions';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import { Card } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import UnPublishIcon from '@material-ui/icons/Lock';
import PublishIcon from '@material-ui/icons/LockOpen';

import { withSnackbar } from 'notistack';


const styles = theme => ({
    fullList: {
        width: 'auto',
        height: 900, 
      },
      table: {
       width: "auto",       
      },
      borderLine: {
        border: `1px solid ${theme.palette.divider}`,
        // borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      statsContainer:{
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px`,
        marginTop: 2,
        background: "#fafafa",
      },      
      rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20,
      },
      tableHeader:{
        color: '#fff',
        backgroundColor: "#5c6bc0",
        border: `2px solid #5c6bc0`,
      },
      publicColor:{
        color: "#43a047",
      },
      privateColor:{
        color: "#dd2c00",
      },
         
});


class SampleStats extends React.Component {
  state = {
    stats : this.props.stats
  }

//   Might remove this link and move it to the faq page
 handleProtocolLink = () => {
    let url = "https://www.ncbi.nlm.nih.gov/pubmed/30030442"
    let prtWin = window.open(url, '_blank');
    prtWin.focus();
  }

  handleSamplePublication = (id,value,replicateId) => () => {
    // The patchURL should be coming from a config file.
    var patchURL = "http://172.29.0.74:8080/reviewSamples/"+id;
    var updateArray = [{"propName": "isPublic","value" : value}]
    // console.log(patchURL);
    // console.log(updateArray);

    // changing the state to show feedback beside the replicate 
    const newStats = this.state.stats.map(item => {
        
            if(item._id === id){
                item.isPublic = value
            }
            return item
        
    });
    console.log(newStats);
    

    axios.patch(patchURL,updateArray).then(res =>{        
        if(res.statusText === "OK"){
            console.log("Sucess", updateArray[0]);
            value ?  
            this.props.enqueueSnackbar(replicateId + ' is Published', { variant: 'success'}): 
            this.props.enqueueSnackbar(replicateId + ' is Private', { variant: 'info'}); 
            this.setState({
                stats : newStats
            })       
        }
        else{
            // wondering when this would happen ?
            console.log("Failed", updateArray[0]);
            console.log(res); 
            this.props.enqueueSnackbar('ERROR : Check log in the console !', { variant: 'error', autoHideDuration: 2000, });                               
        }         
    })
  };
  

  render() {
    const { classes } = this.props;
    const {stats} = this.state;
   
    var id = 0;
    const sampleStats = stats.map(item =>{
        id = id + 1;

        // Status of the sample
        const sampleStatus = item.isPublic ?        
            <PublishIcon className={classes.publicColor} onClick={this.handleSamplePublication(item._id,false,item.sampleId)}/> : <UnPublishIcon className={classes.privateColor} onClick={this.handleSamplePublication(item._id,true,item.sampleId)}/>;         
        
        return (
            <Grid item key={id}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom  >
                           {sampleStatus}
                           {" Replicate " + id}
                           <Typography variant="overline"> 
                            {item.standardGeneName} / {item.featureName} 
                            </Typography>
                           <Typography variant="caption" > 
                            {item.alias}   
                            </Typography>
                            
                           {/* <Typography component="span" variant="subtitle1" gutterBottom>
                           {item.runId} / {item.sampleId} / epitopeTag : {item.epitopeTag} / {item.antibody} 
                            </Typography> */}
                        </Typography>                       
                        <Divider/>
                        <br/>
                            
                        <Grid container spacing={24} direction="column" justify="flex-start">
                            {/* Basic Stats Table */}
                            <Grid item>
                                <Table className={classes.table}>                                   
                                    <TableBody >
                                        {/* Table Header  */}
                                    <TableRow className={classes.borderLine}>
                                        <TableCell className={classes.tableHeader} colSpan={3}>
                                            <Typography variant="overline" gutterBottom className={classes.tableHeader}>
                                               Meta Information
                                            </Typography>
                                        </TableCell>                                        
                                    </TableRow>

                                        {/* Table Content */}
                                        <TableRow  className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                                Assay
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.assayType}</TableCell>
                                        </TableRow>
                                        <TableRow  className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                                Run ID
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.runId}</TableCell>
                                        </TableRow>
                                        <TableRow  className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                                Sample ID
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.sampleId}</TableCell>
                                        </TableRow>
                                        <TableRow  className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                                Epitope Tag
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.epitopeTag}</TableCell>
                                        </TableRow>
                                        <TableRow  className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                                Antibody
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.antibody}</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                                Condition
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.growthMedia} / {item.treatments}</TableCell>
                                        </TableRow>

                                       {/* Second Table section */}
                                        
                                        <TableRow className={classes.borderLine}>
                                            <TableCell className={classes.tableHeader} colSpan={3}>
                                                <Typography variant="overline" gutterBottom className={classes.tableHeader}>
                                                    General Stats
                                                </Typography>
                                            </TableCell>                                        
                                        </TableRow>
                                        <TableRow className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                            Total Sequencing Reads
                                            </TableCell>
                                            <TableCell align="left" colSpan={2} className={classes.borderLine}>{item.totalReads}</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                            Mapped Read count
                                            </TableCell>
                                            <TableCell align="left" className={classes.borderLine}>{item.mappedReads}</TableCell>
                                            <TableCell align="left" className={classes.borderLine}>{item.mappedReadPercent}</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                            Uniquely Mapped Reads 
                                            </TableCell>
                                            <TableCell  className={classes.borderLine}>{item.uniquelyMappedReads}</TableCell>
                                            <TableCell  className={classes.borderLine}>{item.uniquelyMappedPercent}</TableCell>
                                        </TableRow>
                                        <TableRow className={classes.borderLine}>
                                            <TableCell component="th" scope="row">
                                            DeDuplicated Count 
                                            </TableCell>
                                            <TableCell  className={classes.borderLine}>{item.dedupUniquelyMappedReads}</TableCell>
                                            <TableCell  className={classes.borderLine}>{item.deduplicatedPercent}</TableCell>
                                        </TableRow>
                                  
                                    </TableBody>
                                </Table>
                            </Grid> 
                        </Grid>
             
                </CardContent>
            </Card>                                 
        </Grid> 
                   
            
        )
    });


    
    return (
    
        <CardContent className={classes.fullList}>
            <CardActions>
                <Grid container alignItems={"center"} justify={"space-between"}>
                    <Grid item sm={"auto"}>
                        <Tooltip title="Go Back" aria-label="Go Back">
                            <Button size="small" color="primary" onClick={this.props.handleBack} >
                                <ArrowBack/>
                            </Button> 
                        </Tooltip>                                                                            
                    </Grid>  
                    <Grid item sm={"auto"}>
                        <Tooltip title="Simplified ChIP-exo Assays" aria-label="Simplified ChIP-exo Assays">
                            <Button size="small" color="primary" onClick={this.handleProtocolLink}> 
                                PubMed
                                <LaunchIcon className={classes.rightIcon} />
                            </Button>
                        </Tooltip>                        
                    </Grid> 
                                     
                </Grid>   
            </CardActions>
            <Divider/>
            <Grid container spacing={24} direction="row" justify="center" className={classes.statsContainer}>
                    {sampleStats}
            </Grid>
            
        </CardContent>
       
      
    );
  }
}

SampleStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(SampleStats));
