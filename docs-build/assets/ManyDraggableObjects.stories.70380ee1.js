import{R as c,L as g}from"./ReactKonvaCore.2732a337.js";import{D as l,a as i}from"./DraggableStage.85e0d1a3.js";import{F as b}from"./FrameCounter.90cb19be.js";import{r as p}from"./index.54d7971d.js";import{a as m,j as s}from"./jsx-runtime.ab7a63e8.js";import"./math.bcc4451c.js";const o=(e,t)=>Math.random()*t-e+e;function y(e,t){const n=[];for(let r=0;r<e;r++)n.push(t());return n}const d=()=>({x:o(0,500),y:o(0,500),fill:"red",width:50,height:50,draggable:!0}),u=e=>()=>y(e,d);function a(e){const{count:t}=e;return m(l,{width:500,height:500,bgFill:"gray",children:[s(i,{children:u(t)().map((n,r)=>p.exports.createElement(c,{...n,key:r}))}),s(g,{children:s(b,{width:500,height:100})})]})}try{a.displayName="ManyDraggableObjects",a.__docgenInfo={description:"",displayName:"ManyDraggableObjects",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/ManyDraggableObjects.tsx#ManyDraggableObjects"]={docgenInfo:a.__docgenInfo,name:"ManyDraggableObjects",path:"src/stress-tests/ManyDraggableObjects.tsx#ManyDraggableObjects"})}catch{}var x={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
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
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:a,title:"StressTests/Draggable Rects",argTypes:{}};const O=e=>s(a,{...e}),f={count:10},D=e=>{const t=O.bind({});return t.args={...f,...e},t},C=D(),R=["Basic"];export{C as Basic,R as __namedExportsOrder,x as default};
//# sourceMappingURL=ManyDraggableObjects.stories.70380ee1.js.map
