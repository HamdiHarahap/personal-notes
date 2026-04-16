import { Link, useNavigate } from 'react-router-dom';
import { getUserLogged } from '../utils/network-data';
import { useEffect, useState } from 'react';
import ToggleTheme from '../components/ToggleTheme';
import { LocaleConsumer } from '../context/LocaleContext';

function MainLayout({ children, theme }) {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getUserLogged().then(({ error, data }) => {
			if (!error) {
				setUser(data);
			}
		});
	}, []);

	const onLogout = () => {
		localStorage.removeItem('accessToken');
		alert('Logout berhasil');
		navigate('/login');
	};

	return (
		<div className="app-container">
			<LocaleConsumer>
				{({ locale, toggleLocale }) => (
					<>
						<header>
							<Link to="/">
								<h1>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</h1>
							</Link>
							<nav className="navigation">
								<ul>
									<li>
										{user && (
											<Link to="/archives">
												{locale === 'id' ? 'Arsip' : 'Archive'}
											</Link>
										)}
									</li>
									<li>
										<img
											src={
												theme === 'dark'
													? '/translate-light.svg'
													: '/translate.svg'
											}
											alt="toggle-locale"
											className="w-5"
											onClick={toggleLocale}
											style={{ cursor: 'pointer' }}
										/>
									</li>

									<li>
										<ToggleTheme />
									</li>
									<li>
										{user && (
											<div>
												<img
													src={
														theme === 'dark'
															? '/logout-light.svg'
															: '/logout.svg'
													}
													alt="logout"
													className="w-5"
													onClick={onLogout}
												/>
												<p>{user ? user.name : 'Loading...'}</p>
											</div>
										)}
									</li>
								</ul>
							</nav>
						</header>

						<main>{children}</main>
					</>
				)}
			</LocaleConsumer>
		</div>
	);
}

export default MainLayout;
