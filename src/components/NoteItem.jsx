import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteItem(props) {
	const { id, title, createdAt, body } = props;
	return (
		<div className="note-item">
			<Link to={`/notes/${id}`} className="note-item__title">
				{title}
			</Link>
			<p className="note-item__createdAt">{createdAt}</p>
			<p className="note-item__body">{body}</p>
		</div>
	);
}

NoteItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default NoteItem;
