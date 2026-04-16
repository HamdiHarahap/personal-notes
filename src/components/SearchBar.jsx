import React from 'react';
import LocaleContext from '../context/LocaleContext';

class SearchBar extends React.Component {
	static contextType = LocaleContext;

	constructor(props) {
		super(props);

		this.state = {
			keyword: '',
		};
	}

	handleChange = (event) => {
		const keyword = event.target.value;

		this.setState({ keyword });

		this.props.onSearch(keyword);
	};
	render() {
		const { locale } = this.context;

		return (
			<div className="search-bar">
				<input
					type="text"
					placeholder={
						locale == 'id' ? 'Cari berdasarkan judul...' : 'Search by title...'
					}
					value={this.state.keyword}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default SearchBar;
