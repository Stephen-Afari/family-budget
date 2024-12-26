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
import { useEffect, useState } from "react";

//React Query requires you to wrap your app with a QueryClientProvider, which provides the QueryClient to your React components. This is necessary to manage and configure queries globally within your application.
// Create a client
const queryClient = new QueryClient();

// PrivateRoute component.This will guard routes that require authentication.
/**
 * PrivateRoute component:
 * Protects routes that require authentication by checking the token in Redux.
 * If the token is not available, redirects the user to the login page.
 */
const PrivateRoute = ({ children }) => {
  const token = useSelector(selectUserToken); // Fetch token from Redux store
  const [isReady, setIsReady] = useState(false); // Local state to track readiness

  useEffect(() => {
    // Simulate readiness check when token becomes available
    if (token) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [token]);

  // Show a loading spinner while checking authentication
  if (!isReady) {
    return <div>Loading...</div>;
  }

  // If token exists, render protected content; otherwise, redirect to login
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
{/* Redirect unmatched routes to the login page */}
<Route path="*" element={<Navigate to="/logIn" />} />
</Routes>
</QueryClientProvider>
  );
}

export default App;
