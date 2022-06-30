import{K as d,S as A,L as u,R as y}from"./ReactKonvaCore.2732a337.js";import{r as s}from"./index.54d7971d.js";import{u as _}from"./math.bcc4451c.js";import{D as S,a as b}from"./DraggableStage.85e0d1a3.js";import{F as f}from"./FrameCounter.90cb19be.js";import{a as g,F as x,j as o}from"./jsx-runtime.ab7a63e8.js";const h=(t,e)=>Math.random()*e-t+t;function C(t,e){const i=[];for(let n=0;n<t;n++)i.push(e());return i}const R=()=>({x:h(0,500),y:h(0,500),fill:"red",width:50,height:50,offsetX:25,offsetY:25}),T=t=>C(t,R);function r(t){const{count:e}=t,i=s.exports.useMemo(()=>T(e),[e]),n=s.exports.useRef([]);s.exports.useEffect(()=>{n.current=n.current.slice(0,e)},[e]);const F=s.exports.useCallback(l=>{var c;const a=n.current;if(!a){console.log("!elements");return}d.autoDrawEnabled=!1;for(let m=0;m<a.length;m++){const p=a[m];!p||(p.rotation(l.time/(1/(1*.1))),m===a.length-1&&((c=p.getLayer())==null||c.draw()))}d.autoDrawEnabled=!0},[]);return _(F),g(x,{children:[o(A,{width:500,height:100,bgFill:"gray",children:o(u,{children:o(f,{width:500,height:100})})}),g(S,{width:500,height:500,bgFill:"gray",children:[o(b,{children:i.map((l,a)=>s.exports.createElement(y,{ref:c=>{n.current[a]=c},...l,key:a,stroke:"black",draggable:!0}))}),o(u,{children:o(f,{width:500,height:100})})]})]})}try{r.displayName="FastAnimation",r.__docgenInfo={description:"",displayName:"FastAnimation",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/FastAnimation.tsx#FastAnimation"]={docgenInfo:r.__docgenInfo,name:"FastAnimation",path:"src/stress-tests/FastAnimation.tsx#FastAnimation"})}catch{}var K={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FastAnimation, FastAnimationProps } from "./FastAnimation";

export default {
  component: FastAnimation,
  title: "StressTests/Animated Rects (Fast)",
  argTypes: {},
} as ComponentMeta<typeof FastAnimation>;

const Template: ComponentStory<typeof FastAnimation> = (args: FastAnimationProps) => {
  return <FastAnimation {...args} />;
};

const defaultProps: FastAnimationProps = {
  count: 10,
};

const create = (args?: Partial<FastAnimationProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:r,title:"StressTests/Animated Rects (Fast)",argTypes:{}};const E=t=>o(r,{...t}),w={count:10},L=t=>{const e=E.bind({});return e.args={...w,...t},e},M=L(),j=["Basic"];export{M as Basic,j as __namedExportsOrder,K as default};
//# sourceMappingURL=FastAnimation.stories.e4f2f5b2.js.map
