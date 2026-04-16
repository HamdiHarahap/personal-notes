import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

class NoteList extends React.Component {
	render() {
		const { notes } = this.props;

		return (
			<div className="notes-list">
				{notes.length > 0 ? (
					notes.map((note) => (
						<NoteItem
							key={note.id}
							id={note.id}
							title={note.title}
							createdAt={note.createdAt}
							body={note.body}
						/>
					))
				) : (
					<div className="notes-list-empty">
						<p>Tidak ada catatan</p>
					</div>
				)}
			</div>
		);
	}
}

NoteList.propTypes = {
	notes: PropTypes.array.isRequired,
};

export default NoteList;
