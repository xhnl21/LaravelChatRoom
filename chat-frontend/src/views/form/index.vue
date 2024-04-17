<template>
    <ion-page>
        <ion-content class="no-scroll">
            <div class="flex-container verticalCenter">
                <div class="formSesion">
                    <form @submit.prevent="submitData">
                        <ion-list style="background: #fff !important;">
                            <ion-input type="text" class="custom" label="Nombre" label-placement="floating" fill="solid"
                                v-model="data.name">
                            </ion-input>
                            <br>
                            <ion-input type="text" class="custom" label="Correo Electronico" label-placement="floating"
                                fill="solid" v-model="data.email"></ion-input>
                            <ion-row>
                                <ion-col>
                                    <ion-button type="submit" color="primary" expand="block">Entrar</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-list>
                    </form>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { loadingController } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ChatS',
    components: {},
    data() {
        return {
            messages: [] as any,
            closet: {
                path: "login", router: this.$router, store: this.$store
            },
            data: {
                name: '',
                email: '',
            }
        }
    },
    created() {

    },
    methods: {
        submitData() {
            const urlUser = window.getters.apis.User.createUser();
            window.master
                .post(urlUser, this.data)
                .then(async (response: any) => {
                    // console.log(response.data.data);
                    if (response.data.status) {
                        await window.database.preferencesSaveUP('user', response.data.data);
                        this.errorMsj("Ingresando espere...");
                        this.$router.push({ path: "room" });
                    } else {
                        this.errorMsj("Error...");
                    }
                })
        },
        async errorMsj(msj: any) {
            const loading = await loadingController.create({
                message: msj,
                duration: 1000
            });
            loading.present();
        },
    },
    computed: {},
    watch: {},
    setup() {
        return {};
    }
});

</script>
<style scoped>
.custom {
    text-align: left !important;
}


.formSesion {
    margin: 0px;
    padding-top: 15px;
    padding-bottom: 15px;
}

.flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    width: 100%;
    text-align: center;

    width: 45%;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #b5b5b5;
    box-sizing: border-box;
    padding: 40px;
}

.verticalCenter {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>