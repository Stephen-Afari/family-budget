import { SplitScreen } from "./components/splitScreen/splitScreen";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./routes/home/navigation/navigation.component";
import { MySplitScreen } from "./routes/myScreen/myScreen";



function App() {
  return (
<Routes>
  <Route path="/" element={<Navigation/>}> 
<Route path='budget' element={<MySplitScreen/>}/>
<Route path='budget/trxns' element={<MySplitScreen/>}/>
<Route path='transactions' element={<MySplitScreen/>}/>
<Route path='account' element={<MySplitScreen/>}/>
<Route path='dashboard' element={<MySplitScreen/>}/>
<Route path='investment' element={<MySplitScreen/>}/>
<Route path='insight' element={<MySplitScreen/>}/>
<Route path='export' element={<MySplitScreen/>}/>
<Route path='logIn' element={<MySplitScreen/>}/>
  </Route>
</Routes>
  );
}

export default App;
