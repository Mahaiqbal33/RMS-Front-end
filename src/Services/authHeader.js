// authHeader.js
export function authHeader() {
    // return authorization header with jwt token
    let AdminUser = JSON.parse(localStorage.getItem("userToken"));
    if (AdminUser && AdminUser.accessToken) {
      var allowedOrigins = "*";
      var allow_headers = "Referer,Accept,Origin,User-Agent,Content-Type";
      return {
        Authorization: "Bearer " + AdminUser.accessToken,
        "Content-Type": "application/json, multipart/form-data",
        "Access-Control-Allow-Origin": allowedOrigins,
        "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Headers": allow_headers,
        "WWW-Authenticate": "Basic",
        "Access-Control-Allow-Credentials": true,
      };
    }
  }
  