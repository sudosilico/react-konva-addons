import{R as c,S as m,L as g}from"./ReactKonvaCore.97eb648a.js";import{r as i}from"./index.23fdd41a.js";import{w as h}from"./withSignalNode.a1c6aa4e.js";import{j as r,a as d,F as y}from"./jsx-runtime.ac26a6a6.js";import{D as f,a as x}from"./DraggableStage.06dccc66.js";function S(e){return{get:()=>e.current.value,set:t=>{e.current.value=t;const n=e.current.listeners;for(let o=0;o<n.length;o++){const a=n[o];a!=null&&a(t)}},setQuietly:t=>{e.current.value=t},listeners:[],addListener:t=>{const n=e.current.listeners;for(let o=0;o<n.length;o++)if(n[o]===null)return n[o]=t,o;return n.push(t),n.length-1},removeListenerAt:t=>{e.current.listeners[t]=null},id:()=>e.current.id}}let E=0;function M(){return E++}function C(e){const t=i.exports.useRef({value:e,listeners:[],id:-1});t.current.id===-1&&(t.current.id=M());const[n]=i.exports.useState(()=>S(t));return t.current.signal=n,n}const l=h(c);function _(){const e=C(300);return r(m,{width:500,height:500,children:d(g,{children:[r(l,{width:500,height:500,fill:"gray"}),r(l,{height:200,fill:"cyan",$:{width:e}}),r(l,{y:200,height:200,fill:"green",$:{width:e}}),r(l,{width:30,height:400,fill:"blue",draggable:!0,$:{x:e},$drag:{set:{x:e}},onDragMove:t=>{e.set(t.target.x())}})]})})}const w=()=>r(c,{width:50,height:50,x:50,y:50,fill:"white"}),T=()=>r(c,{width:50,height:50,x:150,y:50,fill:"green",draggable:!0});function s(){const e={width:400,height:400},[t,n]=i.exports.useState(25),[o,a]=i.exports.useState([{x:20,y:0,width:50,height:50,fill:"white",draggable:!0}]);return d(y,{children:[r("button",{onClick:()=>{a([...o,{x:20,y:t,width:50,height:50,fill:"white",draggable:!0}]),n(t+25)},children:"Click Me"}),r(f,{...e,bgFill:"black",children:d(x,{children:[r(w,{}),r(T,{}),o.map((p,u)=>i.exports.createElement(c,{...p,key:u}))]})})]})}try{s.displayName="MyExample",s.__docgenInfo={description:"This is a docstring for MyExample.",displayName:"MyExample",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/nodes/WithAddonExample.tsx#MyExample"]={docgenInfo:s.__docgenInfo,name:"MyExample",path:"src/nodes/WithAddonExample.tsx#MyExample"})}catch{}var k={title:"TestStuff",component:s,argTypes:{},parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MyTestStuffContainer2 } from "./TestStuff2";
import { MyExample } from "./WithAddonExample";

export default {
  title: "TestStuff",
  component: MyExample,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "z",
        content: "This is a docstring for MyExample.",
        story: "storytxt",
      },
    },
  },
} as ComponentMeta<typeof MyExample>;

export const Basic: ComponentStory<typeof MyExample> = () => {
  return <MyExample />;
};

export const Basic2: ComponentStory<typeof MyExample> = () => {
  return <MyTestStuffContainer2 />;
};
`,locationsMap:{basic:{startLoc:{col:55,line:20},endLoc:{col:1,line:22},startBody:{col:55,line:20},endBody:{col:1,line:22}},"basic-2":{startLoc:{col:56,line:24},endLoc:{col:1,line:26},startBody:{col:56,line:24},endBody:{col:1,line:26}}}},docs:{description:{component:"z",content:"This is a docstring for MyExample.",story:"storytxt"}}}};const v=()=>r(s,{}),$=()=>r(_,{}),D=["Basic","Basic2"];export{v as Basic,$ as Basic2,D as __namedExportsOrder,k as default};
//# sourceMappingURL=WithAddonExample.stories.53ef2f59.js.map
