import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import './style.scss';
import { getList, getPosts, addForm, getForm } from '../../actions/actionGetOrders';
import Post from '../Post';
import { ToastContainer } from 'react-toastify';
import withPendingRequest from '../../withPendingRequest';
import 'react-toastify/dist/ReactToastify.min.css';
import { ScaleLoader } from 'react-spinners';

class Home extends React.PureComponent {
  state = {
    name: ''
  };

  componentDidUpdate() {
    this.props.id && this.props.getForm();
  }
  render() {
    const { postData, listData, getPost, getList, addForm, id } = this.props;
    const posts = postData ? postData : [];
    const list = listData ? listData : [];
    const localName = `Name: ${this.props.name}`;
    if(this.props.isLoading) 
      return(
        <div className="loader">
          <ScaleLoader
            sizeUnit={"px"}
            size={20}
            color={'#123abc'}
            loading={navigator.onLine}
          />
        </div>
      ); 
    return (
      <React.Fragment>
        <ToastContainer
        />
        <Container className="headerContainer">
          <Row>
            <div className="header"><h1>React Offline Sync</h1></div>
          </Row>
          <Row>
            <div className="header">
              <h2>You must go offline to see offline-sync in action</h2>
            </div>
          </Row>
          <Row>
          <Col xs="5"></Col>
          <Col xs="2">
            
          </Col>
            <Col xs="5"></Col>
          </Row>
        </Container>
          <Row>
            <Col xs="1"></Col>
            <Col xs="3">
              <Button color="primary" onClick={getPost}><h1>API First</h1></Button>
            </Col>
            <Col xs="3">
              <Button color="primary" onClick={getList}><h1>API Second</h1></Button>
            </Col>
            <Col xs="4">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={this.state.name} 
              onChange={(event) => this.setState({name: event.target.value})}
            />
            <Button 
              onClick={() => addForm(this.state.name)}
            >ADD</Button> &nbsp;
             {
               this.props.name && localName
             }
          </Col>
          </Row>
        <Row>
          <Col xs="1"></Col>
          <Col xs="3">
            <div className="home">
              {posts.length > 0 ? posts.map(post => {
                return (
                  <Post
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                  />
                )
              })  
              : <h3>Click Button to hit the API</h3> }
            </div>
          </Col>
          <Col xs="3">
            <div className="home">
              {list.length > 0 ? list.map(user => {
                return (
                  <Post
                    key={user.id} 
                    title={user.name} 
                    author={user.username}
                  />
                )
              })  
              : <h3>Click Button to hit the API</h3> }
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}



function mapStateToProps(state) {
  return {
    postData: state.orders.postsData,
    listData: state.orders.listData,
    id: state.orders.id,
    name: state.orders.name,
    isLoading: state.orders.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return({
    getPost: () => dispatch(getPosts()),
    getList: () => dispatch(getList()),
    addForm: (data) => dispatch(addForm(data)),
    getForm: () => dispatch(getForm())
  });
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withPendingRequest(Home));

export default HomeContainer;