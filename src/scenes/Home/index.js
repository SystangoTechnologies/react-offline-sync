import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import './style.scss';
import { getList, getPosts } from '../../actions/actionGetOrders';
import Post from '../Post';
import { ToastContainer } from 'react-toastify';
import withPendingRequest from '../../hoc';
import 'react-toastify/dist/ReactToastify.min.css';

class Home extends React.PureComponent {
  render() {
    const { postData, listData, getPost, getList } = this.props;
    const posts = postData ? postData : [];
    const list = listData ? listData : [];
    return (
      <React.Fragment>
        <ToastContainer
        />
        <Container className="headerContainer">
          <Row>
            <div className="header"><h1>React Offline Sync</h1></div>
          </Row>
        </Container>
          <Row>
            <Col xs="2"></Col>
            <Col xs="4">
              <Button color="primary" onClick={getPost}><h1>API First</h1></Button>
            </Col>
            <Col xs="3">
              <Button color="primary" onClick={getList}><h1>API Second</h1></Button>
            </Col>
          </Row>
        <Row>
          <Col xs="2"></Col>
          <Col xs="4">
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
              : <h3>Something went wrong</h3> }
            </div>
          </Col>
          <Col xs="4">
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
              : <h3>Something went wrong</h3> }
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
  };
}

function mapDispatchToProps(dispatch) {
  return({
    getPost: () => dispatch(getPosts()),
    getList: () => dispatch(getList())
  });
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withPendingRequest(Home));

export default HomeContainer;