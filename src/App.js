import { SplitScreen } from "./components/splitScreen/splitScreen";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./routes/home/navigation/navigation.component";
import { MyBudgetScreen } from "./routes/budget/myBudget";
import { MyTransactionScreen } from "./routes/transactions/transactions";
import { MyAccountScreen } from "./routes/account/myAccount";
import { MyDashBoardScreen } from "./routes/dashboard/myDashboard";
import { MyInvestmentScreen } from "./routes/investment/myInvestment";
import { MyInsightScreen } from "./routes/insight/myInsight";
import { MyExportScreen } from "./routes/export/myExport";
import { MyLogInScreen } from "./routes/logIn/logIn";
import { QueryClient, QueryClientProvider } from "react-query";

//React Query requires you to wrap your app with a QueryClientProvider, which provides the QueryClient to your React components. This is necessary to manage and configure queries globally within your application.
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
 <QueryClientProvider client={queryClient}> 
<Routes>
  <Route path="/" element={<Navigation/>}> 
<Route path='budget' element={<MyBudgetScreen/>}/>
<Route path='transactions' element={<MyTransactionScreen/>}/>
<Route path='account' element={<MyAccountScreen/>}/>
<Route path='dashboard' element={<MyDashBoardScreen/>}/>
<Route path='investment' element={<MyInvestmentScreen/>}/>
<Route path='insight' element={<MyInsightScreen/>}/>
<Route path='export' element={<MyExportScreen/>}/>
<Route path='logIn' element={<MyLogInScreen/>}/>
  </Route>
</Routes>
</QueryClientProvider>
  );
}

export default App;
