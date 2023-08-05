import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer, SignUpTitle } from "./sign-up-form.style";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (evt) =>{
        const {name, value} = evt.target;
        setFormFields({...formFields, [name]: value})
    };

    const resetFormFields= ()=>{
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password !== confirmPassword) return alert("Passwords Do Not Match");
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            }
            console.log("error", error)
        }
    }

    return(
        // <div>
            <SignUpContainer className="sign-up-container">
                <SignUpTitle>Don't have an account?</SignUpTitle>
                <span>Sign up with your email and password</span>
                <form action="" onSubmit={handleSubmit}>
                    <FormInput label='Display Name' type="text" name="displayName" value={displayName} onChange={handleChange} id="" required />

                    <FormInput label='Email' type="email" name="email" value={email} onChange={handleChange} id="" required />

                    <FormInput label='Password' type="password" name="password" value={password} onChange={handleChange} id="" required />

                    <FormInput label='Confirm Password' type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} id="" required />
                    <Button type="submit" children={'Sign up'} />
                </form>
            </SignUpContainer>
        /* </div> */
    )
}

export default SignUpForm;