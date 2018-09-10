import axios from 'axios';

const accessToken = document.location.href.split('#')[0].split('=')[1];

export default axios.create({
  withCredentials: true,
  // baseURL: `https://jsonplaceholder.typicode.com`,
  crossDomain: true,
  headers: {
    "X-Shopify-Access-Token": accessToken && accessToken.toString(),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, X-Shopify-Access-Token",
    "Access-Control-Allow-Credentials": true
  }
});
