import { useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [extraInputs, setExtraInputs] = useState([]);
  const [result, setResult] = useState(0);

  // Counter functions
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);
  const handleResetCounter = () => setCount(0);

  // Calculator functions
  const addInputField = () => {
    setExtraInputs([...extraInputs, 0]);
  };

  const undoInputField = () => {
    if (extraInputs.length > 0) {
      setExtraInputs(extraInputs.slice(0, -1));
    }
  };

  const updateExtraInput = (index, value) => {
    const newInputs = [...extraInputs];
    newInputs[index] = Number(value);
    setExtraInputs(newInputs);
  };

  const getAllNumbers = () => {
    return [num1, num2, ...extraInputs];
  };

  const addNumbers = () => {
    setResult(getAllNumbers().reduce((acc, num) => acc + num, 0));
  };

  const subtractNumbers = () => {
    const numbers = getAllNumbers();
    setResult(numbers.reduce((acc, num) => acc - num));
  };

  const multiplyNumbers = () => {
    setResult(getAllNumbers().reduce((acc, num) => acc * num, 1));
  };

  const divideNumbers = () => {
    const numbers = getAllNumbers();
    if (numbers.includes(0)) {
      setResult("Error (Cannot divide by zero)");
      return;
    }
    setResult(numbers.reduce((acc, num) => acc / num));
  };

  // Reset Calculator function
  const handleResetCalculator = () => {
    setNum1(0);
    setNum2(0);
    setExtraInputs([]);
    setResult(0);
  };

  return (
    <div className="container">
      {/* Counter Card */}
      <div className="card counter">
        <h2>Counter</h2>
        <p className="counter-value">{count}</p>
        <div className="btn-group">
          <button className="btn" onClick={handleIncrement}>Increment</button>
          <button className="btn" onClick={handleDecrement}>Decrement</button>
          <button className="btn reset" onClick={handleResetCounter}>Reset</button>
        </div>
      </div>

      {/* Calculator Card */}
      <div className="card calculator">
        <h2>Basic Calculator</h2>

        <button className="buts" onClick={addInputField}>+ Add Another Input</button>

        {extraInputs.length > 0 && (
          <button className="buts" onClick={undoInputField}>Undo Last Input</button>
        )}

        <div className="input-group">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(Number(e.target.value))}
            placeholder="Enter first number"
          />
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(Number(e.target.value))}
            placeholder="Enter second number"
          />
          {extraInputs.map((value, index) => (
            <input
              key={index}
              type="number"
              value={value}
              onChange={(e) => updateExtraInput(index, e.target.value)}
              placeholder={`Extra Input ${index + 1}`}
            />
          ))}
        </div>

        <div className="btn-group">
          <button className="btn" onClick={addNumbers}>+</button>
          <button className="btn" onClick={subtractNumbers}>-</button>
          <button className="btn" onClick={divideNumbers}>/</button>
          <button className="btn" onClick={multiplyNumbers}>x</button>
          {/* Reset Button */}
          <button className="btn reset" onClick={handleResetCalculator}>Reset</button>
        </div>

        <p className="result">The Result Is: <span>{result}</span></p>
      </div>
    </div>
  );
}

export default App;