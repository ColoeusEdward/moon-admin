import{d as t,r as a,p as e,a as o,o as n,c as s,b as r,t as d,F as u,w as l,e as c,f as p,N as m,_ as i,g as f,B as v,h,i as g,j as _,k as b,l as k,m as y,n as S}from"./vendor.f9a17870.js";var j=t({name:"HelloWorld",props:{msg:{type:String,required:!0}},setup:()=>({count:a(0)})});const D=l("data-v-3d70a536");e("data-v-3d70a536");const E=c('<p data-v-3d70a536> Recommended IDE setup: <a href="https://code.visualstudio.com/" target="_blank" data-v-3d70a536>VSCode</a> + <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" data-v-3d70a536> Vetur </a> or <a href="https://github.com/johnsoncodehk/volar" target="_blank" data-v-3d70a536>Volar</a> (if using <code data-v-3d70a536>&lt;script setup&gt;</code>) </p><p data-v-3d70a536>See <code data-v-3d70a536>README.md</code> for more information.</p><p data-v-3d70a536><a href="https://vitejs.dev/guide/features.html" target="_blank" data-v-3d70a536> Vite Docs </a> | <a href="https://v3.vuejs.org/" target="_blank" data-v-3d70a536>Vue 3 Docs</a></p>',3),N=r("p",null,[p(" Edit "),r("code",null,"components/HelloWorld.vue"),p(" to test hot module replacement. ")],-1);o();const V=D(((t,a,e,o,l,c)=>(n(),s(u,null,[r("h1",null,d(t.msg),1),E,r("button",{type:"button",onClick:a[1]||(a[1]=a=>t.count++)},"count is: "+d(t.count),1),N],64))));j.render=V,j.__scopeId="data-v-3d70a536";const B=t({name:"MoonButton",props:{text:[String,Number]},render(){const{text:t}=this;return r("button",{id:"moon-button-container"},[r("span",null,[t]),r(m,null,{default:()=>[r(i,null,null)]})])}});var W=t({name:"App",components:{HelloWorld:j,MoonButton:B,NSpace:f,NButton:v},setup:()=>({darkTheme:h})});const x=p("Default"),H=p("Primary"),I=p("Info"),M=p("Success"),w=p("Warning"),A=p("Error");W.render=function(t,a,e,o,d,u){const l=_("n-button"),c=_("n-space"),p=_("moon-button"),m=_("n-config-provider");return n(),s(m,{theme:t.darkTheme},{default:g((()=>[r(c,null,{default:g((()=>[r(l,null,{default:g((()=>[x])),_:1}),r(l,{type:"primary"},{default:g((()=>[H])),_:1}),r(l,{type:"info"},{default:g((()=>[I])),_:1}),r(l,{type:"success"},{default:g((()=>[M])),_:1}),r(l,{type:"warning"},{default:g((()=>[w])),_:1}),r(l,{type:"error"},{default:g((()=>[A])),_:1})])),_:1}),r(p,{text:"6666"})])),_:1},8,["theme"])};const C=b({history:k("/moon-admin/"),routes:[]});var R=y({state:{},mutations:{},actions:{},modules:{}});const T=S(W);T.use(R),T.use(C),T.mount("#app");
