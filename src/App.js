import { SplitScreen } from "./components/splitScreen/splitScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./routes/home/navigation/navigation.component";
import { MyBudgetScreen } from "./routes/budget/myBudget";
import { MyTransactionScreen } from "./routes/transactions/transactions";
import { MyAccountScreen } from "./routes/account/myAccount";
import { MyDashBoardScreen } from "./routes/dashboard/myDashboard";
import { MyInvestmentScreen } from "./routes/investment/myInvestment";
import { MyInsightScreen } from "./routes/insight/myInsight";
import { MyExportScreen } from "./routes/export/myExport";
import { MyLogInScreen } from "./routes/logIn/logIn";
import { AuthScreen } from "./routes/authScreen/authscreen";
import { QueryClient, QueryClientProvider } from "react-query";
import { selectUserToken } from "./store/apiData/users/users.selector";
import { useSelector } from "react-redux";
import { BudgetIncomeFetcher } from "./components/common/fetchBudgetIncome";
import { ActualTransactionFetcher } from "./components/common/fetchActualTransaction";
import { BudgetTransactionFetcher } from "./components/common/fetchBudgetTransaction";
import { ActualIncomeFetcher } from "./components/common/fetchActualIncome";

//React Query requires you to wrap your app with a QueryClientProvider, which provides the QueryClient to your React components. This is necessary to manage and configure queries globally within your application.
// Create a client
const queryClient = new QueryClient();

// PrivateRoute component.This will guard routes that require authentication.
const PrivateRoute = ({ children }) => {
  const token = useSelector(selectUserToken); // Select the token from Redux
  return token ? children : <Navigate to="/logIn" />;
};

function App() {
  return (
 <QueryClientProvider client={queryClient}> 
<Routes>
 {/* Public route for Login */}
 <Route path="/logIn" element={<AuthScreen />} />

  {/* All other routes are protected */}
  <Route path="/" element={<PrivateRoute>
  {/* fetch data here */}
  <ActualIncomeFetcher/>
  <BudgetTransactionFetcher/>
   <ActualTransactionFetcher/>
    <BudgetIncomeFetcher/>  
    <Navigation /></PrivateRoute>} >
<Route path='budget' element={<MyBudgetScreen/>}/>
<Route path='transactions' element={<MyTransactionScreen/>}/>
<Route path='account' element={<MyAccountScreen/>}/>
<Route path='dashboard' element={<MyDashBoardScreen/>}/>
<Route path='investment' element={<MyInvestmentScreen/>}/>
<Route path='insight' element={<MyInsightScreen/>}/>
<Route path='export' element={<MyExportScreen/>}/>

  </Route>
</Routes>
</QueryClientProvider>
  );
}

export default App;
