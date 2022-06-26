import{S as l,L as o,R as c}from"./ReactKonvaCore.286c5b85.js";import{F as y}from"./FrameCounter.c631c8bf.js";import{a as i,j as r}from"./jsx-runtime.ac26a6a6.js";import{r as d}from"./index.23fdd41a.js";const p=(t,e)=>Math.random()*e-t+t;function m(t,e){const s=[];for(let a=0;a<t;a++)s.push(e());return s}const u=()=>({x:p(0,500),y:p(0,500),fill:"red",width:50,height:50}),b=t=>()=>m(t,u);function n(t){const{count:e}=t;return i(l,{width:500,height:500,children:[i(o,{children:[r(c,{width:500,height:500,fill:"gray"}),b(e)().map((s,a)=>d.exports.createElement(c,{...s,key:a}))]}),r(o,{children:r(y,{width:500,height:100})})]})}try{n.displayName="ManyObjects",n.__docgenInfo={description:"",displayName:"ManyObjects",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/ManyObjects.tsx#ManyObjects"]={docgenInfo:n.__docgenInfo,name:"ManyObjects",path:"src/stress-tests/ManyObjects.tsx#ManyObjects"})}catch{}var S={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ManyObjects, ManyObjectsProps } from "./ManyObjects";

export default {
  component: ManyObjects,
  title: "StressTests/Non-Draggable Rects",
  argTypes: {},
} as ComponentMeta<typeof ManyObjects>;

const Template: ComponentStory<typeof ManyObjects> = (args: ManyObjectsProps) => {
  return <ManyObjects {...args} />;
};

const defaultProps: ManyObjectsProps = {
  count: 10,
};

const create = (args?: Partial<ManyObjectsProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:n,title:"StressTests/Non-Draggable Rects",argTypes:{}};const O=t=>r(n,{...t}),f={count:10},g=t=>{const e=O.bind({});return e.args={...f,...t},e},T=g(),x=["Basic"];export{T as Basic,x as __namedExportsOrder,S as default};
//# sourceMappingURL=ManyObjects.stories.c7e0fbc1.js.map
