import styled from 'styled-components';

export const ExportHeader = styled.h4`
display: flex;
margin-top: 2px;
`
export const ExportIconContainer = styled.div`
margin-top: 2px;
`
export const YearDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  width:6%;
 border: none;
 Placeholder:'yyy'
`;
export const MonthDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  width:9%;
  border: none;
 
`;
export const DropdownContainer = styled.div`
  display: flex;
flex-direction: column;
  margin-bottom: 20px;
  height: 50px;
  gap: 5px;
  margin-left: 3px;
`
// export const ButtonContainer = styled.div`
// diplay: flex;
// flex-direction: row;
// align-items: center;

// `
export const ExportButton= styled.button`
margin-left:300px;
padding: 10px 20px;
background-color: #EEF5FF;
color: #474E93;
border: none;
width: 150px;
height: 150px;
font-size: 15px;
border-radius: 150px;
cursor: pointer;
 box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.2);
`