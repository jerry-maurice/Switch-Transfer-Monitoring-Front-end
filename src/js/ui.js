import { auth0 } from "./authenticate";

const updateUI = async() => {
    try {
        /**
         * verify is user is authenticated
         */
        const isAuthenticated = await auth0.isAuthenticated();
        /**
         * if it is authenticated, the user will be able to view these
         */
        if (isAuthenticated) {
            //modify navigation
            Client.navigationLookPrivate();

            //Client.callApi();
        } else {
            //modify navigation
            Client.navigationLookPublic();
        }

    } catch (err) {
        console.log("error updating UI", err);
        return;
    }
    console.log("UI updated");
}

export { updateUI }