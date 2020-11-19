import React, { Component} from 'react';
import './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink } from "react-csv";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {lists: [], input: '', isLoading: true, isOpen: false, showModal: 0}
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch('http://localhost:8080/learn/lists')
      .then(response => response.json())
      .then(data => this.setState({lists: data, isLoading: false})); 
  }
          getModal = value => {
            this.setState({ showModal: value });
            console.log(value);
          };

          hideModal = value => {
            this.setState({ showModal: 0 });
          };

          onChangeHandler(e){
            this.setState({
              input: e.target.value,
            })
          }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  render() {
    const prettyLink  = {
      backgroundColor: '#8dc63f',
      fontSize: 14,
      fontWeight: 500,
      height: 52,
      padding: '0 48px',
      borderRadius: 5,
      color: '#fff'
    };
    const {lists, isLoading} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }  
    const listItems = lists.filter(player =>
      player.englishWord.toLowerCase().includes(this.state.input.toLowerCase()) 
      || player.englishpronunciation.toLowerCase().includes(this.state.input.toLowerCase()) 
      || player.kanji.toLowerCase().includes(this.state.input.toLowerCase()) 
      || player.hiragana.toLowerCase().includes(this.state.input.toLowerCase())); 
    console.log(listItems)
    const groupList = lists
    .filter(player =>
      player.englishWord.toLowerCase().includes(this.state.input.toLowerCase()) 
      || player.englishpronunciation.toLowerCase().includes(this.state.input.toLowerCase()) 
      || player.kanji.toLowerCase().includes(this.state.input.toLowerCase()) 
      || player.hiragana.toLowerCase().includes(this.state.input.toLowerCase()))
    .map(list => {
      return <tr key={list.dictionaryId}>
        <td style={{whiteSpace: 'nowrap'}}>{list.englishWord}</td>
        <td style={{whiteSpace: 'nowrap'}}>{list.kanji}</td>
        <td style={{whiteSpace: 'nowrap'}}>{list.hiragana}</td>
        <td style={{whiteSpace: 'nowrap'}}>{list.englishpronunciation}</td>
        <td style={{whiteSpace: 'nowrap'}}>{list.onyomi}</td>
        <td style={{whiteSpace: 'nowrap'}}>{list.kunyomi}</td>
        <td>   
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={() => this.getModal(list.dictionaryId)}>Details</Button>
          </ButtonGroup>
       <Modal show={this.state.showModal === list.dictionaryId} onHide={this.hideModal}  className="my-modal" size='lg'>
              <Modal.Header closeButton>
                <Modal.Title>Details of this Word</Modal.Title>
              </Modal.Header>
              <Modal.Body>    
            <Table className="mt-4">
            <thead> 
            <tr>
              <th width="20%">Engliah Word</th>
              <th width="20%">Kanji</th>
              <th width="20%">Hiragana</th>
              <th width="20%">Pronunciation</th>
              <th width="20%">Onyomi</th>
              <th width="20%">Kunyomi</th>
            </tr>
            </thead>
            <tbody>
            <td>{list.englishWord}</td>
            <td>{list.kanji}</td>
            <td>{list.hiragana}</td>
            <td>{list.englishpronunciation}</td>
            <td>{list.onyomi}</td>
            <td>{list.kunyomi}</td>
            </tbody>
          </Table>
          <Table className="mt-4">
            <thead> 
            <tr>
              <th width="20%">Onyomi</th>
            </tr>
            </thead>
            <tbody>
            <td>{list.example}</td>
            </tbody>
          </Table>
          <Table className="mt-4">
            <thead> 
            <tr>
              <th width="20%">Kunyomi</th>
            </tr>
            </thead>
            <tbody>
            <td>{list.example}</td>
            </tbody>
          </Table>
          <Table className="mt-4">
            <thead> 
            <tr>
              <th width="20%">Example</th>
            </tr>
            </thead>
            <tbody>
            <td>{list.example}</td>
            </tbody>
          </Table>
            </Modal.Body>
              <Modal.Footer>
                 <Button variant="secondary" onClick={this.hideModal}>
                  Close
                 </Button>
              </Modal.Footer>
        </Modal>
        </td>
      </tr>
    });

    return (
      <div className="main">
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/lists/new">Add Word</Button>
          </div>
          <div className="search-button">
            <input id="input-size" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)} placeholder="English, Japanese, Romaji, words or text"/>
            <i class="fa fa-search" id="search-size"></i>
          </div>
          <div>
            <span><CSVLink data={listItems} style={prettyLink}>CSV ⬇</CSVLink></span>
          </div>
          <Table className="mt-4">
            <thead> 
            <tr>
              <th width="20%">Engliah Word</th>
              <th width="20%">Kanji</th>
              <th width="20%">Hiragana</th>
              <th width="20%">English Pronunciation</th>
              <th width="20%">Onyumi</th>
              <th width="20%">Konyomi</th>
              <th width="20%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {groupList} 
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Home;