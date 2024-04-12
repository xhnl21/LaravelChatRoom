import { Router } from 'vue-router';
import { defineComponent } from 'vue';
// import { Store } from 'vuex';
import router from '../router/index';
import store from '../store/index'
import { Preferences } from '@capacitor/preferences';
// import { Network } from '@capacitor/network';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
export default defineComponent({
    data() {
        return {
            d: import.meta.env.BASE_UR,
            filter: [] as any,
        }
    },
    methods: {
        async clearPreferences(key: any) {
            if (key !== '') {
                await Preferences.remove({ key });
            } else {
                const { keys } = await Preferences.keys();
                for (const key of keys) {
                    await Preferences.remove({ key });
                }
            }
        },
        async logOutPreferences() {
            const { keys } = await Preferences.keys();
            for (const key of keys) {
                await Preferences.remove({ key });
            }
        },
        async preferencesSaveUP(nameDb: string, row: any) {
            const preferenceValue = await Preferences.get({ key: nameDb });
            let existingArray = JSON.parse(preferenceValue.value!);
            if (existingArray === null || existingArray === 'null' || existingArray.length === 0) {
                existingArray = [];
                existingArray.push(row);
                await Preferences.set({
                    key: nameDb,
                    value: JSON.stringify(existingArray)
                });
            } else {
                await Preferences.remove({ key: nameDb });

                existingArray = [];
                existingArray.push(row);
                await Preferences.set({
                    key: nameDb,
                    value: JSON.stringify(existingArray)
                });
            }
            return true;
        },
        async getPreferences(key: any, close: any) {
            const { value } = await Preferences.get({ key: key });
            if (value !== null) {
                if (value.length > 0) {
                    return JSON.parse(value);
                } else {
                    return [];
                }
            } else {
                await this.deleteUserTokenExpiredP(close)
            }
        },
        async getDetailId() {
            const { value } = await Preferences.get({ key: 'idInventary' });
            if (value !== null) {
                return JSON.parse(value);
            }
        },
        async deleteUserTokenExpiredP(r: any) {
            await Preferences.remove({ key: 'user' });
            await Preferences.set({ key: 'user', value: JSON.stringify([]) });
            this.navTsJs(r);
        },
        async navTsJs(rs: any, bool: boolean = false) {
            // const store: Store<any> = rs.store;
            const router: Router = rs.router;
            const url = rs.path;
            // console.log(url);
            // console.log(router);
            // console.log(store);
            // store.commit('SetCloseSession', bool);
            if (router !== null && router !== undefined) {
                setTimeout(() => {
                    router.push({ path: url });
                }, 1000);
            }
        },
        ///////////////////////////////////////////////////
        ///////////////////START SYNC//////////////////////
        ///////////////////////////////////////////////////
        async checkNetworkStatus() {
            // await this.checkConnection('DB::checkNetworkStatus');
            // const status = await Network.getStatus();
            // await this.prepareSyncStatus(status.connected);
            // await this.checkConnection('DB::checkNetworkStatusEND');
            // return status.connected;
        },



        ///////////////////////////////////////////////////
        ///////////////////START SYNC//////////////////////
        ///////////////////////////////////////////////////

        ///////////////////////////////////////////////////
        ///////////////////START VIEW//////////////////////
        ///////////////////////////////////////////////////
        removeKeyValue(array: any, keyToRemove: any) {
            const arraySinClaveValor = array.map((obj: any) => {
                const newObj = { ...obj } as any; // Crear un nuevo objeto para no modificar el original
                delete newObj[keyToRemove]; // Eliminar la clave-valor específica
                return newObj; // Retornar el nuevo objeto sin la clave-valor
            });
            return arraySinClaveValor;
        },
        filterDataByUser(user_dynamic_id: any) {
            let user = this.filter;
            for (let i in user) {
                if (user_dynamic_id === user[i].user_id) {
                    // console.log(user[i]);
                    return user[i];
                }
            }
        },

        ///////////////////////////////////////////////////
        ////////////////////END VIEW///////////////////////
        ///////////////////////////////////////////////////

        ///////////////////////////////////////////////////
        //////////////////START LOGIN//////////////////////
        ///////////////////////////////////////////////////
        currentDate() {
            let date = new Date().toISOString();
            let d = date.split('T');
            let o = d[0].split('-');
            let year = o[0];
            let months = o[1];
            let days = o[2];
            let day, month = "";
            // if (parseInt(days) < 10) {
            //     day = days;
            // } else {
            //     day = days;
            // }
            if (parseInt(months) < 10) {
                month = 0 + parseInt(months).toString();
            } else {
                month = months;
            }
            let fullDate = year + '/' + month + '/' + days + 'T' + d[1];
            let dat = year + '/' + month + '/' + days;
            return dat;
        },
        async editVariable(row: any, key: string) {
            const preferenceValue = await Preferences.get({ key: "transition_variable" });
            let existingArray = JSON.parse(preferenceValue.value!);
            let rs = existingArray;
            for (let i in rs) {
                if (rs[i].key === key) {
                    // existingArray[i].value = row.value.toString();
                    existingArray[i].value = row.value;
                }
            }
            await Preferences.set({
                key: "transition_variable",
                value: JSON.stringify(existingArray)
            });
        },
        async removeVariable(id: any) {
            // const sql = 'DELETE FROM transition_variable WHERE value <> ' + id;
            // this.executeSql(sql);
            let data = await Preferences.get({ key: 'transition_variable' });
            let rs = JSON.parse(data.value!);
            if (rs.length > 0) {
                let drs = rs.filter((item: any) => item.value !== id.toString());
                console.log(drs);
                await Preferences.set({ key: 'transition_variable', value: JSON.stringify(drs) });
            }
        },
        orderBy(data: any) {
            return data.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
        },

        ///////////////////////////////////////////////////
        ////////////////////END LOGIN//////////////////////
        ///////////////////////////////////////////////////
        sizeArray(array: any) {
            let count = (JSON.stringify(array).length * 8);
            let countB = new Blob([JSON.stringify(array)]).size;
            console.log(this.bytesToSize(count));
            console.log(this.bytesToSize(countB));
        },
        bytesToSize(bytes: any) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            bytes = parseInt(bytes);
            var i = Math.floor(Math.log(bytes) / Math.log(1024));
            bytes = bytes / Math.pow(1024, i);
            return Number(bytes.toFixed(2)) + ' ' + sizes[i];
        },
        async preferencesSaveArray(nameDb: string, row: any) {
            try {
                const preferenceValue = await Preferences.get({ key: nameDb });
                let existingArray = JSON.parse(preferenceValue.value!);
                if (existingArray !== null) {
                    if (existingArray.length === 0) {
                        row.id = 1;
                    } else {
                        row.id = existingArray.length + 1
                    }
                } else {
                    existingArray = []
                }
                for (let i in row) {
                    existingArray.push(row[i]);
                }
                // this.sizeArray(existingArray);
                console.log(nameDb);

                await Preferences.set({
                    key: nameDb,
                    value: JSON.stringify(existingArray)
                });
            } catch (error) {
                console.log(error);
            } finally {
                return true;
            }
        },
        async accsesViews(view: string, ObjectCode: string) {
            const { value } = await Preferences.get({ key: 'permission' });
            if (value !== null) {
                if (value.length > 0) {
                    let parsedPer = JSON.parse(value);
                    let arr = parsedPer.filter((element: any) => element.PageCode === view);
                    if (arr.length > 0) {
                        let obj = arr.filter((element: any) => element.ObjectCode === ObjectCode);
                        if (obj.length > 0) {
                            return obj[0].Permission;
                        }
                    }
                }
            }
        },
        modelDataTime(dateTime: string) {
            let date = new Date();
            let h = date.getHours();
            let hs = h.toString();
            if (h < 10) {
                hs = '0' + h;
            }
            let m = date.getMinutes();
            let ms = m.toString();
            if (m < 10) {
                ms = '0' + m;
            }
            let s = date.getSeconds();
            let ss = s.toString();
            if (s < 10) {
                ss = '0' + s;
            }
            let r = this.splitSpot(dateTime);
            let fullYear = r[0] + '-' + r[1] + '-' + r[2] + ' ' + hs + ':' + ms + ':' + ss;
            return fullYear;
        },
        splitSpot(dateTime: string) {
            let rt = dateTime.split(".");
            if (rt.length === 1) {
                return this.splitT(dateTime);
            } else {
                return this.splitT(rt[0]);
            }
        },
        splitT(dateTime: string) {
            let rt = dateTime.split("T");
            if (rt.length === 1) {
                return this.splitSpace(dateTime);
            } else {
                return this.splitSpace(rt[0] + ' ' + rt[1]);
            }
        },
        splitSpace(dateTime: string) {
            let rf = dateTime.split(" ");
            if (rf.length === 1) {
                return this.splitSlash(dateTime);
            } else {
                return this.splitScript(rf[0]);
            }
        },
        splitSlash(dateTime: string) {
            let r = dateTime.split("/");
            return [r[0], r[1], r[2]];
        },
        splitScript(dateTime: string) {
            let r = dateTime.split("-");
            return [r[0], r[1], r[2]];
        },
        sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        objetoEstaVacio(objeto: any) {
            return Object.keys(objeto).length === 0;
        },
        quitarAcentos(str: any) {
            let rsult = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return rsult.toUpperCase();
        },
        getHourCurrent() {
            // Obtén la hora actual
            let horaActual = new Date();

            // Suma 60 minutos (60 * 60 * 1000 milisegundos) a la hora actual
            let horaNueva = new Date(horaActual.getTime() + 60 * 60 * 1000);

            // Convierte la nueva hora a un formato similar a strtotime
            let currentTimestamp = Math.floor(horaActual.getTime() / 1000); // Dividir por 1000 para obtener segundos en lugar de milisegundos
            let newTimestamp = Math.floor(horaNueva.getTime() / 1000); // Dividir por 1000 para obtener segundos en lugar de milisegundos

            console.log('Hora actual:', horaActual.toLocaleTimeString());
            console.log('Nueva hora:', horaNueva.toLocaleTimeString());
            console.log('Hora actual Timestamp:', currentTimestamp);
            console.log('Nueva hora Timestamp:', newTimestamp);


            let horaFormateada = horaNueva.toLocaleTimeString();
            let data = {
                currentHour: horaActual.toLocaleTimeString(),
                newHour: horaFormateada,
                currentHourTimestamp: currentTimestamp,
                newHourTimestamp: newTimestamp,
            };
            console.log(data);

            return data;
        },
        formatNumber(value: any) {
            // return new Intl.NumberFormat('es-MX').format(value);
            // Convierte el valor a cadena y separa los miles con comas
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        sortedDate(date: any[]) {
            let a = this.converTimestamp(date[0]);
            let b = this.converTimestamp(date[1]);
            let convert = [a, b];
            let rs = convert.sort((a: any, b: any) => a - b);
            return [this.converDate(rs[0]), this.converDate(rs[1])]
        },
        converTimestamp(date: any) {
            let utf = "T04:02:10.909Z"
            let aR = date + utf;
            let timestamp = (new Date(aR)).getTime();
            return timestamp;
        },
        converDate(timestamp: any) {
            const dates = new Date(timestamp);
            let orderDate = dates.toLocaleDateString('en-US').split("/");
            let mes = orderDate[0];
            if (parseInt(orderDate[0]) <= 9) { mes = 0 + orderDate[0]; }
            let day = orderDate[1];
            if (parseInt(orderDate[1]) <= 9) { day = 0 + orderDate[1]; }
            let d = orderDate[2] + '-' + mes + '-' + day;
            return d;
        },
        formatDate(value: any) {
            const dat = new Date(value);
            const year = dat.getFullYear();
            const month = String(dat.getMonth() + 1).padStart(2, '0');
            const day = String(dat.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    }
});