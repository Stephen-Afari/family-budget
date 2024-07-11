import styled from 'styled-components';

// Styled components for modal
export const ModalOverlay = styled.div`
 position: fixed; //An element with position: fixed; is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled:
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 10px;
//   border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  width: 100%;
`;

export const ModalHeader = styled.h2`
margin-top: 0;
font-size: 24px;
// text-align: center;
background-color:#EEF7FF;
padding:2px;
`
export const Input = styled.input`
width: calc(100% - 5px);

`
export const Select= styled.select`
width: calc(100% - 5px);

`
export const Form = styled.form`
//   display: flex;
//   flex-direction: r;
`;
export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
    // grid-template-rows: 1fr 1fr 1fr;
`;

export const Button1= styled.button`
padding:2px 20px;
background-color:#B5C0D0;
border: none;
cursor: pointer;
// box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
color: white
`
export const Button2= styled.button`
padding:2px 20px;
border: none;
background-color:white;
cursor: pointer;
color: #B5C0D0;
`
export const ButtonGroup= styled.div`
display: flex;
gap:15px;
margin-top:10px;

`
