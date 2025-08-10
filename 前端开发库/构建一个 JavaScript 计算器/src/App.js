import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastResult(null);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      // Prevent multiple leading zeros
      if (display === '0' && digit === 0) {
        return;
      }
      // Handle negative numbers
      if (display === '-') {
        setDisplay('-0');
        return;
      }
      // Handle negative numbers with leading zero
      if (display === '-0' && digit === 0) {
        return;
      }
      // Handle negative numbers with digit
      if (display === '-0') {
        setDisplay('-' + String(digit));
        return;
      }
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      if (newValue === 'Error') {
        setDisplay('Error');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        setLastResult(null);
        return;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  // Handle negative numbers and consecutive operators
  const handleOperator = (nextOperator) => {
    if (nextOperator === '-' && waitingForOperand) {
      // Handle negative numbers
      setDisplay('-');
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand && operator && nextOperator !== '-') {
      // Replace the operator if waiting for operand and not a negative sign
      setOperator(nextOperator);
      return;
    }

    performOperation(nextOperator);
  };

  const calculate = (firstValue, secondValue, operation) => {
    let result;
    switch (operation) {
      case '+':
        result = firstValue + secondValue;
        break;
      case '-':
        result = firstValue - secondValue;
        break;
      case '*':
        result = firstValue * secondValue;
        break;
      case '/':
        if (secondValue === 0) {
          return 'Error';
        }
        result = firstValue / secondValue;
        break;
      default:
        return secondValue;
    }
    
    // Handle precision for decimal results
    if (result % 1 !== 0) {
      return parseFloat(result.toFixed(4));
    }
    return result;
  };

  const handleEquals = () => {
    if (!operator || prevValue === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const newValue = calculate(prevValue, inputValue, operator);

    if (newValue === 'Error') {
      setDisplay('Error');
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setLastResult(null);
      return;
    }

    setDisplay(String(newValue));
    setLastResult(newValue);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  // Handle input after equals
  const inputDigitAfterEquals = (digit) => {
    if (lastResult !== null && !operator) {
      // Start new calculation with the result
      setDisplay(String(digit));
      setLastResult(null);
      setWaitingForOperand(false);
    } else {
      inputDigit(digit);
    }
  };

  const inputDecimalAfterEquals = () => {
    if (lastResult !== null && !operator) {
      setDisplay('0.');
      setLastResult(null);
      setWaitingForOperand(false);
    } else {
      inputDecimal();
    }
  };

  // Handle operator after equals
  const handleOperatorAfterEquals = (nextOperator) => {
    if (lastResult !== null && !operator) {
      // Use the last result as the first operand
      setPrevValue(lastResult);
      setLastResult(null);
      setWaitingForOperand(true);
      setOperator(nextOperator);
    } else {
      handleOperator(nextOperator);
    }
  };

  return (
    <div className="calculator">
      <div className="display" id="display">
        {display}
      </div>
      <div className="buttons">
        <button 
          className="clear" 
          id="clear" 
          onClick={clearAll}
        >
          AC
        </button>
        <button 
          className="operator" 
          id="divide" 
          onClick={() => handleOperatorAfterEquals('/')}
        >
          ÷
        </button>
        <button 
          className="number" 
          id="seven" 
          onClick={() => inputDigitAfterEquals(7)}
        >
          7
        </button>
        <button 
          className="number" 
          id="eight" 
          onClick={() => inputDigitAfterEquals(8)}
        >
          8
        </button>
        <button 
          className="number" 
          id="nine" 
          onClick={() => inputDigitAfterEquals(9)}
        >
          9
        </button>
        <button 
          className="operator" 
          id="multiply" 
          onClick={() => handleOperatorAfterEquals('*')}
        >
          ×
        </button>
        <button 
          className="number" 
          id="four" 
          onClick={() => inputDigitAfterEquals(4)}
        >
          4
        </button>
        <button 
          className="number" 
          id="five" 
          onClick={() => inputDigitAfterEquals(5)}
        >
          5
        </button>
        <button 
          className="number" 
          id="six" 
          onClick={() => inputDigitAfterEquals(6)}
        >
          6
        </button>
        <button 
          className="operator" 
          id="subtract" 
          onClick={() => handleOperatorAfterEquals('-')}
        >
          -
        </button>
        <button 
          className="number" 
          id="one" 
          onClick={() => inputDigitAfterEquals(1)}
        >
          1
        </button>
        <button 
          className="number" 
          id="two" 
          onClick={() => inputDigitAfterEquals(2)}
        >
          2
        </button>
        <button 
          className="number" 
          id="three" 
          onClick={() => inputDigitAfterEquals(3)}
        >
          3
        </button>
        <button 
          className="operator" 
          id="add" 
          onClick={() => handleOperatorAfterEquals('+')}
        >
          +
        </button>
        <button 
          className="number zero" 
          id="zero" 
          onClick={() => inputDigitAfterEquals(0)}
        >
          0
        </button>
        <button 
          className="number" 
          id="decimal" 
          onClick={inputDecimalAfterEquals}
        >
          .
        </button>
        <button 
          className="equals" 
          id="equals" 
          onClick={handleEquals}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
