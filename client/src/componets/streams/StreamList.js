import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentuserId) {
			return (
				<div className="right floated content">
					<Link to={`/stream/edit/${stream.id}`} className="ui button primary">
						Edit
          			</Link>
					<Link to={`/stream/delete/${stream.id}`} className="ui button negative">Delete</Link>
				</div>
			);
		}
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: "right" }}>
					<Link to="/stream/new" className="ui button primary">
						Create Stream
          </Link>
				</div>
			);
		}
	}

	renderList(streams) {
		// console.log(streams);
		return streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/stream/${stream.id}`}>
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}
	render() {
		return (
			<div>
				<h2>All Stream</h2>
				<div className="ui celled list">
					{this.renderList(this.props.streams)}
				</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.stream),
		currentuserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);