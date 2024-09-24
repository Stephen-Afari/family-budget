import { Fragment, useEffect } from "react"
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
//import { fetchAllActualIncomes } from "../../../api_layer/actuals/actualIncomeApi";



export const Navigation=()=>{

 // State to keep track of the selected item
 const [selectedItem, setSelectedItem] = useState(null);
  
 //Test the API Layer
 //console.log('Navigation component rendered'); // Check if this logs
// useEffect(()=>{
//     // fetchAllActualIncomes().then((data) => {
//     //     console.log(data); // This should now log the actual data instead of undefined
//     //   }).catch((error) => {
//     //     console.error('Error fetching actual incomes:', error);
//     //   });
//     console.log(fetchAllActualIncomes())
//     },[])

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
    return selectedItem === id ? "true": "false";
}


    return(
        <Fragment>
<NavContainerAndOutlet>


<NavContainer>
<Logo><IconWrapper1><FaMoneyBillTrendUp /></IconWrapper1><HeadingWrapper>FinPlanner</HeadingWrapper> </Logo>
<SeparationLine/>
 
<NavLinks to='/budget' isselected={getItemProp('8').toString()} onClick={()=>handleItemClick('8')} > <IconWrapper><BiSolidPieChartAlt /> </IconWrapper>Budget
</NavLinks>

<NavLinks to='/transactions' isselected={getItemProp('1')} onClick={()=>handleItemClick('1')}> <IconWrapper><AiOutlineBars /> </IconWrapper>Actual</NavLinks>
<NavLinks to='/account' isselected={getItemProp('2')} onClick={()=>handleItemClick('2')}> <IconWrapper><MdOutlineOtherHouses /> </IconWrapper>Budget vs Actual</NavLinks>
<NavLinks to='/dashboard' isselected={getItemProp('3')}onClick={()=>handleItemClick('3')}><IconWrapper><TbBrandGoogleAnalytics /> </IconWrapper>Dashboard</NavLinks>
<NavLinks to='/investment' isselected={getItemProp('4')} onClick={()=>handleItemClick('4')}><IconWrapper><RiRefund2Fill /> </IconWrapper>Investment</NavLinks>
<NavLinks to='/insight' isselected={getItemProp('5')} onClick={()=>handleItemClick('5')}><IconWrapper><GiArtificialIntelligence /> </IconWrapper>Insight</NavLinks>
<NavLinks to='/export' isselected={getItemProp('6')} onClick={()=>handleItemClick('6')}><IconWrapper><CiExport /> </IconWrapper>Export</NavLinks>
<NavLinks to='/logIn' isselected={getItemProp('7')} onClick={()=>handleItemClick('7')}><IconWrapper><CiLogin /> </IconWrapper>LogIn</NavLinks>
 </NavContainer>
    <OutletData>
    <Outlet/>
    </OutletData>

</NavContainerAndOutlet>
        </Fragment>
       
    )
}