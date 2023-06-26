import { authHeader } from "./authHeader";
import { baseUrl } from "./apiCalls";
import axios from "axios";

export const SC = {
  getCall,
  postCall,
  putCall,
  deleteCall,
};

function getCall(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return axios
    .get(
      baseUrl +
        url ,

      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function postCall(url, data, callbackProgressUpload = null, source) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
    onUploadProgress: function (progressEvent) {
      // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };

  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(
      baseUrl +
        url ,
      data,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function putCall(url, data) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return axios
    .put(
      baseUrl +
        url ,
      data,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
function deleteCall(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return axios
    .delete(
      baseUrl +
        url ,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
