import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
	getNote,
	deleteNote,
	archiveNote,
	unarchiveNote,
} from '../utils/network-data';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
	const { id } = useParams();
	const navigate = useNavigate();

	return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			note: null,
			loading: true,
		};
	}

	componentDidMount() {
		getNote(this.props.id).then(({ data }) => {
			this.setState({
				note: data,
				loading: false,
			});
		});
	}

	handleDelete = async () => {
		await deleteNote(this.props.id);

		this.props.navigate('/');
	};

	handleArchive = async () => {
		await archiveNote(this.props.id);

		this.props.navigate('/');
	};

	handleUnArchive = async () => {
		await unarchiveNote(this.props.id);

		this.props.navigate('/');
	};

	render() {
		const { note } = this.state;

		if (this.state.loading) {
			return <p>Loading...</p>;
		}

		if (!note) {
			return (
				<div className="notes-list-empty">
					<h2>Catatan tidak ditemukan</h2>
					<p>ID yang kamu akses tidak tersedia</p>
				</div>
			);
		}

		const { title, createdAt, body } = note;

		return (
			<>
				<div className="detail-page">
					<h1 className="detail-page__title">{title}</h1>
					<p className="detail-page__createdAt">{createdAt}</p>
					<div className="detail-page__body">{body}</div>
				</div>

				<div className="detail-page__action">
					<div
						className="action"
						onClick={note.archived ? this.handleUnArchive : this.handleArchive}
					>
						<img src="/archive-up.svg" alt="" className="w-5" />
					</div>
					<div className="action" onClick={this.handleDelete}>
						<img src="/trash.svg" alt="" className="w-5" />
					</div>
				</div>
			</>
		);
	}
}

DetailPage.propTypes = {
	id: PropTypes.string.isRequired,
	navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
