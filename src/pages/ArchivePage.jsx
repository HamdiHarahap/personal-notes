import React from 'react';
import MainLayout from '../layouts/MainLayout';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import LocaleContext from '../context/LocaleContext';

class ArchivePage extends React.Component {
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
		getArchivedNotes().then(({ data }) => {
			this.setState({ notes: data, filteredNotes: data, loading: false });
		});
	}

	render() {
		const { locale } = this.context;
		if (this.state.loading) return <p>Loading...</p>;

		return (
			<>
				<h1>{locale == 'id' ? 'Catatan Arsip' : 'Archive Notes'}</h1>
				<SearchBar onSearch={this.handleSearch} page={'archive'} />
				<NoteList notes={this.state.filteredNotes} />
			</>
		);
	}
}

export default ArchivePage;
