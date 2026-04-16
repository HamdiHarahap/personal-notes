import RegisterInput from '../../components/RegisterInput';
import { Link } from 'react-router-dom';
import LocaleContext from '../../context/LocaleContext';
import { useContext } from 'react';

function Register() {
	const { locale } = useContext(LocaleContext);

	return (
		<div className="app-container">
			<main>
				<h2>Register</h2>
				<br />
				<p>
					{locale === 'id'
						? 'Gak perlu serius-serius ya isinya...'
						: 'No need to be so serious...'}
				</p>
				<RegisterInput />
				<p>
					{locale === 'id' ? 'Kembali ke ' : 'Back to '}
					<Link to="/login">{locale === 'id' ? 'Masuk' : 'Login'}</Link>
				</p>
			</main>
		</div>
	);
}

export default Register;
