// leyenda //
// type = "get", "post", "delete", "put" ===>>> obligatorio
// token = si es una ruta protegida por session "true o false"
// upload = indica si se va a subir un documento "true o false"
// event = recibira metadato de la img
// url = es la ruta donde se hace peticiones ===>>> obligatorio
// data = normalmente se usa cuando se aplica "post" y "put"
// method = indica el nombre del metodo quien invoka la funtion de peticiones ===>>> obligatorio
import { useStore } from 'vuex'
const $store = useStore()
const resquesAMixin = {
    methods: {
        resquesA (type: any, token: any, upload: any, event: any, url: any, data: any, method: any) {
            if (type !== "") {
                type = type.toLowerCase();
            }
            switch (type) {
            case "post":
                if (token === true) {
                    if (upload === true) {
                        const fileSendHeader = { headers: { "Content-Type": "multipart/form-data" } };
                        const formData = new FormData();
                        // let cont = [];
                        for (const i in event.target.files) {
                            // if (event.target.files.hasOwnProperty(i)) {
                            if (event.target.files[i]) {
                                // cont++;
                                // formData.append("image" + cont, event.target.files[i]);
                                formData.append("image" + i, event.target.files[i]);
                            }
                        }    
                        alert("reparar Object.entries(data)")
                        console.log("reparar Object.entries(data)")
                        
                        return 0;
                        // for (const [key, value] of Object.entries(data)) {
                        //     formData.append(key, value);
                        // }
                        window.masterb
                            .post(url, formData, fileSendHeader)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    } else {
                        window.masterb
                            .post(url, data)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    }
                } else {
                    if (upload === true) {
                        const fileSendHeader = { headers: { "Content-Type": "multipart/form-data" } };
                        const formData = new FormData();
                        // let cont = [];
                        for (const i in event.target.files) {
                            if (event.target.files[i]) {
                                // if (event.target.files.hasOwnProperty(i)) {
                                // cont++;
                                formData.append("image" + i, event.target.files[i]);
                                // formData.append("image" + cont, event.target.files[i]);
                            }
                        }
                        alert("reparar Object.entries(data)")
                        console.log("reparar Object.entries(data)")
                        
                        return 0;
                        // for (const [key, value] of Object.entries(data)) {
                        //     formData.append(key, value);
                        // }
                        window.mastera
                            .post(url, formData, fileSendHeader)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    } else {
                        window.mastera
                            .post(url, data)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    }
                }
                break;
            case "get":
                if (token === true) {
                    window.masterb
                        .get(url)
                        .then((response: any) => {
                            this.array ("ReturnHttp", method, response);
                        })
                        .catch((error: any) => {
                            this.array ("ReturnHttp", method, error);
                        });
                } else {
                    window.mastera
                        .get(url)
                        .then((response: any) => {
                            this.array ("ReturnHttp", method, response);
                        })
                        .catch((error: any) => {
                            this.array ("ReturnHttp", method, error);
                        });
                }
                break;
            case "put":
                if (token === true) {
                    if (upload === true) {
                        const fileSendHeader = { headers: { "Content-Type": "multipart/form-data" } };
                        const formData = new FormData();
                        // let cont = [];
                        for (const i in event.target.files) {
                            // if (event.target.files.hasOwnProperty(i)) {
                            if (event.target.files[i]) {
                                // cont++;
                                // formData.append("image" + cont, event.target.files[i]);
                                formData.append("image" + i, event.target.files[i]);
                            }
                        }
                        alert("reparar Object.entries(data)")
                        console.log("reparar Object.entries(data)")
                        
                        return 0;
                        // for (const [key, value] of Object.entries(data)) {
                        //     formData.append(key, value);
                        // }
                        window.masterb
                            .put(url, formData, fileSendHeader)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    } else {
                        window.masterb
                            .put(url, data)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    }
                } else {
                    if (upload === true) {
                        const fileSendHeader = { headers: { "Content-Type": "multipart/form-data" } };
                        const formData = new FormData();
                        // let cont = [];
                        for (const i in event.target.files) {
                            // if (event.target.files.hasOwnProperty(i)) {
                            if (event.target.files[i]) {
                                // cont++;
                                formData.append("image" + i, event.target.files[i]);
                                // formData.append("image" + cont, event.target.files[i]);
                            }
                        }
                        alert("reparar Object.entries(data)")
                        console.log("reparar Object.entries(data)")
                        
                        return 0;
                        // for (const [key, value] of Object.entries(data)) {
                        //     formData.append(key, value);
                        // }
                        window.mastera
                            .put(url, formData, fileSendHeader)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    } else {
                        window.mastera
                            .put(url, data)
                            .then((response: any) => {
                                this.array ("ReturnHttp", method, response);
                            })
                            .catch((error: any) => {
                                this.array ("ReturnHttp", method, error);
                            });
                    }
                }
                break;
            case "delete":
                if (token === true) {
                    window.masterb
                        .delete(url, data)
                        .then((response: any) => {
                            this.array ("ReturnHttp", method, response);
                        })
                        .catch((error: any) => {
                            this.array ("ReturnHttp", method, error);
                        });
                } else {
                    window.mastera
                        .delete(url, data)
                        .then((response: any) => {
                            this.array ("ReturnHttp", method, response);
                        })
                        .catch((error: any) => {
                            this.array ("ReturnHttp", method, error);
                        });
                }
                break;
            default:
                this.array ("ReturnHttp", method, "type no exit");
            }
        },
        array (name: any, method: any, data: any ) {
            const k = [];
            k.push({ function:name, method:method, data:data });
            $store.commit("SethttpResques", k);
        }
    }
};
export default resquesAMixin;