let base = 'apps';
export default {
    getApps () {
        return base;
    },
    getAllApps (size) {
        return base + "?size=" + size;
    },
    createApps () {
        return base;
    },
    updateApps (id) {
        return base + '/' + id;
    },
    deleteApps (id) {
        return base + '/' + id;
    },
};