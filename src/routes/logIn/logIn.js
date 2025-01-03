import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserToken } from "../../store/apiData/users/users.reducer";
import { selectUserToken } from "../../store/apiData/users/users.selector";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Container, FormWrapper, InputGroup ,Label, Title, Form, Input,ErrorMessage, TextGroup} from "./logIn.styles";


export const MyLogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectUserToken); // Get the token from the Redux store
  const { loading, error } = useSelector((state) => state.users);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(fetchUserToken({ email, password })).unwrap();
      navigate("/budget"); // Redirect to the main dashboard
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {/* <TextGroup>
          <Label>Or </Label>
          </TextGroup>
          <TextGroup>
          <Label><Link>Sign up</Link></Label>
          </TextGroup> */}
        </Form>
      </FormWrapper>
     
    </Container>
  );
};
