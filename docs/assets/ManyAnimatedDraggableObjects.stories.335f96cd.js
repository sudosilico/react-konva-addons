import{r as c}from"./index.23fdd41a.js";import{L as m,R as g}from"./ReactKonvaCore.97eb648a.js";import{u as l}from"./useKonvaAnimation.df8ea812.js";import{D as d,a as p}from"./DraggableStage.06dccc66.js";import{F as b}from"./FrameCounter.26d9eec9.js";import{a as y,j as r}from"./jsx-runtime.ac26a6a6.js";const o=(e,t)=>Math.random()*t-e+e;function u(e,t){const n=[];for(let a=0;a<e;a++)n.push(t());return n}function f(e){const t=c.exports.useRef(null);return l(n=>{const a=t.current;if(!a)return;const i=1;a.rotation(n.time/(1/(i*.1)))}),r(g,{ref:t,...e,stroke:"black"})}const A=()=>({x:o(0,500),y:o(0,500),fill:"red",width:50,height:50,draggable:!0,offsetX:25,offsetY:25});function s(e){const{count:t}=e;return y(d,{width:500,height:500,bgFill:"gray",children:[r(p,{children:u(t,A).map((n,a)=>c.exports.createElement(f,{...n,key:a}))}),r(m,{children:r(b,{width:500,height:100})})]})}try{s.displayName="ManyAnimatedDraggableObjects",s.__docgenInfo={description:"",displayName:"ManyAnimatedDraggableObjects",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/ManyAnimatedDraggableObjects.tsx#ManyAnimatedDraggableObjects"]={docgenInfo:s.__docgenInfo,name:"ManyAnimatedDraggableObjects",path:"src/stress-tests/ManyAnimatedDraggableObjects.tsx#ManyAnimatedDraggableObjects"})}catch{}var C={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
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
`,locationsMap:{basic:{startLoc:{col:21,line:29},endLoc:{col:29,line:29},startBody:{col:21,line:29},endBody:{col:29,line:29}}}}},component:s,title:"StressTests/Animated Rects",argTypes:{}};const O=e=>r(s,{...e}),M={count:10},j=e=>{const t=O.bind({});return t.args={...M,...e},t},R=j(),P=["Basic"];export{R as Basic,P as __namedExportsOrder,C as default};
//# sourceMappingURL=ManyAnimatedDraggableObjects.stories.335f96cd.js.map
