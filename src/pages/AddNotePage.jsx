import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { addNote } from '../utils/network-data';
import PropTypes from 'prop-types';

function AddNotePageWrapper() {
	const navigate = useNavigate();
	return <AddNotePage navigate={navigate} />;
}

class AddNotePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: '',
		};
	}

	onTitleChange = (event) => {
		this.setState({
			title: event.target.value,
		});
	};

	onBodyChange = (event) => {
		this.setState({
			body: event.target.value,
		});
	};

	onSubmit = (event) => {
		event.preventDefault();

		addNote({
			title: this.state.title,
			body: this.state.body,
		});

		if (!addNote.error) {
			alert('Catatan berhasil');
		}

		this.props.navigate('/');
	};

	render() {
		return (
			<>
				<div className="add-new-page__input">
					<form onSubmit={this.onSubmit}>
						<input
							type="text"
							className="add-new-page__input__title"
							placeholder="Judul catatan..."
							value={this.state.title}
							onChange={this.onTitleChange}
						/>

						<textarea
							className="add-new-page__input__body"
							placeholder="Tulis catatanmu di sini..."
							value={this.state.body}
							onChange={this.onBodyChange}
						/>

						<div className="add-new-page__action">
							<button type="submit" className="action">
								✔
							</button>
						</div>
					</form>
				</div>
			</>
		);
	}
}

AddNotePage.propTypes = {
	navigate: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default AddNotePageWrapper;
