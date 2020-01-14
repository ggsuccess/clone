import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import './StreamList.css';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdmin(stream) {
    if (stream.userId === this.props.currUserId) {
      return (
        <div>
          <button className="editBtn">Edit</button>
          <button className="deleteBtn">Delete</button>
        </div>
      );
    }
  }
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <div className="content">{stream.title}</div>
          <div className="description">{stream.description}</div>
          {this.renderAdmin(stream)}
          <hr />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2 className="header">Streams</h2>
        <div className="list">{this.renderList()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currUserId: state.auth.userId
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
