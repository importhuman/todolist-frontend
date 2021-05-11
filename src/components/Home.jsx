import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    // <Fragment>
        <div>
          <h1 className="heading">To-do list</h1>
          <div className="no-tasks">
            <p>Add tasks, mark them as done, edit or delete them!<br/><br/>
              
              Please sign in to access your tasks.<br/><br/>

              Note: This application uses cookies to save sessions. Please ensure you have enabled cookies, or you will be logged out on refreshing or closing the tab. <br/>
              If the application doesn't work for you, please try disabling any ad-blocking extensions that may be active.
            </p>
            {!isAuthenticated && (
              <button id="login" onClick={() => loginWithRedirect({})}>Sign in</button>
            )}
          </div>
        </div>
    // </Fragment>
  );
};

export default Home;