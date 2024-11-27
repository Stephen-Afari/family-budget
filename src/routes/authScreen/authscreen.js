import React, { useState } from "react";
import { MyLogInScreen } from "../logIn/logIn";
import { MySignUpScreen } from "../signUp/signUp";
import { Container, FormWrapper, ToggleText,Link } from "./authscreen.styles";
// import { Link } from "react-router-dom";

export const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle views

  const handleToggle = () => {
    setIsSignUp((prev) => !prev); //toggle the state to true or false
  };

  return (
    <Container>
      <FormWrapper>
        {isSignUp ? (
          <>
            <MySignUpScreen />
            <ToggleText>
              Already have an account?{" "}
              <Link onClick={handleToggle}>Log In</Link>
            </ToggleText>
          </>
        ) : (
          <>
            <MyLogInScreen />
            <ToggleText>
              Don't have an account?{" "}
              <Link onClick={handleToggle}>Sign Up</Link>
            </ToggleText>
          </>
        )}
      </FormWrapper>
    </Container>
  );
};
