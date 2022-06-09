/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/react-notifications-component/dist/theme.css":
/*!*******************************************************************!*\
  !*** ./node_modules/react-notifications-component/dist/theme.css ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin.scss":
/*!************************!*\
  !*** ./src/admin.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-notifications-component/dist/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-notifications-component/dist/index.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(t,n){ true?module.exports=n(__webpack_require__(/*! react */ "react")):0}(this,(function(t){return(()=>{"use strict";var n={359:n=>{n.exports=t}},e={};function i(t){var o=e[t];if(void 0!==o)return o.exports;var r=e[t]={exports:{}};return n[t](r,r.exports,i),r.exports}i.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return i.d(n,{a:n}),n},i.d=(t,n)=>{for(var e in n)i.o(n,e)&&!i.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},i.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};return(()=>{i.r(o),i.d(o,{ReactNotifications:()=>D,Store:()=>k});var t,n,e,r,a=i(359),c=i.n(a),s=!0,u=768,f=325,l="rnc__notification-item";!function(t){t.BOTTOM_LEFT="bottom-left",t.BOTTOM_RIGHT="bottom-right",t.BOTTOM_CENTER="bottom-center",t.TOP_LEFT="top-left",t.TOP_RIGHT="top-right",t.TOP_CENTER="top-center",t.CENTER="center",t.TOP_FULL="top-full",t.BOTTOM_FULL="bottom-full"}(t||(t={})),function(t){t.TOP="top",t.BOTTOM="bottom"}(n||(n={})),function(t){t.SUCCESS="success",t.DANGER="danger",t.INFO="info",t.DEFAULT="default",t.WARNING="warning"}(e||(e={})),function(t){t.TIMEOUT="timeout",t.CLICK="click",t.TOUCH="touch",t.MANUAL="manual"}(r||(r={}));var d=function(t){return null==t};function m(n){return n===t.BOTTOM_FULL||n===t.BOTTOM_LEFT||n===t.BOTTOM_RIGHT||n===t.BOTTOM_CENTER}function p(n){return n===t.TOP_FULL||n===t.TOP_LEFT||n===t.TOP_RIGHT||n===t.TOP_CENTER}function h(t){var n=t.type,i=t.content,o=t.userDefinedTypes,r=[l];if(i)return r;if(d(o))return function(t){switch(t){case e.DEFAULT:return[l,"rnc__notification-item--default"];case e.SUCCESS:return[l,"rnc__notification-item--success"];case e.DANGER:return[l,"rnc__notification-item--danger"];case e.WARNING:return[l,"rnc__notification-item--warning"];case e.INFO:return[l,"rnc__notification-item--info"];default:return[l]}}(n);var a=o.find((function(t){return t.name===n}));return r.concat(a.htmlClasses)}function y(t,n){var e=t.duration,i=t.timingFunction,o=t.delay;return"".concat(e,"ms ").concat(n," ").concat(i," ").concat(o,"ms")}function v(t){return t?(0|16*Math.random()).toString(16):"100000000000100000000000".replace(/1|0/g,v)}function b(t,n){var e=n.duration,i=n.timingFunction,o=n.delay,r=t||{};return d(r.duration)&&(r.duration=e),d(r.timingFunction)&&(r.timingFunction=i),d(r.delay)&&(r.delay=o),r}function E(t,n,i){var o=t,r=o.id,a=o.type,c=o.insert,s=o.content,u=o.container,f=o.animationIn,l=o.animationOut,m=o.slidingEnter,p=o.slidingExit,h=o.touchRevert,y=o.touchSlidingExit,E=o.dismiss,g=o.width,O=o.onRemoval;o.id=r||v(),o.type=s?null:a.toLowerCase(),n&&!s&&(o.userDefinedTypes=function(t,n){var i=t.content,o=t.type;if(!i&&o!==e.SUCCESS&&o!==e.DANGER&&o!==e.INFO&&o!==e.DEFAULT&&o!==e.WARNING&&n)return n}(o,n)),o.width=d(g)?i:g,o.container=u.toLowerCase(),o.insert=(c||"top").toLowerCase(),o.dismiss=function(t){var n=t,e={duration:0,click:!0,touch:!0,onScreen:!1,pauseOnHover:!1,waitForAnimation:!1,showIcon:!1};return n?(Object.keys(e).forEach((function(t){d(n[t])&&(n[t]=e[t])})),n):e}(E),o.animationIn=f||[],o.animationOut=l||[],o.onRemoval=O||function(){};var T=function(t,n,e){return{duration:t,timingFunction:n,delay:e}};o.slidingEnter=b(m,T(600,"linear",0)),o.slidingExit=b(p,T(600,"linear",0)),o.touchRevert=b(h,T(600,"linear",0));var _=y||{},S=_.swipe||{},N=_.fade||{};return o.touchSlidingExit=_,o.touchSlidingExit.swipe=b(S,T(600,"linear",0)),o.touchSlidingExit.fade=b(N,T(300,"linear",0)),o}function g(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var O=function(){function t(n,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.callback=n,this.remaining=e,this.resume()}var n,e,i;return n=t,(e=[{key:"pause",value:function(){clearTimeout(this.timerId),this.remaining-=Date.now()-this.start}},{key:"resume",value:function(){this.start=Date.now(),clearTimeout(this.timerId),this.timerId=setTimeout(this.callback,this.remaining)}},{key:"clear",value:function(){clearTimeout(this.timerId)}}])&&g(n.prototype,e),i&&g(n,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function _(t){return function(t){if(Array.isArray(t))return S(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return S(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return S(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}function N(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function w(t,n){return w=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},w(t,n)}function R(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,i=j(t);if(n){var o=j(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return C(this,e)}}function C(t,n){if(n&&("object"===T(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}var M=function(e){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),n&&w(t,n)}(u,e);var i,o,a,s=R(u);function u(t){var n;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,u),(n=s.call(this,t)).onClick=function(){var t=n.props.notification.dismiss;(t.click||t.showIcon)&&n.removeNotification(r.CLICK)},n.onTouchStart=function(t){var e=t.touches[0].pageX;n.setState((function(t){var n=t.parentStyle;return{startX:e,currentX:e,parentStyle:Object.assign(Object.assign({},n),{position:"relative"})}}))},n.onTouchMove=function(t){var e=t.touches[0].pageX,i=n.state.startX,o=n.props,a=o.toggleRemoval,c=o.notification,s=c.id,u=c.onRemoval,f=c.slidingExit,l=c.touchSlidingExit,d=l.swipe,m=l.fade,p=e-i,h=n.rootElementRef.current.offsetWidth,v=window.innerWidth+h,b="".concat(e-i>=0?v:-v,"px");if(function(t,n){return Math.abs(t)>=.4*n}(p,h)){var E=y(d,"left"),g=y(m,"opacity"),O=function(){a(s,(function(){return u(s,r.TOUCH)}))};return n.setState((function(t){var e=t.parentStyle;return{touchEnabled:!1,parentStyle:Object.assign(Object.assign({},e),{left:b,opacity:0,transition:"".concat(E,", ").concat(g)}),onTransitionEnd:function(){n.setState((function(t){var n=t.parentStyle;return{parentStyle:Object.assign(Object.assign({},n),{height:"0px",overflow:"hidden",transition:y(f,"height")}),onTransitionEnd:O}}))}}}))}return n.setState((function(t){var n=t.parentStyle;return{currentX:e,parentStyle:Object.assign(Object.assign({},n),{left:"".concat(0+p,"px")})}}))},n.onTouchEnd=function(){var t=n.props.notification.touchRevert;n.setState((function(n){var e=n.parentStyle;return{parentStyle:Object.assign(Object.assign({},e),{left:0,transition:y(t,"left")})}}))},n.onMouseEnter=function(){n.timer?n.timer.pause():n.setState({animationPlayState:"paused"})},n.onMouseLeave=function(){n.timer?n.timer.resume():n.setState({animationPlayState:"running"})},n.rootElementRef=c().createRef();var e=t.defaultNotificationWidth,i=t.notification,o=t.isMobile,a=i.width;return n.state={parentStyle:{height:"0px",overflow:"hidden",width:"".concat(a||e,"px")},htmlClassList:h(i),animationPlayState:"running",touchEnabled:!0},o&&(n.state.parentStyle.width="100%"),n}return i=u,(o=[{key:"componentWillUnmount",value:function(){this.timer&&this.timer.clear()}},{key:"componentDidMount",value:function(){var e=this,i=this.props,o=i.notification,a=i.notificationsCount,c=o.dismiss,s=c.duration,u=c.onScreen,f=function(e,i){return!(i<=1)&&i>1&&(e.insert===n.TOP&&p(e.container)||e.insert===n.BOTTOM&&m(e.container)||e.container===t.CENTER)}(o,a),l=this.rootElementRef.current.scrollHeight,d=function(){!s||u||e.timer||(e.timer=new O((function(){return e.removeNotification(r.TIMEOUT)}),s))};this.setState((function(t){return{parentStyle:{width:t.parentStyle.width,height:"".concat(l,"px"),transition:f?y(o.slidingEnter,"height"):"10ms height"},onTransitionEnd:d}}),(function(){requestAnimationFrame((function(){e.setState((function(t){return{htmlClassList:[].concat(_(o.animationIn),_(t.htmlClassList))}}))}))}))}},{key:"componentDidUpdate",value:function(t){if(this.props.hasBeenRemoved&&!t.hasBeenRemoved&&this.removeNotification(r.MANUAL),t!==this.props&&!this.props.hasBeenRemoved){var n=this.props.notification.container,e=this.rootElementRef.current.children[0].scrollHeight;this.setState((function(t){var i=t.parentStyle;return{parentStyle:Object.assign(Object.assign({},i),{height:"".concat(e+(n.endsWith("full")?0:15),"px")})}}))}}},{key:"removeNotification",value:function(t){var n=this,e=this.props,i=e.notification,o=e.toggleRemoval,r=i.id,a=i.onRemoval,c=i.dismiss.waitForAnimation,s=[].concat(_(i.animationOut),_(h(i))),u=function(){return o(r,(function(){return a(r,t)}))},f={height:"0px",overflow:"hidden",transition:y(i.slidingExit,"height")};return c?this.setState((function(t){var e=t.parentStyle.width;return{htmlClassList:s,onAnimationEnd:function(){n.setState({parentStyle:Object.assign({width:e},f),onTransitionEnd:u})}}})):this.setState((function(t){var n=t.parentStyle.width;return{parentStyle:Object.assign({width:n},f),onTransitionEnd:u,htmlClassList:s}}))}},{key:"renderTimer",value:function(){var t=this,n=this.props.notification.dismiss,e=n.duration,i=n.onScreen,o=this.state.animationPlayState;if(e&&i){var a={animationName:"timer",animationDuration:"".concat(e,"ms"),animationTimingFunction:"linear",animationFillMode:"forwards",animationDelay:"0",animationPlayState:o};return c().createElement("div",{className:"rnc__notification-timer"},c().createElement("div",{className:"rnc__notification-timer-filler",onAnimationEnd:function(){return t.removeNotification(r.TIMEOUT)},style:a}))}}},{key:"renderCustomContent",value:function(){var t=this.state.htmlClassList,n=this.props.notification,e=n.id,i=n.content,o=n.dismiss,r=o.duration,a=o.pauseOnHover,s=r>0&&a;return c().createElement("div",{className:"".concat(_(t).join(" ")),onMouseEnter:s?this.onMouseEnter:null,onMouseLeave:s?this.onMouseLeave:null},c().isValidElement(i)?i:c().createElement(i,Object.assign({},{id:e,notificationConfig:Object.assign({},this.props.notification)})))}},{key:"renderNotification",value:function(){var t=this.props.notification,n=t.title,e=t.message,i=t.dismiss,o=i.showIcon,r=i.duration,a=i.pauseOnHover,s=this.state.htmlClassList,u=r>0&&a;return c().createElement("div",{className:"".concat(_(s).join(" ")),onMouseEnter:u?this.onMouseEnter:null,onMouseLeave:u?this.onMouseLeave:null},c().createElement("div",{className:"rnc__notification-content"},o&&c().createElement("div",{className:"rnc__notification-close-mark",onClick:this.onClick}),n&&c().createElement("div",{className:"rnc__notification-title"},n),c().createElement("div",{className:"rnc__notification-message"},e),this.renderTimer()))}},{key:"render",value:function(){var t=this.props.notification,n=t.content,e=t.dismiss.click,i=this.state,o=i.parentStyle,r=i.onAnimationEnd,a=i.onTransitionEnd,s=i.touchEnabled;return c().createElement("div",{ref:this.rootElementRef,onClick:e?this.onClick:null,style:o,className:"rnc__notification",onAnimationEnd:r,onTransitionEnd:a,onTouchStart:s?this.onTouchStart:null,onTouchMove:s?this.onTouchMove:null,onTouchEnd:s?this.onTouchEnd:null},n?this.renderCustomContent():this.renderNotification())}}])&&N(i.prototype,o),a&&N(i,a),Object.defineProperty(i,"prototype",{writable:!1}),u}(c().Component);function L(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}const k=new(function(){function t(){var n=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.incrementCounter=function(){return n.counter+=1},this.getCounter=function(){return n.counter},this.counter=0,this.add=null}var n,e,i;return n=t,(e=[{key:"addNotification",value:function(t){this.incrementCounter();var n=E(t,this.types,this.defaultNotificationWidth);return this.add(n)}},{key:"register",value:function(t){var n=t.addNotification,e=t.removeNotification,i=t.removeAllNotifications,o=t.types,r=t.defaultNotificationWidth;this.add=n,this.removeNotification=e,this.removeAllNotifications=i,this.defaultNotificationWidth=r,this.types=o}}])&&L(n.prototype,e),i&&L(n,i),Object.defineProperty(n,"prototype",{writable:!1}),t}());function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function A(t){return function(t){if(Array.isArray(t))return I(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return I(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return I(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}function x(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function F(t,n){return F=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},F(t,n)}function B(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,i=W(t);if(n){var o=W(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return U(this,e)}}function U(t,n){if(n&&("object"===P(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function W(t){return W=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},W(t)}var D=function(n){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),n&&F(t,n)}(a,n);var e,i,o,r=B(a);function a(t){var n;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,a),(n=r.call(this,t)).handleResize=function(){n.setState({windowWidth:window.innerWidth})},n.add=function(t){return n.setState((function(n){var e=A(n.notifications),i=e.findIndex((function(n){return n.id===t.id}));return i>-1?(e[i]=t,{notifications:e}):{notifications:"top"===t.insert?[t].concat(A(e)):[].concat(A(e),[t])}})),t.id},n.remove=function(t){n.setState((function(n){return{notifications:n.notifications.map((function(n){return n.id===t&&(n.hasBeenRemoved=!0),n}))}}))},n.removeAllNotifications=function(){n.setState({notifications:n.state.notifications.map((function(t){return Object.assign(Object.assign({},t),{hasBeenRemoved:!0})}))})},n.toggleRemoval=function(t,e){n.setState((function(n){return{notifications:n.notifications.filter((function(n){return n.id!==t}))}}),e)},n.state={isMobile:d(t.isMobile)?s:t.isMobile,breakpoint:d(t.breakpoint)?u:t.breakpoint,notifications:[],windowWidth:void 0},n}return e=a,(i=[{key:"componentDidMount",value:function(){var t=this.props,n=t.types,e=t.defaultNotificationWidth;k.register({addNotification:this.add,removeNotification:this.remove,removeAllNotifications:this.removeAllNotifications,defaultNotificationWidth:e||f,types:n}),this.setState({windowWidth:window.innerWidth}),window.addEventListener("resize",this.handleResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize)}},{key:"renderNotifications",value:function(t,n){var e=this;return t.map((function(i){return c().createElement(M,{id:i.id,key:i.id,isMobile:n,defaultNotificationWidth:e.props.defaultNotificationWidth,notification:i,toggleRemoval:e.toggleRemoval,notificationsCount:t.length,hasBeenRemoved:i.hasBeenRemoved})}))}},{key:"renderMobileNotifications",value:function(n){var e=n.className,i=n.id,o=function(n){var e=[],i=[];return n.forEach((function(n){var o=n.container,r=t.CENTER;p(o)||o===r?e.push(n):m(o)&&i.push(n)})),{top:e,bottom:i}}(this.state.notifications),r=this.renderNotifications(o.top,!0),a=this.renderNotifications(o.bottom,!0);return c().createElement("div",{id:i,key:"mobile",className:"rnc__base ".concat(e||"")},c().createElement("div",{className:"rnc__notification-container--mobile-top"},r),c().createElement("div",{className:"rnc__notification-container--mobile-bottom"},a))}},{key:"renderScreenNotifications",value:function(n){var e=n.className,i=n.id,o=function(n){var e=[],i=[],o=[],r=[],a=[],c=[],s=[],u=[],f=[];return n.forEach((function(n){var l=n.container;l===t.TOP_FULL?u.push(n):l===t.BOTTOM_FULL?f.push(n):l===t.TOP_LEFT?e.push(n):l===t.TOP_RIGHT?i.push(n):l===t.TOP_CENTER?o.push(n):l===t.BOTTOM_LEFT?r.push(n):l===t.BOTTOM_RIGHT?a.push(n):l===t.BOTTOM_CENTER?c.push(n):l===t.CENTER&&s.push(n)})),{topFull:u,bottomFull:f,topLeft:e,topRight:i,topCenter:o,bottomLeft:r,bottomRight:a,bottomCenter:c,center:s}}(this.state.notifications),r=this.renderNotifications(o.topFull,!1),a=this.renderNotifications(o.bottomFull,!1),s=this.renderNotifications(o.topLeft,!1),u=this.renderNotifications(o.topRight,!1),f=this.renderNotifications(o.topCenter,!1),l=this.renderNotifications(o.bottomLeft,!1),d=this.renderNotifications(o.bottomRight,!1),m=this.renderNotifications(o.bottomCenter,!1),p=this.renderNotifications(o.center,!1);return c().createElement("div",{id:i,key:"screen",className:"rnc__base ".concat(e||"")},c().createElement("div",{className:"rnc__notification-container--top-full"},r),c().createElement("div",{className:"rnc__notification-container--bottom-full"},a),c().createElement("div",{className:"rnc__notification-container--top-left"},s),c().createElement("div",{className:"rnc__notification-container--top-right"},u),c().createElement("div",{className:"rnc__notification-container--bottom-left"},l),c().createElement("div",{className:"rnc__notification-container--bottom-right"},d),c().createElement("div",{className:"rnc__notification-container--top-center"},f),c().createElement("div",{className:"rnc__notification-container--center"},c().createElement("div",{className:"rnc__util--flex-center"},p)),c().createElement("div",{className:"rnc__notification-container--bottom-center"},m))}},{key:"render",value:function(){var t=this.props.isMobile,n=this.state,e=n.windowWidth,i=n.breakpoint;return t&&e<=i?this.renderMobileNotifications(this.props):this.renderScreenNotifications(this.props)}}])&&x(e.prototype,i),o&&x(e,o),Object.defineProperty(e,"prototype",{writable:!1}),a}(c().Component)})(),o})()}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./asset/img/thumbnail.jpg":
/*!*********************************!*\
  !*** ./asset/img/thumbnail.jpg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "images/thumbnail.5191048f.jpg";

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api":
/*!*****************************!*\
  !*** external ["wp","api"] ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["api"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/admin.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.scss */ "./src/admin.scss");
/* harmony import */ var _asset_img_thumbnail_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../asset/img/thumbnail.jpg */ "./asset/img/thumbnail.jpg");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api */ "@wordpress/api");
/* harmony import */ var _wordpress_api__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-notifications-component */ "./node_modules/react-notifications-component/dist/index.js");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_notifications_component__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_notifications_component_dist_theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-notifications-component/dist/theme.css */ "./node_modules/react-notifications-component/dist/theme.css");










/**
 * 管理画面
 */

const Admin = () => {
  const [layout, setLayout] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('card');
  const [hover, setHover] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('shadow');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _wordpress_api__WEBPACK_IMPORTED_MODULE_4___default().loadPromise.then(() => {
      // Modelの生成
      const model = new (_wordpress_api__WEBPACK_IMPORTED_MODULE_4___default().models.Settings)(); // 設定値の取得

      model.fetch().then(response => {
        setLayout(response.external_link_card_settings.layout);
        setHover(response.external_link_card_settings.hover);
      });
    });
  }, []); //データを保存する処理

  const dataSave = () => {
    _wordpress_api__WEBPACK_IMPORTED_MODULE_4___default().loadPromise.then(() => {
      const model = new (_wordpress_api__WEBPACK_IMPORTED_MODULE_4___default().models.Settings)({
        'external_link_card_settings': {
          'layout': layout,
          'hover': hover
        }
      });
      const save = model.save();
      save.success((response, status) => {
        react_notifications_component__WEBPACK_IMPORTED_MODULE_6__.Store.addNotification({
          title: "Success!",
          message: "入力内容を保存しました。",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
      save.error((response, status) => {
        react_notifications_component__WEBPACK_IMPORTED_MODULE_6__.Store.addNotification({
          title: "Error!",
          message: "入力内容を保存できませんでした。",
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
    });
  };

  const elcClass = {
    'elc': true,
    'elc--card': layout === "card",
    'elc--list': layout === "list",
    'elc--hover-shadow': hover === "shadow"
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(React.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_notifications_component__WEBPACK_IMPORTED_MODULE_6__.ReactNotifications, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "elc-admin"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "\u5916\u90E8\u30EA\u30F3\u30AF\u30AB\u30FC\u30C9\u306E\u30C7\u30B6\u30A4\u30F3\u306E\u8A2D\u5B9A\u753B\u9762"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "elc-admin__wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "elc-admin__preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "\u30D7\u30EC\u30D3\u30E5\u30FC"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(elcClass)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: layout == 'card' ? 'elc__thumbnail' : 'elc__thumbnail elc__thumbnail--list',
    src: _asset_img_thumbnail_jpg__WEBPACK_IMPORTED_MODULE_2__
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "elc__info"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: layout == 'card' ? 'elc__title' : 'elc__title elc__title--list'
  }, "\u30B5\u30F3\u30D7\u30EB\u306E\u8A18\u4E8B\u30AB\u30FC\u30C9\u3067\u3059\u3002"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: layout == 'card' ? 'elc__description' : 'elc__description elc__description--list'
  }, "\u30B5\u30F3\u30D7\u30EB\u306E\u8A18\u4E8B\u30AB\u30FC\u30C9\u306E\u8AAC\u660E\u3067\u3059\u3002\u30B5\u30F3\u30D7\u30EB\u306E\u8A18\u4E8B\u30AB\u30FC\u30C9\u306E\u8AAC\u660E\u3067\u3059\u3002\u30B5\u30F3\u30D7\u30EB\u306E\u8A18\u4E8B\u30AB\u30FC\u30C9\u306E\u8AAC\u660E\u3067\u3059\u3002\u30B5\u30F3\u30D7\u30EB\u306E\u8A18\u4E8B\u30AB\u30FC\u30C9\u306E\u8AAC\u660E\u3067\u3059\u3002\u30B5\u30F3\u30D7\u30EB\u306E\u8A18\u4E8B\u30AB\u30FC\u30C9\u306E\u8AAC\u660E\u3067\u3059\u3002\u3053\u306E\u6587\u5B57\u306E\u9577\u3055\u306F\u3061\u3087\u3046\u3069100\u6587\u5B57\u3067\u3059\u3002")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: dataSave
  }, "\u4FDD\u5B58"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "elc-admin__settings"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "\u30C7\u30B6\u30A4\u30F3\u8A2D\u5B9A"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
    label: "\u30EC\u30A4\u30A2\u30A6\u30C8\u30C7\u30B6\u30A4\u30F3",
    help: "\u30C7\u30B6\u30A4\u30F3\u306E\u30EC\u30A4\u30A2\u30A6\u30C8\u3092\u6C7A\u3081\u307E\u3059\u3002",
    selected: layout,
    options: [{
      label: 'カード型',
      value: 'card'
    }, {
      label: 'リスト型',
      value: 'list'
    }],
    onChange: value => setLayout(value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "\u30DB\u30D0\u30FC"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
    label: "\u30DB\u30D0\u30FC\u6642\u306E\u52D5\u4F5C",
    help: "\u30EA\u30F3\u30AF\u30AB\u30FC\u30C9\u3092\u30DB\u30D0\u30FC\u3057\u305F\u969B\u306E\u52D5\u4F5C",
    selected: hover,
    options: [{
      label: 'なし',
      value: 'none'
    }, {
      label: '影を表示する',
      value: 'shadow'
    }],
    onChange: value => setHover(value)
  })))));
};

(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Admin, null), document.getElementById('elc-admin'));
}();
/******/ })()
;
//# sourceMappingURL=admin.js.map