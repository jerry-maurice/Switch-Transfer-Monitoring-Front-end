//import { showContent } from "./routing";

//url mapping from hash to a function that responds to that URL action
const router = {
    "/": () => showContent("switch-public"),
    "/dashboard": () => Client.requireAuth(() => showContent("switch-dashboard"), "/dashboard"),
    "/app": () => Client.requireAuth(() => showContent('switch-app'), "/app"),
    "/my-info": () => Client.requireAuth(() => showContent('switch-my-info'), "/my-info"),
};
/*
 * Iterates over the elements 
 */
const eachElement = (selector, fn) => {
    for (let e of document.querySelectorAll(selector)) {
        fn(e);
    }
};

/*
 * display a content panel specified by the given element id.
 */
const showContent = (id) => {
        eachElement(".page", (p) => p.classList.add("hidden"));
        document.getElementById(id).classList.remove("hidden");
    }
    /**
     * Tries to display a content panel that is referenced
     * by the specified route URL. These are matched using the
     * router, defined above.
     * @param {*} url The route URL
     */
const showContentFromUrl = (url) => {
    if (router[url]) {
        router[url]();
        return true;
    }

    return false;
};

/**
 * returns true if element is a hyperlink that can be considered a link to another SPA route
 */
const isRouteLink = (element) => element.tagName === "A" && element.classList.contains("route-link");



//export { router as indexRoute }
export { eachElement }
export { showContent }
export { showContentFromUrl }
export { isRouteLink }
export { router }