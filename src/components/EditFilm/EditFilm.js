import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class EditFilm extends Component{

  state = {
    id: '',
    title: '',
    poster: '',
    description: '',
    name: ''
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_THIS_FILM`, payload: this.props.match.params.id});
    this.setState(this.props.reduxState[0]); // DOES NOT RUN
  }

  // Set state to input value
  handleChange = (event, propName) => {
    this.setState({
      ...this.state,
      [propName]: event.target.value
    })
  }

  // Dispatch state to Saga, return to details page
  handleClickSave = () => {
    this.props.dispatch({type: `EDIT_FILM`, payload: this.state});
    this.goBack();
  }

  render(){
    return(
      <div className="main-edit-div">
        {JSON.stringify(this.props.reduxState)}
        {JSON.stringify(this.state)}
        {this.props.reduxState.map((film, i)=>
          <div key={i}>
            <input type="text" onChange={(event)=>this.handleChange(event, 'title')} value={this.state.title} />
            <input type="text" onChange={(event)=>this.handleChange(event, 'name')} value={this.state.name} />
            <input type="text" onChange={(event)=>this.handleChange(event, 'poster')} value={this.state.poster} />
            <textarea rows="6" cols="30" onChange={(event)=>this.handleChange(event, 'description')} value={this.state.description}></textarea>
            <Link to={"/details/"+film.id}>
              <button>CANCEL</button>
            </Link>
            <button onClick={this.handleClickSave}>SAVE</button>
          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisFilmReducer
});

export default connect(putReduxStateOnProps)(EditFilm);