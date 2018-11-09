import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import Projects from "./components/Projects.js";
import Actions from "./components/Actions.js";

let url = process.env === 'development' ? 'http://localhost:8000' : 'https://shawn-node-express-app.herokuapp.com'
require('dotenv').config()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      actions: []
    };
  }

  componentDidMount() {
    axios
      .get(url)
      .then(response => this.setState({ projects: response.data }))
      .catch(error => console.log(error));

    axios
      .get(url)
      .then(response => this.setState({ actions: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <Projects {...props} projects={this.state.projects} />}
        />
        <Route path="/actions/:id" render={props => <Actions {...props} />} />
      </div>
    );
  }
}

export default App;
