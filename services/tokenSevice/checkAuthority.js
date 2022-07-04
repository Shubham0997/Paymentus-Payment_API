function checkAuthority(userType, path) {
  console.log(userType + " " + path);

  var allow = false;

  if (userType === "visitor") {
    allow = false;
    return allow;
  }
  if (userType === "admin") {
    allow = true;
    return allow;
  }

  if (userType === "biller") {
    if (path === "/payments/paymentDetails") {
      allow = false;
      return allow;
    } else {
      allow = true;
      return allow;
    }
  }
}

module.exports = checkAuthority;
