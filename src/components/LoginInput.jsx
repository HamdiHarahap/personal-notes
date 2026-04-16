import useInput from '../hooks/useInput';
import { login, putAccessToken } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

function LoginInput() {
	const [email, onEmailChange] = useInput('');
	const [password, onPasswordChange] = useInput('');
	const navigate = useNavigate();

	const onSubmitHandler = (e) => {
		e.preventDefault();

		login({ email, password }).then(({ error, data }) => {
			if (!error) {
				putAccessToken(data.accessToken);
				alert('Login berhasil');
				navigate('/');
			}
		});
	};

	return (
		<form className="input-login" onSubmit={onSubmitHandler}>
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="email" value={email} onChange={onEmailChange} />
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={onPasswordChange}
				/>
			</div>

			<button type="submit">Login</button>
		</form>
	);
}

export default LoginInput;
