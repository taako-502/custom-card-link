!function(){"use strict";var e,r={213:function(e,r,n){var t=window.wp.blocks,o=window.wp.element,i=window.wp.components,u=window.wp.serverSideRender,a=n.n(u),l=window.wp.blockEditor,c=JSON.parse('{"u2":"external-link-card/external-link-card","TN":"External Link Card","Y4":{"url":{"type":"string"}}}');(0,t.registerBlockType)(c.u2,{title:c.TN,attributes:c.Y4,example:{attributes:{url:"External Link Card"}},edit:function(e){let{attributes:r,setAttributes:n}=e;const t=(0,l.useBlockProps)();return(0,o.createElement)("div",t,(0,o.createElement)(a(),{block:c.u2,attributes:r}),(0,o.createElement)(i.TextControl,{value:r.url,onChange:e=>n({url:e})}))}})}},n={};function t(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,t),i.exports}t.m=r,e=[],t.O=function(r,n,o,i){if(!n){var u=1/0;for(f=0;f<e.length;f++){n=e[f][0],o=e[f][1],i=e[f][2];for(var a=!0,l=0;l<n.length;l++)(!1&i||u>=i)&&Object.keys(t.O).every((function(e){return t.O[e](n[l])}))?n.splice(l--,1):(a=!1,i<u&&(u=i));if(a){e.splice(f--,1);var c=o();void 0!==c&&(r=c)}}return r}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[n,o,i]},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,{a:r}),r},t.d=function(e,r){for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},function(){var e={826:0,431:0};t.O.j=function(r){return 0===e[r]};var r=function(r,n){var o,i,u=n[0],a=n[1],l=n[2],c=0;if(u.some((function(r){return 0!==e[r]}))){for(o in a)t.o(a,o)&&(t.m[o]=a[o]);if(l)var f=l(t)}for(r&&r(n);c<u.length;c++)i=u[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(f)},n=self.webpackChunkexternal_link_card=self.webpackChunkexternal_link_card||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))}();var o=t.O(void 0,[431],(function(){return t(213)}));o=t.O(o)}();