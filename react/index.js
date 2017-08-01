import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './index.less';

let i = 0;
const uuid = () => ++i;

const Taco = ({ taco, onRemove }) => (
  <div className="Taco">
    <h1>{taco.name}</h1>
    <button className="btn btn-default" onClick={() => onRemove(taco.id)}>remove</button>
  </div>
);

const TacoRoute = ({ tacos, onRemove }) => (
  <Route
    path="/taco/:id"
    render={({ match }) => {
      const id = Number(match.params.id);
      const taco = tacos.find(v => v.id === id);
      return taco ? <Taco taco={taco} onRemove={onRemove} /> : null;
    }}
  />
);

class App extends Component {
  static propTypes = {
    history: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      tacos: []
    };
  }
  addTaco() {
    const name = prompt('taco name?');
    const { tacos } = this.state;
    this.setState({
      tacos: [...tacos, { id: uuid(), name }]
    });
  }
  removeTaco(id) {
    const { tacos } = this.state;
    const { history } = this.props;
    this.setState({
      tacos: tacos.filter(v => v.id !== id)
    });
    history.push('/');
  }
  render() {
    const { tacos } = this.state;
    const links = tacos.map(taco => (
      <li key={taco.id}>
        <Link to={`/taco/${taco.id}`}>{taco.name}</Link>
      </li>
    ));
    return (
      <div className="container">
        <nav className="nav">
          <button className="btn btn-default" onClick={() => this.addTaco()}>Add Taco</button>
          <ul className="Master">
            {links}
          </ul>
        </nav>
        <div className="main-wrap">
          <TacoRoute tacos={tacos} onRemove={id => this.removeTaco(id)} />
        </div>
      </div>
    )
  }
}

render((
  <Router>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('example'));
