import React, { Component } from 'react';
import Column from '../Column';
import SearchField from '../SearchField';
import SearchResult from '../SearchResult';
import { SearchAll } from '../../Actions/Record';

class Content extends Component {
  state = {
    search: '',
    result: [],
    time: 0,
    loading: false,
  };

  render() {
    const { search, result, time, loading } = this.state;
    
    return (
      <Column>
        <SearchField onSearch={this.handleSearch} loading={loading} fullWidth label="Cerca" />
        <SearchResult search={search} result={result} time={time} />
      </Column>
    );
  }

  handleSearch = search => {
    if (search.trim() === '') {
      this.setState({
        search: '',
        result: [],
      });
      return;
    }

    this.startTime = +new Date();

    this.setState({
      search,
      loading: true,
    });

    SearchAll(search)
      .then(result => {
        this.setState({ loading: false, time: +new Date() - this.startTime, result });
      })
      .catch(err => {
        console.error(err);
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
        this.setState({
          loading: false,
          result: [],
        });
      });
  };
}

export default Content;
