import{K as u,R as g,L as A}from"./ReactKonvaCore.97eb648a.js";import{r as o}from"./index.23fdd41a.js";import{u as F}from"./useKonvaAnimation.df8ea812.js";import{D as y,a as h}from"./DraggableStage.06dccc66.js";import{F as _}from"./FrameCounter.26d9eec9.js";import{a as S,j as m}from"./jsx-runtime.ac26a6a6.js";const d=(t,n)=>Math.random()*n-t+t;function b(t,n){const r=[];for(let e=0;e<t;e++)r.push(n());return r}const x=()=>({x:d(0,500),y:d(0,500),fill:"red",width:50,height:50,offsetX:25,offsetY:25}),C=t=>b(t,x);function s(t){const{count:n}=t,r=o.exports.useMemo(()=>C(n),[n]),e=o.exports.useRef([]);o.exports.useEffect(()=>{e.current=e.current.slice(0,n)},[n]);const f=o.exports.useCallback(l=>{var i;const a=e.current;if(!a){console.log("!elements");return}u.autoDrawEnabled=!1;for(let c=0;c<a.length;c++){const p=a[c];!p||(p.rotation(l.time/(1/(1*.1))),c===a.length-1&&((i=p.getLayer())==null||i.draw()))}u.autoDrawEnabled=!0},[]);return F(f),S(y,{width:500,height:500,bgFill:"gray",children:[m(h,{children:r.map((l,a)=>o.exports.createElement(g,{ref:i=>{e.current[a]=i},...l,key:a,stroke:"black",draggable:!0}))}),m(A,{children:m(_,{width:500,height:100})})]})}try{s.displayName="FastAnimation",s.__docgenInfo={description:"",displayName:"FastAnimation",props:{count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/FastAnimation.tsx#FastAnimation"]={docgenInfo:s.__docgenInfo,name:"FastAnimation",path:"src/stress-tests/FastAnimation.tsx#FastAnimation"})}catch{}var k={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
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
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:s,title:"StressTests/Animated Rects (Fast)",argTypes:{}};const R=t=>m(s,{...t}),T={count:10},E=t=>{const n=R.bind({});return n.args={...T,...t},n},D=E(),K=["Basic"];export{D as Basic,K as __namedExportsOrder,k as default};
//# sourceMappingURL=FastAnimation.stories.ff1e1953.js.map
