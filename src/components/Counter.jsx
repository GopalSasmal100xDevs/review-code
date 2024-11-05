import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/reducers/counter";

export default function Counter() {
  return (
    <div>
      <CounterDisplay />
      <CounterActions />
    </div>
  );
}

function CounterDisplay() {
  const count = useSelector((state) => state.counter.count);
  return (
    <div>
      <h1>Counter</h1>
      <h4>Count: {count}</h4>
    </div>
  );
}

function CounterActions() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
