!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){function n(e,t,n,r){const o=n.length>0&&Math.max(...n)>0;if(r||t||o){return`${o?",  ":""}${t}:${e=1==t?e:`${e}s`}`}return""}const r=`│  Built  {  ${function(e){const t=(new Date).getTime()-e,r=Math.floor(t/1e3/86400),o=Math.floor(t/1e3/3600%24),i=Math.floor(t/1e3/60%60),a=Math.floor(t/1e3%60);return Math.floor(t%1e3),""+n("day",r,[],!1)+n("hour",o,[r],!1)+n("minute",i,[r,o],!1)+n("second",a,[r,o,i],!0)}(1555040414683)}  }  Ago  │`,o="".padStart(r.length-2,"─");console.log(""+`\n┌${o}┐\n`+`${r}\n`+`└${o}┘\n`)},function(e,t,n){n(0),e.exports=n(2)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(3)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(4).activeBoard.workflowStages().toArray().map(e=>e.attributes);class o{constructor({name:e,id:t,parentID:n,element:r}){this.children=[],this.children_IDs=[],this.name=e,this.id=t,this.parentID=n,this.element=r}get path(){return this.parent?`${this.parent.path}\\${this.name}`:this.name}add_Child(e){e.parent=this,this.children.push(e),this.children_IDs.push(e.id)}}const i=function(e){const t=[];let n=0,r=[];return $("kt-board > thead").children().toArray().forEach((i,a)=>{const c=t.length;$(i).children().toArray().forEach((i,a)=>{const{name:c,id:l,parent_id:s}=e[n],u=new o({name:c,id:l,parentID:s,element:i});r.forEach(e=>{}),t.push(u),n+=1}),r=t.slice(c)}),t}(function(e,t){const n=[...e],r=[];for(;n.length>0;){const e=r.length;t.forEach(e=>{n.filter(t=>t.parent_id==e.id).forEach(e=>{const t=n.indexOf(e);-1==t||(n.splice(t,1),r.push(e))})}),t=r.slice(e)}return r}(r.slice(1),[r[0]]));console.log(">>>",i),console.log(">>>",i.map(e=>e.element)),console.log(">>>",i.map(e=>e.path))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.KanbanTool=window.KT,t.activeBoard=t.KanbanTool.boards.models[0]}]);