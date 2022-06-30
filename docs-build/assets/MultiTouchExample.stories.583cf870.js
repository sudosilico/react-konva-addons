import{r as u}from"./index.54d7971d.js";import{S as b,L,R as E,G as v,C as D}from"./ReactKonvaCore.2732a337.js";import{F as R,D as _}from"./NewDraggableStageTools.f47efb8b.js";import{a as f,F as k,j as n}from"./jsx-runtime.ab7a63e8.js";function $(a,o,i,d){const r=u.exports.useRef(i);u.exports.useLayoutEffect(()=>{r.current=i},[i]),u.exports.useEffect(()=>{const x=g=>{console.log("eventListener callback"),r.current(g)},c=a.current;if(!c){console.log("No node, returning.");return}const s=c.getStage();if(!s){console.log("No stage, returning.");return}const l=s.container();return console.log("Adding container listener: "+o),l.addEventListener(o,x,d),()=>{console.log("Removing container listener: "+o),l.removeEventListener(o,x)}},[o,d,a])}function T(a){const o=u.exports.useRef(null),[i,d]=u.exports.useState([]);$(o,"keydown",e=>{console.log(e),e.key,e.preventDefault()}),$(o,"keyup",e=>{console.log(e),e.key,e.preventDefault()}),u.exports.useLayoutEffect(()=>{const e=o.current;if(!e)return;const t=e.container();typeof t.tabIndex=="undefined"&&(t.tabIndex=1)},[]);const r=e=>{i[i.length-1],d(t=>[...t,e])},x=()=>{d([])},c=e=>t=>{r(`ts: '${e}': ${t.evt.touches.length}, t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},s=e=>t=>{r(`te:'${e}': ${t.evt.touches.length}, t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},l=e=>t=>{r(`tm: '${e}': ${t.evt.touches.length}, t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},g=e=>t=>{r(`ds: '${e}': t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},p=e=>t=>{r(`de: '${e}': t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},h=e=>t=>{r(`dm: '${e}': t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},m=e=>t=>{r(`c: '${e}': t: ${t.target.name()}, ct: ${t.currentTarget.name()}`)},C=500,y=500,M=u.exports.useRef(null),S=u.exports.useRef(null);return f(k,{children:[n(b,{name:"aStage",ref:o,width:C,height:y,onTouchStart:c("stage"),onTouchEnd:s("stage"),onTouchMove:l("stage"),onDragStart:g("stage"),onDragEnd:p("stage"),onDragMove:h("stage"),onClick:m("stage"),draggable:!0,children:f(L,{name:"aLayer",onTouchStart:c("layer"),onTouchEnd:s("layer"),onTouchMove:l("layer"),onDragStart:g("layer"),onDragEnd:p("layer"),onDragMove:h("layer"),onClick:m("layer"),children:[n(E,{width:500,height:500,fill:"cornflowerblue"}),n(R,{x:100,y:100}),n(_,{x:180,y:150}),f(v,{ref:M,children:[n(E,{width:100,height:100,fill:"green"}),n(E,{ref:S,width:100,height:15,fill:"black",opacity:.2,draggable:!0,onDragStart:e=>{var t;e.currentTarget===S.current&&(e.target.stopDrag(),(t=M.current)==null||t.startDrag(e),e.cancelBubble=!0)}})]}),f(v,{name:"aGroup",onTouchStart:c("group"),onTouchEnd:s("group"),onTouchMove:l("group"),onDragStart:g("group"),onDragEnd:p("group"),onDragMove:h("group"),onClick:m("group"),children:[n(D,{name:"Red1",radius:50,x:150,y:250,fill:"red",draggable:!0,onTouchStart:c("red1"),onTouchEnd:s("red1"),onTouchMove:l("red1"),onDragStart:g("red1"),onDragEnd:p("red1"),onDragMove:h("red1"),onClick:m("red1")}),n(D,{name:"Red2",radius:50,x:350,y:250,fill:"red",draggable:!0,onTouchStart:c("red2"),onTouchEnd:s("red2"),onTouchMove:l("red2"),onDragStart:g("red2"),onDragEnd:p("red2"),onDragMove:h("red2"),onClick:m("red2")})]})]})}),f("div",{style:{height:y,overflowY:"scroll"},children:[n("h2",{children:"Log:"}),n("button",{onClick:x,children:"Clear log"}),i.map((e,t)=>n("div",{children:e},t))]})]})}try{T.displayName="MultiTouchExample",T.__docgenInfo={description:"",displayName:"MultiTouchExample",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/nodes/MultiTouchExample.tsx#MultiTouchExample"]={docgenInfo:T.__docgenInfo,name:"MultiTouchExample",path:"src/nodes/MultiTouchExample.tsx#MultiTouchExample"})}catch{}var j={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MultiTouchExample, MultiTouchExampleProps } from "./MultiTouchExample";

export default {
  component: MultiTouchExample,
  title: "MultiTouchExample",

  argTypes: {},
} as ComponentMeta<typeof MultiTouchExample>;

const Template: ComponentStory<typeof MultiTouchExample> = (args: MultiTouchExampleProps) => {
  return <MultiTouchExample {...args} />;
};

const defaultProps: MultiTouchExampleProps = {
  // TODO: Add default props
};

const create = (args?: Partial<MultiTouchExampleProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:25},endLoc:{col:29,line:25},startBody:{col:21,line:25},endBody:{col:29,line:25}}}}},component:T,title:"MultiTouchExample",argTypes:{}};const O=a=>n(T,{...a}),B={},P=a=>{const o=O.bind({});return o.args={...B,...a},o},G=P(),K=["Basic"];export{G as Basic,K as __namedExportsOrder,j as default};
//# sourceMappingURL=MultiTouchExample.stories.583cf870.js.map
