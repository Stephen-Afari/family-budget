import React, { useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // background: linear-gradient(135deg, #ece9e6, #ffffff);
`;

export const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
// padding-top: 0rem;
padding-bottom: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 0rem;
  font-size: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-color: #f4f4f4;
    box-shadow: 0 0 5px rgb(212, 235, 248);
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  background: #1F509A;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #EEF5FF;
  }
  &:disabled {
    background: #a5d6a7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;
