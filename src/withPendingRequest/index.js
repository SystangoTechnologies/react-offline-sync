import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { getPendingRequests } from '../actions/actionGetOrders';
import { clearPendingRequest } from '../actions/actionClearRequest';

const withPendingRequest = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
              localStatus: true 
            }
        }

        componentDidMount() {
            setInterval(()=> {
              if(navigator.onLine) {
                const { pendingRequest, getPendingRequest } = this.props;
                let pr = pendingRequest ? pendingRequest : [];
                pr.map((index)=> {
                  getPendingRequest(index.type, index.url);
                });
              }
            }, 10000);
          }
      
          showOnlineToast = () => {
            if(this.state.localStatus)
            toast.success('You are now Online', {
              position: "top-right",
              autoClose: 5000,
            })
          }

          static getDerivedStateFromProps(nextProps, prevState) {
            if(!prevState.localStatus && prevState.localStatus !== navigator.onLine && nextProps.pendingRequest.length > 0) {
              const localStatus = !prevState.localStatus;
              return {
                localStatus
              };
            }
            else {
              return {
                localStatus: false
              }
            }
          }

          componentDidUpdate() {
            const { pendingRequest, clearPendingRequest } = this.props;
            let errors = pendingRequest ? pendingRequest : [];
            errors.map((index) => {
              if(index.pending == false) {
                clearPendingRequest(index);
              }
            });
          }

        render() {
          return <React.Fragment>{this.showOnlineToast()}<WrappedComponent {...this.props}/></React.Fragment>
        }
    }
}
function mapStateToProps(state) {
    return {
      pendingRequest: state.orders.pendingRequest,
      error: state.orders.error
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return({
      getPendingRequest: (type, url) => dispatch(getPendingRequests(type, url)),
      clearPendingRequest: (index) => dispatch(clearPendingRequest(index)),
    });
  }

export default compose(connect(mapStateToProps, mapDispatchToProps), withPendingRequest);