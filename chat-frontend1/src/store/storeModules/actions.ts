export default {
    accessDimenu(context: any, accessDimenu: any) {
        context.commit("IngresoDimenu", accessDimenu);
    },
    async preEnteChat(context: any, data: any) {
        // console.log(data);
        context.commit("SetChat", data);
    },
};
