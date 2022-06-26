import{S as l,L as o,R as c}from"./ReactKonvaCore.97eb648a.js";import{F as y}from"./FrameCounter.26d9eec9.js";import{a as i,j as a}from"./jsx-runtime.ac26a6a6.js";import{r as m}from"./index.23fdd41a.js";import"./useKonvaAnimation.df8ea812.js";const p=(t,e)=>Math.random()*e-t+t;function d(t,e){const s=[];for(let r=0;r<t;r++)s.push(e());return s}const u=()=>({x:p(0,500),y:p(0,500),fill:"red",width:50,height:50}),b=t=>()=>d(t,u);function n(t){const{count:e}=t;return i(l,{width:500,height:500,children:[i(o,{children:[a(c,{width:500,height:500,fill:"gray"}),b(e)().map((s,r)=>m.exports.createElement(c,{...s,key:r}))]}),a(o,{children:a(y,{width:500,height:100})})]})}try{n.displayName="ManyObjects",n.__docgenInfo={description:"",displayName:"ManyObjects",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/ManyObjects.tsx#ManyObjects"]={docgenInfo:n.__docgenInfo,name:"ManyObjects",path:"src/stress-tests/ManyObjects.tsx#ManyObjects"})}catch{}var T={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
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
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:n,title:"StressTests/Non-Draggable Rects",argTypes:{}};const O=t=>a(n,{...t}),f={count:10},g=t=>{const e=O.bind({});return e.args={...f,...t},e},x=g(),C=["Basic"];export{x as Basic,C as __namedExportsOrder,T as default};
//# sourceMappingURL=ManyObjects.stories.aecf6adc.js.map
