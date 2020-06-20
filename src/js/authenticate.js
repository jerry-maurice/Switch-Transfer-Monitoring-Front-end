import createAuth0Client from '@auth0/auth0-spa-js';

/*
 * the auth0 client initialized in configureClient
 */
let auth0 = null;

/*
 *Initialize the auth0 client
 */
const configureClient = async() => {
        auth0 = await createAuth0Client({
            domain: process.env.domain,
            client_id: process.env.clientId,
            audience: process.env.audience,
        });
    }
    /*
     *   start the authentication flow
     */
const loginClient = async(targetUrl) => {
    try {
        console.log('Login in', targetUrl);

        const options = {
            redirect_uri: window.location.origin
        };

        if (targetUrl) {
            options.appState = { targetUrl };
        }

        await auth0.loginWithRedirect(options);
        const user = await auth0.getUser();
        console.log(user);
    } catch (err) {
        console.log("log in failed", err);
    }
}

/*
 * execute the log out flow
 */
const logoutClient = () => {
    try {
        auth0.logout({
            returnTo: window.location.origin
        });
    } catch (err) {
        console.log("log out failed", err);
    }
};

/**
 * check to see if the user is authenticated. 
 */
const requireAuth = async(fn, targetUrl) => {
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        return fn();
    }
    return loginClient(targetUrl);
}

//run when page load
const loadAuth = async() => {
        await configureClient();

        // If unable to parse the history hash, default to the root URL
        if (!Client.showContentFromUrl(window.location.pathname)) {
            Client.showContentFromUrl("/");
            window.history.replaceState({ url: "/" }, {}, "/");
            return;
        }

        const bodyElemtent = document.getElementsByTagName("body")[0];

        //Listen out for clicks on any hyperlink that navigates to a #/ URL
        bodyElemtent.addEventListener("click", (e) => {
            if (Client.isRouteLink(e.target)) {
                const url = e.target.getAttribute("href");

                if (Client.showContentFromUrl(url)) {
                    e.preventDefault();
                    window.history.pushState({ url }, {}, url);
                }
            } else if (e.target.getAttribute("id") === "call-api") {
                e.preventDefault();
                callApi();
            }
        });

        const isAuthenticated = await auth0.isAuthenticated();

        if (isAuthenticated) {
            console.log("> User is authenticated");
            window.history.replaceState({}, document.title, window.location.pathname);
            Client.updateUI();
            return;
        }

        console.log("> User not authenticated");

        const query = window.location.search;
        const shouldParseResult = query.includes("code=") && query.includes("state=");

        if (shouldParseResult) {
            console.log("> Parsing redirect");
            try {
                const result = await auth0.handleRedirectCallback();

                if (result.appState && result.appState.targetUrl) {
                    Client.showContentFromUrl(result.appState.targetUrl);
                }

                console.log("Logged in!");
            } catch (err) {
                console.log("Error parsing redirect:", err);
            }

            window.history.replaceState({}, document.title, "/");
        }
        //add method to update the UI
        Client.updateUI();
    }
    /**
     * testing call api
     */
const callApi = async() => {
    try {
        const accesstoken = await auth0.getTokenSilently();
        //console.log(accesstoken);

        //myHeaders.append("Content-Type", "Application/json");

        const response = await fetch("http://localhost:5000/api/v1/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + accesstoken,
            },
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (e) {
        console.log(e);
    }
};

export { loadAuth }
export { requireAuth }
export { logoutClient }
export { loginClient }
export { configureClient }
export { auth0 }
export { callApi }

/**
 * 
		method: 'POST',
		credentials:'same-origin',
		headers: {
			'X-CSRFToken':getCookie("csrftoken"),
			'Content-Type':'application/json'
		},
 */