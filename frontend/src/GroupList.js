import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {lists: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/commonjob/lists')
      .then(response => response.json())
      .then(data => this.setState({lists: data, isLoading: false}));
  }

  async remove(jobId) {
    await fetch(`http://localhost:8080/commonjob/list${jobId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedLists = [...this.state.lists].filter(i => i.jobId !== jobId);
      this.setState({lists: updatedLists});
    });
  }

  render() {
    const {lists, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const groupList = lists.map(list => {
      // const address = `${list.jobId || ''} ${list.jobCode || ''} ${list.contactEmail || ''}`;
      return <tr key={list.jobId}>
        <td style={{whiteSpace: 'nowrap'}}>{list.jobCode}</td>
        <td style={{whiteSpace: 'nowrap'}}>{list.contactEmail}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/lists/" + list.jobId}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(list.jobId)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/lists/new">Add Job</Button>
          </div>
          <h3>Job Management</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Job Code</th>
              <th width="20%">Email</th>
              <th width="10%">Actions</th>
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

export default GroupList;