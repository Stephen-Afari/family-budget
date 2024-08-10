import styled from 'styled-components';

export const DashboardHeader = styled.h4`
display: flex;
margin-top: 2px;
`
export const DashboardIconContainer = styled.div`
margin-top: 2px;
`
export const DropdownContainer = styled.div`
  display: flex;
flex-direction: column;
  margin-bottom: 20px;
  height: 50px;
  gap: 5px;
  margin-left: 3px;
`
export const YearDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  width:6%;
 border: none;
 Placeholder:'yyy'

`;

export const PieChartContainer = styled.div`
display:flex;


`
export const PieChartHeader = styled.div`
margin-left: 70px;
font: 20px;
font-style: italic;
font-weight: bold;

`
export const BarChartHeader=styled.div`
font: 20px;
font-style: italic;
margin-bottom: 5px;
font-weight: bold;
`
export const VisualsContainer =styled.div`
/* If the screen size is 600px wide or less, hide the element */
@media only screen and (max-width: 600px) {
  div.example {
    display: none;
  }
}
`