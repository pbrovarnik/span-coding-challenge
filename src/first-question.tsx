import { useRef, useState } from 'react';
import './App.css';

const DURATION = 2000;
function App() {
	// state
	// timer
	const [timer, setTime] = useState(0);

	// derived state
	// percantage
	const percentage = (timer / DURATION) * 100;

	// ref
	// intervalIdRef
	const intervalIdRef = useRef<number>();

	// handle
	// onStart
	// -setInterval
	const onStart = () => {
		intervalIdRef.current = setInterval(() => {
			setTime((prev) => {
				if (prev > DURATION) {
					clearInterval(intervalIdRef.current);
					// return 0;
				}

				return prev + 10;
			});
		}, 10);
	};

	return (
		<div>
			{/* contain house the bar */}
			<div
				style={{
					height: '20px',
					width: '100%',
				}}>
				{/* bar */}
				<div style={{ width: `${percentage}%`, backgroundColor: 'red', height: '100%' }} />
			</div>
			<button onClick={onStart}>Start</button>
		</div>
	);
}

export default App;
