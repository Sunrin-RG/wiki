(function(t){function e(e){for(var i,s,o=e[0],c=e[1],l=e[2],d=0,h=[];d<o.length;d++)s=o[d],a[s]&&h.push(a[s][0]),a[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(h.length)h.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(i=!1)}i&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},a={app:0},r=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/wiki/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";var i=n("64a9"),a=n.n(i);a.a},"2ac7":function(t,e,n){},"2be3":function(t,e,n){},"4bb4":function(t,e,n){},"64a9":function(t,e,n){},b2ed:function(t,e,n){"use strict";var i=n("4bb4"),a=n.n(i);a.a},c212:function(t,e,n){"use strict";var i=n("2ac7"),a=n.n(i);a.a},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("header",{ref:"top",staticClass:"topmenu"},[n("div",{staticClass:"topmenu__left"},[n("h1",{staticClass:"topmenu__title"},[t._v("RG2R")]),n("nav",{staticClass:"topmenu__topic"},t._l(t.getList,function(e,i){return n("span",{key:e.name,staticClass:"topmenu__topic__item",on:{click:function(e){t.index=i}}},[t._v(t._s(e.name))])}),0)]),n("div",{staticClass:"topmenu__search"})]),n("div",{staticClass:"row"},[n("nav",{ref:"navigation",staticClass:"navigation"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"navigation__filter",attrs:{type:"text",placeholder:"Filter by title"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),n("tree-view",{staticClass:"navigation__list",attrs:{data:t.getComputedList,search:t.search}})],1),n("section",{staticClass:"content"},[n("router-view")],1)]),n("footer",{staticClass:"footer"},[t._v("FOOTER")])])},r=[],s=(n("7f7f"),n("386d"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"treeview"},t._l(t.data,function(e){return n("tree-view-item",{key:e.name,attrs:{highlight:t.search,data:e}})}),1)}),o=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isFolder?n("li",{staticClass:"listitem"},[n("h4",{on:{click:function(e){t.isOpen=!t.isOpen}}},[n("span",{domProps:{innerHTML:t._s(t.text)}}),n("span",{staticClass:"folder"},[t._v("("+t._s(t.isOpen?"－":"＋")+")")])]),t.isOpen?n("ul",{staticClass:"tab"},t._l(t.data.children,function(e,i){return n("tree-view-item",{key:e.name,attrs:{highlight:t.highlight,"data-index":i,data:e}})}),1):t._e()]):n("li",{ref:"listitem",staticClass:"listitem",on:{click:t.gotoDocs}},[n("span",{domProps:{innerHTML:t._s(t.text)}})])},l=[],u=(n("a481"),n("3b2b"),n("20d6"),i["a"].extend({name:"TreeViewItem",props:{data:Object,highlight:String},components:{TreeViewItem:f},data:function(){return{isFolder:!1,isOpen:!1,text:""}},created:function(){this.isFolder=this.data.hasOwnProperty("children"),this.setText(this.highlight)},watch:{highlight:function(t){this.isFolder&&""!=t?this.isOpen=-1!=this.data.children.findIndex(function(e){return-1!=e.name.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())})||-1!=this.data.name.toLocaleLowerCase().indexOf(t.toLocaleLowerCase()):this.isOpen=!1,this.setText(t)}},methods:{gotoDocs:function(){this.$store.state.currentDocs=this.data},setText:function(t){if(""==t)this.text=this.data.name;else{var e=new RegExp(this.highlight,"gi");this.text=this.data.name.replace(e,"<span class='mark'>"+e.exec(this.data.name)+"</span>")}},enter:function(t,e){t.style.transitionDelay=50*t.dataset.index+"ms"},leave:function(t,e){t.style.transitionDelay=50*(this.data.children.length-1-t.dataset.index)+"ms"}},computed:{}})),d=u,h=(n("f11f"),n("2877")),p=Object(h["a"])(d,c,l,!1,null,"5a61ddaa",null),f=p.exports,m=i["a"].extend({name:"TreeView",components:{TreeViewItem:f},props:{data:Array,search:String}}),v=m,g=(n("e2d1"),Object(h["a"])(v,s,o,!1,null,"27b900e8",null)),_=g.exports,x=i["a"].extend({components:{TreeView:_},created:function(){this.$store.dispatch("GET_DOCS")},watch:{index:function(t){this.$store.state.index=t}},mounted:function(){var t,e,n=this.$refs.navigation;addEventListener("scroll",function(t){scrollY>55?n.style.position="fixed":innerWidth>480&&(n.style.position="static")});var i=-innerWidth;addEventListener("touchstart",function(n){t=n.touches[0].clientX,e=t}),addEventListener("touchmove",function(a){e=a.touches[0].clientX;var r=i-t+e;n.style.left=(r<-innerWidth?-innerWidth:r>0?0:r)+"px"}),addEventListener("touchend",function(a){t-e>.3*innerWidth?(i=-innerWidth,n.style.left="-100%"):t-e<.3*-innerWidth?(i=0,n.style.left="0px"):n.style.left=i+"px"})},data:function(){return{index:0,search:"",isShowMenu:!1}},computed:{getComputedList:function(){var t=this;if(this.getList.length>0){if(0!=this.search.length){var e=JSON.parse(JSON.stringify(this.getList[this.index].children)),n=function e(n){if(n.hasOwnProperty("children")){if(-1!=n.name.toLocaleLowerCase().indexOf(t.search.toLocaleLowerCase()))return!0;var i=!1;return n.children=n.children.filter(function(t){var n=e(t);return i||(i=n),n}),i}return-1!=n.name.toLocaleLowerCase().indexOf(t.search.toLocaleLowerCase())};return e.filter(function(t){return n(t)})}return this.getList[this.index].children}return[]},getList:function(){return this.$store.state.list}}}),C=x,w=(n("034f"),Object(h["a"])(C,a,r,!1,null,null,null)),y=w.exports,b=n("8c4f"),L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{staticClass:"home__content",domProps:{innerHTML:t._s(t.getCurrentContent)}}),t.getCurrentContent?n("router-link",{staticClass:"home__edit",attrs:{to:"/edit"}},[t._v("EDIT")]):t._e()],1)},S=[],O=n("0e54"),I=n.n(O),D=i["a"].extend({computed:{getCurrentContent:function(){return I()(this.$store.state.currentDocs.content)}}}),P=D,k=Object(h["a"])(P,L,S,!1,null,null,null),T=k.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editor"},[n("div",{staticClass:"editor__content",domProps:{innerHTML:t._s(t.getCurrentContent)}}),n("div",{staticClass:"editor__row"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.category,expression:"category"}],staticClass:"editor__category",attrs:{disabled:t.parentSelect.length>0,type:"text",placeholder:"카테고리"},domProps:{value:t.category},on:{input:function(e){e.target.composing||(t.category=e.target.value)}}}),n("ParentSelector",{staticClass:"editor__parentId",attrs:{init:t.parentSelect,type:"text"},model:{value:t.parentSelect,callback:function(e){t.parentSelect=e},expression:"parentSelect"}})],1),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"editor__title",attrs:{type:"text",placeholder:"제목"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"editor__field",attrs:{placeholder:"내용"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),n("button",{staticClass:"editor__send"},[t._v("EDIT")])])},$=[],F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"parentSeletor"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"parentSeletor__input",attrs:{type:"text",readonly:"",placeholder:"상위 폴더"},domProps:{value:t.name},on:{keydown:t.moveSelect,focus:function(e){t.show=!0},click:function(e){t.show=!0},blur:function(e){t.show=!1},input:function(e){e.target.composing||(t.name=e.target.value)}}}),n("div",{staticClass:"parentSeletor__id"},[t._v(t._s(t.parentId))]),t.getFlatList?n("div",{staticClass:"parentSeletor__list",class:{"parentSeletor__list-active":t.show},on:{click:function(e){t.show=!1}}},t._l(t.getFlatList,function(e,i){return n("div",{key:e.name,staticClass:"parentSeletor__list__item",class:{"parentSeletor__list__item-active":t.currentSelectIndex==i},on:{mousedown:function(n){return t.setText(e.name,e._id)}}},[t._v(t._s(e.name))])}),0):t._e()])},j=[],M=(n("7514"),i["a"].extend({name:"ParentSelector",components:{},props:{init:String},data:function(){return{parentId:"",name:"",currentSelectIndex:0,show:!1}},created:function(){var t=this;this.init&&(this.parentId=this.init,this.name=this.getFlatList.find(function(e){return e._id==t.parentId}).name)},methods:{moveSelect:function(t){switch(this.getFlatList.length,t.keyCode){case 38:this.currentSelectIndex>0&&this.currentSelectIndex--;break;case 40:this.currentSelectIndex<this.getFlatList.length-1&&this.currentSelectIndex++;break;case 13:this.parentId=this.getFlatList[this.currentSelectIndex]._id,this.name=this.getFlatList[this.currentSelectIndex].name,this.show=!1;break}},setText:function(t,e){this.name=t,this.parentId=e}},watch:{parentId:function(t){this.$emit("input",t)}},computed:{getFlatList:function(){return this.$store.state.flatList}}})),N=M,W=(n("b2ed"),Object(h["a"])(N,F,j,!1,null,null,null)),R=W.exports,V=i["a"].extend({data:function(){return{text:"",parentSelect:"",category:"",name:""}},watch:{parentSelect:function(t){t.length>0&&(this.category="")}},created:function(){this.getCurrentDocs._id||this.$router.replace("/"),this.text=this.getCurrentDocs.content,this.parentSelect=this.getCurrentDocs.parentId,this.category=this.getCurrentDocs.category,this.name=this.getCurrentDocs.name},components:{ParentSelector:R},computed:{getCurrentContent:function(){return I()(this.text)},getCurrentDocs:function(){return this.$store.state.currentDocs}}}),G=V,H=(n("c212"),Object(h["a"])(G,E,$,!1,null,null,null)),J=H.exports;i["a"].use(b["a"]);var X=new b["a"]({mode:"history",base:"/wiki/",routes:[{path:"/",name:"home",component:T},{path:"/edit",name:"edit",component:J}]}),A=(n("ac6a"),n("2f62")),Y=n("bc3a"),q=n.n(Y);i["a"].use(A["a"]);var z=new A["a"].Store({state:{list:[],flatList:[],index:0,currentDocs:{content:""}},mutations:{setFlatDocs:function(t,e){t.flatList=e},setDocs:function(t,e){t.list=e}},actions:{GET_DOCS:function(t){var e=t.commit;q.a.get("https://asia-east2-calcium-ratio-249108.cloudfunctions.net/getRG2RDocs").then(function(t){var n=t.data;e("setFlatDocs",n);var i=[];function a(t,e,n){e.forEach(function(e){var i=!1;if(e._id==t&&(i=!0),e.hasOwnProperty("children"))i?e.children.push(n):a(t,e.children,n);else{if(!i)return;e.children=[n]}})}n.forEach(function(t){if(t.hasOwnProperty("category")){var e=t.category,n=i.findIndex(function(e){return e.name==t.category});-1==n?i.push({_id:"",name:e,children:[t]}):i[n].children.push(t)}else t.hasOwnProperty("parentId")&&a(t.parentId,i,t)}),e("setDocs",i)})}}});i["a"].config.productionTip=!1,new i["a"]({router:X,store:z,render:function(t){return t(y)}}).$mount("#app")},d611:function(t,e,n){},e2d1:function(t,e,n){"use strict";var i=n("2be3"),a=n.n(i);a.a},f11f:function(t,e,n){"use strict";var i=n("d611"),a=n.n(i);a.a}});
//# sourceMappingURL=app.bb94ebbd.js.map