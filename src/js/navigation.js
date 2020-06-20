function navigation() {
    /*let toggle = document.getElementsByClassName('toggle');
    toggle.addEventListener('click', function() {

    });*/
    const login_button = document.getElementById('login_button');
    const logout_button = document.getElementById('logout_button');
    login_button.addEventListener('click', () => {
        Client.loginClient();
    });
    logout_button.addEventListener('click', () => {
        Client.logoutClient();
    });
}
/**
 * modify navigation look for authenticated user
 */
function navigationLookPrivate() {
    Client.eachElement(".private", (p) => p.classList.remove("hidden"));
    Client.eachElement(".public", (p) => p.classList.add("hidden"));
    document.getElementById('login_button').style.display = "none";
}
/**
 * modify navigation look for non authenticated user
 */
function navigationLookPublic() {
    Client.eachElement(".private", (p) => p.classList.add("hidden"));
    Client.eachElement(".public", (p) => p.classList.remove("hidden"));
    document.getElementById('logout_button').style.display = "none";
}

export { navigation }
export { navigationLookPrivate }
export { navigationLookPublic }