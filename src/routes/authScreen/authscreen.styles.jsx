import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f9fc;
`;

export const FormWrapper = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 700px;
`;

export const ToggleText = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export const Link = styled.span`
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }


`
;