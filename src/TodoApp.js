import React, {Component} from 'react';
import './Todo.css'


export default class TodoApp extends React.Component{
  constructor(props) {
    super(props)
    this.state={ 
      items: [
        {text: "item 1", done: false, key: new Date().getMilliseconds() + 1},
        {text: "item 2", done: false, key: new Date().getMilliseconds() + 2},
        {text: "item 3", done: false, key: new Date().getMilliseconds() + 3},
        {text: "item 4", done: false, key: new Date().getMilliseconds() + 4}
      ],
      input : ''
    }
  }

  move = (key) => {
    let filtered = this.state.items.map(item => {
      if (item.key == key) {
        item.done = !item.done;
      }
      return item
    })
    this.setState({items: filtered})
  }

  add = () => {
    let newItem = {text: this.state.input, done: false, key: new Date().getMilliseconds()};
    this.setState((state) => ({
      items: [newItem].concat(state.items)
    }))
    this.state.input = ""
  }

  handleChange = (event) => {
    this.setState({input: event.target.value})
  }

  getUndone = () => {
    let undone = this.state.items.filter(item => {
      return !item.done
    })
    if (!undone.length){
      return
    }
    return (undone.length + " taches restantes")
  }

  delet = (key) => {
    let filtered = this.state.items.filter(item => {
      return item.key != key
    })
    this.setState({items: filtered})
  }

  render(){
    return(
      <div className="container">
        <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">Ma todo liste</span>
        </nav>
        <br/>
        <div className="row">
          <div className="col-md-6">
            <div className="todolist">
              <form onSubmit={(event) => {event.preventDefault(); this.add()}}>
                <input placeholder="Ajouter une tache" 
                className="form-control form-control-lg"
                value={this.state.input} 
                onChange={(event) => this.handleChange(event)} />
                
              </form><br />
              <ul className="no-padding" id="not-done">
                {
                  this.state.items.map(item => {
                    if (!item.done){
                      return(
                        <li className="list-unstyled" key={item.key}>
                          <label onClick={() => this.move(item.key)}>{item.text} </label>
                        </li>
                      )
                    }
                  })
                }
              </ul>
              <div className="todo-footer">
                <span>{this.getUndone()}</span> 
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="todolist">
              <ul id="done-items">
                {
                  this.state.items.map(item => {
                    if (item.done){
                      return(
                        <li className="list-unstyled b-b" key={item.key}> 
                        <label onClick={() => this.move(item.key)}>{item.text} </label>
                        <button className="btn float-right paddingZero" onClick={event => this.delet(item.key)}><i class="fas fa-trash"></i></button>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
