import { FormEvent } from "react";
import useInput from "../hooks/use-input";

const isNotEmpty = (value: string) => {
    return value.trim() !== "";
}

const validateEmail = (email: string) => {
    const expression: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(email) && email.trim() !== "";
}


export default function BasicForm() {

    const [firstNameValue, firstNameIsValid, firstNameInputHasError, firstNameChangeHandler, firstNameBlurHandler, resetFirstNameInput] = useInput(isNotEmpty);
    const [lastNameValue, lastNameIsValid, lastNameInputHasError, lastNameChangeHandler, lastNameBlurHandler, resetLastNameInput] = useInput(isNotEmpty);
    const [emailValue, emailIsValid, emailInputHasError, emailChangeHandler, emailBlurHandler, resetEmailInput] = useInput(validateEmail);


    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        console.log(firstNameValue);
        console.log(lastNameValue);
        console.log(emailValue);



        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    }

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='control-group'>
                <div className={firstNameInputHasError ? 'form-control invalid' : 'form-control'}>
                    <label htmlFor='first-name'>First Name</label>
                    <input
                        type='text'
                        id='first-name'
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        value={firstNameValue}
                    />
                    {firstNameInputHasError && <p className="error-text">First name must not be empty</p>}
                </div>
                <div className={lastNameInputHasError ? 'form-control invalid' : 'form-control'}>
                    <label htmlFor='last-name'>Last Name</label>
                    <input
                        type='text'
                        id='last-name'
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastNameValue}
                    />
                    {lastNameInputHasError && <p className="error-text">Last name must not be empty</p>}
                </div>
            </div>
            <div className={emailInputHasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor='email'>E-Mail Address</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={emailValue}
                />
                {emailInputHasError && <p className="error-text">Please enter a valid email</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    )
}
