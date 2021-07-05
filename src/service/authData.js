export const authData = (fullName, email, password) => {
  if (localStorage.getItem("authData") === null) {
    let dict = {};
    dict[email] = {
      fullname: fullName,
      password: password
    };
    localStorage.setItem("authData", JSON.stringify(dict));
    return true;
  } else {
    let dict = JSON.parse(localStorage.getItem("authData"));

    if (email in dict) {
      return false;
    }

    dict[email] = {
      fullname: fullName,
      password: password
    };

    localStorage.setItem("authData", JSON.stringify(dict));
    return true;
  }
};
export const isAuthorized = (email, password) => {
  let dict = JSON.parse(localStorage.getItem("authData"));

  if (dict !== null && email in dict) {
    return dict[email]["password"] === password && dict[email]["fullname"];
  }

  return false;
};
