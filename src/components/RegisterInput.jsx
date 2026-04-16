import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

function RegisterInput() {
	const navigate = useNavigate();
	const [name, onNameChange] = useInput('');
	const [email, onEmailChange] = useInput('');
	const [password, onPasswordChange] = useInput('');
	const [confirmPassword, onConfirmPasswordChange] = useInput('');

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Password dan confirm password harus sesuai!');
			return;
		}

		const { error } = await register({ name, email, password });
		if (!error) {
			alert('Registrasi berhasil!');
			navigate('/login');
		}
	};

	return (
		<form className="input-register" onSubmit={onSubmitHandler}>
			<div>
				<label htmlFor="name">Nama</label>
				<input id="name" type="text" value={name} onChange={onNameChange} />
			</div>

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

			<div>
				<label htmlFor="confirm">Confirm Password</label>
				<input
					id="confirm"
					type="password"
					value={confirmPassword}
					onChange={onConfirmPasswordChange}
				/>
			</div>

			<button type="submit">Register</button>
		</form>
	);
}

export default RegisterInput;
