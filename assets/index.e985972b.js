import{d as a,r as t,p as e,a as o,c as s,b as d,t as n,F as r,w as u,e as l,f as c,o as p,N as m,B as i,g as v,h as f,i as h,j as g,k as _,l as b,m as k}from"./vendor.755bf4d0.js";var y=a({name:"HelloWorld",props:{msg:{type:String,required:!0}},setup:()=>({count:t(0)})});const j=u("data-v-3d70a536");e("data-v-3d70a536");const D=l('<p data-v-3d70a536> Recommended IDE setup: <a href="https://code.visualstudio.com/" target="_blank" data-v-3d70a536>VSCode</a> + <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" data-v-3d70a536> Vetur </a> or <a href="https://github.com/johnsoncodehk/volar" target="_blank" data-v-3d70a536>Volar</a> (if using <code data-v-3d70a536>&lt;script setup&gt;</code>) </p><p data-v-3d70a536>See <code data-v-3d70a536>README.md</code> for more information.</p><p data-v-3d70a536><a href="https://vitejs.dev/guide/features.html" target="_blank" data-v-3d70a536> Vite Docs </a> | <a href="https://v3.vuejs.org/" target="_blank" data-v-3d70a536>Vue 3 Docs</a></p>',3),E=d("p",null,[c(" Edit "),d("code",null,"components/HelloWorld.vue"),c(" to test hot module replacement. ")],-1);o();const S=j(((a,t,e,o,u,l)=>(p(),s(r,null,[d("h1",null,n(a.msg),1),D,d("button",{type:"button",onClick:t[1]||(t[1]=t=>a.count++)},"count is: "+n(a.count),1),E],64))));y.render=S,y.__scopeId="data-v-3d70a536";var V=a({name:"App",components:{HelloWorld:y,NSpace:m,NButton:i},setup:()=>({darkTheme:v})});const N=c("Default"),W=c("Primary"),H=c("Info"),I=c("Success"),w=c("Warning"),A=c("Error");V.render=function(a,t,e,o,n,r){const u=h("n-button"),l=h("n-space"),c=h("n-config-provider");return p(),s(c,{theme:a.darkTheme},{default:f((()=>[d(l,null,{default:f((()=>[d(u,null,{default:f((()=>[N])),_:1}),d(u,{type:"primary"},{default:f((()=>[W])),_:1}),d(u,{type:"info"},{default:f((()=>[H])),_:1}),d(u,{type:"success"},{default:f((()=>[I])),_:1}),d(u,{type:"warning"},{default:f((()=>[w])),_:1}),d(u,{type:"error"},{default:f((()=>[A])),_:1})])),_:1})])),_:1},8,["theme"])};const B=g({history:_("/moon-admin/"),routes:[]});var C=b({state:{},mutations:{},actions:{},modules:{}});const R=k(V);R.use(C),R.use(B),R.mount("#app");
