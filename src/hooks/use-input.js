// import { useState } from "react";
import { useReducer } from "react";

// the code shows approaches using useSate and useReducer
// using useState
// const useInput = (validateValue) => {
//     const [enteredValue, setEnteredValue] = useState('');
//     const [isTouched, setIsTouched] = useState(false);

//     const valueIsValid = validateValue(enteredValue)
//     const hasError = !valueIsValid && isTouched;

//     const valueChangeHandler = event => {
//         setEnteredValue(event.target.value);
//     }

//     const inputBlurHandler = event => {
//         setIsTouched(true);
//     }

//     const reset = () => {
//         setEnteredValue('');
//         setIsTouched(false);
//     }

//     return {
//         value: enteredValue,
//         isValid: valueIsValid,
//         hasError,
//         valueChangeHandler,
//         inputBlurHandler,
//         reset
//     }
// }

// export default useInput;

// using useReducer
const initialInputState = {
    value: '',
    isTouched: false,
  };
  
  const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
      return { 
            value: action.value, // only interested in the value here 
            isTouched: state.isTouched // bcz we are not interested in isTouched so copying it from the current state
        };
    }
    if (action.type === 'BLUR') {
      return { isTouched: true, value: state.value };
    }
    if (action.type === 'RESET') {
      return { isTouched: false, value: '' };
    }
    return inputStateReducer;
  };
  
  const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
      inputStateReducer,
      initialInputState
    );
  
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;
  
    const valueChangeHandler = (event) => {
      dispatch({ type: 'INPUT', value: event.target.value });
    };
  
    const inputBlurHandler = (event) => {
      dispatch({ type: 'BLUR' });
    };
  
    const reset = () => {
      dispatch({ type: 'RESET' });
    };
  
    return {
      value: inputState.value,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      reset,
    };
  };

export default useInput;