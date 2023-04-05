import { FormEvent, useState } from "react"

export default function SimpleInput() {

    const [enteredName, setEnteredName] = useState<string>("");
    const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
    const [enteredEmail, setEnteredEmail] = useState<string>("");
    const [enteredEmailTouched, setEnteredEmailTouched] = useState<boolean>(false);

    const enteredNameIsValid = enteredName.trim() !== "";
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    const expression: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const enteredEmailIsValid = expression.test(enteredEmail) && enteredEmail.trim() !== "";
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    let formIsValid: boolean = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    } else {
        formIsValid = false;
    }

    // first approach: read input while user is typing 
    const nameInputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        setEnteredName(event.currentTarget.value)
    }

    const nameInputBlurHandler = (event: FormEvent<HTMLInputElement>) => {
        setEnteredNameTouched(true);
    }

    const emailInputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        setEnteredEmail(event.currentTarget.value);
    }

    const emailInputBlueHandler = (event: FormEvent<HTMLInputElement>) => {
        setEnteredEmailTouched(true);
    }

    const formSubmissionHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEnteredNameTouched(true);
        setEnteredEmailTouched(true);

        if (!formIsValid) {
            return;
        }

        console.log(enteredName);
        console.log(enteredEmail);


        setEnteredName("");
        setEnteredNameTouched(false);
        setEnteredEmail("");
        setEnteredEmailTouched(false);
    }


    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputIsInvalid ? "form-control invalid" : "form-control"}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className={emailInputIsInvalid ? "form-control invalid" : "form-control"}>
                <label htmlFor='email'>Your E-mail</label>
                    <input
                        type='email'
                        id='email'
                        onChange={emailInputChangeHandler}
                        onBlur={emailInputBlueHandler}
                        value={enteredEmail}
                    />
                {emailInputIsInvalid && <p className="error-text">Please enter a valid email</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    )
}
