import{R as c,L as g}from"./ReactKonvaCore.286c5b85.js";import{D as l,a as i}from"./DraggableStage.ce84a927.js";import{F as b}from"./FrameCounter.c631c8bf.js";import{r as p}from"./index.23fdd41a.js";import{a as y,j as s}from"./jsx-runtime.ac26a6a6.js";const o=(e,t)=>Math.random()*t-e+e;function m(e,t){const n=[];for(let r=0;r<e;r++)n.push(t());return n}const d=()=>({x:o(0,500),y:o(0,500),fill:"red",width:50,height:50,draggable:!0}),u=e=>()=>m(e,d);function a(e){const{count:t}=e;return y(l,{width:500,height:500,bgFill:"gray",children:[s(i,{children:u(t)().map((n,r)=>p.exports.createElement(c,{...n,key:r}))}),s(g,{children:s(b,{width:500,height:100})})]})}try{a.displayName="ManyDraggableObjects",a.__docgenInfo={description:"",displayName:"ManyDraggableObjects",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/ManyDraggableObjects.tsx#ManyDraggableObjects"]={docgenInfo:a.__docgenInfo,name:"ManyDraggableObjects",path:"src/stress-tests/ManyDraggableObjects.tsx#ManyDraggableObjects"})}catch{}var T={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ManyDraggableObjects, ManyDraggableObjectsProps } from "./ManyDraggableObjects";

export default {
  component: ManyDraggableObjects,
  title: "StressTests/Draggable Rects",
  argTypes: {},
} as ComponentMeta<typeof ManyDraggableObjects>;

const Template: ComponentStory<typeof ManyDraggableObjects> = (args: ManyDraggableObjectsProps) => {
  return <ManyDraggableObjects {...args} />;
};

const defaultProps: ManyDraggableObjectsProps = {
  count: 10,
};

const create = (args?: Partial<ManyDraggableObjectsProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:a,title:"StressTests/Draggable Rects",argTypes:{}};const O=e=>s(a,{...e}),f={count:10},D=e=>{const t=O.bind({});return t.args={...f,...e},t},x=D(),C=["Basic"];export{x as Basic,C as __namedExportsOrder,T as default};
//# sourceMappingURL=ManyDraggableObjects.stories.5b6c6c37.js.map
