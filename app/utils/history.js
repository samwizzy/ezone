import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
    //Do your logic here and dispatch if needed
    if (location.pathname === '/logout') {
        // Do something here
    }
})

export default history;
