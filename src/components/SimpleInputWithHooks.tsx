import React, { FormEvent } from 'react'
import useInput from '../hooks/use-input';

export default function SimpleInputWithHooks() {

    const validateEmail = (email: string) => {
        const expression: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expression.test(email) && email.trim() !== "";
    }

    const [enteredName, enteredNameIsValid, nameInputHasError, nameChangeHandler, nameBlurHandler, resetNameInput] = useInput(enteredName => enteredName.trim() !== "");
    const [enteredEmail, enteredEmailIsValid, emailInputHasError, emailChangeHandler, emailBlurHandler, resetEmailInput] = useInput(enteredEmail => validateEmail(enteredEmail));



    let formIsValid: boolean = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    } else {
        formIsValid = false;
    }



    const formSubmissionHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }

        console.log(enteredName);
        console.log(enteredEmail);


        resetNameInput();
        resetEmailInput();

    }


    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputHasError ? "form-control invalid" : "form-control"}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className={emailInputHasError ? "form-control invalid" : "form-control"}>
                <label htmlFor='email'>Your E-mail</label>
                    <input
                        type='email'
                        id='email'
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                {emailInputHasError && <p className="error-text">Please enter a valid email</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    )
}
