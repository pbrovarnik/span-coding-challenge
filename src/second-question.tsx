import { useEffect, useRef, useState } from 'react';
import './App.css';

const DURATION = 2000;

function App() {
	// state that manages all the bars
	// allBars
	const [allBars, setAllBars] = useState<any[]>([]);

	// handle
	// onAddHandler
	// allBars = append ProgressBar
	const onAddHandler = () => {
		setAllBars((prev) => {
			const item = {
				Element: ProgressBar,
				isStarted: prev.length === 0 || prev[prev.length - 1].isEnded ? true : false,
				isEnded: false,
			};

			return [...prev, item];
		});
	};

	// onEndTimer
	// when to start the next bar
	const onEndTimer = (barIdx: number) => {
		setAllBars((prev) => {
			prev[barIdx].isEnded = true;
			if (prev[barIdx + 1]) prev[barIdx + 1].isStarted = true;

			return [...prev];
		});
	};

	// render
	// Loop throught allBars and display
	// <ProgressBar
	// isStart
	// onEndTimer
	// indexOfProgressBar
	// >
	// Add Bar button

	return (
		<div>
			<div>
				{allBars.map(({ Element, isStarted }, key) => {
					return <Element key={key} isStarted={isStarted} onEndTimer={onEndTimer} barIdx={key} />;
				})}
			</div>
			<button onClick={onAddHandler}>Add Bar</button>
		</div>
	);
}

function ProgressBar({ onEndTimer, barIdx, isStarted }: { onEndTimer: (barIdx: number) => void; barIdx: number; isStarted: boolean }) {
	// state
	// timer
	const [timer, setTime] = useState(0);

	// derived state
	// percantage
	const percentage = (timer / DURATION) * 100;

	// ref
	// intervalIdRef
	const intervalIdRef = useRef<number>();

	useEffect(() => {
		if (isStarted && !timer) {
			intervalIdRef.current = setInterval(() => {
				setTime((prev) => {
					if (prev > DURATION) {
						clearInterval(intervalIdRef.current);
						onEndTimer(barIdx);
						return prev;
					}

					return prev + 10;
				});
			}, 10);
		}
	}, [barIdx, onEndTimer, timer, isStarted]);

	// handle
	// onStart
	// -setInterval

	return (
		// enter box
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
		</div>
	);
}

export default App;
