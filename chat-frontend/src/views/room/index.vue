<template>
    <ion-page>
        <heart />
        <ion-content ref="content" class="ion-padding">
            <ion-list>
                <div id="wrapper" class="wrapper showChats">
                    <div v-for="item in messages" :key="item.id" :message="item">
                        <ion-item>
                            <ion-icon aria-hidden="true" :icon="personCircle" color="primary"></ion-icon>
                            <ion-label class="ion-text-wrap">
                                <h2>
                                    {{ item.fromName }}
                                    <span class="date">
                                        <ion-note>{{ item.date }}</ion-note>
                                    </span>
                                </h2>
                                <p>
                                    {{ item.message }}
                                </p>
                            </ion-label>
                        </ion-item>
                    </div>
                </div>
            </ion-list>
        </ion-content>
        <ion-row>
            <ion-col size="12">
                <ion-input type="text" v-model="msj.message" placeholder="Type your message here..."
                    autofocus></ion-input>
                <ion-button @click="sendMessage()" expand="block" shape="round">
                    Send
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-page>
</template>
<script lang="ts">
import { loadingController } from '@ionic/vue';
import heart from '@/components/header/index.vue';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { personCircle } from 'ionicons/icons';
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
                fromName: '',
                user_id: '',
                subject: 'none',
                date: '',
                message: '',
            },
            result: [] as any,
        }
    },
    created() {
        this.init();
    },
    mounted() { },
    methods: {
        async init() {
            this.result = [];
            this.result = await window.database.getPreferences('user', this.closet);
            // console.log(this.result);
            // const id = this.result[0].user_id;
            const urlUser = window.getters.apis.User.getUser();
            const url = urlUser + 'chatDetails/' + 0
            window.master
                .get(url)
                .then((response: any) => {
                    // console.log(response.data.data);
                    this.messages = response.data.data;
                });
        },
        sendMessage() {
            this.msj.user_id = this.result[0].user_id;
            this.msj.fromName = this.result[0].name;
            // console.log(this.msj);
            const urlUser = window.getters.apis.User.sendSMS();
            window.master
                .post(urlUser, this.msj)
                .then((response: any) => {
                    // console.log(response.data);
                    if (response.data.status) {
                        this.msj.message = '';
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
                    // console.log(g);
                    this.messages.push(g.data);
                }
            }
        },
    },
    setup() {
        return {
            personCircle
        };
    }
});

</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
}

.wrapper>div:last-child {
    scroll-snap-align: start;
}

.showChats {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    height: 300px !important;
    padding: 10px;
}


ion-item {
    --inner-padding-end: 0;
    --background: transparent;
}

ion-label {
    margin-top: 12px;
    margin-bottom: 12px;
}

ion-item h2 {
    font-weight: 600;

    /**
   * With larger font scales
   * the date/time should wrap to the next
   * line. However, there should be
   * space between the name and the date/time
   * if they can appear on the same line.
   */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

ion-item .date {
    align-items: center;
    display: flex;
}

ion-item ion-icon {
    font-size: 42px;
    margin-right: 8px;
}

ion-item ion-note {
    font-size: 0.9375rem;
    margin-right: 12px;
    font-weight: normal;
}

h1 {
    margin: 0;
    font-weight: bold;
    font-size: 1.4rem;
}

p {
    line-height: 1.4;
}
</style>
