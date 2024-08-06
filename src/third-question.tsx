import { useEffect, useRef, useState } from 'react';
import './App.css';

const DURATION = 5000;

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
				id: Math.floor(Math.random() * 10000),
				Element: ProgressBar,
				isStarted: prev.length === 0 || prev[prev.length - 1].isEnded ? true : false,
				isEnded: false,
			};

			return [...prev, item];
		});
	};

	// onEndTimer
	// when to start the next bar
	const onEndTimer = (barId: number) => {
		setAllBars((prev) => {
			const currBarIdx = prev.findIndex((bar) => bar.id === barId);
			prev[currBarIdx].isEnded = true;
			const nextBar = prev.findIndex((bar) => !bar.isStarted);
			if (nextBar > -1) prev[nextBar].isStarted = true;

			return [...prev];
		});
	};

	// onDeleteTimer
	const onDeleteTimer = (barId: number) => {
		setAllBars((prev) => {
			const nextBar = prev.findIndex((bar) => !bar.isStarted);

			if (nextBar > -1) prev[nextBar].isStarted = true;

			return prev.filter((bar) => bar.id !== barId);
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
				{allBars.map(({ Element, isStarted, id }) => {
					return <Element key={id} isStarted={isStarted} onEndTimer={onEndTimer} barId={id} onDeleteTimer={onDeleteTimer} />;
				})}
			</div>
			<button onClick={onAddHandler}>Add Bar</button>
		</div>
	);
}

function ProgressBar({ onDeleteTimer, onEndTimer, barId, isStarted }: { onDeleteTimer: (barId: number) => void; onEndTimer: (barId: number) => void; barId: number; isStarted: boolean }) {
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
						onEndTimer(barId);
						return prev;
					}

					return prev + 10;
				});
			}, 10);
		}
	}, [barId, onEndTimer, timer, isStarted]);

	// handle
	// onDelete
	const onDelete = () => {
		clearInterval(intervalIdRef.current);
		onDeleteTimer(barId);
	};
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
			<button onClick={onDelete}>Delete</button>
		</div>
	);
}

export default App;
