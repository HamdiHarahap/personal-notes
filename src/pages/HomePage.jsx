import React from 'react';
import NoteList from '../components/NoteList';
import { getActiveNotes } from '../utils/network-data';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import LocaleContext from '../context/LocaleContext';

class HomePage extends React.Component {
	static contextType = LocaleContext;
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			filteredNotes: [],
			loading: true,
		};
	}

	handleSearch = (keyword) => {
		const filteredNotes = this.state.notes.filter((note) =>
			note.title.toLowerCase().includes(keyword.toLowerCase())
		);

		this.setState({ filteredNotes });
	};

	componentDidMount() {
		getActiveNotes().then(({ data }) => {
			this.setState({ notes: data, filteredNotes: data, loading: false });
		});
	}

	render() {
		const { locale } = this.context;
		if (this.state.loading) return <p>Loading...</p>;

		return (
			<>
				<h1>{locale == 'id' ? 'Catatan Aktif' : 'Active Notes'}</h1>
				<SearchBar onSearch={this.handleSearch} page={'active'} />
				<NoteList notes={this.state.filteredNotes} />
				<div className="homepage__action">
					<Link to="/notes/new">
						<button className="action">+</button>
					</Link>
				</div>
			</>
		);
	}
}

export default HomePage;
