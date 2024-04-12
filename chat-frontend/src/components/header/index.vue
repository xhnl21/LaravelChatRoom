<template>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="start">
                <ion-menu-button color="primary"></ion-menu-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'HeadS',
    components: {},
    data() {
        return {
            title: '' as any,
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.title = this.$route.name;
        }
    },
    computed: {},
    watch: {},
    setup() {
        return {};
    }
});

</script>