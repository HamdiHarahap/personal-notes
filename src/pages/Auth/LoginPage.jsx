import LoginInput from '../../components/LoginInput';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/network-data';
import LocaleContext from '../../context/LocaleContext';
import { useContext, useEffect } from 'react';

function Login() {
	const { locale } = useContext(LocaleContext);
	const navigate = useNavigate();

	useEffect(() => {
		const token = getAccessToken();
		if (token) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<div className="app-container">
			<main>
				<h2>Login</h2>
				<LoginInput />
				<p>
					{locale == 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
					<Link to="/register">
						{locale == 'id' ? 'Daftar di sini.' : 'Register here...'}
					</Link>
				</p>
			</main>
		</div>
	);
}

export default Login;
