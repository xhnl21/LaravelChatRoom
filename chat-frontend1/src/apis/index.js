import apisLogin from "./login/index";
import apisUser from "./user/index";
import apisUserActivites from "./user/indexa";
import apisServiceDetails from "./user/indexs";

import apisOil from "./oil/index";
import apisOilCS from "./oil/indexcs";

import apisBalance from "./balance/index";
import apisSBS from "./balance/indexsbs";

import apisTireLS from "./tire/indexls";
import apisTireLSS from "./tire/indexlss";
import apisTireRC from "./tire/indexrc";
import apisTirePS from "./tire/indexps";
import apisTireSPS from "./tire/indexsps";
import apisTireURC from "./tire/indexurc";

import apisBattery from "./battery/index";
import apisBatteryPhysical from "./battery/indexbp";
import apisBatteryPhysicalSstate from "./battery/indexbps";
import apisBatteryUser from "./battery/indexbu";

export default {
    Login: apisLogin,
    User: apisUser,
    UserActivites: apisUserActivites,
    ServiceDetails: apisServiceDetails,

    Oil: apisOil,
    OilCS: apisOilCS,

    Balance: apisBalance,
    BalanceS: apisSBS,

    TireLS: apisTireLS,
    TireLSS: apisTireLSS,
    TireRC: apisTireRC,
    TirePS: apisTirePS,
    TireSPS: apisTireSPS,
    TireURC: apisTireURC,

    Battery: apisBattery,
    BatteryPhysical: apisBatteryPhysical,
    BatteryPhysicalSstate: apisBatteryPhysicalSstate,
    BatteryUser: apisBatteryUser,
};