import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUpToken } from "../../store/apiData/users/users.reducer";

import { selectUserToken } from "../../store/apiData/users/users.selector";
import { useNavigate } from "react-router-dom";
import { Button, Container, FormWrapper, InputGroup ,Label, Title, Form, Input,ErrorMessage} from "./signUp.styles";


export const MySignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]= useState("");
  const [passwordConfirm, setPasswordConfirm]= useState("");
  const [family, setFamily]= useState("");
  const [role, setRole]= useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectUserToken); // Get the token from the Redux store
  const { loading, error } = useSelector((state) => state.users);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signUpToken({email, password, name,passwordConfirm,family,role: "member" })).unwrap();
      navigate("/budget"); // Redirect to the main dashboard
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign up</Title>
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Label>Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>PasswordConfirm:</Label>
            <Input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Family:</Label>
            <Input
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              placeholder="Enter your family name"
              required
            />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormWrapper>
    </Container>
  );
};
