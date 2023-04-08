import { FormEvent, useState } from "react";


export default function useInput(validateValue: (value: string) => boolean) {

    const [enteredValue, setEnteredValue] = useState<string>("");
    const [isTouched, setIsTouched] = useState<boolean>(false);


    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        setEnteredValue(event.currentTarget.value)
    }

    const inputBlurHandler = (event: FormEvent<HTMLInputElement>) => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    }

    return [enteredValue, valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset] as const;

}