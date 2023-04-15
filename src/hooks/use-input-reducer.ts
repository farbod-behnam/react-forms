import { FormEvent, useReducer, useState } from "react";
import { isTupleTypeNode } from "typescript";
import { InputActionEnum } from "../model/reducer/input/input-action.enum";
import { InputAction } from "../model/reducer/input/input-action.model";
import { InputState } from "../model/reducer/input/input-state.model";

const initialInputState = new InputState("", false);

const inputStateReducer = (state: InputState, action: InputAction): InputState => {

    if (action.type === InputActionEnum.INPUT) {
        if (action.value !== undefined)
            return new InputState(action.value, state.isTouched);
        else 
            return new InputState(state.value, state.isTouched);
    }
    if (action.type === InputActionEnum.BLUR) {
        return new InputState(state.value, true);
    }
    if (action.type === InputActionEnum.RESET) {
        return initialInputState;
    }

    return initialInputState;
}

export default function useInputRedeucer(validateValue: (value: string) => boolean) {

   const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);


    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        dispatch(new InputAction(InputActionEnum.INPUT, event.currentTarget.value));
    }

    const inputBlurHandler = (event: FormEvent<HTMLInputElement>) => {
        dispatch(new InputAction(InputActionEnum.BLUR))
    }

    const reset = () => {
        dispatch(new InputAction(InputActionEnum.RESET));
    }

    return [inputState.value, valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset] as const;

}