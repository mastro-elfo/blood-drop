import React, { Component } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ReactAutosuggest from 'react-autosuggest';

class Autosuggest extends Component {
  state = {
    suggestions: [],
  };

  render() {
    const { TextFieldProps, value, classes } = this.props;
    const { suggestions } = this.state;

    return (
      <ReactAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={SuggestionItem}
        onSuggestionSelected={this.handleSuggestionSelected}
        inputProps={{
          value,
          onChange: this.handleChange,
          inputRef: el => (this.anchorEl = el),
          TextFieldProps,
        }}
        renderInputComponent={InputComponent}
        theme={{
          container: classes.AutosuggestContainer,
          suggestionsList: classes.SuggestionsList,
        }}
        renderSuggestionsContainer={options =>
          SuggestionsContainer({ ...options, anchorEl: this.anchorEl })
        }
      />
    );
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    const { suggestionList } = this.props;

    this.setState({
      suggestions:
        suggestionList.filter(item => {
          const matches = match(item, value);
          return matches.length > 0;
        }) || [],
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (e, { newValue }) => {
    // this.setState({ value: newValue });
    this.props.onChange({ target: { value: newValue } });
  };

  handleSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method },
  ) => {
    this.setState({ value: suggestionValue });
    this.props.onChange({ target: { value: suggestionValue } });
  };

  getSuggestionValue = suggestion => {
    return suggestion;
  };
}

function SuggestionItem(suggestion, { isHighlighted }) {
  return (
    <MenuItem component="div" selected={isHighlighted}>
      {suggestion}
    </MenuItem>
  );
}

function InputComponent(inputProps) {
  const { TextFieldProps, value, inputRef, ref, ...other } = inputProps;
  return (
    <TextField
      value={value}
      {...TextFieldProps}
      InputProps={{
        inputRef: node => {
          inputRef(node);
          ref(node);
        },
      }}
      inputProps={{
        ...other,
      }}
    />
  );
}

function SuggestionsContainer({ containerProps, children, query, anchorEl }) {
  return (
    <Popper anchorEl={anchorEl} open={!!children}>
      <Paper square {...containerProps} style={{ width: anchorEl ? anchorEl.clientWidth : null }}>
        {children}
      </Paper>
    </Popper>
  );
}

const style = theme => ({
  AutosuggestContainer: {
    flexGrow: 1,
  },
  SuggestionsList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
});

export default withStyles(style)(Autosuggest);
