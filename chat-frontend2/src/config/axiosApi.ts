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
        "Accept": "application/json, text/plain, */*"
    }
});
