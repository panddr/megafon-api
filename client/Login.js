export function hasLocalStorage() {
  return (!!window.localStorage);
}

export function getUserLogin() {
  return window.localStorage.getItem('isLoggedIn');
}

export function setUserLogin() {
  const isLoggedIn = false;
  window.localStorage.setItem('isLoggedIn', false);
  return isLoggedIn;
}

export function getOrSetUserLogin() {
  if (!hasLocalStorage()) {
    return false;
  } else {
    let isLoggedIn = getUserLogin();
    return (isLoggedIn) ? isLoggedIn : setUserLogin();
  }
}
