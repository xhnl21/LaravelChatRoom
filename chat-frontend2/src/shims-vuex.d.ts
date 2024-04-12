import { Store } from 'vuex';
//aqui se declara las variables de forma globales
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<T>;
    $options: options<T>;
  }
}

// import { ComponentCustomProperties } from 'vue'
// import { Store } from 'vuex'

// declare module '@vue/runtime-core' {
//   // Declare your own store states.
//   interface State {
//     count: number
//   }

//   interface ComponentCustomProperties {
//     $store: Store<State>
//   }
// }