import{G as D,L as m,S as v,R}from"./ReactKonvaCore.286c5b85.js";import{j as u,a as C}from"./jsx-runtime.ac26a6a6.js";import{r as f}from"./index.23fdd41a.js";const h=f.exports.createContext({});function O(){const e=f.exports.useContext(h);if(!!e.stateRef)return e.stateRef}function T(){const e=O();if(!!e)return e.current}const d=e=>{const c=O();return u(D,{...e,onDragStart:o=>{var a,s;const t=(s=(a=c==null?void 0:c.current)==null?void 0:a.refs)==null?void 0:s.stageRef.current;if(!t)return;const r=o.evt.getModifierState("Shift"),{buttons:n}=o.evt;n===1&&r||n===4?(o.target.stopDrag(),o.currentTarget.stopDrag(),t.startDrag()):e.onDragStart&&e.onDragStart(o)},children:e.children})},y=e=>u(m,{...e,children:u(d,{children:e.children})});try{d.displayName="DraggableGroup",d.__docgenInfo={description:"This component allows the DraggableStage to properly handle drag events from objects within the group.",displayName:"DraggableGroup",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/DraggableLayer.tsx#DraggableGroup"]={docgenInfo:d.__docgenInfo,name:"DraggableGroup",path:"src/components/DraggableLayer.tsx#DraggableGroup"})}catch{}try{y.displayName="DraggableLayer",y.__docgenInfo={description:"This component allows the DraggableStage to properly handle drag events from objects within the layer.",displayName:"DraggableLayer",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/DraggableLayer.tsx#DraggableLayer"]={docgenInfo:y.__docgenInfo,name:"DraggableLayer",path:"src/components/DraggableLayer.tsx#DraggableLayer"})}catch{}function L({stageContextRef:e,stageRef:c,bgRef:i}){return{draggable:!0,onDragStart(o){const t=e.current,r=c.current,n=i.current;if(!t||!r||!n)return;n.stopDrag(),r.startDrag();const a=t.viewOffset;r.position({x:a.x,y:a.y}),n.position({x:-(a.x/r.scaleX()),y:-(a.y/r.scaleX())})}}}function w({stageContextRef:e,stageRef:c,bgRef:i}){return{onDragStart(o){const t=e.current,r=c.current},onDragMove(o){if(o.target!=o.currentTarget)return;const t=e.current,r=c.current,n=i.current;if(!t||!r||!n)return;const a={x:o.evt.movementX,y:o.evt.movementY},s=1,g=t.viewOffset;g.x+=a.x*s,g.y+=a.y*s,r.position({x:g.x,y:g.y}),n.position({x:-(g.x/r.scaleX()),y:-(g.y/r.scaleX())}),t.viewOffset=g},onDragEnd(o){const t=e.current,r=c.current,n=i.current;if(!t||!r||!n)return;const{viewOffset:a}=t;r.position({x:a.x,y:a.y}),n.position({x:-(a.x/r.scaleX()),y:-(a.y/r.scaleX())})}}}function E(e){return{onKeyDown(c){},onKeyUp(c){}}}function A(e){const c=f.exports.useCallback(i=>{i.preventDefault();const o=e.stageContextRef.current,t=e.stageRef.current,r=e.bgRef.current;if(!(!o||!t||!r))if(i.ctrlKey){let n=i.deltaY;Math.abs(n)===100&&(n*=.1);const a=Math.exp(-n/100),s=t.scale().x,g=t.getPointerPosition();if(!g)return;const p={x:(g.x-t.x())/s,y:(g.y-t.y())/s},l=s*a;t.scaleX(l),t.scaleY(l),r.scaleX(1/l),r.scaleY(1/l);const S={x:g.x-p.x*l,y:g.y-p.y*l};o.viewOffset=S;const{viewOffset:x}=o;t.position(x),r.position({x:-(x.x/t.scaleX()),y:-(x.y/t.scaleX())})}else{const n={x:i.deltaX*-1,y:i.deltaY*-1},a=1,{viewOffset:s}=o;s.x+=n.x*a,s.y+=n.y*a,t.position(s),r.position({x:-(s.x/t.scaleX()),y:-(s.y/t.scaleX())}),o.viewOffset=s}},[e.bgRef,e.stageContextRef,e.stageRef]);f.exports.useEffect(()=>(document.addEventListener("wheel",c,{passive:!1}),()=>{document.removeEventListener("wheel",c)}),[c])}const I={viewOffset:{x:0,y:0}};function _(e){return T(),u(D,{children:e.children})}function b(e){const{width:c,height:i,bgFill:o,overrideTabIndex:t}=e,r=typeof t=="number"?t:1,n=f.exports.useRef(I),a=f.exports.useRef(null),s=f.exports.useRef(null),g={stageContextRef:n,stageRef:a,bgRef:s};n.current.refs=g;const p=w(g),l=E(),S=L(g);return A(g),u("div",{tabIndex:r,style:{backgroundColor:o,width:c,height:i},...l,children:u(v,{ref:a,...e,...p,children:C(h.Provider,{value:{stateRef:n},children:[u(m,{children:u(R,{ref:s,width:c,height:i,...S})}),e.children]})})})}try{_.displayName="FixedGroup",_.__docgenInfo={description:"",displayName:"FixedGroup",props:{}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/DraggableStage/DraggableStage.tsx#FixedGroup"]={docgenInfo:_.__docgenInfo,name:"FixedGroup",path:"src/components/DraggableStage/DraggableStage.tsx#FixedGroup"})}catch{}try{b.displayName="DraggableStage",b.__docgenInfo={description:"",displayName:"DraggableStage",props:{bgFill:{defaultValue:null,description:"",name:"bgFill",required:!1,type:{name:"string"}},overrideTabIndex:{defaultValue:null,description:"",name:"overrideTabIndex",required:!1,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["src/components/DraggableStage/DraggableStage.tsx#DraggableStage"]={docgenInfo:b.__docgenInfo,name:"DraggableStage",path:"src/components/DraggableStage/DraggableStage.tsx#DraggableStage"})}catch{}export{b as D,y as a};
//# sourceMappingURL=DraggableStage.ce84a927.js.map