import React, { Component } from 'react';
import { render } from 'react-dom';
import './base.less';
import style from './index.less';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div className={style.normal}>
        <h3 className={style.title}>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input className={style.input} onChange={this.handleChange} value={this.state.text} />
          <button className="btn">{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className={style.list}>
        {this.props.items.map(item => (
          <li className={style.item} key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

render(<TodoApp />, document.getElementById('root'));
