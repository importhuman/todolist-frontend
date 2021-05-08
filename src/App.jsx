import Home from './components/Home.jsx';
import { useAuth0 } from "./react-auth0-spa.jsx";
import LoggedIn from './components/LoggedIn.jsx';

const App = () => {
  // for auth ---
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  // --- for auth 
  

  return (
    <div className="app">
      {!isAuthenticated && (
        <Home />
      )}

      {/* authenticated */}
      {isAuthenticated && <LoggedIn/>}
    </div>
  );
}

export default App;
