const base = 'users';
export default {
    getUser() {
        return '/';
    },
    getShowUser(id) {
        return base + '/' + id;
    },
    getAllUser(size) {
        return base + "?size=" + size;
    },
    createUser() {
        return 'form';
    },
    updateUser(id) {
        return base + '/' + id;
    },
    deleteUser(id) {
        return base + '/' + id;
    },
};