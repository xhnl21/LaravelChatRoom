import { defineComponent } from 'vue';
import routes from '@/router/index';
import { Store } from 'vuex';
import { Router } from 'vue-router';
// import { CapacitorHttp, HttpResponse } from '@capacitor/core';
export default defineComponent({
    data() {
        return {
            sqlite: [] as any,
            db: [] as any,
            d: import.meta.env.BASE_UR,
            lastID: 0,
            isConnected: true,
        }
    },
    methods: {
        async getToken(close: any) {
            let existingArray = await window.database.getPreferences('user', close);
            if (existingArray !== null && existingArray !== undefined) {
                if (existingArray.length > 0 && existingArray !== undefined) {
                    return existingArray[0].access_token;
                }
            } else {
                window.database.deleteUserTokenExpiredP(close);
            }
        },
        postLogin(url: any, data: any, close: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .post(url, data)
                    .then(async (response: any) => {
                        try {
                            console.log(response);
                            resolve(response.data);
                        } catch (error) {
                            return this.getError(error, close);
                        }
                    })
                    .catch((error: any) => {
                        reject(this.getError(error, close));
                        return this.getError(error, close);
                    });
            });
        },
        async post(url: any, data: any, close: any, toke: string = '') {
            let token = await this.validToken(toke, close);
            return new Promise((resolve, reject) => {
                window.master
                    .post(url, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async (response: any) => {
                        console.log(response);
                        resolve(response.data);
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        async put(url: any, data: any, close: any, toke: string = '') {
            let token = await this.validToken(toke, close);
            return new Promise((resolve, reject) => {
                window.master
                    .put(url, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response: any) => {
                        console.log(response);
                        resolve(response.data);
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        async get(request: any, close: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .get(request.url, {
                        headers: {
                            Authorization: `Bearer ${request.token}`,
                        },
                    })
                    .then(async (response: any) => {
                        resolve(response.data);
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        async delete(url: any, close: any, token: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .delete(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async (response: any) => {
                        resolve(response.data);
                    })
                    .catch(async (error: any) => {
                        reject(this.getError(error, close));
                    });
            });
        },
        getS(url: any, close: any, token: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async (response: any) => {
                        let total = response.data.meta.total;
                        if (parseInt(total) > 0) {
                            let url = window.getters.apis.Providers;
                            let data = this.getAll(url.getAllProviders(total), close, token);
                            resolve(data);
                        } else {
                            resolve(response.data);
                        }
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        getAll(url: any, close: any, token: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async (response: any) => {
                        resolve(response.data);
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        getM(request: any, close: any, token: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .get(request.url, {
                        headers: {
                            Authorization: `Bearer ${request.token}`,
                        },
                    })
                    .then(async (response: any) => {
                        let total = response.data.meta.total;
                        if (parseInt(total) > 0) {
                            let urls = window.getters.apis.Sms;
                            let data = this.getAllM(urls.getAllMSms(request.url, total), close, token);
                            resolve(data);
                        } else {
                            resolve(response.data);
                        }
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        getAllM(url: any, close: any, token: any) {
            return new Promise((resolve, reject) => {
                window.master
                    .get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async (response: any) => {
                        resolve(response.data);
                    })
                    .catch((error: any) => {
                        this.getError(error, close);
                        reject(error);
                    });
            });
        },
        async makeGetRequests(requests: any, close: any, token: any) {
            try {
                const promises = requests.map((request: any) => {
                    return new Promise((resolve, reject) => {
                        window.master
                            .get(request.url, {
                                headers: {
                                    Authorization: `Bearer ${request.token}`,
                                },
                            })
                            .then((response: any) => {
                                resolve(response.data);
                            })
                            .catch((error: any) => {
                                this.getError(error, close);
                                reject(error);
                            });
                    });
                });
                let array = [];
                let result = await Promise.all(promises);
                let url = '' as any;
                let rUrl = '';
                for (let i in result) {
                    let links = result[i].links.first_page;
                    let total = result[i].meta.total;
                    let rs = this.splitSlash(links);
                    if (rs === 'apps') {
                        url = window.getters.apis.Apps;
                        rUrl = url.getAllApps(total);
                    }
                    if (rs === 'provider_recharges') {
                        url = window.getters.apis.Recharge;
                        rUrl = url.getAllProviderRecharges(total)
                    }
                    array.push({ url: rUrl, token: token });
                }
                return this.makeGetRequestsAll(array, close);
            } catch (error) {
                console.error(error);
            }
        },
        splitSlash(links: string) {
            let r = links.split("/");
            return this.splitInterrogative(r[4]);
        },
        splitInterrogative(links: string) {
            let r = links.split("?page=");
            return r[0];
        },
        makeGetRequestsAll(requests: any, close: any) {
            try {
                const promises = requests.map((request: any) => {
                    // console.log(request.url);

                    return new Promise((resolve, reject) => {
                        window.master
                            .get(request.url, {
                                headers: {
                                    Authorization: `Bearer ${request.token}`,
                                },
                            })
                            .then((response: any) => {
                                resolve(response.data);
                            })
                            .catch((error: any) => {
                                this.getError(error, close);
                                reject(error);
                            });
                    });
                });
                return Promise.all(promises);
            } catch (error) {
                console.error(error);
            }
        },
        makePostRequests(requests: any, close: any) {
            try {
                const promises = requests.map((request: any) => {
                    return new Promise((resolve, reject) => {
                        window.master
                            .get(request.url, {
                                headers: {
                                    Authorization: `Bearer ${request.token}`,
                                },
                            })
                            .then((response: any) => {
                                resolve(response.data);
                            })
                            .catch((error: any) => {
                                this.getError(error, close);
                                reject(error);
                            });
                    });
                });
                return Promise.all(promises);
            } catch (error) {
                console.error(error);
            }
        },
        makeDeleteRequests(requests: any, close: any) {
            try {
                const promises = requests.map((request: any) => {
                    return new Promise((resolve, reject) => {
                        window.master
                            .delete(request.url, {
                                headers: {
                                    Authorization: `Bearer ${request.token}`,
                                },
                            })
                            .then((response: any) => {
                                resolve(response.data);
                            })
                            .catch((error: any) => {
                                this.getError(error, close);
                                reject(error);
                            });
                    });
                });
                return Promise.all(promises);
            } catch (error) {
                console.error(error);
            }
        },
        async permissions(data: any) {
            // console.log(data);
            let rutas = routes.getRoutes();
            let Array = [
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'btnConteofAdd', 'Permission': true },
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'btnConteofAddL', 'Permission': true },
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'btnConteofAddP', 'Permission': true },
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'btnConteofAddH', 'Permission': true },
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'inputConteofQ', 'Permission': true },
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'inputConteofL', 'Permission': true },
                { 'PageCode': 'ViewConteoFisico', 'ObjectCode': 'inputConteofP', 'Permission': true },

                { 'PageCode': 'ViewConteo', 'ObjectCode': 'btnConteoAdd', 'Permission': true },
                { 'PageCode': 'ViewConteo', 'ObjectCode': 'inputConteo', 'Permission': true },

                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'btnDashPlus', 'Permission': true },
                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'btnDashDetail', 'Permission': true },
                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'btnDashStart', 'Permission': true },
                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'btnDashEnd', 'Permission': true },
                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'btnDashViewDetail', 'Permission': true },
                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'auditor', 'Permission': true },
                { 'PageCode': 'ViewDashBoard', 'ObjectCode': 'user', 'Permission': false },

                { 'PageCode': 'ViewGrupo', 'ObjectCode': 'btnGrupoAdd', 'Permission': true },
                { 'PageCode': 'ViewGrupo', 'ObjectCode': 'inputGrupo', 'Permission': true },
                { 'PageCode': 'ViewGrupo', 'ObjectCode': 'btnGrupoDetail', 'Permission': true },

                { 'PageCode': 'ViewMember', 'ObjectCode': 'btnMemberAddA', 'Permission': true },
                { 'PageCode': 'ViewMember', 'ObjectCode': 'btnMemberDeleteA', 'Permission': true },
                { 'PageCode': 'ViewMember', 'ObjectCode': 'btnMemberAddB', 'Permission': true },
                { 'PageCode': 'ViewMember', 'ObjectCode': 'inputMember', 'Permission': true },
                { 'PageCode': 'ViewMember', 'ObjectCode': 'btnMemberDeleteB', 'Permission': true },

                { 'PageCode': 'ViewProducto', 'ObjectCode': 'inputProducto', 'Permission': true },
                { 'PageCode': 'ViewProducto', 'ObjectCode': 'btnClicProducto', 'Permission': true },

                { 'PageCode': 'ViewToma', 'ObjectCode': 'btnStart', 'Permission': true },
                { 'PageCode': 'ViewToma', 'ObjectCode': 'btnEnd', 'Permission': true },
                { 'PageCode': 'ViewToma', 'ObjectCode': 'btnDelete', 'Permission': true },
                { 'PageCode': 'ViewToma', 'ObjectCode': 'btnClicModal', 'Permission': true },

                { 'PageCode': 'ViewUbicacion', 'ObjectCode': 'inputUbicacion', 'Permission': true },
                { 'PageCode': 'ViewUbicacion', 'ObjectCode': 'btnClicUbicacion', 'Permission': true },

                { 'PageCode': 'Viewhistory', 'ObjectCode': 'inputHistory', 'Permission': true },
                { 'PageCode': 'Viewhistory', 'ObjectCode': 'btnClicHistory', 'Permission': true },
            ];
            // listado de vista y objetos
            for (let i in rutas) {
                let PageCode = rutas[i].meta.PageCode;
                let viewObject = rutas[i].meta.viewObject as any;
                for (let k in viewObject) {
                    viewObject[k].ObjectCode
                    viewObject[k].Permission
                    // console.log('PageCode: ' + PageCode + ', ObjectCode: ' + viewObject[k].ObjectCode + ', Permission: ' + viewObject[k].Permission);
                }
            }
            let result = [];
            for (let i in rutas) {
                if (rutas[i].meta.PageCode !== undefined) {
                    let rs = [];
                    let PageCode = rutas[i].meta.PageCode as any;
                    let arr = data.filter((element: any) => element.PageCode.trim() === PageCode.toString());
                    if (arr.length > 0) {
                        let viewObject = rutas[i].meta.viewObject as any;
                        for (let key in viewObject) {
                            let vObj = viewObject[key].ObjectCode.trim();
                            let g = arr.filter((element: any) => element.ObjectCode.trim() === vObj);
                            if (g.length > 0) {
                                if (g[0].Permission) {
                                    viewObject[key].Permission = 1;
                                } else {
                                    viewObject[key].Permission = 0;
                                }
                                rs.push(viewObject[key]);
                            }
                        }
                        rutas[i].meta.viewObject = rs;
                        result.push(rutas[i]);
                    }
                }
            }
            for (const i in result) {
                let name = result[i].name?.toString();
                routes.removeRoute(name!);
                routes.addRoute(result[i]);
            }
            // console.log(routes.getRoutes());
            let meta = routes.getRoutes();
            let permiso = [];
            for (const i in meta) {
                if (meta[i].path !== '') {
                    permiso.push(meta[i].meta);
                }
            }
        },
        getError(error: any, close: any) {
            var msjs = '';
            if (error.code === "ERR_NETWORK") {
                msjs = "No hay conexion al servidor...";
            }
            if (error.code === "ECONNABORTED") {
                msjs = "No hay conexion al servidor...";
            }
            if (error.code === "ERR_BAD_RESPONSE") {
                let rs = this.splitError(error.response.data.errors);
                if (rs === 'SQLSTATE[23503]') {
                    msjs = "No se puede eliminar la aplicacion porque existen registro en el log asociada a esta aplicacion.";
                } else {
                    msjs = "Request failed with status code 502";
                }
                // this.setBaseURL(window.urlmasterR);
            }
            if (error.code === "ERR_BAD_REQUEST") {
                if (error.request.response !== undefined) {
                    let msj = JSON.parse(error.request.response);
                    if (msj.errors !== undefined) {
                        msjs = msj.errors;
                    }
                } else {
                    msjs = error.request
                }
            }
            if (msjs === 'Invalid token or expired token.') {
                msjs = 'Invalid token or expired token.';
                window.database.deleteUserTokenExpiredP(close);
            }
            if (msjs === 'Whoops, the credentials are not enabled') {
                msjs = 'Whoops, the credentials are not enabled';
            }
            if (msjs === 'Token invalid or not provided') {
                msjs = 'Token invalid or not provided';
                window.database.deleteUserTokenExpiredP(close);
            }
            // console.log(msjs);
            // console.log(error);
            // console.log(close.url);
            // window.database.navTsJs(close);
            return msjs;
        },
        splitError(err: string) {
            let r = err.split(":");
            return r[0];
        },
        async validToken(toke: string = '', close: any) {
            let token = '';
            if (toke.length > 0) {
                token = toke
            } else {
                console.log("validToken");

                token = await this.getToken(close);
            }
            return token;
        },
        setBaseURL(url: any) {
            let r = window.master.defaults.baseURL = url;
            console.log(r);
        },
    }
});