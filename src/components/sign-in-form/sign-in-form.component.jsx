import { useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { signInAuthWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { ButtonContainer, SignInContainer, SignInTitle } from "./sign-in-form.style";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignInForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;
    
    const handleChange = (evt) =>{
        const {name, value} = evt.target;
        setFormFields({...formFields, [name]: value})
    };

    const resetFormFields= ()=>{
        setFormFields(defaultFormField);
    }

    const signInWithGoogle = async ()=>{
        await signInWithGooglePopup();
    }

    const handleSignIn = async(evt)=>{
        evt.preventDefault();
        try{
            const {user} = await signInAuthWithEmailAndPassword(email, password)
            resetFormFields();
        }
        catch(error){
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password")
                    break;
                case "auth/user-not-found":
                    alert("No User Assosiated With This Email")
                    break;
                default:
                    console.log(error)
                    break;
            }
        }
        resetFormFields();
    }

    return(
        <>
        <SignInContainer>
                <SignInTitle>Already have an account?</SignInTitle>
                <span>Sign in with your email and password</span>
                <form action="" onSubmit={handleSignIn}>
                <FormInput label='Enter Your Email' type="email" name="email" value={email} onChange={handleChange} required />

                <FormInput label='Enter Your Password' type="password" name="password" value={password} onChange={handleChange} id="" required />    
                <ButtonContainer>
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign In</Button>
                </ButtonContainer>
                </form>
            </SignInContainer>
        </>
    )
}

export default SignInForm;