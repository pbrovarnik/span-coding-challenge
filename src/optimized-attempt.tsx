import { useEffect, useRef, useState } from 'react';
import './App.css';

const DURATION = 4000;

function App() {
	const [allBars, setAllBars] = useState<number[]>([]);
	const [activeIdx, setActiveIdx] = useState<number>(0);

	const onAddProgressBar = () => {
		const id = Math.floor(Math.random() * 10000);
		setAllBars((prev) => [...prev, id]);
	};

	const onEndProgressBar = () => {
		setActiveIdx((prev) => prev + 1);
	};

	const onDeleteProgressBar = (id: number) => {
		setAllBars((prev) => prev.filter((barId) => barId !== id));
	};

	return (
		<div className="app">
			<div className="progress-bars-wrapper">
				{allBars.length > 0 && (
					<div className="progress-bars">
						{allBars.map((id, idx) => {
							return (
								<ProgressBar
									key={id}
									active={idx === activeIdx}
									onEnd={onEndProgressBar}
									onDelete={() => {
										onDeleteProgressBar(id);
										if (idx <= activeIdx) {
											setActiveIdx((prev) => (prev === 0 ? 0 : prev - 1));
										}
									}}
								/>
							);
						})}
					</div>
				)}
				<div
					style={{
						borderTopLeftRadius: allBars.length > 0 ? '' : '6px',
						borderTopRightRadius: allBars.length > 0 ? '' : '6px',
					}}
					className="add-btn-container">
					<button className="bar-btn add-bar-btn" onClick={onAddProgressBar}>
						Add Bar
					</button>
				</div>
			</div>
		</div>
	);
}

type ProgressBarProps = {
	active: boolean;
	onDelete: () => void;
	onEnd: () => void;
};

function ProgressBar({ onDelete, onEnd, active }: ProgressBarProps) {
	const [timer, setTime] = useState(0);
	const [isFinished, setIsTimerFinished] = useState(false);
	const percentage = (timer / DURATION) * 100;
	const intervalIdRef = useRef<number>();

	useEffect(() => {
		if (active) {
			intervalIdRef.current = setInterval(() => {
				setTime((prev) => {
					if (prev >= DURATION) {
						clearInterval(intervalIdRef.current);
						setIsTimerFinished(true);

						return DURATION;
					}
					return prev + 10;
				});
			}, 10);
		}

		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, [active]);

	useEffect(() => {
		if (isFinished) onEnd();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFinished]);

	const onDeleteProgressBar = () => {
		clearInterval(intervalIdRef.current);
		onDelete();
	};

	return (
		<div className="progress-bar-wrapper">
			<div className="progress-bar-container">
				<div className="progress-bar" style={{ width: `${percentage}%` }} />
			</div>
			<button className="bar-btn delete-bar-btn" onClick={onDeleteProgressBar}>
				Delete
			</button>
		</div>
	);
}

export default App;
