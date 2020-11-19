import React, { Component } from 'react';
import Home from './Home';
class First extends Component {
    constructor(){
      super();
      this.state ={
        users: ['abc',"pdsa","eccs","koi"],
        input: '',
      }
    }
  
    onChangeHandler(e){
      this.setState({
        input: e.target.value,
      })
    }
  
    render (){
        const list = this.state.users
          .filter(d => this.state.input === '' || d.includes(this.state.input))
          .map((d, index) => <li key={index}>{d}</li>);
  
      return (<div>
        <input value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)}/>
          <ul>{list}</ul>
    
        </div>)
    }
  }

  export default First;