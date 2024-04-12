let base = 'providers';
export default {
    getProviders () {
        return base;
    },
    getAllProviders (size) {
        return base + "?size=" + size;
    },
    createProviders () {
        return base;
    },
    updateProviders (id) {
        return base + '/' + id;
    },
    deleteProviders (id) {
        return base + id;
    },
};