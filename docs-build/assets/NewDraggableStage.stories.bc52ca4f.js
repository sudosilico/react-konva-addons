import{r as f}from"./index.54d7971d.js";import{L as X,R as M,S as j}from"./ReactKonvaCore.2732a337.js";import{l as H,a as I,u as k}from"./math.bcc4451c.js";import{j as l,a as E,F as W}from"./jsx-runtime.ab7a63e8.js";import{F as $,D as V,B as q}from"./NewDraggableStageTools.f47efb8b.js";function z(e,n){const y={},a={},x=[];if(e){for(const u in e)if(typeof u=="string"){let S=function(m){n.current&&n.current[P](m)};const P=u,h=e[u],p=h.addListener(S);S(h.get());const w=h.id(),s=y[w];s?s.push(p):(y[w]=[p],a[w]=h,x.push(w))}}return{addedListenersMap:y,signalsById:a,signalIds:x}}function G(e,n){const y=f.exports.useRef(null);return!e&&n?y:e}function R(e){const n=(y,a)=>{const x=y.$,u=G(a,x);return f.exports.useEffect(()=>{if(!u)return;const{addedListenersMap:S,signalsById:P,signalIds:h}=z(x,u);return()=>{for(let p=0;p<h.length;p++){const w=P[h[p]],s=S[h[p]];for(let m=0;m<s.length;m++)w.removeListenerAt(s[m])}}},[u,x]),l(e,{ref:u,...y})};return f.exports.forwardRef(n)}try{R.displayName="withSignals",R.__docgenInfo={description:"",displayName:"withSignals",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/signals/withSignals.tsx#withSignals"]={docgenInfo:R.__docgenInfo,name:"withSignals",path:"src/signals/withSignals.tsx#withSignals"})}catch{}function Y(e,n){return e.x<=n.x&&e.x+e.width>=n.x+n.width&&e.y<=n.y&&e.y+e.height>=n.y+n.height}const C=e=>({x:-e.x()*(1/e.scaleX()),y:-e.y()*(1/e.scaleY()),width:e.width()*(1/e.scaleX()),height:e.height()*(1/e.scaleY())});function K(e,n){if(n.width<=e.width&&n.height<=e.height){const a={...n};return a.x<e.x?a.x=e.x:a.x+a.width>e.x+e.width&&(a.x=e.x+e.width-a.width),a.y<e.y?a.y=e.y:a.y+a.height>e.y+e.height&&(a.y=e.y+e.height-a.height),a}else{const a={x:n.x+n.width/2,y:n.y+n.height/2};a.x<e.x?a.x=e.x:a.x>e.x+e.width&&(a.x=e.x+e.width),a.y<e.y?a.y=e.y:a.y>e.y+e.height&&(a.y=e.y+e.height);const x={x:a.x-n.width/2,y:a.y-n.height/2};return{x:x.x,y:x.y,width:n.width,height:n.height}}}function J(){const[,e]=f.exports.useState(0);return()=>e(n=>n+1)}const Q=R(j);let T=0;const U={x:100,y:400,width:100,height:100},Z={x:-200,y:300,width:150,height:150},ee={x:-50,y:300,width:70,height:70};function _(e){var b,A;const n=f.exports.useRef(null),y=J(),a=f.exports.useRef(null),x=f.exports.useRef(null),u=f.exports.useRef(null),S=500,P=500;T=T+1;const h=e.onWheel,p=!0,w=!0,s=f.exports.useMemo(()=>({x:0,y:0,width:1e3,height:S}),[]),m=f.exports.useCallback(r=>{var i;if(!r)return!1;const t=n.current;if(!t||!t.targetPositionOffset)return!1;{const c=t.scaleX(),o=r.timeDiff/1e3*20,d=H(c,(i=t.targetScale)!=null?i:1,o);t.scaleX(d),t.scaleY(d);const g=t.position(),B={x:g.x+t.targetPositionOffset.x,y:g.y+t.targetPositionOffset.y},D=I(g,B,o),v={x:D.x-g.x,y:D.y-g.y};t.position(D),t.targetPositionOffset={x:t.targetPositionOffset.x-v.x,y:t.targetPositionOffset.y-v.y}}},[p]);k(m,{layer:(b=n==null?void 0:n.current)==null?void 0:b.getLayer()});const F=f.exports.useCallback(r=>{if(!r)return!1;const t=n.current;if(!t)return!1;if(t.isSnappingBack&&t.targetPosition){const i=t.position(),c=t.targetPosition,o=I(i,c,r.timeDiff/1e3*14),d={x:o.x-i.x,y:o.y-i.y};t.position(o),Math.abs(d.x)<.01&&Math.abs(d.y)<.01&&(t.isSnappingBack=!1,t.targetPosition=void 0)}else return!1},[w]);k(F,{layer:(A=n==null?void 0:n.current)==null?void 0:A.getLayer()});const O=f.exports.useCallback(r=>{const t=n.current;if(t&&t.isMouseInside){if(r.preventDefault(),t.isDragging())return;if(r.ctrlKey){const i=t.scaleX(),c=Math.exp(-r.deltaY/100),o=t.getPointerPosition();if(!o)return;const d={x:(o.x-t.x())/i,y:(o.y-t.y())/i};let g=i*c;g=Math.min(Math.max(.1,g),20);const B=t.position(),D={x:o.x-d.x*g,y:o.y-d.y*g};{const N={x:D.x-B.x,y:D.y-B.y};t.targetPositionOffset=N,t.targetScale=g}const v={x:-s.x,y:-s.y,width:s.width,height:s.height},L=C(t);if(!Y(v,L)){const N=K(v,L);t.targetPosition={x:-N.x/(1/t.scaleX()),y:-N.y/(1/t.scaleY())},t.isSnappingBack=!0}}else{const i={x:r.deltaX*-1,y:r.deltaY*-1},c=t.position(),o={x:c.x+i.x,y:c.y+i.y};t.position(o)}h&&h({type:"wheel",target:t,evt:r,currentTarget:t,cancelBubble:!1})}},[h,p,s.height,s.width,s.x,s.y]);return f.exports.useEffect(()=>(document.addEventListener("wheel",O,{passive:!1}),()=>{document.removeEventListener("wheel",O)}),[O]),E(W,{children:[l(Q,{draggable:!0,ref:n,width:S,height:P,...e,...{onMouseEnter:r=>{const t=n.current;!t||(t.isMouseInside=!0,e.onMouseEnter&&e.onMouseEnter(r))},onMouseLeave:r=>{const t=n.current;!t||(t.isMouseInside=!1,e.onMouseLeave&&e.onMouseLeave(r))}},...{onDragStart(r){const t=n.current;if(t&&(t.isSnappingBack=!1,r.evt&&r.currentTarget===t&&r.target!==t)){const i=r.evt.shiftKey,c=r.evt.buttons===4;(i||c)&&(r.evt.preventDefault(),r.target.stopDrag(),r.target=t,t.startDrag(r))}e.onDragStart&&e.onDragStart(r)},onDragMove(r){const t=n.current,{target:i,evt:c}=r;t&&c&&C(t),e.onDragMove&&e.onDragMove(r)},onDragEnd(r){const t=n.current,{target:i,evt:c}=r;if(t&&c&&i===t&&r.currentTarget===t){const o=C(t),d={x:-s.x,y:-s.y,width:s.width,height:s.height};if(!Y(d,o)){const g=K(d,o);t.targetPosition={x:-g.x/(1/t.scaleX()),y:-g.y/(1/t.scaleY())},t.isSnappingBack=!0}}e.onDragEnd&&e.onDragEnd(r)}},children:E(X,{children:[l(M,{width:s.width,height:s.height,fill:"cornflowerblue"}),l($,{x:100,y:100}),l(V,{x:180,y:150}),l(q,{x:260,y:200}),l(M,{ref:a,...U,fill:"gray"}),l(M,{ref:x,...Z,fill:"black"}),l(M,{ref:u,...ee,fill:"yellow",draggable:!0})]})}),E("div",{style:{width:500,height:200,background:"lightgray"},children:[l("code",{children:`React Renders: ${T}`}),l("br",{}),l("button",{onClick:()=>{y()},children:"Trigger One"})]})]})}try{_.displayName="NewDraggableStage",_.__docgenInfo={description:"",displayName:"NewDraggableStage",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/NewDraggableStage/NewDraggableStage.tsx#NewDraggableStage"]={docgenInfo:_.__docgenInfo,name:"NewDraggableStage",path:"src/components/NewDraggableStage/NewDraggableStage.tsx#NewDraggableStage"})}catch{}var fe={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NewDraggableStage, NewDraggableStageProps } from "./NewDraggableStage";

export default {
  component: NewDraggableStage,
  title: "NewDraggableStage",
  argTypes: {},
} as ComponentMeta<typeof NewDraggableStage>;

const Template: ComponentStory<typeof NewDraggableStage> = (args: NewDraggableStageProps) => {
  return <NewDraggableStage {...args} />;
};

const defaultProps: NewDraggableStageProps = {
  // TODO: Add default props
};

const create = (args?: Partial<NewDraggableStageProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:_,title:"NewDraggableStage",argTypes:{}};const te=e=>l(_,{...e}),ne={},re=e=>{const n=te.bind({});return n.args={...ne,...e},n},he=re(),ye=["Basic"];export{he as Basic,ye as __namedExportsOrder,fe as default};
//# sourceMappingURL=NewDraggableStage.stories.bc52ca4f.js.map
