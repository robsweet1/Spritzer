(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{225:function(e,t,r){},404:function(e,t,r){},413:function(e,t,r){"use strict";r.r(t);var a=r(5),n=r(1),c=r(20),o=r.n(c),i=(r(225),r(15)),s=r(217),l=r(32),d=r(50),u=r(117),j=r(82),b=r(80),f=r(42),h=r(60),m=Object(h.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{changeAuth:function(e,t){e.isLoggedIn=t.payload}}}),O=m.actions.changeAuth,x=m.reducer,g=function(e){return e.auth.isLoggedIn},p=function(e){var t=Object(i.c)(),r=Object(i.d)(g),c=function(){return Object(a.jsx)(b.a,{className:"nav",selectedKeys:e.currentPage,mode:"horizontal",children:Object(a.jsx)(b.a.Item,{children:Object(a.jsx)(j.b,{to:"/",children:"Home"})},"home")})};Object(n.useEffect)((function(){console.log(r)}));var o=function(){return Object(a.jsx)(b.a,{className:"nav",mode:"horizontal",children:Object(a.jsxs)(b.a.Item,{children:[r&&Object(a.jsx)(f.a,{onClick:function(){return t(O(!1))},children:"Log Out"}),!r&&Object(a.jsx)(f.a,{onClick:function(){return t(O(!0))},children:"Log In"})]},"auth")})};return Object(a.jsxs)("nav",{className:"nav",children:[Object(a.jsx)(c,{}),Object(a.jsx)(o,{})]})},v=r(215),w=Object(h.b)({name:"colorPicker",initialState:{color:{r:0,g:0,b:0,a:1}},reducers:{changeColor:function(e,t){e.color=t.payload}}}),y=w.actions.changeColor,k=w.reducer,I=function(e){return e.colorPicker.color},C=function(){var e=Object(i.c)(),t=Object(i.d)(I);return Object(a.jsx)(v.a,{color:t,onChange:function(t){e(y(t.rgb))}})},F=r(83),N=r.n(F),S=Object(h.b)({name:"editorTools",initialState:{tool:"",drawSize:1},reducers:{changeTool:function(e,t){e.tool=t.payload},changeDrawSize:function(e,t){e.drawSize=t.payload}}}),M=S.actions,z=M.changeTool,P=M.changeDrawSize,L=S.reducer,R=function(e){return e.editorTools.tool},T=function(e){return e.editorTools.drawSize},E=r(84),A=r.n(E),D=A.a.generate(),V={currentFrameId:D,frames:[{id:D,array:[]}]},B=Object(h.b)({name:"frames",initialState:V,reducers:{addFrame:function(e,t){e.frames.push({id:t.payload.id,array:t.payload.array})},removeFrame:function(e,t){var r=e.frames.findIndex((function(t){return t.id===e.currentFrameId}));e.frames=e.frames.filter((function(e){return e.id!==t.payload})),r<=0?r=0:r-=1,e.currentFrameId=e.frames[r].id},cloneFrame:function(e,t){var r=e.frames.findIndex((function(e){return e.id===t.payload.originalId}));e.frames.splice(r,0,{id:t.payload.newId,array:t.payload.array})},updateFrame:function(e,t){e.frames.find((function(e){return e.id===t.payload.id})).array=t.payload.array},changeCurrentFrameId:function(e,t){e.currentFrameId=t.payload},updateAllFrames:function(e,t){e.frames=t.payload}}}),H=B.actions,Y=H.addFrame,G=H.removeFrame,X=H.updateFrame,J=H.cloneFrame,K=H.changeCurrentFrameId,W=H.updateAllFrames,q=B.reducer,$=function(e){return e.frames.frames},Q=function(e){return e.frames.currentFrameId},U=function(e){var t=Object(i.d)(R),r=Object(i.d)(T),c=Object(i.d)(I),o=Object(i.d)($),s=Object(i.d)(Q),l=Object(n.useRef)([]),d=Object(i.c)(),u=e.width,j=e.height,b=640/u,f=u*b;Object(n.useEffect)((function(){o.find((function(e){return e.id===s}))&&(l.current=o.find((function(e){return e.id===s})).array.slice())}),[s]);var h=function(e){var t=l.current.slice();d(X({id:e,array:t}))},m=function(e){return e.mouseX>f||e.mouseY<0||e.mouseY>f||e.mouseX<0?null:[Math.floor(e.mouseX/b),Math.floor(e.mouseY/b)]},O=function(e){e.noLoop();var r=m(e);if(!r)return e.loop(),!1;var a=r[0],n=r[1];switch(t){case"erase":x(a,n,{r:0,g:0,b:0,a:0},!1,e);break;case"draw":x(a,n,c,!1,e);break;case"pick":var o=n*u+a;if(0!==l.current[o].a){var i=l.current[o];d(y(i))}break;case"mirror":x(a,n,c,!0,e);break;default:return e.loop(),!1}return e.loop(),!1},x=function(e,t,a,n,c){for(var o=!1,i=-Math.floor(r/2);i<Math.ceil(r/2);i++)for(var d=-Math.floor(r/2);d<Math.ceil(r/2);d++){var j=t*u+u*d,b=j+(e+i);if(b>=Math.floor(j)&&b<Math.floor(j)+u&&b<l.current.length&&(g(l.current[b],a)||(c.redraw(),l.current[b]=a,o=!0)),n){var f=j+(u/2+(u/2-(e+i)))-1;f>=Math.floor(j)&&f<Math.floor(j)+u&&b<l.current.length&&(g(l.current[f],a)||(l.current[f]=a,o=!0))}}o&&h(s)},g=function(e,t){return!(!e||!t)&&(e.a===t.a&&e.b===t.b&&e.g===t.g&&e.b===t.b)};return Object(a.jsx)(N.a,{setup:function(e,t){e.noStroke(),e.colorMode("RGB",255,255,255,1),e.createCanvas(f,f).parent(t),l.current=new Array(u*j).fill({r:0,g:0,b:0,a:0}),h(s)},draw:function(e){if(e.scale(b),e.erase(),e.rect(0,0,u,j),e.noErase(),e.fill("rgba(0, 0, 0, 0.3)"),l.current.length===u*j){var a=m(e);if(a&&"pick"!==t){var n=a[0],c=a[1],o=n-Math.floor(r/2),i=c-Math.floor(r/2);e.rect(o,i,r,r)}for(var s=0;s<j;s++)for(var d=0;d<u;d++)if(0!==l.current[d*u+s]){var f=l.current[d*u+s];e.fill("rgba(".concat(f.r,", ").concat(f.g,", ").concat(f.b,", ").concat(f.a,")")),e.rect(s,d,1,1)}}},mouseClicked:O,mouseDragged:O,mouseMoved:function(){return!1}})},Z=r(58),_=r(148),ee=r(115),te=r(207),re=r(86),ae=u.a.Title,ne=function(){var e=Object(i.c)();return Object(a.jsxs)("div",{className:"draw-size-box",children:[Object(a.jsx)(ae,{level:4,children:"Tool Size"}),Object(a.jsx)(re.a,{min:1,max:8,defaultValue:1,onChange:function(t){e(P(t))}})]})},ce=function(){var e=Object(n.useState)(""),t=Object(Z.a)(e,2),r=t[0],c=t[1],o=Object(i.c)();return Object(a.jsxs)(b.a,{onClick:function(e){o(z(e.key)),c(e.key)},selectedKeys:r,mode:"horizontal",children:[Object(a.jsx)(b.a.Item,{className:"menu-tool-container",children:Object(a.jsx)(_.b,{size:"lg",className:"menu-tool-icon"})},"draw"),Object(a.jsx)(b.a.Item,{className:"menu-tool-container",children:Object(a.jsx)(_.a,{size:"lg",className:"menu-tool-icon"})},"erase"),Object(a.jsx)(b.a.Item,{className:"menu-tool-container",children:Object(a.jsx)(ee.b,{size:"lg",className:"menu-tool-icon"})},"pick"),Object(a.jsx)(b.a.Item,{className:"menu-tool-container",children:Object(a.jsx)(te.a,{size:"lg",className:"menu-tool-icon"})},"mirror"),Object(a.jsx)(b.a.SubMenu,{children:Object(a.jsx)(ne,{})})]})},oe=r(97),ie=function(e){var t=Object(i.d)($),r=Object(n.useRef)(0),c=Object(n.useState)(),o=Object(Z.a)(c,2),s=o[0],l=o[1],d=Object(n.useState)("Play"),u=Object(Z.a)(d,2),j=u[0],b=u[1],h=e.width,m=e.height,O=128/h,x=function(){r.current>=t.length-1?r.current=0:r.current++},g=function(){"Play"!==j&&(s.isLooping()?s.noLoop():s.loop())};return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h3",{children:"Preview"}),Object(a.jsxs)("div",{className:"vertical-flex frame-box",style:{width:h*O,height:m*O},children:[Object(a.jsx)(N.a,{className:"sketch",setup:function(e,t){l(e),e.noStroke(),e.colorMode("RGB",255,255,255,1),e.createCanvas(h*O,m*O).parent(t),e.frameRate(8),e.noLoop()},draw:function(e){if(e.scale(O),e.erase(),e.rect(0,0,h,m),e.noErase(),0!==t.length&&t[r.current]){var a=t[r.current].array;if(a&&a.length===m*h){for(var n=0;n<m;n++)for(var c=0;c<h;c++)if(0!==a[c*h+n]){var o=a[c*h+n];e.fill("rgba(".concat(o.r,", ").concat(o.g,", ").concat(o.b,", ").concat(o.a,")")),e.rect(n,c,1,1)}x()}else x()}else x()},mousePressed:g,mouseReleased:g}),Object(a.jsx)(f.a,{className:"frame-btn visible btm-left-btn",onClick:function(){s.isLooping()?(s.noLoop(),b("Play")):(s.loop(),b("Pause"))},children:"Play"===j?Object(a.jsx)(oe.c,{}):Object(a.jsx)(oe.b,{})})]}),Object(a.jsx)(re.a,{min:1,max:60,defaultValue:8,onChange:function(e){e>60?e=60:e<1&&(e=1),s.frameRate(e)},formatter:function(e){return"fps: ".concat(e)},parser:function(e){return e.replace("fps: ","")}})]})},se=r(90),le=r(118),de=r(208),ue=r.n(de),je=function(e){var t=Object(i.c)(),r=Object(i.d)(Q),c=Object(i.d)($),o=Object(n.useRef)(),s=e.width,l=e.height,d=128/s;Object(n.useEffect)((function(){if(e.id===r){var t=o.current;return t.classList.add("current-frame"),function(){t.classList.remove("current-frame")}}}),[r,e.id]);return Object(a.jsxs)("div",{className:"vertical-flex frame-box",id:e.id,ref:o,style:{width:s*d+5,height:l*d+5},children:[Object(a.jsx)("span",{className:"frame-index",children:e.index}),Object(a.jsxs)("div",{onClick:function(){return t(K(e.id))},children:[Object(a.jsx)(N.a,{className:"sketch",style:{width:s*d,height:l*d},setup:function(e,t){e.noLoop(),e.noStroke(),e.colorMode("RGB",255,255,255,1),e.createCanvas(s*d,l*d).parent(t)},draw:function(t){!function(e,t){if(e.scale(d),t&&t.length===s*l){e.erase(),e.rect(0,0,s,l),e.noErase();for(var r=0;r<l;r++)for(var a=0;a<s;a++)if(0!==t[a*s+r]){var n=t[a*s+r];e.fill("rgba(".concat(n.r,", ").concat(n.g,", ").concat(n.b,", ").concat(n.a,")")),e.rect(r,a,1,1)}}}(t,e.array,e.index)},mouseClicked:function(t){!function(e,t){t===r&&e.redraw()}(t,e.id)}}),c.length>1&&Object(a.jsx)(f.a,{className:"frame-btn btm-left-btn",onClick:function(){return t(G(e.id))},children:Object(a.jsx)(oe.a,{})}),Object(a.jsx)(f.a,{className:"frame-btn btm-right-btn",onClick:function(){return function(e,r){var a=A.a.generate();t(J({originalId:e,newId:a,array:r}))}(e.id,e.array)},children:Object(a.jsx)(ee.a,{})})]})]})},be=function(e){var t=Object(i.c)(),r=Object(i.d)($),n=e.width,c=e.height;return Object(a.jsxs)(le.a,{onDragEnd:function(e){if(e.destination){var a=r.slice(),n=a.splice(e.source.index,1),c=Object(Z.a)(n,1)[0];a.splice(e.destination.index,0,c),t(W(a))}},children:[Object(a.jsx)(le.c,{droppableId:"droppable",children:function(t){return Object(a.jsxs)("div",Object(se.a)(Object(se.a)({ref:t.innerRef},t.droppableProps),{},{children:[r.map((function(t,r){return Object(a.jsx)(ue.a,{height:200,once:!0,overflow:!0,children:Object(a.jsx)(le.b,{draggableId:t.id,index:r,className:"frame-preview vertical-flex",children:function(o){return Object(a.jsxs)("div",Object(se.a)(Object(se.a)(Object(se.a)({ref:o.innerRef},o.draggableProps),o.dragHandleProps),{},{children:[Object(a.jsx)(je,{index:r,id:t.id,array:t.array,height:c,width:n,scale:e.scale}),o.placeholder]}))}})},t.id)})),t.placeholder]}))}}),Object(a.jsx)(f.a,{onClick:function(){var e=A.a.generate();t(Y({id:e,array:Array(n*c).fill({r:0,g:0,b:0,a:0})})),t(K(e))},children:"Add Frame"})]})},fe=u.a.Title,he=d.a.Header,me=d.a.Footer,Oe=d.a.Sider,xe=d.a.Content,ge=function(e){var t=Object(i.d)(g);return Object(n.useEffect)((function(){t||e.history.push("/")})),Object(s.a)((function(e){return e.preventDefault()})),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(l.a,{when:!0,message:"You have unsaved changes, are you sure you want to leave?"}),Object(a.jsxs)(d.a,{style:{height:"100vh"},children:[Object(a.jsx)(he,{children:Object(a.jsx)(p,{currentPage:"editor"})}),Object(a.jsxs)(d.a,{children:[Object(a.jsxs)(Oe,{width:250,children:[Object(a.jsx)(C,{}),Object(a.jsx)(ie,{height:e.location.state.width,width:e.location.state.width}),Object(a.jsx)(ne,{})]}),Object(a.jsx)(d.a,{children:Object(a.jsxs)(xe,{className:"main-content",children:[Object(a.jsx)(ce,{}),Object(a.jsx)(U,{height:e.location.state.width,width:e.location.state.width,name:e.location.state.name})]})}),Object(a.jsxs)(Oe,{width:250,children:[Object(a.jsx)(fe,{level:4,style:{marginTop:"15px"},children:"Frame Sequence"}),Object(a.jsx)(be,{height:e.location.state.width,width:e.location.state.width})]})]}),Object(a.jsx)(me,{})]})]})},pe=(r(403),r(404),r(417)),ve=r(418),we=function(e){var t=Object(l.g)(),r=pe.a.useForm(),n=Object(Z.a)(r,1)[0],c=Object(i.d)(Q),o=Object(i.c)();return Object(a.jsx)("div",{className:"modal-box",children:Object(a.jsxs)(pe.a,{layout:"horizontal",form:n,children:[Object(a.jsx)(pe.a.Item,{label:"Name",name:"name",initialValue:"untitledSprite",children:Object(a.jsx)(ve.a,{placeholder:"Mario"})}),Object(a.jsx)(pe.a.Item,{label:"Dimensions",name:"width",initialValue:32,children:Object(a.jsx)(re.a,{min:8,max:64,step:8})}),Object(a.jsx)(pe.a.Item,{children:Object(a.jsx)(f.a,{type:"primary",onClick:function(){var e=n.getFieldValue("width"),r={name:n.getFieldValue("name"),width:e},a=new Array(e*e).fill({r:0,g:0,b:0,a:0});o(X({id:c,array:a})),t.push("/editor",r)},children:"Create Sprite"})}),Object(a.jsx)(pe.a.Item,{children:Object(a.jsx)(f.a,{onClick:function(){e.setModalOpen(!1)},children:"Close Modal"})})]})})},ye=d.a.Header,ke=d.a.Footer,Ie=d.a.Sider,Ce=d.a.Content,Fe=function(){var e=Object(n.useState)(!1),t=Object(Z.a)(e,2),r=t[0],c=t[1];return Object(a.jsxs)(d.a,{style:{height:"100vh"},children:[r?Object(a.jsx)(we,{setModalOpen:c}):null,Object(a.jsx)(ye,{children:Object(a.jsx)(p,{currentPage:"home"})}),Object(a.jsxs)(d.a,{children:[Object(a.jsx)(Ie,{width:250}),Object(a.jsx)(d.a,{children:Object(a.jsx)(Ce,{className:"main-content",children:Object(a.jsx)(f.a,{onClick:function(){return c(!0)},children:"New Sprite"})})}),Object(a.jsx)(Ie,{width:250})]}),Object(a.jsx)(ke,{})]})};var Ne=function(){return Object(a.jsxs)(l.d,{children:[Object(a.jsx)(l.b,{path:"/",component:Fe,exact:!0}),Object(a.jsx)(l.b,{path:"/editor",component:ge})]})},Se=Object(h.a)({reducer:{editorTools:L,colorPicker:k,frames:q,auth:x},middleware:function(e){return e({immutableCheck:!1,serializableCheck:!1})}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(a.jsx)(i.a,{store:Se,children:Object(a.jsx)(j.a,{children:Object(a.jsx)(Ne,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[413,1,2]]]);
//# sourceMappingURL=main.0151dc1d.chunk.js.map