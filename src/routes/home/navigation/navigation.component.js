import { Fragment } from "react"
import { NavContainer,NavContainerAndOutlet, OutletData,Logo,NavLinks,SeparationLine, IconWrapper,HeadingWrapper,IconWrapper1} from "./navigation.styles"
import { BiSolidPieChartAlt } from "react-icons/bi";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineOtherHouses } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
import { GiArtificialIntelligence } from "react-icons/gi";
import { CiExport } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { useState } from "react";




export const Navigation=()=>{

 // State to keep track of the selected item
 const [selectedItem, setSelectedItem] = useState(null);
  
 // Handle click event
 const handleItemClick = (id) => {
    if(selectedItem === id){
        //Reset color if the same button is clicked again
        setSelectedItem(null)
    } else {
        setSelectedItem(id)
    }
 };

const getItemProp =(id)=>{
    return selectedItem === id ? true: false;
}

    return(
        <Fragment>
<NavContainerAndOutlet>


<NavContainer>
<Logo><IconWrapper1><FaMoneyBillTrendUp /></IconWrapper1><HeadingWrapper>FinPlanner</HeadingWrapper> </Logo>
<SeparationLine/>

<NavLinks to='/budget' isSelected={getItemProp('8')}onClick={()=>handleItemClick('8')} > <IconWrapper><BiSolidPieChartAlt /> </IconWrapper>Budget
</NavLinks>

<NavLinks to='/transactions' isSelected={getItemProp('1')} onClick={()=>handleItemClick('1')}> <IconWrapper><AiOutlineBars /> </IconWrapper>Transactions</NavLinks>
<NavLinks to='/account' isSelected={getItemProp('2')} onClick={()=>handleItemClick('2')}> <IconWrapper><MdOutlineOtherHouses /> </IconWrapper>Account</NavLinks>
<NavLinks to='/dashboard' isSelected={getItemProp('3')}onClick={()=>handleItemClick('3')}><IconWrapper><TbBrandGoogleAnalytics /> </IconWrapper>Dashboard</NavLinks>
<NavLinks to='/investment' isSelected={getItemProp('4')} onClick={()=>handleItemClick('4')}><IconWrapper><RiRefund2Fill /> </IconWrapper>Investment</NavLinks>
<NavLinks to='/insight' isSelected={getItemProp('5')} onClick={()=>handleItemClick('5')}><IconWrapper><GiArtificialIntelligence /> </IconWrapper>Insight</NavLinks>
<NavLinks to='/export' isSelected={getItemProp('6')} onClick={()=>handleItemClick('6')}><IconWrapper><CiExport /> </IconWrapper>Export</NavLinks>
<NavLinks to='/logIn' isSelected={getItemProp('7')} onClick={()=>handleItemClick('7')}><IconWrapper><CiLogin /> </IconWrapper>LogIn</NavLinks>
 </NavContainer>
    <OutletData>
    <Outlet/>
    </OutletData>

</NavContainerAndOutlet>
        </Fragment>
       
    )
}