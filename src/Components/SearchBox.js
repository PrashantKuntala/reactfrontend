/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

// retrieve app configuration settings
import Config from '../Config';


const styles = theme => ({
  root: {    
    // border: '1px solid green',
    flexGrow: 1,
    height: 0,
    // minWidth: 980
  },
  input: {
    display: 'flex',
    padding: 0,
    border: `1px solid ${theme.palette.primary[300]}`,    
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  }, 
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 999,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
      
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >    
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class SearchBox extends React.Component {
  state = {
    single: "",
    suggestions : [],
  };

// life-cycle methods
componentDidMount(){

  // creating the url
  let dataURL = Config.settings.apiURL + Config.settings.samplesEndpoint ;

  // creating the aliasURL
  let aliasURL = Config.settings.apiURL + Config.settings.aliasesEndpoint + "/" + Config.settings.siteAvailability ;

  // api call to retrieve all data
  axios.get(dataURL)
      .then(res =>{
                  
          // extract unique sample names
          const unique = [...new Set(res.data.samples.map(sample => {
            return sample.standardGeneName + " / "+ sample.featureName
            } ))];
         
          // creating the suggestions on a sorted list
          var suggestions = unique.sort().map(suggestion => ({
            category: "standardGeneName",
            value: suggestion,
            label: suggestion,
          }));
          
          // to store alias as suggestions
          let aliasSuggestions = []

          // making an api call to aliases endpoint
          axios.get(aliasURL)
          .then(res =>{            
            let aliasData = res.data.aliases;

            // creating the suggestions
            for(let alias in res.data.aliases){
              let temp = {
                category: "alias",
                value : alias + " / "+ aliasData[alias],
                label: alias 
              }
              aliasSuggestions.push(temp)     
            }
            // console.log(aliasSuggestions);

            // set the state with all suggestions
            this.setState({
              suggestions: suggestions.concat(aliasSuggestions)
            });

          });
          
      });  
      
      // Setting the title of the browser tab
      document.title = "Yeast Epigenome Project | YEP"
}

  handleChange = name => value => {
    this.setState({
        [name]: value,
      });

    //Do nothing when the value is null
      if(!value){
        console.log(value);
      }
      else{
        // Resolve the sample page based on category of the suggestions
        if (value.category === "standardGeneName"){
          let url = Config.settings.appURL + "/" + value.label.split(' / ')[0];
          window.open(url, '_blank');
        }
        else{        
         let url = Config.settings.appURL + "/" + value.value.split(' / ')[1];
          window.open(url, '_blank');
        }
        
      }
   
  };



  render() {
    const { classes, theme } = this.props;
    const {suggestions} = this.state;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>        
          <Select
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder="Search your favourite factor"
            isClearable
            autoFocus
          />
        </NoSsr>
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SearchBox);
