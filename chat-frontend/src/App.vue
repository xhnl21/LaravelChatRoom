<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header> {{ title }}</ion-list-header>
            <ion-note>hi@ionicframework.com</ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex(i)" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="hydrated" :class="{ selected: selectedUrl === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { home, person, pricetag, chevronForward, chevronBack } from 'ionicons/icons';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {},
  data() {
    return {
      title: '' as any,
      selectedUrl: 0,
      pathname: '',
      appPages: [
        {
          title: 'Inbox',
          url: '/inbox',
          iosIcon: home,
          mdIcon: home,
          imgA: import.meta.env.BASE_URL + "assets/icon_menu/home_activo.png",
          imgB: import.meta.env.BASE_URL + "assets/icon_menu/home_inactivo.png"
        },
        {
          title: 'Form',
          url: '/form',
          iosIcon: person,
          mdIcon: person,
          imgA: import.meta.env.BASE_URL + "assets/icon_menu/usuario_activo.png",
          imgB: import.meta.env.BASE_URL + "assets/icon_menu/usuario_inactivo.png",
        },
        {
          title: 'Room',
          url: '/room',
          iosIcon: pricetag,
          mdIcon: pricetag,
          imgA: import.meta.env.BASE_URL + "assets/icon_menu/categoria_activo.png",
          imgB: import.meta.env.BASE_URL + "assets/icon_menu/categoria_inactivo.png",
        },
        {
          title: 'Do',
          url: '/do',
          iosIcon: pricetag,
          mdIcon: pricetag,
          imgA: import.meta.env.BASE_URL + "assets/icon_menu/do_activo.png",
          imgB: import.meta.env.BASE_URL + "assets/icon_menu/do_inactivo.png",
        },
        {
          title: 'LogOut',
          url: '/logout',
          iosIcon: pricetag,
          mdIcon: pricetag,
          imgA: import.meta.env.BASE_URL + "assets/icon_menu/do_activo.png",
          imgB: import.meta.env.BASE_URL + "assets/icon_menu/do_inactivo.png",
        },
        // {
        // 	title: 'Producto',
        // 	url: '/usuarios',
        // 	iosIcon: briefcase,
        // 	mdIcon: briefcase,
        // 	imgA: import.meta.env.BASE_URL + "assets/icon_menu/producto_activo.png",
        // 	imgB: import.meta.env.BASE_URL + "assets/icon_menu/producto_inactivo.png",
        // },
        // {
        // 	title: 'Marca de Vehiculo',
        // 	url: '/categorias',
        // 	iosIcon: car,
        // 	mdIcon: car,
        // 	imgA: import.meta.env.BASE_URL + "assets/icon_menu/vhiculo_activo.png",
        // 	imgB: import.meta.env.BASE_URL + "assets/icon_menu/vhiculo_inactivo.png",
        // },
        // {
        // 	title: 'Marca de Caucho',
        // 	url: '/categorias',
        // 	iosIcon: discSharp,
        // 	mdIcon: discSharp,
        // 	imgA: import.meta.env.BASE_URL + "assets/icon_menu/neumatico_activo.png",
        // 	imgB: import.meta.env.BASE_URL + "assets/icon_menu/neumatico_inactivo.png",
        // },
      ],
      // closet: {
      //   path: "login", router: this.$router, store: this.$store
      // },
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.title = this.$route.name;

      this.pathname = window.location.pathname;
      const str = this.pathname.toLowerCase().replace(/\//g, "");
      this.pathname = str;
      this.isLogin();
    },
    dashboard() {
      // this.$router.push({ path: "dashboard" });
      window.location.href = '/dashboard';
    },
    async isLogin() {
      // // valida si el usuario inicio sesion
      // let existingArray = await window.database.getPreferences('user', this.closet);
      // if (existingArray === null || existingArray === undefined || existingArray.length === 0) {
      //   this.$router.push({ path: "login" });
      // }
    },
    selectedIndex(i: any) {
      this.selectedUrl = parseInt(i);
    }
  },
  setup() {
    return {
      chevronForward, chevronBack
    }
  }
});
</script>
<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
