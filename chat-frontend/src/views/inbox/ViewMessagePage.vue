<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="message">
      <ion-item>
        <ion-icon aria-hidden="true" :icon="personCircle" color="primary"></ion-icon>
        <ion-label class="ion-text-wrap">
          <h2>
            {{ message.fromName }}
            <span class="date">
              <ion-note>{{ message.date }}</ion-note>
            </span>
          </h2>
          <h3>To: <ion-note>Me</ion-note></h3>
        </ion-label>
      </ion-item>

      <div class="ion-padding">
        <h1>{{ message.subject }}</h1>
        <p>
          {{ message.message }}
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { personCircle } from 'ionicons/icons';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ChatS',
  components: {},
  data() {
    return {
      messages: [] as any,
      message: [] as any,
      closet: {
        path: "login", router: this.$router, store: this.$store
      }
    }
  },
  created() {
    const route = useRoute();
    const urlUser = window.getters.apis.User.getUser();
    const url = urlUser + 'chatDetails/' + route.params.id
    window.master
      .get(url)
      .then((response: any) => {
        this.message = response.data.data[0];
      })
  },
  methods: {
    getBackButtonText() {
      const win = window as any;
      const mode = win && win.Ionic && win.Ionic.mode;
      return mode === 'ios' ? 'Inbox' : '';
    }
  },
  computed: {},
  watch: {},
  setup() {
    return {
      personCircle
    };
  }
});

</script>

<style scoped>
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
