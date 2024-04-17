<template>
    <ion-page>
        <heart />
        <ion-content :fullscreen="true">
            <ion-list>
                <MessageListItem v-for="message in messages" :key="message.id" :message="message" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { chevronBack } from 'ionicons/icons';
import heart from '@/components/header/index.vue';
import MessageListItem from '@/components/MessageListItem.vue';
// import { getMessages, Message } from '@/data/messages';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ChatS',
    components: {
        MessageListItem, heart
    },
    data() {
        return {
            messages: [] as any,
            closet: {
                path: "login", router: this.$router, store: this.$store
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            // const rs = await window.database.getPreferences('user', this.closet);
            // const id = rs[0].user_id;
            const urlUser = window.getters.apis.User.getUser();
            const url = urlUser + 'chatDetails/' + 0
            window.master
                .get(url)
                .then((response: any) => {
                    console.log(response.data.data);
                    this.messages = response.data.data;
                })
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
        return {
            chevronBack
        };
    }
});

</script>
