import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { getPendingRequests } from '../actions/actionGetOrders';
import { clearPendingRequest } from '../actions/actionClearRequest';

const withPendingRequest = (WrappedComponent) => {
  return class ComponentEnhancer extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const {
        pendingRequest,
        getPendingRequest
      } = this.props;
      window.addEventListener("online", () => this.listener(this.props));
    }

    listener() {
      const ol = navigator.onLine;
      if (ol) {
        const {
          pendingRequest,
          getPendingRequest
        } = this.props;
        let pr = pendingRequest ? pendingRequest : [];
        const requests = JSON.parse(localStorage.getItem('requests'));
        if (requests.length > 1 && pendingRequest.length <= requests.length) {
          pr = requests;
        }
        pr.filter((index) => index.pending == true).map((index) => {
          getPendingRequest(index.type, index.url, index.data);
        });
        pendingRequest && pendingRequest.filter(index => index.pending == false).map(() => this.clearRequest());
        toast.success('You are now Online', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
    clearRequest() {
      const {
        pendingRequest,
        clearPendingRequest
      } = this.props;
      let errors = pendingRequest ? pendingRequest : [];
      errors.map((index) => {
        if (index.pending == false) {
          clearPendingRequest(index);
        }
      });
      return null;
    }
    componentDidUpdate() {
      if(this.props.pendingRequest.length > 0){
        this.clearRequest();
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}

function mapStateToProps(state) {
    return {
      pendingRequest: state.orders.pendingRequest,
      error: state.orders.error,
      success: state.orders.success,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return({
      getPendingRequest: (type, url, data) => dispatch(getPendingRequests(type, url, data)),
      clearPendingRequest: (index) => dispatch(clearPendingRequest(index)),
    });
  }

export default compose(connect(mapStateToProps, mapDispatchToProps), withPendingRequest);