import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      actions: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchAction(id);
  }

  fetchAction = id => {
    axios
      .get(`http://localhost:8000/api/projects/${id}`)
      .then(response => {
        this.setState(() => ({ name: response.data.name }));
      })
      .catch(error => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8000/api/actions/${id}?id=${id}`)
      .then(response => {
        console.log(response)
        this.setState(() => ({ actions: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchAction(newProps.match.params.id);
    }
  }

  render() {
    if (!this.state.name && !this.state.actions) {
      return <h2>Loading data...</h2>;
    } else {
      return (
        <div>
            <Link to={`/projects`}>Go Back</Link>
          <h1>{this.state.name}</h1>
          {this.state.actions.map(action => {
              return <p key={action.id}>{action.description}</p>
          })}
        </div>
      );
    }
  }
}

export default Actions;