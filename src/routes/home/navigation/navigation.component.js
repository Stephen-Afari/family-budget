import { Fragment } from "react"
import { NavContainer,NavContainerAndOutlet, OutletData,Logo,NavLinks,SeparationLine, IconWrapper,HeadingWrapper,IconWrapper1} from "./navigation.styles"
import { BiSolidPieChartAlt } from "react-icons/bi";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineOtherHouses } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
//import { GiArtificialIntelligence } from "react-icons/gi";
import { CiExport } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../../store/apiData/users/users.reducer";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
// import { fetchAllActualIncomes, useToken } from "../../../api_layer/actuals/actualIncomeApi";
// import { useQuery } from "react-query";
//import { useDispatch } from "react-redux";
// import {selectActualApiIncomes}from "../../../store/apiData/actualIncome/actualAPIIncome.selector";
// import {setActualApiIncomes} from "../../../store/apiData/actualIncome/actualAPIIncome.reducer";
// import { getUserToken } from "../../../api_layer/users/usersApi";
// import { fetchUserToken, setUsers } from "../../../store/apiData/users/users.reducer";
// import { selectUser, selectUserToken } from "../../../store/apiData/users/users.selector";

export const Navigation=()=>{
//const dispatch = useDispatch();
// const token1 = useSelector(selectUserToken)
// const { token, loading, error } = useSelector((state) => state.users);
// const selectAllApiIncomes= useSelector(selectActualApiIncomes);
//const userToken = useToken();



//const selectUserAPI = useSelector(selectUser)
// //Use React Query to Manage Data Fetching and Caching: React Query will handle the data fetching, caching, and error/loading states.
//     const {
//         data: actIncomes,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//       } = useQuery("actual_incomes", fetchAllActualIncomes, {
//         onSuccess: (data)=>{
//             // Dispatch Redux action to update the reducer
           
//             dispatch(setActualApiIncomes(data.data.data));
//            // console.log(selectAllApiIncomes)
//         }
//       });
//       //console.log('myTokenTest-', userToken)
//  // State to keep track of the selected item    
 const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
//  //Test the API Layer
// // Test the API layer and Redux state changes
// useEffect(() => {
//     if (isSuccess) {
//       console.log('Redux State (actual incomes):', selectAllApiIncomes);
//     }
//   }, [isSuccess, selectAllApiIncomes]);
//Testing login
//Since useEffect doesn't directly support asynchronous code, an internal asynchronous function (loginUser) is created and executed inside the useEffect.
// useEffect(() => {
//     const loginUser = async () => {
//       const email = "demorganafari19@gmail.com";
//       const password = "test12345";

//       try {
//         const loggedInUser = await getUserToken({ email, password });
//         //console.log("Logged in user:", loggedInUser.token); // Handle the user data here. Dispatch it to the store
//         dispatch(setUsers(loggedInUser.token))
//       } catch (error) {
//         console.error("Login error:", error); // Handle any login errors
//       }
//     };

//     loginUser(); // Call the async function inside useEffect
//   }, []);
// useEffect(() => {
    
//   const credentials = { email: "demorganafari19@gmail.com", password: "test12345" };
  
//   dispatch(fetchUserToken(credentials));
//   console.log('dispatched')
// }, [dispatch]);

//console.log(token1)

//console.log(selectUserAPI)
  // Display loading, error, or success state
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;
  //console.log(selectAllApiIncomes)



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

const handleLogout = () => {
    handleItemClick('7')
    dispatch(logoutUser()); // Clear Redux state (token, user data)
    queryClient.clear(); // Clear all React Query cached data
  };

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
{/* <NavLinks to='/insight' isselected={getItemProp('5')} onClick={()=>handleItemClick('5')}><IconWrapper><GiArtificialIntelligence /> </IconWrapper>Insight</NavLinks> */}
<NavLinks to='/export' isselected={getItemProp('6')} onClick={()=>handleItemClick('6')}><IconWrapper><CiExport /> </IconWrapper>Export</NavLinks>
<NavLinks to='/logIn' isselected={getItemProp('7')} onClick={handleLogout}><IconWrapper><CiLogin /> </IconWrapper>LogOut</NavLinks>
 </NavContainer>
    <OutletData>
    <Outlet/>
    </OutletData>

</NavContainerAndOutlet>
        </Fragment>
       
    )
}