import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderAction() {
		const { id } = this.props.match.params;
		return (
			// React.Fragment tag act like invisible componet and it does't 
			// effects parent dom element style property 
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
				<Link to='/' className="ui button">Cancel</Link>
			</React.Fragment>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return 'Are sure You want to delete this stream';
		} else {
			return `Are sure you want to delete this stream with title : ${this.props.stream.title}`;
		}
	}

	render() {
		return (
			<div>
				StreamDelete
				<Modal
					title='Delete Stream'
					content={this.renderContent()}
					actions={this.renderAction()}
					onDismis={() => history.push('/')}
				/>
			</div>
		);
	}
};

const mapStateToProps = (state, ownprops) => {
	return { stream: state.stream[ownprops.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);