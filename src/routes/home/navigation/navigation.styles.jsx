import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavContainer = styled.div`
background-color: white;
width: 250px;
height: 570px;
display:flex;
flex-direction: column;
gap: 11px;
border: 1px  #000;
padding: 5px;  
border-radius: 10px; 
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
height: 100vh;
// background-color: #f4f4f4;
`
export const NavContainerAndOutlet =styled.div`
display:flex;
flex-direction:row;
margin-left: 2px;
margin-right:5px;
`
export const Logo= styled.div`
display: flex;
margin-left:2px;
`
export const NavLinks = styled(Link)`
display: flex;
text-decoration: none;
margin-left: 5px;
margin-bottom: 10px;
color: black;
background-color: ${props => (props.isSelected ? '#EEF5FF' : 'transparent')};
`
export const OutletData = styled.div`
width:1500px
`
export const SeparationLine = styled.hr`
border: 0;
height: 1px;
background: #444;
margin: 1px 0;
`
export const IconWrapper= styled.div`
margin-top:2px;
margin-right: 5px
`
export const IconWrapper1= styled.div`
margin-top: 16px;
margin-right: 5px
`
export const HeadingWrapper= styled.h4`
margin-top: 18px;
`
