// conexiones
import Servers from "./urlServers";
// import "./varsGlobals";
import axios from "axios";
const host = Servers;
const cnx = "dev"; // valores = produccion | dev | test

window.urlmaster = host.urlmaster[cnx];

window.master = axios.create({
    baseURL: window.urlmaster,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json, text/plain, */*",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        // 'Access-Control-Allow-Methods': 'GET, POST, GET, POST`, PUT, PATCH, DELETE',
        // "X-Requested-With": "XMLHttpRequest",
    }
});
