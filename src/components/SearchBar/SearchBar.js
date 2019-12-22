import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SearchBar extends Component{

  state = {
    search: ''
  }

  // Set state to input value
  handleChange = (event) => {
    this.setState({
      search: event.target.value
    });
  }

  // Dispatch state to saga for GET
  handleClick = () => {
    this.props.dispatch({type: `SEARCH_FILM`, payload: this.state.search});
  }

  render(){
    return(
      <>
        <Link to={"/add"}>
          <Button variant="contained" color="primary" style={{marginRight:"50px"}}>
            Add new films and genres
          </Button>
        </Link>

        <TextField id="standard-basic" 
          label="search" 
          className="search-in inputs"
          onChange={(event)=>this.handleChange(event)}
          value={this.state.search}/>

        <Link to={"/results"}>
          <Fab onClick={this.handleClick} color="primary" aria-label="search">
            <SearchIcon />
          </Fab>
        </Link>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(SearchBar);