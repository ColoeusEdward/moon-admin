declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare module 'mockjs'

// declare module 'vue' {
//   interface Vue {
//       $router: VueRouter;
//       $route: Route;
//       $store: Store<any>;
//       $api: any;
//   }
// }
