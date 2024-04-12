let base = 'service_details';
export default {
    getServiceDetails(store, user, vehicle) {
        // return base + 'store=' + store + '&user=' + user + '&vehicle=' + vehicle;

        let url = base;
        if (store !== '' || user !== '' || vehicle !== '') {
            url += "?"
        }
        if (store !== '') {
            url += "store=" + store;
            if (user !== '' || vehicle !== '') {
                url += "&"
            }
        }
        if (user !== '') {
            url += "user=" + user;
            if (store !== '' || vehicle !== '') {
                url += "&"
            }
        }
        if (vehicle !== '') {
            url += "vehicle=" + vehicle;
            if (store !== '' || user !== '') {
                url += "&"
            }
        }
        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }
        return url;
    },
    // getAllUser(size) {
    //     return base + "?size=" + size;
    // },
    // createUser() {
    //     return base;
    // },
    // updateUser(id) {
    //     return base + '/' + id;
    // },
    // deleteUser(id) {
    //     return base + '/' + id;
    // },
};