export function hasLocalStorage() {
  return (!!window.localStorage);
}

export function getLogin() {
  if (!hasLocalStorage()) {
    return false;
  } else {
    if (window.localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
