import{r as s}from"./index.23fdd41a.js";import{R as S,C as x}from"./ReactKonvaCore.97eb648a.js";import{u as d}from"./useKonvaAnimation.df8ea812.js";import{D as f,a as u}from"./DraggableStage.06dccc66.js";import{w as c}from"./withSignalNode.a1c6aa4e.js";import{j as p}from"./jsx-runtime.ac26a6a6.js";c(S);c(S);const E=c(x),g=n=>{const e=[];for(let r=0;r<n;r++)e.push({x:r*10,y:100});return e};function a(n){const e=s.exports.useRef([]),r=s.exports.useMemo(()=>g(10),[]),[l,h]=s.exports.useState(r),m=100;return s.exports.useEffect(()=>{e.current=e.current.slice(0,m)},[m]),d(i=>{const t=[...l];for(let o=0;o<t.length;o++)t[o].y=Math.sin(i.time/1e3*40+t[o].x)*100+100}),p(f,{width:500,height:500,bgFill:"#323232",children:p(u,{children:l.map((i,t)=>s.exports.createElement(E,{ref:o=>{e.current[t]=o},...i,key:t,radius:7,fill:"#cdcdcd"}))})})}try{a.displayName="SineExample",a.__docgenInfo={description:"",displayName:"SineExample",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/stress-tests/SineExample.tsx#SineExample"]={docgenInfo:a.__docgenInfo,name:"SineExample",path:"src/stress-tests/SineExample.tsx#SineExample"})}catch{}var A={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SineExample, SineExampleProps } from "./SineExample";

export default {
  component: SineExample,
  title: "SineExample",
  argTypes: {},
} as ComponentMeta<typeof SineExample>;

const Template: ComponentStory<typeof SineExample> = (args: SineExampleProps) => {
  return <SineExample {...args} />;
};

const defaultProps: SineExampleProps = {
  // TODO: Add default props
};

const create = (args?: Partial<SineExampleProps>) => {
  const instance = Template.bind({});
  instance.args = { ...defaultProps, ...args };
  return instance;
};

export const Basic = create();
`,locationsMap:{basic:{startLoc:{col:21,line:24},endLoc:{col:29,line:24},startBody:{col:21,line:24},endBody:{col:29,line:24}}}}},component:a,title:"SineExample",argTypes:{}};const y=n=>p(a,{...n}),_={},P=n=>{const e=y.bind({});return e.args={..._,...n},e},L=P(),M=["Basic"];export{L as Basic,M as __namedExportsOrder,A as default};
//# sourceMappingURL=SineExample.stories.0fb82f6c.js.map
