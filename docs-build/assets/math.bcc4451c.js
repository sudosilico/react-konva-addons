import{K as c}from"./ReactKonvaCore.2732a337.js";import{r as i}from"./index.54d7971d.js";function d(r,n){const e=n==null?void 0:n.disabled,t=n==null?void 0:n.layer;i.exports.useEffect(()=>{if(e)return;const u=new c.Animation(f=>{if(!!f)return r(f)},t);return u.start(),()=>{u.stop()}},[r,e,t])}function m(r){return r<0?0:r>1?1:r}function a(r,n,e){return r+(n-r)*m(e)}function x(r,n,e){return{x:a(r.x,n.x,e),y:a(r.y,n.y,e)}}function y(r,n,e,t,u){return a(t,u,(r-n)/(e-n))}export{x as a,a as l,y as r,d as u};
//# sourceMappingURL=math.bcc4451c.js.map
