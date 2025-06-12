import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {Home, Testing, Result, Camera, Select, Summary} from './pages/pageComponents';
import NavBar from './components/NavBar';

const AppContent = () => {
  const location = useLocation();
  const noNavPaths = ["/camera"];
  const hideNavBar = noNavPaths.includes(location.pathname);
  
return (
    <>
    {!hideNavBar && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/testing' element={<Testing />}></Route>
        <Route path='/result' element={<Result />}></Route>
        <Route path='/camera' element={<Camera />}></Route>
        <Route path='/select' element={<Select />}></Route>
        <Route path='/summary' element={<Summary />}></Route>
      </Routes>
    </>
)

}
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
