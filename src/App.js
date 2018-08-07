import React, { Component } from 'react';
import { Navbar, Button, Carousel, Badge } from 'react-bootstrap';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      api: {
        images: []
      },
      api2: {
        max: []
      },
      votes: 0
    };
    this.upvote = this.upvote.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi() {
    fetch('/.json')
      .then(response => response.json())
      .then(api => this.setState({ api }))
      .catch(err => {
        console.log(err);
    });
    console.log(this.state.api.images);
    fetch('/max')
      .then(response => response.json())
      .then(api2 => this.setState({ api2 }))
      .catch(err => {
        console.log(err);
    });
    console.log(this.state.api2.max);  
  }

  upvote(evt) {
    evt.preventDefault();

    const element = evt.target;
    const name = element.name;
    const value = element.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    console.log(this.state.newState);

    const id = this.props.id
    console.log(this.props.id)

    const updateDog = {
      dog: this.state.api.images,
    }

    fetch('/.json', {
      method: "PUT",
      body: JSON.stringify(1),
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      }
    })
    .then(updateDog => {
      this.fetchApi();
    })
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div className="sidenav">
          <div> 
            <h3> This Weeks Leaders </h3>
          </div>
          <div> 
            <h3> Last Weeks Winner </h3>
          </div>
          <div> 
            <h3> All-time Leader </h3>
            {this.state.api2.max.map((image, index) => {
                return (
                <div className="miniPic" key={index}>
                  <img className="thumbnail" width={200} height={100} alt="900x500" src={image.url} />
                  <p>{image.name}</p>
                  <Badge className="votes">{image.upvotes}</Badge>
                </div>
            )})}
          </div>
        </div>
        <div className="main">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={this.goTo.bind(this, 'home')}>Barkboard</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'leaderboard')}
            >
              Leaderboard
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'all-time')}
            >
              All-Time
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'upload')}
            >
              Upload
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
        <Carousel>
          {this.state.api.images.map((image, index) => {
                return (
                <Carousel.Item key={index}>
                <img width={900} height={300} alt="900x300" src={image.url} />
                <Carousel.Caption>
                    <h3>{image.name}</h3>
                    <Badge className="votes">{image.upvotes}</Badge>
                    <button onClick={this.upvote} className="upvote"> ↑ </button>
                    <button onClick={this.downvote} className="downvote"> ↓ </button>
                </Carousel.Caption>
              </Carousel.Item>
          )})}
        </Carousel>
        </div>
      </div>
    );
  }
}

export default App;
