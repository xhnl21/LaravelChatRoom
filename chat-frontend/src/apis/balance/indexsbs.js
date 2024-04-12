let base = 'service_balancing_status/';
export default {
    getSBS(id) {
        return base + id;
    },
    // getAllSms(id, from, to) {
    //     let url = base;
    //     if (id > 0 || from !== '' || to !== '') {
    //         url += "?"
    //     }
    //     if (id > 0) {
    //         url += "app_id=" + id;
    //         if (from !== '' || to !== '') {
    //             url += "&"
    //         }
    //     }
    //     if (from !== '') {
    //         url += "from=" + from;
    //         if (id > 0 || to !== '') {
    //             url += "&"
    //         }
    //     }
    //     if (to !== '') {
    //         url += "to=" + to;
    //         if (id > 0 || from !== '') {
    //             url += "&"
    //         }
    //     }
    //     if (url.endsWith('&')) {
    //         url = url.slice(0, -1);
    //     }
    //     return url;
    // },
    // getAllMSms(url, size) {
    //     let app_id = url.split("app_id");
    //     let from = url.split("from");
    //     let to = url.split("to");
    //     if (app_id.length > 1 || from.length > 1 || to.length > 1) {
    //         return url + "&size=" + size;
    //     } else {
    //         return url;
    //     }
    // }
};