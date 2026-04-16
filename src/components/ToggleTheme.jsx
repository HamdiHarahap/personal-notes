import { ThemeConsumer } from '../context/ThemeContext';

function ToggleTheme() {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => {
				return (
					<div onClick={toggleTheme}>
						{theme === 'light' ? (
							<img src="/moon.svg" alt="Dark Mode" className="w-5" />
						) : (
							<img src="/sun.svg" alt="Light Mode" className="w-5" />
						)}
					</div>
				);
			}}
		</ThemeConsumer>
	);
}

export default ToggleTheme;
