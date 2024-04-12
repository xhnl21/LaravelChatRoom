<template>
    <ion-page>
        <heart />
        <ion-content :fullscreen="true">
            <ion-list>
                <ion-row>
                    <ion-col size="12">
                        <div id="messages"
                            style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; height: 300px; overflow-y: scroll;">
                            <!-- Messages will be displayed here -->
                        </div>
                        <ion-input type="text" v-model="msj.subject" placeholder="Type your subject..."></ion-input>
                        <ion-input type="text" id="messageInput" v-model="msj.message"
                            placeholder="Type your message here..." autofocus></ion-input>
                        <ion-button onclick="sendMessage()" expand="block" shape="round">
                            Send
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { loadingController } from '@ionic/vue';
import heart from '@/components/header/index.vue';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ChatS',
    components: {
        heart
    },
    data() {
        return {
            messages: [] as any,
            closet: {
                path: "login", router: this.$router, store: this.$store
            },
            msj: {
                user_id: '',
                subject: '',
                date: '',
                message: '',
            },
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const urlUser = window.getters.apis.User.getUser();
            const url = urlUser + 'chatDetails/' + 0
            window.master
                .get(url)
                .then((response: any) => {
                    console.log(response.data.data);
                    this.messages = response.data.data;
                })
        },
        sendMessage() {

        },
        submitData() {
            const urlUser = window.getters.apis.User.createUser();
            window.master
                .post(urlUser, this.msj)
                .then((response: any) => {
                    // console.log(response.data.status);
                    if (response.data.status) {
                        this.errorMsj("Ingresando espere...");
                        this.$router.push({ path: "inbox" });
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
    computed: {
        ...mapGetters(["GetChat"])
    },
    watch: {
        async GetChat() {
            if (this.GetChat) {
                const g = window.store.getters["GetChat"];
                if (g) {
                    console.log(g);
                    this.messages.push(g.data);
                }
            }
        },
    },
    setup() {
        return {};
    }
});

</script>
