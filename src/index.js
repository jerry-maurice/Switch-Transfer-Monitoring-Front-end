import './styles/main.scss'

import img_official from './images/official_switch.png';
import { loadAuth, requireAuth, loginClient, logoutClient, configureClient, auth0, callApi } from './js/authenticate';
import { navigation, navigationLookPrivate, navigationLookPublic } from './js/navigation.js'
//import { indexRoute } from './js/routing.js'
import { showContent, eachElement, showContentFromUrl, router, isRouteLink } from './js/route.js'
import { updateUI } from './js/ui.js'


/**
 * will run when page finishes loading
 */
window.onload = async() => {
    await loadAuth();
}

//add logo to nav
let official_img = document.getElementById('official_img');
official_img.src = img_official;
navigation();
//indexRoute.init();
//window.indexRoute = indexRoute;


export {
    navigation,
    //indexRoute,
    showContent,
    eachElement,
    loadAuth,
    requireAuth,
    loginClient,
    logoutClient,
    configureClient,
    showContentFromUrl,
    auth0,
    router,
    isRouteLink,
    updateUI,
    navigationLookPrivate,
    navigationLookPublic,
    callApi,
}