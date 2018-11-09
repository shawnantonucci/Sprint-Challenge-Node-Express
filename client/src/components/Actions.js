import React from "react";
import axios from "axios";
import { StyledLink, Title, ActionList } from '../Styles.js';

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
            <StyledLink to={`/projects`}>Go Back</StyledLink>
          <Title>{this.state.name}</Title>
          {this.state.actions.map(action => {
              return <ActionList key={action.id}>{action.description}</ActionList>
          })}
        </div>
      );
    }
  }
}

export default Actions;