import reactLogo from './assets/react.svg';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { increment, selectCount } from './redux/slices/counterSlice';
import viteLogo from '/vite.svg';

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-amber-800">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleIncrement}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
