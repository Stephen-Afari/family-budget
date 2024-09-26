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
import { fetchAllActualIncomes } from "../../../api_layer/actuals/actualIncomeApi";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {selectActualApiIncomes}from "../../../store/apiData/actualAPIIncome.selector";
import {setActualApiIncomes} from "../../../store/apiData/actualAPIIncome.reducer";


export const Navigation=()=>{
const dispatch = useDispatch();
const selectAllApiIncomes= useSelector(selectActualApiIncomes);
//Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
    const {
        data: actIncomes,
        isLoading,
        isSuccess,
        isError,
        error
      } = useQuery("actual_incomes", fetchAllActualIncomes, {
        onSuccess: (data)=>{
            // Dispatch Redux action to update the reducer
            dispatch(setActualApiIncomes(data));
        }
      });

 // State to keep track of the selected item    
 const [selectedItem, setSelectedItem] = useState(null);
  
 //Test the API Layer

useEffect(()=>{
    
        console.log(selectAllApiIncomes)
        //Then, in your component, use React Query to fetch the data, and after it’s fetched, dispatch it to your Redux store:
    
    
    
    // {isSuccess ? console.log(actIncomes) : null }
    
    },[])

  // Display loading, error, or success state
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;




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