import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";

import Projects from "./components/Projects.js";
import Actions from "./components/Actions.js";

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
      .get("http://localhost:8000/api/projects")
      .then(response => this.setState({ projects: response.data }))
      .catch(error => console.log(error));

    axios
      .get("http://localhost:8000/api/actions")
      .then(response => this.setState({ actions: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/api/projects"
          render={props => <Projects {...props} projects={this.state.projects} />}
        />
        <Route path="/api/actions/:id" render={props => <Actions {...props} />} />
      </div>
    );
  }
}

export default App;
