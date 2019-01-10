import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TrackHubIcon from '@material-ui/icons/AssessmentOutlined';
import CardActions from '@material-ui/core/CardActions';
import PublicIcon from '@material-ui/icons/PublicOutlined';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import { Card } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    fullList: {
        width: 'auto',
        height: 900,        
        // backgroundColor: "#a0a0a0",
        // height: 500
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
        marginTop: 2
      },      
      rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20,
      },
      tableHeader:{
        color: '#fff',
        backgroundColor: "#607d8b",
        border: `2px solid #607d8b`,
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
    publicCheckedList: [],
  };

  handleProtocolLink = () => {
    let url = "https://www.ncbi.nlm.nih.gov/pubmed/30030442"
    let prtWin = window.open(url, '_blank');
    prtWin.focus();
  }

  handleSamplePublication = () => {
    console.log("Handling sample Publication");
    
  };

  render() {
    const { classes } = this.props;
    // you can use Lodash filter function to filter out
    // This can be simplified even more if the model is updated to contain stats, codingImages, nonCodingImages and MemeImages
    // https://stackoverflow.com/questions/35182904/filtering-array-of-objects-with-lodash-based-on-property-value
    var id = 0;
    const sampleStats = this.props.stats.map(item =>{
        id = id + 1;

        // Status of the sample
        const sampleStatus = item.isPublic ?  
        <Tooltip title="Public Sample" aria-label="Public Sample">
            <PublicIcon className={classes.publicColor}/> 
        </Tooltip> : 
        <Tooltip title="Private Sample" aria-label="Private Sample">
            <PublicIcon className={classes.privateColor}/>
        </Tooltip>;

        // Showing treatments
        const sampleTreatment = item.treatments === 'Normal' ? <PublicIcon className={classes.publicColor}/> : <PublicIcon className={classes.privateColor}/>;
        
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
                            <Grid item >
                                <Tooltip title="Publish Sample" aria-label="Publish Sample">
                                    <Button size="small" color="primary" onClick={this.handleSamplePublication} >
                                        Publish
                                    </Button> 
                                </Tooltip>
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

export default withStyles(styles)(SampleStats);
