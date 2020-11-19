import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AddWord extends Component {
    emptyItem = {
    dictionaryId: '',
    englishWord: '',
    kanji: '',
    hiragana: '',
    englishpronunciation: '',
    onyomi: '',
    kunyomi: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const list = await (await fetch(`http://localhost:8080/learn/list${this.props.match.params.id}`)).json();
      this.setState({item: list});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    await fetch('http://localhost:8080/learn/list', {
      method: (item.dictionaryId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/lists');
  }

  render() {
    const item = this.state;
    const title = <h2>{item.dictionaryId ? 'Edit Group' : 'Add Word'}</h2>;
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="englishWord">English Word</Label>
            <Input type="text" name="englishWord" id="englishWord" 
                   onChange={this.handleChange} autoComplete="englishWord"/>
          </FormGroup>
          <FormGroup>
            <Label for="kanji">Kannji</Label>
            <Input type="text" name="kanji" id="kanji"
                   onChange={this.handleChange} autoComplete="kanji"/>
          </FormGroup> 
          <FormGroup>
            <Label for="hiragana">Hiragana</Label>
            <Input type="text" name="hiragana" id="hiragana"
                   onChange={this.handleChange} autoComplete="hiragana"/>
          </FormGroup> 
          <FormGroup>
            <Label for="englishpronunciation">English Pronunciation</Label>
            <Input type="text" name="englishpronunciation" id="englishpronunciation"
                   onChange={this.handleChange} autoComplete="englishpronunciation"/>
          </FormGroup>   
          <FormGroup>
            <Label for="onyomi">Onyomi</Label>
            <Input type="text" name="onyomi" id="onyomi"
                   onChange={this.handleChange} autoComplete="onyomi"/>
          </FormGroup>
          <FormGroup>
            <Label for="kunyomi">Kunyomi</Label>
            <Input type="text" name="kunyomi" id="kunyomi"
                   onChange={this.handleChange} autoComplete="kunyomi"/>
          </FormGroup>     
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/lists">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(AddWord);