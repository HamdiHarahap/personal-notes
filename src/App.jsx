import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DetailPageWrapper from './pages/DetailPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Login from './pages/Auth/LoginPage';
import AddNotePageWrapper from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: localStorage.getItem('theme') || 'dark',

			toggleTheme: () => {
				this.setState((prevState) => {
					const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';

					localStorage.setItem('theme', newTheme);

					return { theme: newTheme };
				});
			},

			localeContext: {
				locale: localStorage.getItem('locale') || 'id',

				toggleLocale: () => {
					this.setState((prevState) => {
						const newLocale =
							prevState.localeContext.locale === 'id' ? 'en' : 'id';

						localStorage.setItem('locale', newLocale);

						return {
							localeContext: {
								...prevState.localeContext,
								locale: newLocale,
							},
						};
					});
				},
			},
		};
	}

	componentDidMount() {
		document.documentElement.setAttribute('data-theme', this.state.theme);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.theme !== this.state.theme) {
			document.documentElement.setAttribute('data-theme', this.state.theme);
		}
	}

	render() {
		return (
			<ThemeProvider value={this.state}>
				<LocaleProvider value={this.state.localeContext}>
					<MainLayout theme={this.state.theme}>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<HomePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/archives"
								element={
									<ProtectedRoute>
										<ArchivePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/notes/new"
								element={
									<ProtectedRoute>
										<AddNotePageWrapper />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/notes/:id"
								element={
									<ProtectedRoute>
										<DetailPageWrapper />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</MainLayout>
				</LocaleProvider>
			</ThemeProvider>
		);
	}
}

export default App;
