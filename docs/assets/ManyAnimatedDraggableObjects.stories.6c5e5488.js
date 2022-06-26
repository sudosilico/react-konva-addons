import{r as c}from"./index.23fdd41a.js";import{L as g,R as m}from"./ReactKonvaCore.286c5b85.js";import{F as l,u as d}from"./FrameCounter.c631c8bf.js";import{D as p,a as b}from"./DraggableStage.ce84a927.js";import{a as y,j as r}from"./jsx-runtime.ac26a6a6.js";const o=(e,t)=>Math.random()*t-e+e;function u(e,t){const n=[];for(let a=0;a<e;a++)n.push(t());return n}function f(e){const t=c.exports.useRef(null);return d(n=>{const a=t.current;if(!a)return;const i=1;a.rotation(n.time/(1/(i*.1)))}),r(m,{ref:t,...e,stroke:"black"})}const A=()=>({x:o(0,500),y:o(0,500),fill:"red",width:50,height:50,draggable:!0,offsetX:25,offsetY:25});function s(e){const{count:t}=e;return y(p,{width:500,height:500,bgFill:"gray",children:[r(b,{children:u(t,A).map((n,a)=>c.exports.createElement(f,{...n,key:a}))}),r(g,{children:r(l,{width:500,height:100})})]})}try{s.displayName="ManyAnimatedDraggableObjects",s.__docgenInfo={description:"",displayName:"ManyAnimatedDraggableObjects",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/ManyAnimatedDraggableObjects.tsx#ManyAnimatedDraggableObjects"]={docgenInfo:s.__docgenInfo,name:"ManyAnimatedDraggableObjects",path:"src/stress-tests/ManyAnimatedDraggableObjects.tsx#ManyAnimatedDraggableObjects"})}catch{}var T={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ManyAnimatedDraggableObjects,
  ManyAnimatedDraggableObjectsProps,
} from "./ManyAnimatedDraggableObjects";

export default {
  component: ManyAnimatedDraggableObjects,
  title: "StressTests/Animated Rects",
  argTypes: {},
} as ComponentMeta<typeof ManyAnimatedDraggableObjects>;

const Template: ComponentStory<typeof ManyAnimatedDraggableObjects> = (
  args: ManyAnimatedDraggableObjectsProps,
) => {
  return <ManyAnimatedDraggableObjects {...args} />;
};

const defaultProps: ManyAnimatedDraggableObjectsProps = {
  count: 10,
};

const create = (args?: Partial<ManyAnimatedDraggableObjectsProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:29},endLoc:{col:29,line:29},startBody:{col:21,line:29},endBody:{col:29,line:29}}}}},component:s,title:"StressTests/Animated Rects",argTypes:{}};const O=e=>r(s,{...e}),M={count:10},j=e=>{const t=O.bind({});return t.args={...M,...e},t},C=j(),R=["Basic"];export{C as Basic,R as __namedExportsOrder,T as default};
//# sourceMappingURL=ManyAnimatedDraggableObjects.stories.6c5e5488.js.map
