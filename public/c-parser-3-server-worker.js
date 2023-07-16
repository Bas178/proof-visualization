"use strict";(()=>{var ac=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var yi=d(vh=>{"use strict";Object.defineProperty(vh,"__esModule",{value:!0});var yh;function gh(){if(yh===void 0)throw new Error("No runtime abstraction layer installed");return yh}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");yh=r}t.install=e})(gh||(gh={}));vh.default=gh});var Th=d(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.Disposable=void 0;var HM;(function(t){function e(r){return{dispose:r}}t.create=e})(HM=_u.Disposable||(_u.Disposable={}))});var La=d(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.Emitter=qa.Event=void 0;var KM=yi(),WM;(function(t){let e={dispose(){}};t.None=function(){return e}})(WM=qa.Event||(qa.Event={}));var _h=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,KM.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},No=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new _h),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=No._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};qa.Emitter=No;No._noop=function(){}});var PR=d(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.AbstractMessageBuffer=void 0;var BM=13,VM=10,zM=`\r
`,Rh=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case BM:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case VM:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(zM);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),m=l.substr(c+1).trim();o.set(f,m)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};oc.AbstractMessageBuffer=Rh});var kR=d(Sh=>{"use strict";Object.defineProperty(Sh,"__esModule",{value:!0});var wR=yi(),ko=Th(),YM=La(),XM=PR(),xo=class extends XM.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return xo.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};xo.emptyBuffer=new Uint8Array(0);var Ah=class{constructor(e){this.socket=e,this._onData=new YM.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,wR.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),ko.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),ko.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),ko.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},bh=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),ko.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),ko.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),ko.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},JM=new TextEncoder,NR=Object.freeze({messageBuffer:Object.freeze({create:t=>new xo(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(JM.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Ah(t),asWritableStream:t=>new bh(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Ch(){return NR}(function(t){function e(){wR.default.install(NR)}t.install=e})(Ch||(Ch={}));Sh.default=Ch});var Oo=d(Qt=>{"use strict";Object.defineProperty(Qt,"__esModule",{value:!0});Qt.stringArray=Qt.array=Qt.func=Qt.error=Qt.number=Qt.string=Qt.boolean=void 0;function QM(t){return t===!0||t===!1}Qt.boolean=QM;function xR(t){return typeof t=="string"||t instanceof String}Qt.string=xR;function ZM(t){return typeof t=="number"||t instanceof Number}Qt.number=ZM;function e1(t){return t instanceof Error}Qt.error=e1;function t1(t){return typeof t=="function"}Qt.func=t1;function OR(t){return Array.isArray(t)}Qt.array=OR;function r1(t){return OR(t)&&t.every(e=>xR(e))}Qt.stringArray=r1});var zh=d(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Message=X.NotificationType9=X.NotificationType8=X.NotificationType7=X.NotificationType6=X.NotificationType5=X.NotificationType4=X.NotificationType3=X.NotificationType2=X.NotificationType1=X.NotificationType0=X.NotificationType=X.RequestType9=X.RequestType8=X.RequestType7=X.RequestType6=X.RequestType5=X.RequestType4=X.RequestType3=X.RequestType2=X.RequestType1=X.RequestType=X.RequestType0=X.AbstractMessageSignature=X.ParameterStructures=X.ResponseError=X.ErrorCodes=void 0;var Ma=Oo(),DR;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(DR=X.ErrorCodes||(X.ErrorCodes={}));var Ru=class extends Error{constructor(e,r,n){super(r),this.code=Ma.number(e)?e:DR.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,Ru.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};X.ResponseError=Ru;var Lt=class{constructor(e){this.kind=e}static is(e){return e===Lt.auto||e===Lt.byName||e===Lt.byPosition}toString(){return this.kind}};X.ParameterStructures=Lt;Lt.auto=new Lt("auto");Lt.byPosition=new Lt("byPosition");Lt.byName=new Lt("byName");var Ze=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Lt.auto}};X.AbstractMessageSignature=Ze;var Eh=class extends Ze{constructor(e){super(e,0)}};X.RequestType0=Eh;var Ph=class extends Ze{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType=Ph;var wh=class extends Ze{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType1=wh;var Nh=class extends Ze{constructor(e){super(e,2)}};X.RequestType2=Nh;var kh=class extends Ze{constructor(e){super(e,3)}};X.RequestType3=kh;var xh=class extends Ze{constructor(e){super(e,4)}};X.RequestType4=xh;var Oh=class extends Ze{constructor(e){super(e,5)}};X.RequestType5=Oh;var Dh=class extends Ze{constructor(e){super(e,6)}};X.RequestType6=Dh;var Ih=class extends Ze{constructor(e){super(e,7)}};X.RequestType7=Ih;var $h=class extends Ze{constructor(e){super(e,8)}};X.RequestType8=$h;var qh=class extends Ze{constructor(e){super(e,9)}};X.RequestType9=qh;var Lh=class extends Ze{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType=Lh;var Mh=class extends Ze{constructor(e){super(e,0)}};X.NotificationType0=Mh;var Fh=class extends Ze{constructor(e,r=Lt.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType1=Fh;var jh=class extends Ze{constructor(e){super(e,2)}};X.NotificationType2=jh;var Gh=class extends Ze{constructor(e){super(e,3)}};X.NotificationType3=Gh;var Uh=class extends Ze{constructor(e){super(e,4)}};X.NotificationType4=Uh;var Hh=class extends Ze{constructor(e){super(e,5)}};X.NotificationType5=Hh;var Kh=class extends Ze{constructor(e){super(e,6)}};X.NotificationType6=Kh;var Wh=class extends Ze{constructor(e){super(e,7)}};X.NotificationType7=Wh;var Bh=class extends Ze{constructor(e){super(e,8)}};X.NotificationType8=Bh;var Vh=class extends Ze{constructor(e){super(e,9)}};X.NotificationType9=Vh;var n1;(function(t){function e(i){let a=i;return a&&Ma.string(a.method)&&(Ma.string(a.id)||Ma.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Ma.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Ma.string(a.id)||Ma.number(a.id)||a.id===null)}t.isResponse=n})(n1=X.Message||(X.Message={}))});var Xh=d(gi=>{"use strict";var IR;Object.defineProperty(gi,"__esModule",{value:!0});gi.LRUCache=gi.LinkedMap=gi.Touch=void 0;var sr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(sr=gi.Touch||(gi.Touch={}));var sc=class{constructor(){this[IR]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=sr.None){let n=this._map.get(e);if(n)return r!==sr.None&&this.touch(n,r),n.value}set(e,r,n=sr.None){let i=this._map.get(e);if(i)i.value=r,n!==sr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case sr.None:this.addItemLast(i);break;case sr.First:this.addItemFirst(i);break;case sr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(IR=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==sr.First&&r!==sr.Last)){if(r===sr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===sr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};gi.LinkedMap=sc;var Yh=class extends sc{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=sr.AsNew){return super.get(e,r)}peek(e){return super.get(e,sr.None)}set(e,r){return super.set(e,r,sr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};gi.LRUCache=Yh});var em=d(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.CancellationTokenSource=Fa.CancellationToken=void 0;var i1=yi(),a1=Oo(),Jh=La(),Qh;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Jh.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Jh.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||a1.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Qh=Fa.CancellationToken||(Fa.CancellationToken={}));var o1=Object.freeze(function(t,e){let r=(0,i1.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),uc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?o1:(this._emitter||(this._emitter=new Jh.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Zh=class{get token(){return this._token||(this._token=new uc),this._token}cancel(){this._token?this._token.cancel():this._token=Qh.Cancelled}dispose(){this._token?this._token instanceof uc&&this._token.dispose():this._token=Qh.None}};Fa.CancellationTokenSource=Zh});var $R=d(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.ReadableStreamMessageReader=vi.AbstractMessageReader=vi.MessageReader=void 0;var rm=yi(),Do=Oo(),tm=La(),s1;(function(t){function e(r){let n=r;return n&&Do.func(n.listen)&&Do.func(n.dispose)&&Do.func(n.onError)&&Do.func(n.onClose)&&Do.func(n.onPartialMessage)}t.is=e})(s1=vi.MessageReader||(vi.MessageReader={}));var lc=class{constructor(){this.errorEmitter=new tm.Emitter,this.closeEmitter=new tm.Emitter,this.partialMessageEmitter=new tm.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Do.string(e.message)?e.message:"unknown"}`)}};vi.AbstractMessageReader=lc;var nm;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,rm.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(nm||(nm={}));var im=class extends lc{constructor(e,r){super(),this.readable=e,this.options=nm.fromOptions(r),this.buffer=(0,rm.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,rm.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};vi.ReadableStreamMessageReader=im});var qR=d(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.Semaphore=void 0;var u1=yi(),am=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,u1.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};cc.Semaphore=am});var jR=d(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.WriteableStreamMessageWriter=Ti.AbstractMessageWriter=Ti.MessageWriter=void 0;var LR=yi(),Au=Oo(),l1=qR(),MR=La(),c1="Content-Length: ",FR=`\r
`,f1;(function(t){function e(r){let n=r;return n&&Au.func(n.dispose)&&Au.func(n.onClose)&&Au.func(n.onError)&&Au.func(n.write)}t.is=e})(f1=Ti.MessageWriter||(Ti.MessageWriter={}));var fc=class{constructor(){this.errorEmitter=new MR.Emitter,this.closeEmitter=new MR.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Au.string(e.message)?e.message:"unknown"}`)}};Ti.AbstractMessageWriter=fc;var om;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,LR.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,LR.default)().applicationJson.encoder}}t.fromOptions=e})(om||(om={}));var sm=class extends fc{constructor(e,r){super(),this.writable=e,this.options=om.fromOptions(r),this.errorCount=0,this.writeSemaphore=new l1.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(c1,n.byteLength.toString(),FR),i.push(FR),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Ti.WriteableStreamMessageWriter=sm});var BR=d(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.createMessageConnection=Z.ConnectionOptions=Z.CancellationStrategy=Z.CancellationSenderStrategy=Z.CancellationReceiverStrategy=Z.ConnectionStrategy=Z.ConnectionError=Z.ConnectionErrors=Z.LogTraceNotification=Z.SetTraceNotification=Z.TraceFormat=Z.TraceValues=Z.Trace=Z.NullLogger=Z.ProgressType=Z.ProgressToken=void 0;var GR=yi(),Dt=Oo(),te=zh(),UR=Xh(),bu=La(),um=em(),Su;(function(t){t.type=new te.NotificationType("$/cancelRequest")})(Su||(Su={}));var HR;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(HR=Z.ProgressToken||(Z.ProgressToken={}));var Cu;(function(t){t.type=new te.NotificationType("$/progress")})(Cu||(Cu={}));var lm=class{constructor(){}};Z.ProgressType=lm;var cm;(function(t){function e(r){return Dt.func(r)}t.is=e})(cm||(cm={}));Z.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ie;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ie=Z.Trace||(Z.Trace={}));var d1;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(d1=Z.TraceValues||(Z.TraceValues={}));(function(t){function e(n){if(!Dt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ie=Z.Trace||(Z.Trace={}));var un;(function(t){t.Text="text",t.JSON="json"})(un=Z.TraceFormat||(Z.TraceFormat={}));(function(t){function e(r){return Dt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(un=Z.TraceFormat||(Z.TraceFormat={}));var KR;(function(t){t.type=new te.NotificationType("$/setTrace")})(KR=Z.SetTraceNotification||(Z.SetTraceNotification={}));var fm;(function(t){t.type=new te.NotificationType("$/logTrace")})(fm=Z.LogTraceNotification||(Z.LogTraceNotification={}));var dc;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(dc=Z.ConnectionErrors||(Z.ConnectionErrors={}));var Bi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Bi.prototype)}};Z.ConnectionError=Bi;var WR;(function(t){function e(r){let n=r;return n&&Dt.func(n.cancelUndispatched)}t.is=e})(WR=Z.ConnectionStrategy||(Z.ConnectionStrategy={}));var dm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new um.CancellationTokenSource}});function e(r){let n=r;return n&&Dt.func(n.createCancellationTokenSource)}t.is=e})(dm=Z.CancellationReceiverStrategy||(Z.CancellationReceiverStrategy={}));var pm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Su.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Dt.func(n.sendCancellation)&&Dt.func(n.cleanup)}t.is=e})(pm=Z.CancellationSenderStrategy||(Z.CancellationSenderStrategy={}));var hm;(function(t){t.Message=Object.freeze({receiver:dm.Message,sender:pm.Message});function e(r){let n=r;return n&&dm.is(n.receiver)&&pm.is(n.sender)}t.is=e})(hm=Z.CancellationStrategy||(Z.CancellationStrategy={}));var p1;(function(t){function e(r){let n=r;return n&&(hm.is(n.cancellationStrategy)||WR.is(n.connectionStrategy))}t.is=e})(p1=Z.ConnectionOptions||(Z.ConnectionOptions={}));var ln;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(ln||(ln={}));function h1(t,e,r,n){let i=r!==void 0?r:Z.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,m=new Map,v=new Map,y,A=new UR.LinkedMap,P=new Map,w=new Set,C=new Map,b=Ie.Off,O=un.Text,L,W=ln.New,ee=new bu.Emitter,Ne=new bu.Emitter,ke=new bu.Emitter,Qe=new bu.Emitter,V=new bu.Emitter,fe=n&&n.cancellationStrategy?n.cancellationStrategy:hm.Message;function M(S){if(S===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+S.toString()}function q(S){return S===null?"res-unknown-"+(++s).toString():"res-"+S.toString()}function j(){return"not-"+(++o).toString()}function B(S,$){te.Message.isRequest($)?S.set(M($.id),$):te.Message.isResponse($)?S.set(q($.id),$):S.set(j(),$)}function ae(S){}function oe(){return W===ln.Listening}function Q(){return W===ln.Closed}function ft(){return W===ln.Disposed}function rt(){(W===ln.New||W===ln.Listening)&&(W=ln.Closed,Ne.fire(void 0))}function Ot(S){ee.fire([S,void 0,void 0])}function tn(S){ee.fire(S)}t.onClose(rt),t.onError(Ot),e.onClose(rt),e.onError(tn);function Pr(){y||A.size===0||(y=(0,GR.default)().timer.setImmediate(()=>{y=void 0,Ao()}))}function Ao(){if(A.size===0)return;let S=A.shift();try{te.Message.isRequest(S)?bo(S):te.Message.isNotification(S)?So(S):te.Message.isResponse(S)?Co(S):vu(S)}finally{Pr()}}let or=S=>{try{if(te.Message.isNotification(S)&&S.method===Su.type.method){let $=S.params.id,G=M($),z=A.get(G);if(te.Message.isRequest(z)){let Ue=n?.connectionStrategy,nt=Ue&&Ue.cancelUndispatched?Ue.cancelUndispatched(z,ae):void 0;if(nt&&(nt.error!==void 0||nt.result!==void 0)){A.delete(G),C.delete($),nt.id=z.id,On(nt,S.method,Date.now()),e.write(nt).catch(()=>i.error("Sending response for canceled message failed."));return}}let Ge=C.get($);if(Ge!==void 0){Ge.cancel(),Dn(S);return}else w.add($)}B(A,S)}finally{Pr()}};function bo(S){if(ft())return;function $(ge,Be,_e){let gt={jsonrpc:u,id:S.id};ge instanceof te.ResponseError?gt.error=ge.toJson():gt.result=ge===void 0?null:ge,On(gt,Be,_e),e.write(gt).catch(()=>i.error("Sending response failed."))}function G(ge,Be,_e){let gt={jsonrpc:u,id:S.id,error:ge.toJson()};On(gt,Be,_e),e.write(gt).catch(()=>i.error("Sending response failed."))}function z(ge,Be,_e){ge===void 0&&(ge=null);let gt={jsonrpc:u,id:S.id,result:ge};On(gt,Be,_e),e.write(gt).catch(()=>i.error("Sending response failed."))}Ia(S);let Ge=c.get(S.method),Ue,nt;Ge&&(Ue=Ge.type,nt=Ge.handler);let _t=Date.now();if(nt||l){let ge=S.id??String(Date.now()),Be=fe.receiver.createCancellationTokenSource(ge);S.id!==null&&w.has(S.id)&&Be.cancel(),S.id!==null&&C.set(ge,Be);try{let _e;if(nt)if(S.params===void 0){if(Ue!==void 0&&Ue.numberOfParams!==0){G(new te.ResponseError(te.ErrorCodes.InvalidParams,`Request ${S.method} defines ${Ue.numberOfParams} params but received none.`),S.method,_t);return}_e=nt(Be.token)}else if(Array.isArray(S.params)){if(Ue!==void 0&&Ue.parameterStructures===te.ParameterStructures.byName){G(new te.ResponseError(te.ErrorCodes.InvalidParams,`Request ${S.method} defines parameters by name but received parameters by position`),S.method,_t);return}_e=nt(...S.params,Be.token)}else{if(Ue!==void 0&&Ue.parameterStructures===te.ParameterStructures.byPosition){G(new te.ResponseError(te.ErrorCodes.InvalidParams,`Request ${S.method} defines parameters by position but received parameters by name`),S.method,_t);return}_e=nt(S.params,Be.token)}else l&&(_e=l(S.method,S.params,Be.token));let gt=_e;_e?gt.then?gt.then(Jt=>{C.delete(ge),$(Jt,S.method,_t)},Jt=>{C.delete(ge),Jt instanceof te.ResponseError?G(Jt,S.method,_t):Jt&&Dt.string(Jt.message)?G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${S.method} failed with message: ${Jt.message}`),S.method,_t):G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${S.method} failed unexpectedly without providing any details.`),S.method,_t)}):(C.delete(ge),$(_e,S.method,_t)):(C.delete(ge),z(_e,S.method,_t))}catch(_e){C.delete(ge),_e instanceof te.ResponseError?$(_e,S.method,_t):_e&&Dt.string(_e.message)?G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${S.method} failed with message: ${_e.message}`),S.method,_t):G(new te.ResponseError(te.ErrorCodes.InternalError,`Request ${S.method} failed unexpectedly without providing any details.`),S.method,_t)}}else G(new te.ResponseError(te.ErrorCodes.MethodNotFound,`Unhandled method ${S.method}`),S.method,_t)}function Co(S){if(!ft())if(S.id===null)S.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(S.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let $=S.id,G=P.get($);if($a(S,G),G!==void 0){P.delete($);try{if(S.error){let z=S.error;G.reject(new te.ResponseError(z.code,z.message,z.data))}else if(S.result!==void 0)G.resolve(S.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function So(S){if(ft())return;let $,G;if(S.method===Su.type.method){let z=S.params.id;w.delete(z),Dn(S);return}else{let z=m.get(S.method);z&&(G=z.handler,$=z.type)}if(G||f)try{if(Dn(S),G)if(S.params===void 0)$!==void 0&&$.numberOfParams!==0&&$.parameterStructures!==te.ParameterStructures.byName&&i.error(`Notification ${S.method} defines ${$.numberOfParams} params but received none.`),G();else if(Array.isArray(S.params)){let z=S.params;S.method===Cu.type.method&&z.length===2&&HR.is(z[0])?G({token:z[0],value:z[1]}):($!==void 0&&($.parameterStructures===te.ParameterStructures.byName&&i.error(`Notification ${S.method} defines parameters by name but received parameters by position`),$.numberOfParams!==S.params.length&&i.error(`Notification ${S.method} defines ${$.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else $!==void 0&&$.parameterStructures===te.ParameterStructures.byPosition&&i.error(`Notification ${S.method} defines parameters by position but received parameters by name`),G(S.params);else f&&f(S.method,S.params)}catch(z){z.message?i.error(`Notification handler '${S.method}' failed with message: ${z.message}`):i.error(`Notification handler '${S.method}' failed unexpectedly.`)}else ke.fire(S)}function vu(S){if(!S){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(S,null,4)}`);let $=S;if(Dt.string($.id)||Dt.number($.id)){let G=$.id,z=P.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function yt(S){if(S!=null)switch(b){case Ie.Verbose:return JSON.stringify(S,null,4);case Ie.Compact:return JSON.stringify(S);default:return}}function pi(S){if(!(b===Ie.Off||!L))if(O===un.Text){let $;(b===Ie.Verbose||b===Ie.Compact)&&S.params&&($=`Params: ${yt(S.params)}

`),L.log(`Sending request '${S.method} - (${S.id})'.`,$)}else Lr("send-request",S)}function Tu(S){if(!(b===Ie.Off||!L))if(O===un.Text){let $;(b===Ie.Verbose||b===Ie.Compact)&&(S.params?$=`Params: ${yt(S.params)}

`:$=`No parameters provided.

`),L.log(`Sending notification '${S.method}'.`,$)}else Lr("send-notification",S)}function On(S,$,G){if(!(b===Ie.Off||!L))if(O===un.Text){let z;(b===Ie.Verbose||b===Ie.Compact)&&(S.error&&S.error.data?z=`Error data: ${yt(S.error.data)}

`:S.result?z=`Result: ${yt(S.result)}

`:S.error===void 0&&(z=`No result returned.

`)),L.log(`Sending response '${$} - (${S.id})'. Processing request took ${Date.now()-G}ms`,z)}else Lr("send-response",S)}function Ia(S){if(!(b===Ie.Off||!L))if(O===un.Text){let $;(b===Ie.Verbose||b===Ie.Compact)&&S.params&&($=`Params: ${yt(S.params)}

`),L.log(`Received request '${S.method} - (${S.id})'.`,$)}else Lr("receive-request",S)}function Dn(S){if(!(b===Ie.Off||!L||S.method===fm.type.method))if(O===un.Text){let $;(b===Ie.Verbose||b===Ie.Compact)&&(S.params?$=`Params: ${yt(S.params)}

`:$=`No parameters provided.

`),L.log(`Received notification '${S.method}'.`,$)}else Lr("receive-notification",S)}function $a(S,$){if(!(b===Ie.Off||!L))if(O===un.Text){let G;if((b===Ie.Verbose||b===Ie.Compact)&&(S.error&&S.error.data?G=`Error data: ${yt(S.error.data)}

`:S.result?G=`Result: ${yt(S.result)}

`:S.error===void 0&&(G=`No result returned.

`)),$){let z=S.error?` Request failed: ${S.error.message} (${S.error.code}).`:"";L.log(`Received response '${$.method} - (${S.id})' in ${Date.now()-$.timerStart}ms.${z}`,G)}else L.log(`Received response ${S.id} without active response promise.`,G)}else Lr("receive-response",S)}function Lr(S,$){if(!L||b===Ie.Off)return;let G={isLSPMessage:!0,type:S,message:$,timestamp:Date.now()};L.log(G)}function rn(){if(Q())throw new Bi(dc.Closed,"Connection is closed.");if(ft())throw new Bi(dc.Disposed,"Connection is disposed.")}function Eo(){if(oe())throw new Bi(dc.AlreadyListening,"Connection is already listening")}function Po(){if(!oe())throw new Error("Call listen() first.")}function wr(S){return S===void 0?null:S}function In(S){if(S!==null)return S}function qt(S){return S!=null&&!Array.isArray(S)&&typeof S=="object"}function nn(S,$){switch(S){case te.ParameterStructures.auto:return qt($)?In($):[wr($)];case te.ParameterStructures.byName:if(!qt($))throw new Error("Received parameters by name but param is not an object literal.");return In($);case te.ParameterStructures.byPosition:return[wr($)];default:throw new Error(`Unknown parameter structure ${S.toString()}`)}}function an(S,$){let G,z=S.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=nn(S.parameterStructures,$[0]);break;default:G=[];for(let Ge=0;Ge<$.length&&Ge<z;Ge++)G.push(wr($[Ge]));if($.length<z)for(let Ge=$.length;Ge<z;Ge++)G.push(null);break}return G}let $n={sendNotification:(S,...$)=>{rn();let G,z;if(Dt.string(S)){G=S;let Ue=$[0],nt=0,_t=te.ParameterStructures.auto;te.ParameterStructures.is(Ue)&&(nt=1,_t=Ue);let ge=$.length,Be=ge-nt;switch(Be){case 0:z=void 0;break;case 1:z=nn(_t,$[nt]);break;default:if(_t===te.ParameterStructures.byName)throw new Error(`Received ${Be} parameters for 'by Name' notification parameter structure.`);z=$.slice(nt,ge).map(_e=>wr(_e));break}}else{let Ue=$;G=S.method,z=an(S,Ue)}let Ge={jsonrpc:u,method:G,params:z};return Tu(Ge),e.write(Ge).catch(()=>i.error("Sending notification failed."))},onNotification:(S,$)=>{rn();let G;return Dt.func(S)?f=S:$&&(Dt.string(S)?(G=S,m.set(S,{type:void 0,handler:$})):(G=S.method,m.set(S.method,{type:S,handler:$}))),{dispose:()=>{G!==void 0?m.delete(G):f=void 0}}},onProgress:(S,$,G)=>{if(v.has($))throw new Error(`Progress handler for token ${$} already registered`);return v.set($,G),{dispose:()=>{v.delete($)}}},sendProgress:(S,$,G)=>$n.sendNotification(Cu.type,{token:$,value:G}),onUnhandledProgress:Qe.event,sendRequest:(S,...$)=>{rn(),Po();let G,z,Ge;if(Dt.string(S)){G=S;let ge=$[0],Be=$[$.length-1],_e=0,gt=te.ParameterStructures.auto;te.ParameterStructures.is(ge)&&(_e=1,gt=ge);let Jt=$.length;um.CancellationToken.is(Be)&&(Jt=Jt-1,Ge=Be);let hi=Jt-_e;switch(hi){case 0:z=void 0;break;case 1:z=nn(gt,$[_e]);break;default:if(gt===te.ParameterStructures.byName)throw new Error(`Received ${hi} parameters for 'by Name' request parameter structure.`);z=$.slice(_e,Jt).map(qn=>wr(qn));break}}else{let ge=$;G=S.method,z=an(S,ge);let Be=S.numberOfParams;Ge=um.CancellationToken.is(ge[Be])?ge[Be]:void 0}let Ue=a++,nt;return Ge&&(nt=Ge.onCancellationRequested(()=>{let ge=fe.sender.sendCancellation($n,Ue);return ge===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Ue}`),Promise.resolve()):ge.catch(()=>{i.log(`Sending cancellation messages for id ${Ue} failed`)})})),new Promise((ge,Be)=>{let _e={jsonrpc:u,id:Ue,method:G,params:z},gt=qn=>{ge(qn),fe.sender.cleanup(Ue),nt?.dispose()},Jt=qn=>{Be(qn),fe.sender.cleanup(Ue),nt?.dispose()},hi={method:G,timerStart:Date.now(),resolve:gt,reject:Jt};pi(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch(qn){hi.reject(new te.ResponseError(te.ErrorCodes.MessageWriteError,qn.message?qn.message:"Unknown reason")),hi=null}hi&&P.set(Ue,hi)})},onRequest:(S,$)=>{rn();let G=null;return cm.is(S)?(G=void 0,l=S):Dt.string(S)?(G=null,$!==void 0&&(G=S,c.set(S,{handler:$,type:void 0}))):$!==void 0&&(G=S.method,c.set(S.method,{type:S,handler:$})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>P.size>0,trace:async(S,$,G)=>{let z=!1,Ge=un.Text;G!==void 0&&(Dt.boolean(G)?z=G:(z=G.sendNotification||!1,Ge=G.traceFormat||un.Text)),b=S,O=Ge,b===Ie.Off?L=void 0:L=$,z&&!Q()&&!ft()&&await $n.sendNotification(KR.type,{value:Ie.toString(S)})},onError:ee.event,onClose:Ne.event,onUnhandledNotification:ke.event,onDispose:V.event,end:()=>{e.end()},dispose:()=>{if(ft())return;W=ln.Disposed,V.fire(void 0);let S=new te.ResponseError(te.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let $ of P.values())$.reject(S);P=new Map,C=new Map,w=new Set,A=new UR.LinkedMap,Dt.func(e.dispose)&&e.dispose(),Dt.func(t.dispose)&&t.dispose()},listen:()=>{rn(),Eo(),W=ln.Listening,t.listen(or)},inspect:()=>{(0,GR.default)().console.log("inspect")}};return $n.onNotification(fm.type,S=>{if(b===Ie.Off||!L)return;let $=b===Ie.Verbose||b===Ie.Compact;L.log(S.message,$?S.verbose:void 0)}),$n.onNotification(Cu.type,S=>{let $=v.get(S.token);$?$(S.value):Qe.fire(S)}),$n}Z.createMessageConnection=h1});var vm=d(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});D.TraceFormat=D.TraceValues=D.Trace=D.ProgressType=D.ProgressToken=D.createMessageConnection=D.NullLogger=D.ConnectionOptions=D.ConnectionStrategy=D.WriteableStreamMessageWriter=D.AbstractMessageWriter=D.MessageWriter=D.ReadableStreamMessageReader=D.AbstractMessageReader=D.MessageReader=D.CancellationToken=D.CancellationTokenSource=D.Emitter=D.Event=D.Disposable=D.LRUCache=D.Touch=D.LinkedMap=D.ParameterStructures=D.NotificationType9=D.NotificationType8=D.NotificationType7=D.NotificationType6=D.NotificationType5=D.NotificationType4=D.NotificationType3=D.NotificationType2=D.NotificationType1=D.NotificationType0=D.NotificationType=D.ErrorCodes=D.ResponseError=D.RequestType9=D.RequestType8=D.RequestType7=D.RequestType6=D.RequestType5=D.RequestType4=D.RequestType3=D.RequestType2=D.RequestType1=D.RequestType0=D.RequestType=D.Message=D.RAL=void 0;D.CancellationStrategy=D.CancellationSenderStrategy=D.CancellationReceiverStrategy=D.ConnectionError=D.ConnectionErrors=D.LogTraceNotification=D.SetTraceNotification=void 0;var ze=zh();Object.defineProperty(D,"Message",{enumerable:!0,get:function(){return ze.Message}});Object.defineProperty(D,"RequestType",{enumerable:!0,get:function(){return ze.RequestType}});Object.defineProperty(D,"RequestType0",{enumerable:!0,get:function(){return ze.RequestType0}});Object.defineProperty(D,"RequestType1",{enumerable:!0,get:function(){return ze.RequestType1}});Object.defineProperty(D,"RequestType2",{enumerable:!0,get:function(){return ze.RequestType2}});Object.defineProperty(D,"RequestType3",{enumerable:!0,get:function(){return ze.RequestType3}});Object.defineProperty(D,"RequestType4",{enumerable:!0,get:function(){return ze.RequestType4}});Object.defineProperty(D,"RequestType5",{enumerable:!0,get:function(){return ze.RequestType5}});Object.defineProperty(D,"RequestType6",{enumerable:!0,get:function(){return ze.RequestType6}});Object.defineProperty(D,"RequestType7",{enumerable:!0,get:function(){return ze.RequestType7}});Object.defineProperty(D,"RequestType8",{enumerable:!0,get:function(){return ze.RequestType8}});Object.defineProperty(D,"RequestType9",{enumerable:!0,get:function(){return ze.RequestType9}});Object.defineProperty(D,"ResponseError",{enumerable:!0,get:function(){return ze.ResponseError}});Object.defineProperty(D,"ErrorCodes",{enumerable:!0,get:function(){return ze.ErrorCodes}});Object.defineProperty(D,"NotificationType",{enumerable:!0,get:function(){return ze.NotificationType}});Object.defineProperty(D,"NotificationType0",{enumerable:!0,get:function(){return ze.NotificationType0}});Object.defineProperty(D,"NotificationType1",{enumerable:!0,get:function(){return ze.NotificationType1}});Object.defineProperty(D,"NotificationType2",{enumerable:!0,get:function(){return ze.NotificationType2}});Object.defineProperty(D,"NotificationType3",{enumerable:!0,get:function(){return ze.NotificationType3}});Object.defineProperty(D,"NotificationType4",{enumerable:!0,get:function(){return ze.NotificationType4}});Object.defineProperty(D,"NotificationType5",{enumerable:!0,get:function(){return ze.NotificationType5}});Object.defineProperty(D,"NotificationType6",{enumerable:!0,get:function(){return ze.NotificationType6}});Object.defineProperty(D,"NotificationType7",{enumerable:!0,get:function(){return ze.NotificationType7}});Object.defineProperty(D,"NotificationType8",{enumerable:!0,get:function(){return ze.NotificationType8}});Object.defineProperty(D,"NotificationType9",{enumerable:!0,get:function(){return ze.NotificationType9}});Object.defineProperty(D,"ParameterStructures",{enumerable:!0,get:function(){return ze.ParameterStructures}});var mm=Xh();Object.defineProperty(D,"LinkedMap",{enumerable:!0,get:function(){return mm.LinkedMap}});Object.defineProperty(D,"LRUCache",{enumerable:!0,get:function(){return mm.LRUCache}});Object.defineProperty(D,"Touch",{enumerable:!0,get:function(){return mm.Touch}});var m1=Th();Object.defineProperty(D,"Disposable",{enumerable:!0,get:function(){return m1.Disposable}});var VR=La();Object.defineProperty(D,"Event",{enumerable:!0,get:function(){return VR.Event}});Object.defineProperty(D,"Emitter",{enumerable:!0,get:function(){return VR.Emitter}});var zR=em();Object.defineProperty(D,"CancellationTokenSource",{enumerable:!0,get:function(){return zR.CancellationTokenSource}});Object.defineProperty(D,"CancellationToken",{enumerable:!0,get:function(){return zR.CancellationToken}});var ym=$R();Object.defineProperty(D,"MessageReader",{enumerable:!0,get:function(){return ym.MessageReader}});Object.defineProperty(D,"AbstractMessageReader",{enumerable:!0,get:function(){return ym.AbstractMessageReader}});Object.defineProperty(D,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return ym.ReadableStreamMessageReader}});var gm=jR();Object.defineProperty(D,"MessageWriter",{enumerable:!0,get:function(){return gm.MessageWriter}});Object.defineProperty(D,"AbstractMessageWriter",{enumerable:!0,get:function(){return gm.AbstractMessageWriter}});Object.defineProperty(D,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return gm.WriteableStreamMessageWriter}});var Zt=BR();Object.defineProperty(D,"ConnectionStrategy",{enumerable:!0,get:function(){return Zt.ConnectionStrategy}});Object.defineProperty(D,"ConnectionOptions",{enumerable:!0,get:function(){return Zt.ConnectionOptions}});Object.defineProperty(D,"NullLogger",{enumerable:!0,get:function(){return Zt.NullLogger}});Object.defineProperty(D,"createMessageConnection",{enumerable:!0,get:function(){return Zt.createMessageConnection}});Object.defineProperty(D,"ProgressToken",{enumerable:!0,get:function(){return Zt.ProgressToken}});Object.defineProperty(D,"ProgressType",{enumerable:!0,get:function(){return Zt.ProgressType}});Object.defineProperty(D,"Trace",{enumerable:!0,get:function(){return Zt.Trace}});Object.defineProperty(D,"TraceValues",{enumerable:!0,get:function(){return Zt.TraceValues}});Object.defineProperty(D,"TraceFormat",{enumerable:!0,get:function(){return Zt.TraceFormat}});Object.defineProperty(D,"SetTraceNotification",{enumerable:!0,get:function(){return Zt.SetTraceNotification}});Object.defineProperty(D,"LogTraceNotification",{enumerable:!0,get:function(){return Zt.LogTraceNotification}});Object.defineProperty(D,"ConnectionErrors",{enumerable:!0,get:function(){return Zt.ConnectionErrors}});Object.defineProperty(D,"ConnectionError",{enumerable:!0,get:function(){return Zt.ConnectionError}});Object.defineProperty(D,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return Zt.CancellationReceiverStrategy}});Object.defineProperty(D,"CancellationSenderStrategy",{enumerable:!0,get:function(){return Zt.CancellationSenderStrategy}});Object.defineProperty(D,"CancellationStrategy",{enumerable:!0,get:function(){return Zt.CancellationStrategy}});var y1=yi();D.RAL=y1.default});var _i=d(Nr=>{"use strict";var g1=Nr&&Nr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),v1=Nr&&Nr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&g1(e,t,r)};Object.defineProperty(Nr,"__esModule",{value:!0});Nr.createMessageConnection=Nr.BrowserMessageWriter=Nr.BrowserMessageReader=void 0;var T1=kR();T1.default.install();var Io=vm();v1(vm(),Nr);var Tm=class extends Io.AbstractMessageReader{constructor(e){super(),this._onData=new Io.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Nr.BrowserMessageReader=Tm;var _m=class extends Io.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Nr.BrowserMessageWriter=_m;function _1(t,e,r,n){return r===void 0&&(r=Io.NullLogger),Io.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Io.createMessageConnection)(t,e,r,n)}Nr.createMessageConnection=_1});var Rm=d((ode,YR)=>{"use strict";YR.exports=_i()});var $o=d((XR,pc)=>{(function(t){if(typeof pc=="object"&&typeof pc.exports=="object"){var e=t(ac,XR);e!==void 0&&(pc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function E(N){return typeof N=="string"}g.is=E})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function E(N){return typeof N=="string"}g.is=E})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function E(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=E})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function E(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=E})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function E(R,h){return R===Number.MAX_VALUE&&(R=a.MAX_VALUE),h===Number.MAX_VALUE&&(h=a.MAX_VALUE),{line:R,character:h}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&k.uinteger(h.line)&&k.uinteger(h.character)}g.is=N})(o=e.Position||(e.Position={}));var s;(function(g){function E(R,h,x,I){if(k.uinteger(R)&&k.uinteger(h)&&k.uinteger(x)&&k.uinteger(I))return{start:o.create(R,h),end:o.create(x,I)};if(o.is(R)&&o.is(h))return{start:R,end:h};throw new Error("Range#create called with invalid arguments[".concat(R,", ").concat(h,", ").concat(x,", ").concat(I,"]"))}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&o.is(h.start)&&o.is(h.end)}g.is=N})(s=e.Range||(e.Range={}));var u;(function(g){function E(R,h){return{uri:R,range:h}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&s.is(h.range)&&(k.string(h.uri)||k.undefined(h.uri))}g.is=N})(u=e.Location||(e.Location={}));var l;(function(g){function E(R,h,x,I){return{targetUri:R,targetRange:h,targetSelectionRange:x,originSelectionRange:I}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&s.is(h.targetRange)&&k.string(h.targetUri)&&s.is(h.targetSelectionRange)&&(s.is(h.originSelectionRange)||k.undefined(h.originSelectionRange))}g.is=N})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function E(R,h,x,I){return{red:R,green:h,blue:x,alpha:I}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&k.numberRange(h.red,0,1)&&k.numberRange(h.green,0,1)&&k.numberRange(h.blue,0,1)&&k.numberRange(h.alpha,0,1)}g.is=N})(c=e.Color||(e.Color={}));var f;(function(g){function E(R,h){return{range:R,color:h}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&s.is(h.range)&&c.is(h.color)}g.is=N})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(g){function E(R,h,x){return{label:R,textEdit:h,additionalTextEdits:x}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&k.string(h.label)&&(k.undefined(h.textEdit)||L.is(h))&&(k.undefined(h.additionalTextEdits)||k.typedArray(h.additionalTextEdits,L.is))}g.is=N})(m=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function E(R,h,x,I,ie,dt){var Ve={startLine:R,endLine:h};return k.defined(x)&&(Ve.startCharacter=x),k.defined(I)&&(Ve.endCharacter=I),k.defined(ie)&&(Ve.kind=ie),k.defined(dt)&&(Ve.collapsedText=dt),Ve}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&k.uinteger(h.startLine)&&k.uinteger(h.startLine)&&(k.undefined(h.startCharacter)||k.uinteger(h.startCharacter))&&(k.undefined(h.endCharacter)||k.uinteger(h.endCharacter))&&(k.undefined(h.kind)||k.string(h.kind))}g.is=N})(y=e.FoldingRange||(e.FoldingRange={}));var A;(function(g){function E(R,h){return{location:R,message:h}}g.create=E;function N(R){var h=R;return k.defined(h)&&u.is(h.location)&&k.string(h.message)}g.is=N})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var P;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(P=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var w;(function(g){g.Unnecessary=1,g.Deprecated=2})(w=e.DiagnosticTag||(e.DiagnosticTag={}));var C;(function(g){function E(N){var R=N;return k.objectLiteral(R)&&k.string(R.href)}g.is=E})(C=e.CodeDescription||(e.CodeDescription={}));var b;(function(g){function E(R,h,x,I,ie,dt){var Ve={range:R,message:h};return k.defined(x)&&(Ve.severity=x),k.defined(I)&&(Ve.code=I),k.defined(ie)&&(Ve.source=ie),k.defined(dt)&&(Ve.relatedInformation=dt),Ve}g.create=E;function N(R){var h,x=R;return k.defined(x)&&s.is(x.range)&&k.string(x.message)&&(k.number(x.severity)||k.undefined(x.severity))&&(k.integer(x.code)||k.string(x.code)||k.undefined(x.code))&&(k.undefined(x.codeDescription)||k.string((h=x.codeDescription)===null||h===void 0?void 0:h.href))&&(k.string(x.source)||k.undefined(x.source))&&(k.undefined(x.relatedInformation)||k.typedArray(x.relatedInformation,A.is))}g.is=N})(b=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function E(R,h){for(var x=[],I=2;I<arguments.length;I++)x[I-2]=arguments[I];var ie={title:R,command:h};return k.defined(x)&&x.length>0&&(ie.arguments=x),ie}g.create=E;function N(R){var h=R;return k.defined(h)&&k.string(h.title)&&k.string(h.command)}g.is=N})(O=e.Command||(e.Command={}));var L;(function(g){function E(x,I){return{range:x,newText:I}}g.replace=E;function N(x,I){return{range:{start:x,end:x},newText:I}}g.insert=N;function R(x){return{range:x,newText:""}}g.del=R;function h(x){var I=x;return k.objectLiteral(I)&&k.string(I.newText)&&s.is(I.range)}g.is=h})(L=e.TextEdit||(e.TextEdit={}));var W;(function(g){function E(R,h,x){var I={label:R};return h!==void 0&&(I.needsConfirmation=h),x!==void 0&&(I.description=x),I}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&k.string(h.label)&&(k.boolean(h.needsConfirmation)||h.needsConfirmation===void 0)&&(k.string(h.description)||h.description===void 0)}g.is=N})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ee;(function(g){function E(N){var R=N;return k.string(R)}g.is=E})(ee=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ne;(function(g){function E(x,I,ie){return{range:x,newText:I,annotationId:ie}}g.replace=E;function N(x,I,ie){return{range:{start:x,end:x},newText:I,annotationId:ie}}g.insert=N;function R(x,I){return{range:x,newText:"",annotationId:I}}g.del=R;function h(x){var I=x;return L.is(I)&&(W.is(I.annotationId)||ee.is(I.annotationId))}g.is=h})(Ne=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var ke;(function(g){function E(R,h){return{textDocument:R,edits:h}}g.create=E;function N(R){var h=R;return k.defined(h)&&Q.is(h.textDocument)&&Array.isArray(h.edits)}g.is=N})(ke=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Qe;(function(g){function E(R,h,x){var I={kind:"create",uri:R};return h!==void 0&&(h.overwrite!==void 0||h.ignoreIfExists!==void 0)&&(I.options=h),x!==void 0&&(I.annotationId=x),I}g.create=E;function N(R){var h=R;return h&&h.kind==="create"&&k.string(h.uri)&&(h.options===void 0||(h.options.overwrite===void 0||k.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||k.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||ee.is(h.annotationId))}g.is=N})(Qe=e.CreateFile||(e.CreateFile={}));var V;(function(g){function E(R,h,x,I){var ie={kind:"rename",oldUri:R,newUri:h};return x!==void 0&&(x.overwrite!==void 0||x.ignoreIfExists!==void 0)&&(ie.options=x),I!==void 0&&(ie.annotationId=I),ie}g.create=E;function N(R){var h=R;return h&&h.kind==="rename"&&k.string(h.oldUri)&&k.string(h.newUri)&&(h.options===void 0||(h.options.overwrite===void 0||k.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||k.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||ee.is(h.annotationId))}g.is=N})(V=e.RenameFile||(e.RenameFile={}));var fe;(function(g){function E(R,h,x){var I={kind:"delete",uri:R};return h!==void 0&&(h.recursive!==void 0||h.ignoreIfNotExists!==void 0)&&(I.options=h),x!==void 0&&(I.annotationId=x),I}g.create=E;function N(R){var h=R;return h&&h.kind==="delete"&&k.string(h.uri)&&(h.options===void 0||(h.options.recursive===void 0||k.boolean(h.options.recursive))&&(h.options.ignoreIfNotExists===void 0||k.boolean(h.options.ignoreIfNotExists)))&&(h.annotationId===void 0||ee.is(h.annotationId))}g.is=N})(fe=e.DeleteFile||(e.DeleteFile={}));var M;(function(g){function E(N){var R=N;return R&&(R.changes!==void 0||R.documentChanges!==void 0)&&(R.documentChanges===void 0||R.documentChanges.every(function(h){return k.string(h.kind)?Qe.is(h)||V.is(h)||fe.is(h):ke.is(h)}))}g.is=E})(M=e.WorkspaceEdit||(e.WorkspaceEdit={}));var q=function(){function g(E,N){this.edits=E,this.changeAnnotations=N}return g.prototype.insert=function(E,N,R){var h,x;if(R===void 0?h=L.insert(E,N):ee.is(R)?(x=R,h=Ne.insert(E,N,R)):(this.assertChangeAnnotations(this.changeAnnotations),x=this.changeAnnotations.manage(R),h=Ne.insert(E,N,x)),this.edits.push(h),x!==void 0)return x},g.prototype.replace=function(E,N,R){var h,x;if(R===void 0?h=L.replace(E,N):ee.is(R)?(x=R,h=Ne.replace(E,N,R)):(this.assertChangeAnnotations(this.changeAnnotations),x=this.changeAnnotations.manage(R),h=Ne.replace(E,N,x)),this.edits.push(h),x!==void 0)return x},g.prototype.delete=function(E,N){var R,h;if(N===void 0?R=L.del(E):ee.is(N)?(h=N,R=Ne.del(E,N)):(this.assertChangeAnnotations(this.changeAnnotations),h=this.changeAnnotations.manage(N),R=Ne.del(E,h)),this.edits.push(R),h!==void 0)return h},g.prototype.add=function(E){this.edits.push(E)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(E){if(E===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(E){this._annotations=E===void 0?Object.create(null):E,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(E,N){var R;if(ee.is(E)?R=E:(R=this.nextId(),N=E),this._annotations[R]!==void 0)throw new Error("Id ".concat(R," is already in use."));if(N===void 0)throw new Error("No annotation provided for id ".concat(R));return this._annotations[R]=N,this._size++,R},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(E){var N=this;this._textEditChanges=Object.create(null),E!==void 0?(this._workspaceEdit=E,E.documentChanges?(this._changeAnnotations=new j(E.changeAnnotations),E.changeAnnotations=this._changeAnnotations.all(),E.documentChanges.forEach(function(R){if(ke.is(R)){var h=new q(R.edits,N._changeAnnotations);N._textEditChanges[R.textDocument.uri]=h}})):E.changes&&Object.keys(E.changes).forEach(function(R){var h=new q(E.changes[R]);N._textEditChanges[R]=h})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(E){if(Q.is(E)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var N={uri:E.uri,version:E.version},R=this._textEditChanges[N.uri];if(!R){var h=[],x={textDocument:N,edits:h};this._workspaceEdit.documentChanges.push(x),R=new q(h,this._changeAnnotations),this._textEditChanges[N.uri]=R}return R}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var R=this._textEditChanges[E];if(!R){var h=[];this._workspaceEdit.changes[E]=h,R=new q(h),this._textEditChanges[E]=R}return R}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(E,N,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||ee.is(N)?h=N:R=N;var x,I;if(h===void 0?x=Qe.create(E,R):(I=ee.is(h)?h:this._changeAnnotations.manage(h),x=Qe.create(E,R,I)),this._workspaceEdit.documentChanges.push(x),I!==void 0)return I},g.prototype.renameFile=function(E,N,R,h){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var x;W.is(R)||ee.is(R)?x=R:h=R;var I,ie;if(x===void 0?I=V.create(E,N,h):(ie=ee.is(x)?x:this._changeAnnotations.manage(x),I=V.create(E,N,h,ie)),this._workspaceEdit.documentChanges.push(I),ie!==void 0)return ie},g.prototype.deleteFile=function(E,N,R){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||ee.is(N)?h=N:R=N;var x,I;if(h===void 0?x=fe.create(E,R):(I=ee.is(h)?h:this._changeAnnotations.manage(h),x=fe.create(E,R,I)),this._workspaceEdit.documentChanges.push(x),I!==void 0)return I},g}();e.WorkspaceChange=B;var ae;(function(g){function E(R){return{uri:R}}g.create=E;function N(R){var h=R;return k.defined(h)&&k.string(h.uri)}g.is=N})(ae=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var oe;(function(g){function E(R,h){return{uri:R,version:h}}g.create=E;function N(R){var h=R;return k.defined(h)&&k.string(h.uri)&&k.integer(h.version)}g.is=N})(oe=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var Q;(function(g){function E(R,h){return{uri:R,version:h}}g.create=E;function N(R){var h=R;return k.defined(h)&&k.string(h.uri)&&(h.version===null||k.integer(h.version))}g.is=N})(Q=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var ft;(function(g){function E(R,h,x,I){return{uri:R,languageId:h,version:x,text:I}}g.create=E;function N(R){var h=R;return k.defined(h)&&k.string(h.uri)&&k.string(h.languageId)&&k.integer(h.version)&&k.string(h.text)}g.is=N})(ft=e.TextDocumentItem||(e.TextDocumentItem={}));var rt;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function E(N){var R=N;return R===g.PlainText||R===g.Markdown}g.is=E})(rt=e.MarkupKind||(e.MarkupKind={}));var Ot;(function(g){function E(N){var R=N;return k.objectLiteral(N)&&rt.is(R.kind)&&k.string(R.value)}g.is=E})(Ot=e.MarkupContent||(e.MarkupContent={}));var tn;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(tn=e.CompletionItemKind||(e.CompletionItemKind={}));var Pr;(function(g){g.PlainText=1,g.Snippet=2})(Pr=e.InsertTextFormat||(e.InsertTextFormat={}));var Ao;(function(g){g.Deprecated=1})(Ao=e.CompletionItemTag||(e.CompletionItemTag={}));var or;(function(g){function E(R,h,x){return{newText:R,insert:h,replace:x}}g.create=E;function N(R){var h=R;return h&&k.string(h.newText)&&s.is(h.insert)&&s.is(h.replace)}g.is=N})(or=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bo;(function(g){g.asIs=1,g.adjustIndentation=2})(bo=e.InsertTextMode||(e.InsertTextMode={}));var Co;(function(g){function E(N){var R=N;return R&&(k.string(R.detail)||R.detail===void 0)&&(k.string(R.description)||R.description===void 0)}g.is=E})(Co=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var So;(function(g){function E(N){return{label:N}}g.create=E})(So=e.CompletionItem||(e.CompletionItem={}));var vu;(function(g){function E(N,R){return{items:N||[],isIncomplete:!!R}}g.create=E})(vu=e.CompletionList||(e.CompletionList={}));var yt;(function(g){function E(R){return R.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=E;function N(R){var h=R;return k.string(h)||k.objectLiteral(h)&&k.string(h.language)&&k.string(h.value)}g.is=N})(yt=e.MarkedString||(e.MarkedString={}));var pi;(function(g){function E(N){var R=N;return!!R&&k.objectLiteral(R)&&(Ot.is(R.contents)||yt.is(R.contents)||k.typedArray(R.contents,yt.is))&&(N.range===void 0||s.is(N.range))}g.is=E})(pi=e.Hover||(e.Hover={}));var Tu;(function(g){function E(N,R){return R?{label:N,documentation:R}:{label:N}}g.create=E})(Tu=e.ParameterInformation||(e.ParameterInformation={}));var On;(function(g){function E(N,R){for(var h=[],x=2;x<arguments.length;x++)h[x-2]=arguments[x];var I={label:N};return k.defined(R)&&(I.documentation=R),k.defined(h)?I.parameters=h:I.parameters=[],I}g.create=E})(On=e.SignatureInformation||(e.SignatureInformation={}));var Ia;(function(g){g.Text=1,g.Read=2,g.Write=3})(Ia=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Dn;(function(g){function E(N,R){var h={range:N};return k.number(R)&&(h.kind=R),h}g.create=E})(Dn=e.DocumentHighlight||(e.DocumentHighlight={}));var $a;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})($a=e.SymbolKind||(e.SymbolKind={}));var Lr;(function(g){g.Deprecated=1})(Lr=e.SymbolTag||(e.SymbolTag={}));var rn;(function(g){function E(N,R,h,x,I){var ie={name:N,kind:R,location:{uri:x,range:h}};return I&&(ie.containerName=I),ie}g.create=E})(rn=e.SymbolInformation||(e.SymbolInformation={}));var Eo;(function(g){function E(N,R,h,x){return x!==void 0?{name:N,kind:R,location:{uri:h,range:x}}:{name:N,kind:R,location:{uri:h}}}g.create=E})(Eo=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Po;(function(g){function E(R,h,x,I,ie,dt){var Ve={name:R,detail:h,kind:x,range:I,selectionRange:ie};return dt!==void 0&&(Ve.children=dt),Ve}g.create=E;function N(R){var h=R;return h&&k.string(h.name)&&k.number(h.kind)&&s.is(h.range)&&s.is(h.selectionRange)&&(h.detail===void 0||k.string(h.detail))&&(h.deprecated===void 0||k.boolean(h.deprecated))&&(h.children===void 0||Array.isArray(h.children))&&(h.tags===void 0||Array.isArray(h.tags))}g.is=N})(Po=e.DocumentSymbol||(e.DocumentSymbol={}));var wr;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(wr=e.CodeActionKind||(e.CodeActionKind={}));var In;(function(g){g.Invoked=1,g.Automatic=2})(In=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var qt;(function(g){function E(R,h,x){var I={diagnostics:R};return h!=null&&(I.only=h),x!=null&&(I.triggerKind=x),I}g.create=E;function N(R){var h=R;return k.defined(h)&&k.typedArray(h.diagnostics,b.is)&&(h.only===void 0||k.typedArray(h.only,k.string))&&(h.triggerKind===void 0||h.triggerKind===In.Invoked||h.triggerKind===In.Automatic)}g.is=N})(qt=e.CodeActionContext||(e.CodeActionContext={}));var nn;(function(g){function E(R,h,x){var I={title:R},ie=!0;return typeof h=="string"?(ie=!1,I.kind=h):O.is(h)?I.command=h:I.edit=h,ie&&x!==void 0&&(I.kind=x),I}g.create=E;function N(R){var h=R;return h&&k.string(h.title)&&(h.diagnostics===void 0||k.typedArray(h.diagnostics,b.is))&&(h.kind===void 0||k.string(h.kind))&&(h.edit!==void 0||h.command!==void 0)&&(h.command===void 0||O.is(h.command))&&(h.isPreferred===void 0||k.boolean(h.isPreferred))&&(h.edit===void 0||M.is(h.edit))}g.is=N})(nn=e.CodeAction||(e.CodeAction={}));var an;(function(g){function E(R,h){var x={range:R};return k.defined(h)&&(x.data=h),x}g.create=E;function N(R){var h=R;return k.defined(h)&&s.is(h.range)&&(k.undefined(h.command)||O.is(h.command))}g.is=N})(an=e.CodeLens||(e.CodeLens={}));var $n;(function(g){function E(R,h){return{tabSize:R,insertSpaces:h}}g.create=E;function N(R){var h=R;return k.defined(h)&&k.uinteger(h.tabSize)&&k.boolean(h.insertSpaces)}g.is=N})($n=e.FormattingOptions||(e.FormattingOptions={}));var S;(function(g){function E(R,h,x){return{range:R,target:h,data:x}}g.create=E;function N(R){var h=R;return k.defined(h)&&s.is(h.range)&&(k.undefined(h.target)||k.string(h.target))}g.is=N})(S=e.DocumentLink||(e.DocumentLink={}));var $;(function(g){function E(R,h){return{range:R,parent:h}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&s.is(h.range)&&(h.parent===void 0||g.is(h.parent))}g.is=N})($=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Ge;(function(g){function E(N){var R=N;return k.objectLiteral(R)&&(R.resultId===void 0||typeof R.resultId=="string")&&Array.isArray(R.data)&&(R.data.length===0||typeof R.data[0]=="number")}g.is=E})(Ge=e.SemanticTokens||(e.SemanticTokens={}));var Ue;(function(g){function E(R,h){return{range:R,text:h}}g.create=E;function N(R){var h=R;return h!=null&&s.is(h.range)&&k.string(h.text)}g.is=N})(Ue=e.InlineValueText||(e.InlineValueText={}));var nt;(function(g){function E(R,h,x){return{range:R,variableName:h,caseSensitiveLookup:x}}g.create=E;function N(R){var h=R;return h!=null&&s.is(h.range)&&k.boolean(h.caseSensitiveLookup)&&(k.string(h.variableName)||h.variableName===void 0)}g.is=N})(nt=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var _t;(function(g){function E(R,h){return{range:R,expression:h}}g.create=E;function N(R){var h=R;return h!=null&&s.is(h.range)&&(k.string(h.expression)||h.expression===void 0)}g.is=N})(_t=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ge;(function(g){function E(R,h){return{frameId:R,stoppedLocation:h}}g.create=E;function N(R){var h=R;return k.defined(h)&&s.is(R.stoppedLocation)}g.is=N})(ge=e.InlineValueContext||(e.InlineValueContext={}));var Be;(function(g){g.Type=1,g.Parameter=2;function E(N){return N===1||N===2}g.is=E})(Be=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function E(R){return{value:R}}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&(h.tooltip===void 0||k.string(h.tooltip)||Ot.is(h.tooltip))&&(h.location===void 0||u.is(h.location))&&(h.command===void 0||O.is(h.command))}g.is=N})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(g){function E(R,h,x){var I={position:R,label:h};return x!==void 0&&(I.kind=x),I}g.create=E;function N(R){var h=R;return k.objectLiteral(h)&&o.is(h.position)&&(k.string(h.label)||k.typedArray(h.label,_e.is))&&(h.kind===void 0||Be.is(h.kind))&&h.textEdits===void 0||k.typedArray(h.textEdits,L.is)&&(h.tooltip===void 0||k.string(h.tooltip)||Ot.is(h.tooltip))&&(h.paddingLeft===void 0||k.boolean(h.paddingLeft))&&(h.paddingRight===void 0||k.boolean(h.paddingRight))}g.is=N})(gt=e.InlayHint||(e.InlayHint={}));var Jt;(function(g){function E(N){var R=N;return k.objectLiteral(R)&&n.is(R.uri)&&k.string(R.name)}g.is=E})(Jt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var hi;(function(g){function E(x,I,ie,dt){return new qn(x,I,ie,dt)}g.create=E;function N(x){var I=x;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}g.is=N;function R(x,I){for(var ie=x.getText(),dt=h(I,function(wo,ic){var ER=wo.range.start.line-ic.range.start.line;return ER===0?wo.range.start.character-ic.range.start.character:ER}),Ve=ie.length,on=dt.length-1;on>=0;on--){var sn=dt[on],mi=x.offsetAt(sn.range.start),ve=x.offsetAt(sn.range.end);if(ve<=Ve)ie=ie.substring(0,mi)+sn.newText+ie.substring(ve,ie.length);else throw new Error("Overlapping edit");Ve=mi}return ie}g.applyEdits=R;function h(x,I){if(x.length<=1)return x;var ie=x.length/2|0,dt=x.slice(0,ie),Ve=x.slice(ie);h(dt,I),h(Ve,I);for(var on=0,sn=0,mi=0;on<dt.length&&sn<Ve.length;){var ve=I(dt[on],Ve[sn]);ve<=0?x[mi++]=dt[on++]:x[mi++]=Ve[sn++]}for(;on<dt.length;)x[mi++]=dt[on++];for(;sn<Ve.length;)x[mi++]=Ve[sn++];return x}})(hi=e.TextDocument||(e.TextDocument={}));var qn=function(){function g(E,N,R,h){this._uri=E,this._languageId=N,this._version=R,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(E){if(E){var N=this.offsetAt(E.start),R=this.offsetAt(E.end);return this._content.substring(N,R)}return this._content},g.prototype.update=function(E,N){this._content=E.text,this._version=N,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var E=[],N=this._content,R=!0,h=0;h<N.length;h++){R&&(E.push(h),R=!1);var x=N.charAt(h);R=x==="\r"||x===`
`,x==="\r"&&h+1<N.length&&N.charAt(h+1)===`
`&&h++}R&&N.length>0&&E.push(N.length),this._lineOffsets=E}return this._lineOffsets},g.prototype.positionAt=function(E){E=Math.max(Math.min(E,this._content.length),0);var N=this.getLineOffsets(),R=0,h=N.length;if(h===0)return o.create(0,E);for(;R<h;){var x=Math.floor((R+h)/2);N[x]>E?h=x:R=x+1}var I=R-1;return o.create(I,E-N[I])},g.prototype.offsetAt=function(E){var N=this.getLineOffsets();if(E.line>=N.length)return this._content.length;if(E.line<0)return 0;var R=N[E.line],h=E.line+1<N.length?N[E.line+1]:this._content.length;return Math.max(Math.min(R+E.character,h),R)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),k;(function(g){var E=Object.prototype.toString;function N(ve){return typeof ve<"u"}g.defined=N;function R(ve){return typeof ve>"u"}g.undefined=R;function h(ve){return ve===!0||ve===!1}g.boolean=h;function x(ve){return E.call(ve)==="[object String]"}g.string=x;function I(ve){return E.call(ve)==="[object Number]"}g.number=I;function ie(ve,wo,ic){return E.call(ve)==="[object Number]"&&wo<=ve&&ve<=ic}g.numberRange=ie;function dt(ve){return E.call(ve)==="[object Number]"&&-2147483648<=ve&&ve<=2147483647}g.integer=dt;function Ve(ve){return E.call(ve)==="[object Number]"&&0<=ve&&ve<=2147483647}g.uinteger=Ve;function on(ve){return E.call(ve)==="[object Function]"}g.func=on;function sn(ve){return ve!==null&&typeof ve=="object"}g.objectLiteral=sn;function mi(ve,wo){return Array.isArray(ve)&&ve.every(wo)}g.typedArray=mi})(k||(k={}))})});var lt=d(ur=>{"use strict";Object.defineProperty(ur,"__esModule",{value:!0});ur.ProtocolNotificationType=ur.ProtocolNotificationType0=ur.ProtocolRequestType=ur.ProtocolRequestType0=ur.RegistrationType=ur.MessageDirection=void 0;var qo=_i(),R1;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(R1=ur.MessageDirection||(ur.MessageDirection={}));var Am=class{constructor(e){this.method=e}};ur.RegistrationType=Am;var bm=class extends qo.RequestType0{constructor(e){super(e)}};ur.ProtocolRequestType0=bm;var Cm=class extends qo.RequestType{constructor(e){super(e,qo.ParameterStructures.byName)}};ur.ProtocolRequestType=Cm;var Sm=class extends qo.NotificationType0{constructor(e){super(e)}};ur.ProtocolNotificationType0=Sm;var Em=class extends qo.NotificationType{constructor(e){super(e,qo.ParameterStructures.byName)}};ur.ProtocolNotificationType=Em});var hc=d(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.objectLiteral=Rt.typedArray=Rt.stringArray=Rt.array=Rt.func=Rt.error=Rt.number=Rt.string=Rt.boolean=void 0;function A1(t){return t===!0||t===!1}Rt.boolean=A1;function JR(t){return typeof t=="string"||t instanceof String}Rt.string=JR;function b1(t){return typeof t=="number"||t instanceof Number}Rt.number=b1;function C1(t){return t instanceof Error}Rt.error=C1;function S1(t){return typeof t=="function"}Rt.func=S1;function QR(t){return Array.isArray(t)}Rt.array=QR;function E1(t){return QR(t)&&t.every(e=>JR(e))}Rt.stringArray=E1;function P1(t,e){return Array.isArray(t)&&t.every(e)}Rt.typedArray=P1;function w1(t){return t!==null&&typeof t=="object"}Rt.objectLiteral=w1});var eA=d(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.ImplementationRequest=void 0;var ZR=lt(),N1;(function(t){t.method="textDocument/implementation",t.messageDirection=ZR.MessageDirection.clientToServer,t.type=new ZR.ProtocolRequestType(t.method)})(N1=Eu.ImplementationRequest||(Eu.ImplementationRequest={}))});var rA=d(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.TypeDefinitionRequest=void 0;var tA=lt(),k1;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=tA.MessageDirection.clientToServer,t.type=new tA.ProtocolRequestType(t.method)})(k1=Pu.TypeDefinitionRequest||(Pu.TypeDefinitionRequest={}))});var nA=d(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.DidChangeWorkspaceFoldersNotification=Vi.WorkspaceFoldersRequest=void 0;var mc=lt(),x1;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=mc.MessageDirection.serverToClient,t.type=new mc.ProtocolRequestType0(t.method)})(x1=Vi.WorkspaceFoldersRequest||(Vi.WorkspaceFoldersRequest={}));var O1;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=mc.MessageDirection.clientToServer,t.type=new mc.ProtocolNotificationType(t.method)})(O1=Vi.DidChangeWorkspaceFoldersNotification||(Vi.DidChangeWorkspaceFoldersNotification={}))});var aA=d(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.ConfigurationRequest=void 0;var iA=lt(),D1;(function(t){t.method="workspace/configuration",t.messageDirection=iA.MessageDirection.serverToClient,t.type=new iA.ProtocolRequestType(t.method)})(D1=wu.ConfigurationRequest||(wu.ConfigurationRequest={}))});var oA=d(zi=>{"use strict";Object.defineProperty(zi,"__esModule",{value:!0});zi.ColorPresentationRequest=zi.DocumentColorRequest=void 0;var yc=lt(),I1;(function(t){t.method="textDocument/documentColor",t.messageDirection=yc.MessageDirection.clientToServer,t.type=new yc.ProtocolRequestType(t.method)})(I1=zi.DocumentColorRequest||(zi.DocumentColorRequest={}));var $1;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=yc.MessageDirection.clientToServer,t.type=new yc.ProtocolRequestType(t.method)})($1=zi.ColorPresentationRequest||(zi.ColorPresentationRequest={}))});var uA=d(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.FoldingRangeRequest=void 0;var sA=lt(),q1;(function(t){t.method="textDocument/foldingRange",t.messageDirection=sA.MessageDirection.clientToServer,t.type=new sA.ProtocolRequestType(t.method)})(q1=Nu.FoldingRangeRequest||(Nu.FoldingRangeRequest={}))});var cA=d(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.DeclarationRequest=void 0;var lA=lt(),L1;(function(t){t.method="textDocument/declaration",t.messageDirection=lA.MessageDirection.clientToServer,t.type=new lA.ProtocolRequestType(t.method)})(L1=ku.DeclarationRequest||(ku.DeclarationRequest={}))});var dA=d(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.SelectionRangeRequest=void 0;var fA=lt(),M1;(function(t){t.method="textDocument/selectionRange",t.messageDirection=fA.MessageDirection.clientToServer,t.type=new fA.ProtocolRequestType(t.method)})(M1=xu.SelectionRangeRequest||(xu.SelectionRangeRequest={}))});var pA=d(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.WorkDoneProgressCancelNotification=cn.WorkDoneProgressCreateRequest=cn.WorkDoneProgress=void 0;var F1=_i(),gc=lt(),j1;(function(t){t.type=new F1.ProgressType;function e(r){return r===t.type}t.is=e})(j1=cn.WorkDoneProgress||(cn.WorkDoneProgress={}));var G1;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=gc.MessageDirection.serverToClient,t.type=new gc.ProtocolRequestType(t.method)})(G1=cn.WorkDoneProgressCreateRequest||(cn.WorkDoneProgressCreateRequest={}));var U1;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=gc.MessageDirection.clientToServer,t.type=new gc.ProtocolNotificationType(t.method)})(U1=cn.WorkDoneProgressCancelNotification||(cn.WorkDoneProgressCancelNotification={}))});var hA=d(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.CallHierarchyOutgoingCallsRequest=fn.CallHierarchyIncomingCallsRequest=fn.CallHierarchyPrepareRequest=void 0;var Lo=lt(),H1;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Lo.MessageDirection.clientToServer,t.type=new Lo.ProtocolRequestType(t.method)})(H1=fn.CallHierarchyPrepareRequest||(fn.CallHierarchyPrepareRequest={}));var K1;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Lo.MessageDirection.clientToServer,t.type=new Lo.ProtocolRequestType(t.method)})(K1=fn.CallHierarchyIncomingCallsRequest||(fn.CallHierarchyIncomingCallsRequest={}));var W1;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Lo.MessageDirection.clientToServer,t.type=new Lo.ProtocolRequestType(t.method)})(W1=fn.CallHierarchyOutgoingCallsRequest||(fn.CallHierarchyOutgoingCallsRequest={}))});var mA=d(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.SemanticTokensRefreshRequest=At.SemanticTokensRangeRequest=At.SemanticTokensDeltaRequest=At.SemanticTokensRequest=At.SemanticTokensRegistrationType=At.TokenFormat=void 0;var Ri=lt(),B1;(function(t){t.Relative="relative"})(B1=At.TokenFormat||(At.TokenFormat={}));var vc;(function(t){t.method="textDocument/semanticTokens",t.type=new Ri.RegistrationType(t.method)})(vc=At.SemanticTokensRegistrationType||(At.SemanticTokensRegistrationType={}));var V1;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Ri.MessageDirection.clientToServer,t.type=new Ri.ProtocolRequestType(t.method),t.registrationMethod=vc.method})(V1=At.SemanticTokensRequest||(At.SemanticTokensRequest={}));var z1;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Ri.MessageDirection.clientToServer,t.type=new Ri.ProtocolRequestType(t.method),t.registrationMethod=vc.method})(z1=At.SemanticTokensDeltaRequest||(At.SemanticTokensDeltaRequest={}));var Y1;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Ri.MessageDirection.clientToServer,t.type=new Ri.ProtocolRequestType(t.method),t.registrationMethod=vc.method})(Y1=At.SemanticTokensRangeRequest||(At.SemanticTokensRangeRequest={}));var X1;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Ri.MessageDirection.clientToServer,t.type=new Ri.ProtocolRequestType0(t.method)})(X1=At.SemanticTokensRefreshRequest||(At.SemanticTokensRefreshRequest={}))});var gA=d(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.ShowDocumentRequest=void 0;var yA=lt(),J1;(function(t){t.method="window/showDocument",t.messageDirection=yA.MessageDirection.serverToClient,t.type=new yA.ProtocolRequestType(t.method)})(J1=Ou.ShowDocumentRequest||(Ou.ShowDocumentRequest={}))});var TA=d(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.LinkedEditingRangeRequest=void 0;var vA=lt(),Q1;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=vA.MessageDirection.clientToServer,t.type=new vA.ProtocolRequestType(t.method)})(Q1=Du.LinkedEditingRangeRequest||(Du.LinkedEditingRangeRequest={}))});var _A=d(ct=>{"use strict";Object.defineProperty(ct,"__esModule",{value:!0});ct.WillDeleteFilesRequest=ct.DidDeleteFilesNotification=ct.DidRenameFilesNotification=ct.WillRenameFilesRequest=ct.DidCreateFilesNotification=ct.WillCreateFilesRequest=ct.FileOperationPatternKind=void 0;var Mr=lt(),Z1;(function(t){t.file="file",t.folder="folder"})(Z1=ct.FileOperationPatternKind||(ct.FileOperationPatternKind={}));var eF;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Mr.MessageDirection.clientToServer,t.type=new Mr.ProtocolRequestType(t.method)})(eF=ct.WillCreateFilesRequest||(ct.WillCreateFilesRequest={}));var tF;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Mr.MessageDirection.clientToServer,t.type=new Mr.ProtocolNotificationType(t.method)})(tF=ct.DidCreateFilesNotification||(ct.DidCreateFilesNotification={}));var rF;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Mr.MessageDirection.clientToServer,t.type=new Mr.ProtocolRequestType(t.method)})(rF=ct.WillRenameFilesRequest||(ct.WillRenameFilesRequest={}));var nF;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Mr.MessageDirection.clientToServer,t.type=new Mr.ProtocolNotificationType(t.method)})(nF=ct.DidRenameFilesNotification||(ct.DidRenameFilesNotification={}));var iF;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Mr.MessageDirection.clientToServer,t.type=new Mr.ProtocolNotificationType(t.method)})(iF=ct.DidDeleteFilesNotification||(ct.DidDeleteFilesNotification={}));var aF;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Mr.MessageDirection.clientToServer,t.type=new Mr.ProtocolRequestType(t.method)})(aF=ct.WillDeleteFilesRequest||(ct.WillDeleteFilesRequest={}))});var AA=d(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.MonikerRequest=dn.MonikerKind=dn.UniquenessLevel=void 0;var RA=lt(),oF;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(oF=dn.UniquenessLevel||(dn.UniquenessLevel={}));var sF;(function(t){t.$import="import",t.$export="export",t.local="local"})(sF=dn.MonikerKind||(dn.MonikerKind={}));var uF;(function(t){t.method="textDocument/moniker",t.messageDirection=RA.MessageDirection.clientToServer,t.type=new RA.ProtocolRequestType(t.method)})(uF=dn.MonikerRequest||(dn.MonikerRequest={}))});var bA=d(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.TypeHierarchySubtypesRequest=pn.TypeHierarchySupertypesRequest=pn.TypeHierarchyPrepareRequest=void 0;var Mo=lt(),lF;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Mo.MessageDirection.clientToServer,t.type=new Mo.ProtocolRequestType(t.method)})(lF=pn.TypeHierarchyPrepareRequest||(pn.TypeHierarchyPrepareRequest={}));var cF;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Mo.MessageDirection.clientToServer,t.type=new Mo.ProtocolRequestType(t.method)})(cF=pn.TypeHierarchySupertypesRequest||(pn.TypeHierarchySupertypesRequest={}));var fF;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Mo.MessageDirection.clientToServer,t.type=new Mo.ProtocolRequestType(t.method)})(fF=pn.TypeHierarchySubtypesRequest||(pn.TypeHierarchySubtypesRequest={}))});var CA=d(Yi=>{"use strict";Object.defineProperty(Yi,"__esModule",{value:!0});Yi.InlineValueRefreshRequest=Yi.InlineValueRequest=void 0;var Tc=lt(),dF;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Tc.MessageDirection.clientToServer,t.type=new Tc.ProtocolRequestType(t.method)})(dF=Yi.InlineValueRequest||(Yi.InlineValueRequest={}));var pF;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Tc.MessageDirection.clientToServer,t.type=new Tc.ProtocolRequestType0(t.method)})(pF=Yi.InlineValueRefreshRequest||(Yi.InlineValueRefreshRequest={}))});var SA=d(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.InlayHintRefreshRequest=hn.InlayHintResolveRequest=hn.InlayHintRequest=void 0;var Fo=lt(),hF;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Fo.MessageDirection.clientToServer,t.type=new Fo.ProtocolRequestType(t.method)})(hF=hn.InlayHintRequest||(hn.InlayHintRequest={}));var mF;(function(t){t.method="inlayHint/resolve",t.messageDirection=Fo.MessageDirection.clientToServer,t.type=new Fo.ProtocolRequestType(t.method)})(mF=hn.InlayHintResolveRequest||(hn.InlayHintResolveRequest={}));var yF;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Fo.MessageDirection.clientToServer,t.type=new Fo.ProtocolRequestType0(t.method)})(yF=hn.InlayHintRefreshRequest||(hn.InlayHintRefreshRequest={}))});var PA=d(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var EA=_i(),gF=hc(),jo=lt(),vF;(function(t){function e(r){let n=r;return n&&gF.boolean(n.retriggerRequest)}t.is=e})(vF=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var TF;(function(t){t.Full="full",t.Unchanged="unchanged"})(TF=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var _F;(function(t){t.method="textDocument/diagnostic",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method),t.partialResult=new EA.ProgressType})(_F=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var RF;(function(t){t.method="workspace/diagnostic",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method),t.partialResult=new EA.ProgressType})(RF=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var AF;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType0(t.method)})(AF=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var kA=d(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.DidCloseNotebookDocumentNotification=Ae.DidSaveNotebookDocumentNotification=Ae.DidChangeNotebookDocumentNotification=Ae.NotebookCellArrayChange=Ae.DidOpenNotebookDocumentNotification=Ae.NotebookDocumentSyncRegistrationType=Ae.NotebookDocument=Ae.NotebookCell=Ae.ExecutionSummary=Ae.NotebookCellKind=void 0;var Iu=$o(),mn=hc(),Ln=lt(),wA;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(wA=Ae.NotebookCellKind||(Ae.NotebookCellKind={}));var NA;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return mn.objectLiteral(a)&&Iu.uinteger.is(a.executionOrder)&&(a.success===void 0||mn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(NA=Ae.ExecutionSummary||(Ae.ExecutionSummary={}));var Pm;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return mn.objectLiteral(o)&&wA.is(o.kind)&&Iu.DocumentUri.is(o.document)&&(o.metadata===void 0||mn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!NA.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(mn.objectLiteral(a)&&mn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(a[m],o[m]))return!1}}return!0}})(Pm=Ae.NotebookCell||(Ae.NotebookCell={}));var bF;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return mn.objectLiteral(i)&&mn.string(i.uri)&&Iu.integer.is(i.version)&&mn.typedArray(i.cells,Pm.is)}t.is=r})(bF=Ae.NotebookDocument||(Ae.NotebookDocument={}));var $u;(function(t){t.method="notebookDocument/sync",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.RegistrationType(t.method)})($u=Ae.NotebookDocumentSyncRegistrationType||(Ae.NotebookDocumentSyncRegistrationType={}));var CF;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=$u.method})(CF=Ae.DidOpenNotebookDocumentNotification||(Ae.DidOpenNotebookDocumentNotification={}));var SF;(function(t){function e(n){let i=n;return mn.objectLiteral(i)&&Iu.uinteger.is(i.start)&&Iu.uinteger.is(i.deleteCount)&&(i.cells===void 0||mn.typedArray(i.cells,Pm.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(SF=Ae.NotebookCellArrayChange||(Ae.NotebookCellArrayChange={}));var EF;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=$u.method})(EF=Ae.DidChangeNotebookDocumentNotification||(Ae.DidChangeNotebookDocumentNotification={}));var PF;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=$u.method})(PF=Ae.DidSaveNotebookDocumentNotification||(Ae.DidSaveNotebookDocumentNotification={}));var wF;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Ln.MessageDirection.clientToServer,t.type=new Ln.ProtocolNotificationType(t.method),t.registrationMethod=$u.method})(wF=Ae.DidCloseNotebookDocumentNotification||(Ae.DidCloseNotebookDocumentNotification={}))});var FA=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var F=lt(),xA=$o(),Bt=hc(),NF=eA();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return NF.ImplementationRequest}});var kF=rA();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return kF.TypeDefinitionRequest}});var OA=nA();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return OA.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return OA.DidChangeWorkspaceFoldersNotification}});var xF=aA();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return xF.ConfigurationRequest}});var DA=oA();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return DA.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return DA.ColorPresentationRequest}});var OF=uA();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return OF.FoldingRangeRequest}});var DF=cA();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return DF.DeclarationRequest}});var IF=dA();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return IF.SelectionRangeRequest}});var wm=pA();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return wm.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return wm.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return wm.WorkDoneProgressCancelNotification}});var Nm=hA();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Nm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Nm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Nm.CallHierarchyPrepareRequest}});var Go=mA();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return Go.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return Go.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Go.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Go.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Go.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Go.SemanticTokensRegistrationType}});var $F=gA();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return $F.ShowDocumentRequest}});var qF=TA();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return qF.LinkedEditingRangeRequest}});var ja=_A();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return ja.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return ja.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return ja.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return ja.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return ja.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return ja.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return ja.WillDeleteFilesRequest}});var km=AA();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return km.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return km.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return km.MonikerRequest}});var xm=bA();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return xm.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySupertypesRequest}});var IA=CA();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return IA.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return IA.InlineValueRefreshRequest}});var Om=SA();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return Om.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Om.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Om.InlayHintRefreshRequest}});var qu=PA();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return qu.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return qu.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return qu.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return qu.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return qu.DiagnosticRefreshRequest}});var Mn=kA();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return Mn.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return Mn.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return Mn.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return Mn.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Mn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Mn.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Mn.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Mn.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Mn.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Mn.DidCloseNotebookDocumentNotification}});var $A;(function(t){function e(r){let n=r;return Bt.string(n.language)||Bt.string(n.scheme)||Bt.string(n.pattern)}t.is=e})($A=T.TextDocumentFilter||(T.TextDocumentFilter={}));var qA;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebookType)||Bt.string(n.scheme)||Bt.string(n.pattern))}t.is=e})(qA=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var LA;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebook)||qA.is(n.notebook))&&(n.language===void 0||Bt.string(n.language))}t.is=e})(LA=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var MA;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Bt.string(n)&&!$A.is(n)&&!LA.is(n))return!1;return!0}t.is=e})(MA=T.DocumentSelector||(T.DocumentSelector={}));var LF;(function(t){t.method="client/registerCapability",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolRequestType(t.method)})(LF=T.RegistrationRequest||(T.RegistrationRequest={}));var MF;(function(t){t.method="client/unregisterCapability",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolRequestType(t.method)})(MF=T.UnregistrationRequest||(T.UnregistrationRequest={}));var FF;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(FF=T.ResourceOperationKind||(T.ResourceOperationKind={}));var jF;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(jF=T.FailureHandlingKind||(T.FailureHandlingKind={}));var GF;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(GF=T.PositionEncodingKind||(T.PositionEncodingKind={}));var UF;(function(t){function e(r){let n=r;return n&&Bt.string(n.id)&&n.id.length>0}t.hasId=e})(UF=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var HF;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||MA.is(n.documentSelector))}t.is=e})(HF=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var KF;(function(t){function e(n){let i=n;return Bt.objectLiteral(i)&&(i.workDoneProgress===void 0||Bt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Bt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(KF=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var WF;(function(t){t.method="initialize",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(WF=T.InitializeRequest||(T.InitializeRequest={}));var BF;(function(t){t.unknownProtocolVersion=1})(BF=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var VF;(function(t){t.method="initialized",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(VF=T.InitializedNotification||(T.InitializedNotification={}));var zF;(function(t){t.method="shutdown",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType0(t.method)})(zF=T.ShutdownRequest||(T.ShutdownRequest={}));var YF;(function(t){t.method="exit",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType0(t.method)})(YF=T.ExitNotification||(T.ExitNotification={}));var XF;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(XF=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var JF;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(JF=T.MessageType||(T.MessageType={}));var QF;(function(t){t.method="window/showMessage",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolNotificationType(t.method)})(QF=T.ShowMessageNotification||(T.ShowMessageNotification={}));var ZF;(function(t){t.method="window/showMessageRequest",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolRequestType(t.method)})(ZF=T.ShowMessageRequest||(T.ShowMessageRequest={}));var ej;(function(t){t.method="window/logMessage",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolNotificationType(t.method)})(ej=T.LogMessageNotification||(T.LogMessageNotification={}));var tj;(function(t){t.method="telemetry/event",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolNotificationType(t.method)})(tj=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var rj;(function(t){t.None=0,t.Full=1,t.Incremental=2})(rj=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var nj;(function(t){t.method="textDocument/didOpen",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(nj=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var ij;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(ij=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var aj;(function(t){t.method="textDocument/didChange",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(aj=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var oj;(function(t){t.method="textDocument/didClose",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(oj=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var sj;(function(t){t.method="textDocument/didSave",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(sj=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var uj;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(uj=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var lj;(function(t){t.method="textDocument/willSave",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(lj=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var cj;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(cj=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var fj;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolNotificationType(t.method)})(fj=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var dj;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(dj=T.FileChangeType||(T.FileChangeType={}));var pj;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(xA.URI.is(n.baseUri)||xA.WorkspaceFolder.is(n.baseUri))&&Bt.string(n.pattern)}t.is=e})(pj=T.RelativePattern||(T.RelativePattern={}));var hj;(function(t){t.Create=1,t.Change=2,t.Delete=4})(hj=T.WatchKind||(T.WatchKind={}));var mj;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolNotificationType(t.method)})(mj=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var yj;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(yj=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var gj;(function(t){t.method="textDocument/completion",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(gj=T.CompletionRequest||(T.CompletionRequest={}));var vj;(function(t){t.method="completionItem/resolve",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(vj=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var Tj;(function(t){t.method="textDocument/hover",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Tj=T.HoverRequest||(T.HoverRequest={}));var _j;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(_j=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var Rj;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Rj=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var Aj;(function(t){t.method="textDocument/definition",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Aj=T.DefinitionRequest||(T.DefinitionRequest={}));var bj;(function(t){t.method="textDocument/references",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(bj=T.ReferencesRequest||(T.ReferencesRequest={}));var Cj;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Cj=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var Sj;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Sj=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var Ej;(function(t){t.method="textDocument/codeAction",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Ej=T.CodeActionRequest||(T.CodeActionRequest={}));var Pj;(function(t){t.method="codeAction/resolve",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Pj=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var wj;(function(t){t.method="workspace/symbol",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(wj=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var Nj;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Nj=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var kj;(function(t){t.method="textDocument/codeLens",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(kj=T.CodeLensRequest||(T.CodeLensRequest={}));var xj;(function(t){t.method="codeLens/resolve",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(xj=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var Oj;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolRequestType0(t.method)})(Oj=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var Dj;(function(t){t.method="textDocument/documentLink",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Dj=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var Ij;(function(t){t.method="documentLink/resolve",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Ij=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var $j;(function(t){t.method="textDocument/formatting",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})($j=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var qj;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(qj=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var Lj;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Lj=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var Mj;(function(t){t.Identifier=1})(Mj=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var Fj;(function(t){t.method="textDocument/rename",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Fj=T.RenameRequest||(T.RenameRequest={}));var jj;(function(t){t.method="textDocument/prepareRename",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(jj=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var Gj;(function(t){t.method="workspace/executeCommand",t.messageDirection=F.MessageDirection.clientToServer,t.type=new F.ProtocolRequestType(t.method)})(Gj=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var Uj;(function(t){t.method="workspace/applyEdit",t.messageDirection=F.MessageDirection.serverToClient,t.type=new F.ProtocolRequestType("workspace/applyEdit")})(Uj=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var GA=d(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.createProtocolConnection=void 0;var jA=_i();function Hj(t,e,r,n){return jA.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,jA.createMessageConnection)(t,e,r,n)}_c.createProtocolConnection=Hj});var UA=d(lr=>{"use strict";var Kj=lr&&lr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Rc=lr&&lr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Kj(e,t,r)};Object.defineProperty(lr,"__esModule",{value:!0});lr.LSPErrorCodes=lr.createProtocolConnection=void 0;Rc(_i(),lr);Rc($o(),lr);Rc(lt(),lr);Rc(FA(),lr);var Wj=GA();Object.defineProperty(lr,"createProtocolConnection",{enumerable:!0,get:function(){return Wj.createProtocolConnection}});var Bj;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(Bj=lr.LSPErrorCodes||(lr.LSPErrorCodes={}))});var bt=d(Fn=>{"use strict";var Vj=Fn&&Fn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),HA=Fn&&Fn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Vj(e,t,r)};Object.defineProperty(Fn,"__esModule",{value:!0});Fn.createProtocolConnection=void 0;var zj=Rm();HA(Rm(),Fn);HA(UA(),Fn);function Yj(t,e,r,n){return(0,zj.createMessageConnection)(t,e,r,n)}Fn.createProtocolConnection=Yj});var Im=d(Xi=>{"use strict";Object.defineProperty(Xi,"__esModule",{value:!0});Xi.SemanticTokensBuilder=Xi.SemanticTokensDiff=Xi.SemanticTokensFeature=void 0;var Ac=bt(),Xj=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Ac.SemanticTokensRefreshRequest.type),on:e=>{let r=Ac.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Ac.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Ac.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Xi.SemanticTokensFeature=Xj;var bc=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Xi.SemanticTokensDiff=bc;var Dm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new bc(this._prevData,this._data).computeDiff()}:this.build()}};Xi.SemanticTokensBuilder=Dm});var qm=d(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.TextDocuments=void 0;var Ga=bt(),$m=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new Ga.Emitter,this._onDidOpen=new Ga.Emitter,this._onDidClose=new Ga.Emitter,this._onDidSave=new Ga.Emitter,this._onWillSave=new Ga.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=Ga.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),Ga.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Cc.TextDocuments=$m});var Mm=d(Uo=>{"use strict";Object.defineProperty(Uo,"__esModule",{value:!0});Uo.NotebookDocuments=Uo.NotebookSyncFeature=void 0;var Fr=bt(),KA=qm(),Jj=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Fr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Fr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Fr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Fr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Uo.NotebookSyncFeature=Jj;var Ji=class{onDidOpenTextDocument(e){return this.openHandler=e,Fr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Fr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Fr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return Ji.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return Ji.NULL_DISPOSE}onDidSaveTextDocument(){return Ji.NULL_DISPOSE}};Ji.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Lm=class{constructor(e){e instanceof KA.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new KA.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Fr.Emitter,this._onDidChange=new Fr.Emitter,this._onDidSave=new Fr.Emitter,this._onDidClose=new Fr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Ji,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],m=[];if(u.cells!==void 0){let w=u.cells;if(w.structure!==void 0){let C=w.structure.array;if(a.cells.splice(C.start,C.deleteCount,...C.cells!==void 0?C.cells:[]),w.structure.didOpen!==void 0)for(let b of w.structure.didOpen)r.openTextDocument({textDocument:b}),l.push(b.uri);if(w.structure.didClose)for(let b of w.structure.didClose)r.closeTextDocument({textDocument:b}),c.push(b.uri)}if(w.data!==void 0){let C=new Map(w.data.map(b=>[b.document,b]));for(let b=0;b<=a.cells.length;b++){let O=C.get(a.cells[b].document);if(O!==void 0){let L=a.cells.splice(b,1,O);if(f.push({old:L[0],new:O}),C.delete(O.document),C.size===0)break}}}if(w.textContent!==void 0)for(let C of w.textContent)r.changeTextDocument({textDocument:C.document,contentChanges:C.changes}),m.push(C.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let w of l)y.push(this.getNotebookCell(w));let A=[];for(let w of c)A.push(this.getNotebookCell(w));let P=[];for(let w of m)P.push(this.getNotebookCell(w));(y.length>0||A.length>0||f.length>0||P.length>0)&&(v.cells={added:y,removed:A,changed:{data:f,textContent:P}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),Fr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Uo.NotebookDocuments=Lm});var Fm=d(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.thenable=Ct.typedArray=Ct.stringArray=Ct.array=Ct.func=Ct.error=Ct.number=Ct.string=Ct.boolean=void 0;function Qj(t){return t===!0||t===!1}Ct.boolean=Qj;function WA(t){return typeof t=="string"||t instanceof String}Ct.string=WA;function Zj(t){return typeof t=="number"||t instanceof Number}Ct.number=Zj;function eG(t){return t instanceof Error}Ct.error=eG;function BA(t){return typeof t=="function"}Ct.func=BA;function VA(t){return Array.isArray(t)}Ct.array=VA;function tG(t){return VA(t)&&t.every(e=>WA(e))}Ct.stringArray=tG;function rG(t,e){return Array.isArray(t)&&t.every(e)}Ct.typedArray=rG;function nG(t){return t&&BA(t.then)}Ct.thenable=nG});var jm=d(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.generateUuid=jr.parse=jr.isUUID=jr.v4=jr.empty=void 0;var Lu=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},se=class extends Lu{constructor(){super([se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),"-",se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),"-","4",se._randomHex(),se._randomHex(),se._randomHex(),"-",se._oneOf(se._timeHighBits),se._randomHex(),se._randomHex(),se._randomHex(),"-",se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex(),se._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return se._oneOf(se._chars)}};se._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];se._timeHighBits=["8","9","a","b"];jr.empty=new Lu("00000000-0000-0000-0000-000000000000");function zA(){return new se}jr.v4=zA;var iG=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function YA(t){return iG.test(t)}jr.isUUID=YA;function aG(t){if(!YA(t))throw new Error("invalid uuid");return new Lu(t)}jr.parse=aG;function oG(){return zA().asHex()}jr.generateUuid=oG});var XA=d(Zi=>{"use strict";Object.defineProperty(Zi,"__esModule",{value:!0});Zi.attachPartialResult=Zi.ProgressFeature=Zi.attachWorkDone=void 0;var Qi=bt(),sG=jm(),jn=class{constructor(e,r){this._connection=e,this._token=r,jn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Qi.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Qi.WorkDoneProgress.type,this._token,n)}done(){jn.Instances.delete(this._token),this._connection.sendProgress(Qi.WorkDoneProgress.type,this._token,{kind:"end"})}};jn.Instances=new Map;var Sc=class extends jn{constructor(e,r){super(e,r),this._source=new Qi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Mu=class{constructor(){}begin(){}report(){}done(){}},Ec=class extends Mu{constructor(){super(),this._source=new Qi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function uG(t,e){if(e===void 0||e.workDoneToken===void 0)return new Mu;let r=e.workDoneToken;return delete e.workDoneToken,new jn(t,r)}Zi.attachWorkDone=uG;var lG=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Qi.WorkDoneProgressCancelNotification.type,r=>{let n=jn.Instances.get(r.token);(n instanceof Sc||n instanceof Ec)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Mu:new jn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,sG.generateUuid)();return this.connection.sendRequest(Qi.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Sc(this.connection,e))}else return Promise.resolve(new Ec)}};Zi.ProgressFeature=lG;var Gm;(function(t){t.type=new Qi.ProgressType})(Gm||(Gm={}));var Um=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Gm.type,this._token,e)}};function cG(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Um(t,r)}Zi.attachPartialResult=cG});var JA=d(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.ConfigurationFeature=void 0;var fG=bt(),dG=Fm(),pG=t=>class extends t{getConfiguration(e){return e?dG.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(fG.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Pc.ConfigurationFeature=pG});var QA=d(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.WorkspaceFoldersFeature=void 0;var wc=bt(),hG=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new wc.Emitter,this.connection.onNotification(wc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(wc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(wc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Nc.WorkspaceFoldersFeature=hG});var ZA=d(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.CallHierarchyFeature=void 0;var Hm=bt(),mG=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Hm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Hm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Hm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};kc.CallHierarchyFeature=mG});var eb=d(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.ShowDocumentFeature=void 0;var yG=bt(),gG=t=>class extends t{showDocument(e){return this.connection.sendRequest(yG.ShowDocumentRequest.type,e)}};xc.ShowDocumentFeature=gG});var tb=d(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.FileOperationsFeature=void 0;var Ho=bt(),vG=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Ho.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Ho.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Ho.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Ho.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Ho.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Ho.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Oc.FileOperationsFeature=vG});var rb=d(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.LinkedEditingRangeFeature=void 0;var TG=bt(),_G=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(TG.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Dc.LinkedEditingRangeFeature=_G});var nb=d(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.TypeHierarchyFeature=void 0;var Km=bt(),RG=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Km.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Km.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Km.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ic.TypeHierarchyFeature=RG});var ab=d($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.InlineValueFeature=void 0;var ib=bt(),AG=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(ib.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(ib.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};$c.InlineValueFeature=AG});var ob=d(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.InlayHintFeature=void 0;var Wm=bt(),bG=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Wm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Wm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Wm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};qc.InlayHintFeature=bG});var sb=d(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.DiagnosticFeature=void 0;var Fu=bt(),CG=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Fu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Fu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Fu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Fu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Fu.WorkspaceDiagnosticRequest.partialResult,r)))}}};Lc.DiagnosticFeature=CG});var ub=d(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.MonikerFeature=void 0;var SG=bt(),EG=t=>class extends t{get moniker(){return{on:e=>{let r=SG.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Mc.MonikerFeature=EG});var Rb=d(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.createConnection=Te.combineFeatures=Te.combineNotebooksFeatures=Te.combineLanguagesFeatures=Te.combineWorkspaceFeatures=Te.combineWindowFeatures=Te.combineClientFeatures=Te.combineTracerFeatures=Te.combineTelemetryFeatures=Te.combineConsoleFeatures=Te._NotebooksImpl=Te._LanguagesImpl=Te.BulkUnregistration=Te.BulkRegistration=Te.ErrorMessageTracker=void 0;var H=bt(),Gr=Fm(),Vm=jm(),re=XA(),PG=JA(),wG=QA(),NG=ZA(),kG=Im(),xG=eb(),OG=tb(),DG=rb(),IG=nb(),$G=ab(),qG=ob(),LG=sb(),MG=Mm(),FG=ub();function Bm(t){if(t!==null)return t}var zm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};Te.ErrorMessageTracker=zm;var Fc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},Ym=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Bm)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Bm)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Bm)}},lb=(0,xG.ShowDocumentFeature)((0,re.ProgressFeature)(Ym)),jG;(function(t){function e(){return new jc}t.create=e})(jG=Te.BulkRegistration||(Te.BulkRegistration={}));var jc=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Gr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Vm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},GG;(function(t){function e(){return new ju(void 0,[])}t.create=e})(GG=Te.BulkUnregistration||(Te.BulkUnregistration={}));var ju=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Gr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Gc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof jc?this.registerMany(e):e instanceof ju?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Gr.string(r)?r:r.method,a=Vm.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Gr.string(e)?e:e.method,i=Vm.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new ju(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Xm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},cb=(0,OG.FileOperationsFeature)((0,wG.WorkspaceFoldersFeature)((0,PG.ConfigurationFeature)(Xm))),Uc=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},Hc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Kc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};Te._LanguagesImpl=Kc;var fb=(0,FG.MonikerFeature)((0,LG.DiagnosticFeature)((0,qG.InlayHintFeature)((0,$G.InlineValueFeature)((0,IG.TypeHierarchyFeature)((0,DG.LinkedEditingRangeFeature)((0,kG.SemanticTokensFeature)((0,NG.CallHierarchyFeature)(Kc)))))))),Wc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};Te._NotebooksImpl=Wc;var db=(0,MG.NotebookSyncFeature)(Wc);function pb(t,e){return function(r){return e(t(r))}}Te.combineConsoleFeatures=pb;function hb(t,e){return function(r){return e(t(r))}}Te.combineTelemetryFeatures=hb;function mb(t,e){return function(r){return e(t(r))}}Te.combineTracerFeatures=mb;function yb(t,e){return function(r){return e(t(r))}}Te.combineClientFeatures=yb;function gb(t,e){return function(r){return e(t(r))}}Te.combineWindowFeatures=gb;function vb(t,e){return function(r){return e(t(r))}}Te.combineWorkspaceFeatures=vb;function Tb(t,e){return function(r){return e(t(r))}}Te.combineLanguagesFeatures=Tb;function _b(t,e){return function(r){return e(t(r))}}Te.combineNotebooksFeatures=_b;function UG(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,pb),tracer:r(t.tracer,e.tracer,mb),telemetry:r(t.telemetry,e.telemetry,hb),client:r(t.client,e.client,yb),window:r(t.window,e.window,gb),workspace:r(t.workspace,e.workspace,vb),languages:r(t.languages,e.languages,Tb),notebooks:r(t.notebooks,e.notebooks,_b)}}Te.combineFeatures=UG;function HG(t,e,r){let n=r&&r.console?new(r.console(Fc)):new Fc,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(Uc)):new Uc,o=r&&r.telemetry?new(r.telemetry(Hc)):new Hc,s=r&&r.client?new(r.client(Gc)):new Gc,u=r&&r.window?new(r.window(lb)):new lb,l=r&&r.workspace?new(r.workspace(cb)):new cb,c=r&&r.languages?new(r.languages(fb)):new fb,f=r&&r.notebooks?new(r.notebooks(db)):new db,m=[n,a,o,s,u,l,c,f];function v(C){return C instanceof Promise?C:Gr.thenable(C)?new Promise((b,O)=>{C.then(L=>b(L),L=>O(L))}):Promise.resolve(C)}let y,A,P,w={listen:()=>i.listen(),sendRequest:(C,...b)=>i.sendRequest(Gr.string(C)?C:C.method,...b),onRequest:(C,b)=>i.onRequest(C,b),sendNotification:(C,b)=>{let O=Gr.string(C)?C:C.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,b)},onNotification:(C,b)=>i.onNotification(C,b),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:C=>(A=C,{dispose:()=>{A=void 0}}),onInitialized:C=>i.onNotification(H.InitializedNotification.type,C),onShutdown:C=>(y=C,{dispose:()=>{y=void 0}}),onExit:C=>(P=C,{dispose:()=>{P=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:C=>i.onNotification(H.DidChangeConfigurationNotification.type,C),onDidChangeWatchedFiles:C=>i.onNotification(H.DidChangeWatchedFilesNotification.type,C),__textDocumentSync:void 0,onDidOpenTextDocument:C=>i.onNotification(H.DidOpenTextDocumentNotification.type,C),onDidChangeTextDocument:C=>i.onNotification(H.DidChangeTextDocumentNotification.type,C),onDidCloseTextDocument:C=>i.onNotification(H.DidCloseTextDocumentNotification.type,C),onWillSaveTextDocument:C=>i.onNotification(H.WillSaveTextDocumentNotification.type,C),onWillSaveTextDocumentWaitUntil:C=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,C),onDidSaveTextDocument:C=>i.onNotification(H.DidSaveTextDocumentNotification.type,C),sendDiagnostics:C=>i.sendNotification(H.PublishDiagnosticsNotification.type,C),onHover:C=>i.onRequest(H.HoverRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),void 0)),onCompletion:C=>i.onRequest(H.CompletionRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onCompletionResolve:C=>i.onRequest(H.CompletionResolveRequest.type,C),onSignatureHelp:C=>i.onRequest(H.SignatureHelpRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),void 0)),onDeclaration:C=>i.onRequest(H.DeclarationRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onDefinition:C=>i.onRequest(H.DefinitionRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onTypeDefinition:C=>i.onRequest(H.TypeDefinitionRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onImplementation:C=>i.onRequest(H.ImplementationRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onReferences:C=>i.onRequest(H.ReferencesRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onDocumentHighlight:C=>i.onRequest(H.DocumentHighlightRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onDocumentSymbol:C=>i.onRequest(H.DocumentSymbolRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onWorkspaceSymbol:C=>i.onRequest(H.WorkspaceSymbolRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onWorkspaceSymbolResolve:C=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,C),onCodeAction:C=>i.onRequest(H.CodeActionRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onCodeActionResolve:C=>i.onRequest(H.CodeActionResolveRequest.type,(b,O)=>C(b,O)),onCodeLens:C=>i.onRequest(H.CodeLensRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onCodeLensResolve:C=>i.onRequest(H.CodeLensResolveRequest.type,(b,O)=>C(b,O)),onDocumentFormatting:C=>i.onRequest(H.DocumentFormattingRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),void 0)),onDocumentRangeFormatting:C=>i.onRequest(H.DocumentRangeFormattingRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),void 0)),onDocumentOnTypeFormatting:C=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(b,O)=>C(b,O)),onRenameRequest:C=>i.onRequest(H.RenameRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),void 0)),onPrepareRename:C=>i.onRequest(H.PrepareRenameRequest.type,(b,O)=>C(b,O)),onDocumentLinks:C=>i.onRequest(H.DocumentLinkRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onDocumentLinkResolve:C=>i.onRequest(H.DocumentLinkResolveRequest.type,(b,O)=>C(b,O)),onDocumentColor:C=>i.onRequest(H.DocumentColorRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onColorPresentation:C=>i.onRequest(H.ColorPresentationRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onFoldingRanges:C=>i.onRequest(H.FoldingRangeRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onSelectionRanges:C=>i.onRequest(H.SelectionRangeRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),(0,re.attachPartialResult)(i,b))),onExecuteCommand:C=>i.onRequest(H.ExecuteCommandRequest.type,(b,O)=>C(b,O,(0,re.attachWorkDone)(i,b),void 0)),dispose:()=>i.dispose()};for(let C of m)C.attach(w);return i.onRequest(H.InitializeRequest.type,C=>{e.initialize(C),Gr.string(C.trace)&&(a.trace=H.Trace.fromString(C.trace));for(let b of m)b.initialize(C.capabilities);if(A){let b=A(C,new H.CancellationTokenSource().token,(0,re.attachWorkDone)(i,C),void 0);return v(b).then(O=>{if(O instanceof H.ResponseError)return O;let L=O;L||(L={capabilities:{}});let W=L.capabilities;W||(W={},L.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Gr.number(w.__textDocumentSync)?w.__textDocumentSync:H.TextDocumentSyncKind.None:!Gr.number(W.textDocumentSync)&&!Gr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Gr.number(w.__textDocumentSync)?w.__textDocumentSync:H.TextDocumentSyncKind.None);for(let ee of m)ee.fillServerCapabilities(W);return L})}else{let b={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of m)O.fillServerCapabilities(b.capabilities);return b}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{P&&P()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,C=>{a.trace=H.Trace.fromString(C.value)}),w}Te.createConnection=HG});var Jm=d(Vt=>{"use strict";var KG=Vt&&Vt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ab=Vt&&Vt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&KG(e,t,r)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var WG=Im();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return WG.SemanticTokensBuilder}});Ab(bt(),Vt);var BG=qm();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return BG.TextDocuments}});var VG=Mm();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return VG.NotebookDocuments}});Ab(Rb(),Vt);var zG;(function(t){t.all={__brand:"features"}})(zG=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var Cb=d((ppe,bb)=>{"use strict";bb.exports=bt()});var $e=d(Gn=>{"use strict";var YG=Gn&&Gn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Eb=Gn&&Gn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&YG(e,t,r)};Object.defineProperty(Gn,"__esModule",{value:!0});Gn.createConnection=void 0;var Bc=Jm();Eb(Cb(),Gn);Eb(Jm(),Gn);var Sb=!1,XG={initialize:t=>{},get shutdownReceived(){return Sb},set shutdownReceived(t){Sb=t},exit:t=>{}};function JG(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Bc.ConnectionStrategy.is(t)||Bc.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,Bc.createProtocolConnection)(a,o,l,s);return(0,Bc.createConnection)(u,XG,i)}Gn.createConnection=JG});var Qm=d((zc,Vc)=>{var QG=zc&&zc.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof Vc=="object"&&typeof Vc.exports=="object"){var e=t(ac,zc);e!==void 0&&(Vc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,m){this._uri=l,this._languageId=c,this._version=f,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,m=l;f<m.length;f++){var v=m[f];if(u.isIncremental(v)){var y=o(v.range),A=this.offsetAt(y.start),P=this.offsetAt(y.end);this._content=this._content.substring(0,A)+v.text+this._content.substring(P,this._content.length);var w=Math.max(y.start.line,0),C=Math.max(y.end.line,0),b=this._lineOffsets,O=a(v.text,!1,A);if(C-w===O.length)for(var L=0,W=O.length;L<W;L++)b[L+w+1]=O[L];else O.length<1e4?b.splice.apply(b,QG([w+1,C-w],O,!1)):this._lineOffsets=b=b.slice(0,w+1).concat(O,b.slice(C+1));var ee=v.text.length-(P-A);if(ee!==0)for(var L=w+1+O.length,W=b.length;L<W;L++)b[L]=b[L]+ee}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,m=c.length;if(m===0)return{line:0,character:l};for(;f<m;){var v=Math.floor((f+m)/2);c[v]>l?m=v:f=v+1}var y=f-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],m=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,m),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(m,v,y,A){return new r(m,v,y,A)}u.create=l;function c(m,v,y){if(m instanceof r)return m.update(v,y),m;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(m,v){for(var y=m.getText(),A=i(v.map(s),function(W,ee){var Ne=W.range.start.line-ee.range.start.line;return Ne===0?W.range.start.character-ee.range.start.character:Ne}),P=0,w=[],C=0,b=A;C<b.length;C++){var O=b[C],L=m.offsetAt(O.range.start);if(L<P)throw new Error("Overlapping edit");L>P&&w.push(y.substring(P,L)),O.newText.length&&w.push(O.newText),P=m.offsetAt(O.range.end)}return w.push(y.substr(P)),w.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),m=u.slice(c);i(f,l),i(m,l);for(var v=0,y=0,A=0;v<f.length&&y<m.length;){var P=l(f[v],m[y]);P<=0?u[A++]=f[v++]:u[A++]=m[y++]}for(;v<f.length;)u[A++]=f[v++];for(;y<m.length;)u[A++]=m[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],m=0;m<u.length;m++){var v=u.charCodeAt(m);(v===13||v===10)&&(v===13&&m+1<u.length&&u.charCodeAt(m+1)===10&&m++,f.push(c+m+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var er=d(Mt=>{"use strict";Object.defineProperty(Mt,"__esModule",{value:!0});Mt.isRootCstNode=Mt.isLeafCstNode=Mt.isCompositeCstNode=Mt.AbstractAstReflection=Mt.isLinkingError=Mt.isAstNodeDescription=Mt.isReference=Mt.isAstNode=void 0;function ey(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}Mt.isAstNode=ey;function Pb(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}Mt.isReference=Pb;function ZG(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}Mt.isAstNodeDescription=ZG;function eU(t){return typeof t=="object"&&t!==null&&ey(t.container)&&Pb(t.reference)&&typeof t.message=="string"}Mt.isLinkingError=eU;var Zm=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return ey(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let a of n)this.isSubtype(a,e)&&i.push(a);return this.allSubtypes[e]=i,i}}};Mt.AbstractAstReflection=Zm;function wb(t){return typeof t=="object"&&t!==null&&"children"in t}Mt.isCompositeCstNode=wb;function tU(t){return typeof t=="object"&&t!==null&&"tokenType"in t}Mt.isLeafCstNode=tU;function rU(t){return wb(t)&&"fullText"in t}Mt.isRootCstNode=rU});var Ft=d(Ye=>{"use strict";Object.defineProperty(Ye,"__esModule",{value:!0});Ye.Reduction=Ye.TreeStreamImpl=Ye.stream=Ye.DONE_RESULT=Ye.EMPTY_STREAM=Ye.StreamImpl=void 0;var zt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new zt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return Ye.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=nU(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new zt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?Ye.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new zt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return Ye.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new zt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(Yc(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return Ye.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new zt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(Yc(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return Ye.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new zt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new zt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?Ye.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};Ye.StreamImpl=zt;function nU(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Yc(t){return!!t&&typeof t[Symbol.iterator]=="function"}Ye.EMPTY_STREAM=new zt(()=>{},()=>Ye.DONE_RESULT);Ye.DONE_RESULT=Object.freeze({done:!0,value:void 0});function iU(...t){if(t.length===1){let e=t[0];if(e instanceof zt)return e;if(Yc(e))return new zt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new zt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:Ye.DONE_RESULT)}return t.length>1?new zt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Yc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return Ye.DONE_RESULT}):Ye.EMPTY_STREAM}Ye.stream=iU;var ty=class extends zt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return Ye.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};Ye.TreeStreamImpl=ty;var aU;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(aU=Ye.Reduction||(Ye.Reduction={}))});var Le=d(le=>{"use strict";Object.defineProperty(le,"__esModule",{value:!0});le.getInteriorNodes=le.getStartlineNode=le.getNextNode=le.getPreviousNode=le.findLeafNodeAtOffset=le.isCommentNode=le.findCommentNode=le.findDeclarationNodeAtOffset=le.DefaultNameRegexp=le.inRange=le.compareRange=le.RangeComparison=le.toDocumentSegment=le.tokenToRange=le.isCstChildNode=le.flattenCst=le.streamCst=void 0;var Ko=er(),oU=Ft();function kb(t){return new oU.TreeStreamImpl(t,e=>(0,Ko.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}le.streamCst=kb;function sU(t){return kb(t).filter(Ko.isLeafCstNode)}le.flattenCst=sU;function uU(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}le.isCstChildNode=uU;function lU(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}le.tokenToRange=lU;function cU(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}le.toDocumentSegment=cU;var Ua;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Ua=le.RangeComparison||(le.RangeComparison={}));function xb(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Ua.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Ua.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Ua.Inside:r?Ua.OverlapBack:Ua.OverlapFront}le.compareRange=xb;function fU(t,e){return xb(t,e)>Ua.After}le.inRange=fU;le.DefaultNameRegexp=/^[\w\p{L}]$/u;function dU(t,e,r=le.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Xc(t,e)}}le.findDeclarationNodeAtOffset=dU;function pU(t,e){if(t){let r=Ob(t,!0);if(r&&ry(r,e))return r;if((0,Ko.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(ry(a,e))return a}}}}le.findCommentNode=pU;function ry(t,e){return(0,Ko.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}le.isCommentNode=ry;function Xc(t,e){if((0,Ko.isLeafCstNode)(t))return t;if((0,Ko.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return Xc(a,e)}if(r===n)return Xc(t.children[r],e)}}le.findLeafNodeAtOffset=Xc;function Ob(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);for(;n>0;){n--;let i=r.children[n];if(e||!i.hidden)return i}t=r}}le.getPreviousNode=Ob;function hU(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t),i=r.children.length-1;for(;n<i;){n++;let a=r.children[n];if(e||!a.hidden)return a}t=r}}le.getNextNode=hU;function mU(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}le.getStartlineNode=mU;function yU(t,e){let r=gU(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}le.getInteriorNodes=yU;function gU(t,e){let r=Nb(t),n=Nb(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function Nb(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var yn=d((Gu,ny)=>{(function(t,e){if(typeof Gu=="object"&&typeof ny=="object")ny.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof Gu=="object"?Gu:t)[n]=r[n]}})(Gu,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",m=0,v=-1,y=0,A=0;A<=u.length;++A){if(A<u.length)c=u.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(v===A-1||y===1))if(v!==A-1&&y===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var P=f.lastIndexOf("/");if(P!==f.length-1){P===-1?(f="",m=0):m=(f=f.slice(0,P)).length-1-f.lastIndexOf("/"),v=A,y=0;continue}}else if(f.length===2||f.length===1){f="",m=0,v=A,y=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+u.slice(v+1,A):f=u.slice(v+1,A),m=A-v-1;v=A,y=0}else c===46&&y!==-1?++y:y=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(u===void 0&&(u=process.cwd()),m=u),a(m),m.length!==0&&(l=m+"/"+l,c=m.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,m=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,A=m<y?m:y,P=-1,w=0;w<=A;++w){if(w===A){if(y>A){if(l.charCodeAt(v+w)===47)return l.slice(v+w+1);if(w===0)return l.slice(v+w)}else m>A&&(u.charCodeAt(c+w)===47?P=w:w===0&&(P=0));break}var C=u.charCodeAt(c+w);if(C!==l.charCodeAt(v+w))break;C===47&&(P=w)}var b="";for(w=c+P+1;w<=f;++w)w!==f&&u.charCodeAt(w)!==47||(b.length===0?b+="..":b+="/..");return b.length>0?b+l.slice(v+P):(v+=P,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,m=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!m){f=v;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,m=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,A=-1;for(c=u.length-1;c>=0;--c){var P=u.charCodeAt(c);if(P===47){if(!v){f=c+1;break}}else A===-1&&(v=!1,A=c+1),y>=0&&(P===l.charCodeAt(y)?--y==-1&&(m=c):(y=-1,m=A))}return f===m?m=A:m===-1&&(m=u.length),u.slice(f,m)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else m===-1&&(v=!1,m=c+1);return m===-1?"":u.slice(f,m)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,m=!0,v=0,y=u.length-1;y>=0;--y){var A=u.charCodeAt(y);if(A!==47)f===-1&&(m=!1,f=y+1),A===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!m){c=y+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),m=f===47;m?(l.root="/",c=1):c=0;for(var v=-1,y=0,A=-1,P=!0,w=u.length-1,C=0;w>=c;--w)if((f=u.charCodeAt(w))!==47)A===-1&&(P=!1,A=w+1),f===46?v===-1?v=w:C!==1&&(C=1):v!==-1&&(C=-1);else if(!P){y=w+1;break}return v===-1||A===-1||C===0||C===1&&v===A-1&&v===y+1?A!==-1&&(l.base=l.name=y===0&&m?u.slice(1,A):u.slice(y,A)):(y===0&&m?(l.name=u.slice(1,v),l.base=u.slice(1,A)):(l.name=u.slice(y,v),l.base=u.slice(y,A)),l.ext=u.slice(v,A)),y>0?l.dir=u.slice(0,y-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(M,q){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var ae in B)Object.prototype.hasOwnProperty.call(B,ae)&&(j[ae]=B[ae])},s(M,q)},function(M,q){if(typeof q!="function"&&q!==null)throw new TypeError("Class extends value "+String(q)+" is not a constructor or null");function j(){this.constructor=M}s(M,q),M.prototype=q===null?Object.create(q):(j.prototype=q.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,m=/^\//,v=/^\/\//;function y(M,q){if(!M.scheme&&q)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(M.authority,'", path: "').concat(M.path,'", query: "').concat(M.query,'", fragment: "').concat(M.fragment,'"}'));if(M.scheme&&!f.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!m.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var A="",P="/",w=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,C=function(){function M(q,j,B,ae,oe,Q){Q===void 0&&(Q=!1),typeof q=="object"?(this.scheme=q.scheme||A,this.authority=q.authority||A,this.path=q.path||A,this.query=q.query||A,this.fragment=q.fragment||A):(this.scheme=function(ft,rt){return ft||rt?ft:"file"}(q,Q),this.authority=j||A,this.path=function(ft,rt){switch(ft){case"https":case"http":case"file":rt?rt[0]!==P&&(rt=P+rt):rt=P}return rt}(this.scheme,B||A),this.query=ae||A,this.fragment=oe||A,y(this,Q))}return M.isUri=function(q){return q instanceof M||!!q&&typeof q.authority=="string"&&typeof q.fragment=="string"&&typeof q.path=="string"&&typeof q.query=="string"&&typeof q.scheme=="string"&&typeof q.fsPath=="string"&&typeof q.with=="function"&&typeof q.toString=="function"},Object.defineProperty(M.prototype,"fsPath",{get:function(){return Ne(this,!1)},enumerable:!1,configurable:!0}),M.prototype.with=function(q){if(!q)return this;var j=q.scheme,B=q.authority,ae=q.path,oe=q.query,Q=q.fragment;return j===void 0?j=this.scheme:j===null&&(j=A),B===void 0?B=this.authority:B===null&&(B=A),ae===void 0?ae=this.path:ae===null&&(ae=A),oe===void 0?oe=this.query:oe===null&&(oe=A),Q===void 0?Q=this.fragment:Q===null&&(Q=A),j===this.scheme&&B===this.authority&&ae===this.path&&oe===this.query&&Q===this.fragment?this:new O(j,B,ae,oe,Q)},M.parse=function(q,j){j===void 0&&(j=!1);var B=w.exec(q);return B?new O(B[2]||A,fe(B[4]||A),fe(B[5]||A),fe(B[7]||A),fe(B[9]||A),j):new O(A,A,A,A,A)},M.file=function(q){var j=A;if(c.isWindows&&(q=q.replace(/\\/g,P)),q[0]===P&&q[1]===P){var B=q.indexOf(P,2);B===-1?(j=q.substring(2),q=P):(j=q.substring(2,B),q=q.substring(B)||P)}return new O("file",j,q,A,A)},M.from=function(q){var j=new O(q.scheme,q.authority,q.path,q.query,q.fragment);return y(j,!0),j},M.prototype.toString=function(q){return q===void 0&&(q=!1),ke(this,q)},M.prototype.toJSON=function(){return this},M.revive=function(q){if(q){if(q instanceof M)return q;var j=new O(q);return j._formatted=q.external,j._fsPath=q._sep===b?q.fsPath:null,j}return q},M}();a.URI=C;var b=c.isWindows?1:void 0,O=function(M){function q(){var j=M!==null&&M.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(q,M),Object.defineProperty(q.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=Ne(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),q.prototype.toString=function(j){return j===void 0&&(j=!1),j?ke(this,!0):(this._formatted||(this._formatted=ke(this,!1)),this._formatted)},q.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=b),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},q}(C),L=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(M,q,j){for(var B=void 0,ae=-1,oe=0;oe<M.length;oe++){var Q=M.charCodeAt(oe);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||q&&Q===47||j&&Q===91||j&&Q===93||j&&Q===58)ae!==-1&&(B+=encodeURIComponent(M.substring(ae,oe)),ae=-1),B!==void 0&&(B+=M.charAt(oe));else{B===void 0&&(B=M.substr(0,oe));var ft=L[Q];ft!==void 0?(ae!==-1&&(B+=encodeURIComponent(M.substring(ae,oe)),ae=-1),B+=ft):ae===-1&&(ae=oe)}}return ae!==-1&&(B+=encodeURIComponent(M.substring(ae))),B!==void 0?B:M}function ee(M){for(var q=void 0,j=0;j<M.length;j++){var B=M.charCodeAt(j);B===35||B===63?(q===void 0&&(q=M.substr(0,j)),q+=L[B]):q!==void 0&&(q+=M[j])}return q!==void 0?q:M}function Ne(M,q){var j;return j=M.authority&&M.path.length>1&&M.scheme==="file"?"//".concat(M.authority).concat(M.path):M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?q?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function ke(M,q){var j=q?ee:W,B="",ae=M.scheme,oe=M.authority,Q=M.path,ft=M.query,rt=M.fragment;if(ae&&(B+=ae,B+=":"),(oe||ae==="file")&&(B+=P,B+=P),oe){var Ot=oe.indexOf("@");if(Ot!==-1){var tn=oe.substr(0,Ot);oe=oe.substr(Ot+1),(Ot=tn.lastIndexOf(":"))===-1?B+=j(tn,!1,!1):(B+=j(tn.substr(0,Ot),!1,!1),B+=":",B+=j(tn.substr(Ot+1),!1,!0)),B+="@"}(Ot=(oe=oe.toLowerCase()).lastIndexOf(":"))===-1?B+=j(oe,!1,!0):(B+=j(oe.substr(0,Ot),!1,!0),B+=oe.substr(Ot))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58)(Pr=Q.charCodeAt(1))>=65&&Pr<=90&&(Q="/".concat(String.fromCharCode(Pr+32),":").concat(Q.substr(3)));else if(Q.length>=2&&Q.charCodeAt(1)===58){var Pr;(Pr=Q.charCodeAt(0))>=65&&Pr<=90&&(Q="".concat(String.fromCharCode(Pr+32),":").concat(Q.substr(2)))}B+=j(Q,!0,!1)}return ft&&(B+="?",B+=j(ft,!1,!1)),rt&&(B+="#",B+=q?rt:W(rt,!1,!1)),B}function Qe(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+Qe(M.substr(3)):M}}a.uriToFsPath=Ne;var V=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function fe(M){return M.match(V)?M.replace(V,function(q){return Qe(q)}):M}},679:function(i,a,o){var s=this&&this.__spreadArray||function(m,v,y){if(y||arguments.length===2)for(var A,P=0,w=v.length;P<w;P++)!A&&P in v||(A||(A=Array.prototype.slice.call(v,0,P)),A[P]=v[P]);return m.concat(A||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return m.with({path:c.join.apply(c,s([m.path],v,!1))})},u.resolvePath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var A=m.path,P=!1;A[0]!==f&&(A=f+A,P=!0);var w=c.resolve.apply(c,s([A],v,!1));return P&&w[0]===f&&!m.authority&&(w=w.substring(1)),m.with({path:w})},u.dirname=function(m){if(m.path.length===0||m.path===f)return m;var v=c.dirname(m.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),m.with({path:v})},u.basename=function(m){return c.basename(m.path)},u.extname=function(m){return c.extname(m.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var Uu=d(Wo=>{"use strict";Object.defineProperty(Wo,"__esModule",{value:!0});Wo.eagerLoad=Wo.inject=void 0;function vU(t,e,r,n){let i=[t,e,r,n].reduce(Lb,{});return qb(i)}Wo.inject=vU;var iy=Symbol("isProxy");function $b(t){if(t&&t[iy])for(let e of Object.values(t))$b(e);return t}Wo.eagerLoad=$b;function qb(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>Ib(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(Ib(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),iy]});return r[iy]=!0,r}var Db=Symbol();function Ib(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===Db)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=Db;try{t[e]=typeof i=="function"?i(n):qb(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function Lb(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=Lb(i,n):t[r]=n}}return t}});var gn=d(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.MultiMap=void 0;var Bo=Ft(),ay=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Bo.Reduction.sum((0,Bo.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,Bo.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,Bo.stream)(this.map.keys())}values(){return(0,Bo.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,Bo.stream)(this.map.entries())}};Jc.MultiMap=ay});var xe=d(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isTypeAttribute=_.TypeAttribute=_.isType=_.Type=_.isTerminalRule=_.TerminalRule=_.isSimpleType=_.SimpleType=_.isReturnType=_.ReturnType=_.isReferenceType=_.ReferenceType=_.isParserRule=_.ParserRule=_.isParameterReference=_.ParameterReference=_.isParameter=_.Parameter=_.isNegation=_.Negation=_.isNamedArgument=_.NamedArgument=_.isLiteralCondition=_.LiteralCondition=_.isInterface=_.Interface=_.isInferredType=_.InferredType=_.isGrammarImport=_.GrammarImport=_.isGrammar=_.Grammar=_.isDisjunction=_.Disjunction=_.isConjunction=_.Conjunction=_.isArrayType=_.ArrayType=_.isAbstractElement=_.AbstractElement=_.isTypeDefinition=_.TypeDefinition=_.isPrimitiveType=_.isFeatureName=_.isCondition=_.Condition=_.isAbstractType=_.AbstractType=_.isAbstractRule=_.AbstractRule=void 0;_.reflection=_.LangiumGrammarAstReflection=_.isWildcard=_.Wildcard=_.isUntilToken=_.UntilToken=_.isUnorderedGroup=_.UnorderedGroup=_.isTerminalRuleCall=_.TerminalRuleCall=_.isTerminalGroup=_.TerminalGroup=_.isTerminalAlternatives=_.TerminalAlternatives=_.isRuleCall=_.RuleCall=_.isRegexToken=_.RegexToken=_.isNegatedToken=_.NegatedToken=_.isKeyword=_.Keyword=_.isGroup=_.Group=_.isCrossReference=_.CrossReference=_.isCharacterRange=_.CharacterRange=_.isAssignment=_.Assignment=_.isAlternatives=_.Alternatives=_.isAction=_.Action=_.isUnionType=_.UnionType=void 0;var TU=er();_.AbstractRule="AbstractRule";function _U(t){return _.reflection.isInstance(t,_.AbstractRule)}_.isAbstractRule=_U;_.AbstractType="AbstractType";function RU(t){return _.reflection.isInstance(t,_.AbstractType)}_.isAbstractType=RU;_.Condition="Condition";function AU(t){return _.reflection.isInstance(t,_.Condition)}_.isCondition=AU;function bU(t){return Mb(t)||t==="current"||t==="entry"||t==="extends"||t==="false"||t==="fragment"||t==="grammar"||t==="hidden"||t==="import"||t==="interface"||t==="returns"||t==="terminal"||t==="true"||t==="type"||t==="infer"||t==="infers"||t==="with"||typeof t=="string"&&/\^?[_a-zA-Z][\w_]*/.test(t)}_.isFeatureName=bU;function Mb(t){return t==="string"||t==="number"||t==="boolean"||t==="Date"||t==="bigint"}_.isPrimitiveType=Mb;_.TypeDefinition="TypeDefinition";function CU(t){return _.reflection.isInstance(t,_.TypeDefinition)}_.isTypeDefinition=CU;_.AbstractElement="AbstractElement";function SU(t){return _.reflection.isInstance(t,_.AbstractElement)}_.isAbstractElement=SU;_.ArrayType="ArrayType";function EU(t){return _.reflection.isInstance(t,_.ArrayType)}_.isArrayType=EU;_.Conjunction="Conjunction";function PU(t){return _.reflection.isInstance(t,_.Conjunction)}_.isConjunction=PU;_.Disjunction="Disjunction";function wU(t){return _.reflection.isInstance(t,_.Disjunction)}_.isDisjunction=wU;_.Grammar="Grammar";function NU(t){return _.reflection.isInstance(t,_.Grammar)}_.isGrammar=NU;_.GrammarImport="GrammarImport";function kU(t){return _.reflection.isInstance(t,_.GrammarImport)}_.isGrammarImport=kU;_.InferredType="InferredType";function xU(t){return _.reflection.isInstance(t,_.InferredType)}_.isInferredType=xU;_.Interface="Interface";function OU(t){return _.reflection.isInstance(t,_.Interface)}_.isInterface=OU;_.LiteralCondition="LiteralCondition";function DU(t){return _.reflection.isInstance(t,_.LiteralCondition)}_.isLiteralCondition=DU;_.NamedArgument="NamedArgument";function IU(t){return _.reflection.isInstance(t,_.NamedArgument)}_.isNamedArgument=IU;_.Negation="Negation";function $U(t){return _.reflection.isInstance(t,_.Negation)}_.isNegation=$U;_.Parameter="Parameter";function qU(t){return _.reflection.isInstance(t,_.Parameter)}_.isParameter=qU;_.ParameterReference="ParameterReference";function LU(t){return _.reflection.isInstance(t,_.ParameterReference)}_.isParameterReference=LU;_.ParserRule="ParserRule";function MU(t){return _.reflection.isInstance(t,_.ParserRule)}_.isParserRule=MU;_.ReferenceType="ReferenceType";function FU(t){return _.reflection.isInstance(t,_.ReferenceType)}_.isReferenceType=FU;_.ReturnType="ReturnType";function jU(t){return _.reflection.isInstance(t,_.ReturnType)}_.isReturnType=jU;_.SimpleType="SimpleType";function GU(t){return _.reflection.isInstance(t,_.SimpleType)}_.isSimpleType=GU;_.TerminalRule="TerminalRule";function UU(t){return _.reflection.isInstance(t,_.TerminalRule)}_.isTerminalRule=UU;_.Type="Type";function HU(t){return _.reflection.isInstance(t,_.Type)}_.isType=HU;_.TypeAttribute="TypeAttribute";function KU(t){return _.reflection.isInstance(t,_.TypeAttribute)}_.isTypeAttribute=KU;_.UnionType="UnionType";function WU(t){return _.reflection.isInstance(t,_.UnionType)}_.isUnionType=WU;_.Action="Action";function BU(t){return _.reflection.isInstance(t,_.Action)}_.isAction=BU;_.Alternatives="Alternatives";function VU(t){return _.reflection.isInstance(t,_.Alternatives)}_.isAlternatives=VU;_.Assignment="Assignment";function zU(t){return _.reflection.isInstance(t,_.Assignment)}_.isAssignment=zU;_.CharacterRange="CharacterRange";function YU(t){return _.reflection.isInstance(t,_.CharacterRange)}_.isCharacterRange=YU;_.CrossReference="CrossReference";function XU(t){return _.reflection.isInstance(t,_.CrossReference)}_.isCrossReference=XU;_.Group="Group";function JU(t){return _.reflection.isInstance(t,_.Group)}_.isGroup=JU;_.Keyword="Keyword";function QU(t){return _.reflection.isInstance(t,_.Keyword)}_.isKeyword=QU;_.NegatedToken="NegatedToken";function ZU(t){return _.reflection.isInstance(t,_.NegatedToken)}_.isNegatedToken=ZU;_.RegexToken="RegexToken";function eH(t){return _.reflection.isInstance(t,_.RegexToken)}_.isRegexToken=eH;_.RuleCall="RuleCall";function tH(t){return _.reflection.isInstance(t,_.RuleCall)}_.isRuleCall=tH;_.TerminalAlternatives="TerminalAlternatives";function rH(t){return _.reflection.isInstance(t,_.TerminalAlternatives)}_.isTerminalAlternatives=rH;_.TerminalGroup="TerminalGroup";function nH(t){return _.reflection.isInstance(t,_.TerminalGroup)}_.isTerminalGroup=nH;_.TerminalRuleCall="TerminalRuleCall";function iH(t){return _.reflection.isInstance(t,_.TerminalRuleCall)}_.isTerminalRuleCall=iH;_.UnorderedGroup="UnorderedGroup";function aH(t){return _.reflection.isInstance(t,_.UnorderedGroup)}_.isUnorderedGroup=aH;_.UntilToken="UntilToken";function oH(t){return _.reflection.isInstance(t,_.UntilToken)}_.isUntilToken=oH;_.Wildcard="Wildcard";function sH(t){return _.reflection.isInstance(t,_.Wildcard)}_.isWildcard=sH;var Qc=class extends TU.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case _.Action:return this.isSubtype(_.AbstractElement,r)||this.isSubtype(_.AbstractType,r);case _.Alternatives:case _.Assignment:case _.CharacterRange:case _.CrossReference:case _.Group:case _.Keyword:case _.NegatedToken:case _.RegexToken:case _.RuleCall:case _.TerminalAlternatives:case _.TerminalGroup:case _.TerminalRuleCall:case _.UnorderedGroup:case _.UntilToken:case _.Wildcard:return this.isSubtype(_.AbstractElement,r);case _.ArrayType:case _.ReferenceType:case _.SimpleType:case _.UnionType:return this.isSubtype(_.TypeDefinition,r);case _.Conjunction:case _.Disjunction:case _.LiteralCondition:case _.Negation:case _.ParameterReference:return this.isSubtype(_.Condition,r);case _.Interface:case _.Type:return this.isSubtype(_.AbstractType,r);case _.ParserRule:return this.isSubtype(_.AbstractRule,r)||this.isSubtype(_.AbstractType,r);case _.TerminalRule:return this.isSubtype(_.AbstractRule,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return _.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return _.AbstractRule;case"Grammar:usedGrammars":return _.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return _.Parameter;case"TerminalRuleCall:rule":return _.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};_.LangiumGrammarAstReflection=Qc;_.reflection=new Qc});var be=d(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.copyAstNode=it.findLocalReferences=it.streamReferences=it.streamAst=it.streamAllContents=it.streamContents=it.findRootNode=it.getDocument=it.hasContainerOfType=it.getContainerOfType=it.linkContentToContainer=void 0;var Un=er(),ea=Ft(),uH=Le();function Fb(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,Un.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,Un.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}it.linkContentToContainer=Fb;function lH(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}it.getContainerOfType=lH;function cH(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}it.hasContainerOfType=cH;function jb(t){let r=Gb(t).$document;if(!r)throw new Error("AST node has no document.");return r}it.getDocument=jb;function Gb(t){for(;t.$container;)t=t.$container;return t}it.findRootNode=Gb;function uy(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new ea.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let a=t[i];if((0,Un.isAstNode)(a)){if(n.keyIndex++,oy(a,r))return{done:!1,value:a}}else if(Array.isArray(a)){for(;n.arrayIndex<a.length;){let o=n.arrayIndex++,s=a[o];if((0,Un.isAstNode)(s)&&oy(s,r))return{done:!1,value:s}}n.arrayIndex=0}}n.keyIndex++}return ea.DONE_RESULT})}it.streamContents=uy;function fH(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new ea.TreeStreamImpl(t,r=>uy(r,e))}it.streamAllContents=fH;function Ub(t,e){if(t){if(e?.range&&!oy(t,e.range))return new ea.TreeStreamImpl(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new ea.TreeStreamImpl(t,r=>uy(r,e),{includeRoot:!0})}it.streamAst=Ub;function oy(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?(0,uH.inRange)(n,e):!1}function Hb(t){return new ea.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,Un.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,Un.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return ea.DONE_RESULT})}it.streamReferences=Hb;function dH(t,e=jb(t).parseResult.value){let r=[];return Ub(e).forEach(n=>{Hb(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,ea.stream)(r)}it.findLocalReferences=dH;function sy(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,Un.isAstNode)(i))r[n]=sy(i,e);else if((0,Un.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,Un.isAstNode)(o)?a.push(sy(o,e)):(0,Un.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return Fb(r),r}it.copyAstNode=sy});var Bb=d(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.getSourceRegion=void 0;var Kb=be(),pH=vt(),hH=Ft();function mH(t){var e,r;if(t){if("astNode"in t)return vH(t);if(Array.isArray(t))return t.reduce(Wb,void 0);{let n=t,i=yH(n)?gH((r=(e=n?.root)===null||e===void 0?void 0:e.element)!==null&&r!==void 0?r:n?.element):void 0;return Vo(n,i)}}else return}Zc.getSourceRegion=mH;function yH(t){return typeof t<"u"&&"element"in t&&"text"in t}function gH(t){try{return(0,Kb.getDocument)(t).uri.toString()}catch{return}}function vH(t){var e,r;let{astNode:n,property:i,index:a}=t??{},o=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||o===void 0)){if(i===void 0)return Vo(o,ly(n));{let s=u=>a!==void 0&&a>-1&&Array.isArray(n[i])?a<u.length?u[a]:void 0:u.reduce(Wb,void 0);if(!((r=o.assignments)===null||r===void 0)&&r[i]){let u=s(o.assignments[i]);return u&&Vo(u,ly(n))}else if(n.$cstNode){let u=s((0,pH.findNodesForProperty)(n.$cstNode,i));return u&&Vo(u,ly(n))}else return}}}function ly(t){var e,r,n,i;return t.$cstNode?(r=(e=(0,Kb.getDocument)(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new hH.TreeStreamImpl(t,a=>a.$container?[a.$container]:[]).find(a=>{var o;return(o=a.$textRegion)===null||o===void 0?void 0:o.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function Vo(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Wb(t,e){var r,n;if(t){if(!e)return t&&Vo(t)}else return e&&Vo(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,a=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,o=Math.min(t.offset,e.offset),s=Math.max(i,a),u=s-o,l={offset:o,end:s,length:u};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,f=e.fileURI,m=c&&f&&c!==f?`<unmergable text regions of ${c}, ${f}>`:c??f;l.fileURI=m}return l}});var Jb=d(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.processGeneratorNode=void 0;var Hu=Ha(),TH=Bb(),cy=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=_H(e,this.currentPosition,n=>{var i,a;return(a=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||a===void 0?void 0:a.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function _H(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var a,o;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((a=n.children)===null||a===void 0?void 0:a.length)===0&&delete n.children,!((o=n.targetRegion)===null||o===void 0)&&o.length&&r(n),delete n.complete,n}};return n}function RH(t,e){let r=new cy(e),n=r.pushTraceRegion(void 0);Vb(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,a=i?.targetRegion,o=n.targetRegion;return a&&i.sourceRegion&&a.offset===o.offset&&a.length===o.length?{text:r.content,trace:i}:{text:r.content,trace:n}}ef.processGeneratorNode=RH;function Vb(t,e){typeof t=="string"?AH(t,e):t instanceof Hu.IndentNode?bH(t,e):t instanceof Hu.CompositeGeneratorNode?Xb(t,e):t instanceof Hu.NewLineNode&&CH(t,e)}function zb(t,e){return typeof t=="string"?t.length!==0:t instanceof Hu.CompositeGeneratorNode?t.contents.some(r=>zb(r,e)):t instanceof Hu.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function AH(t,e){t&&(e.pendingIndent&&Yb(e,!1),e.append(t))}function Yb(t,e){var r;let n="";for(let i of t.relevantIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Xb(t,e){let r,n=(0,TH.getSourceRegion)(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Vb(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function bH(t,e){var r;if(zb(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Xb(t,e)}finally{e.decreaseIndent()}}}function CH(t,e){t.ifNotEmpty&&!SH(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Yb(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function SH(t){return t.trimStart()!==""}});var tf=d(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.normalizeEOL=St.findIndentation=St.NEWLINE_REGEXP=St.SNLE=St.expandToString=St.expandToStringWithNL=void 0;var Ku=Ha();function EH(t,...e){return Qb(t,...e)+Ku.EOL}St.expandToStringWithNL=EH;function Qb(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?St.SNLE:wH((0,Ku.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(St.NEWLINE_REGEXP).filter(o=>o.trim()!==St.SNLE).map(o=>o.replace(St.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=Zb(r);return r.map(o=>o.slice(a).trimRight()).join(Ku.EOL)}St.expandToString=Qb;St.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");St.NEWLINE_REGEXP=/\r?\n/g;var PH=/\S|$/;function wH(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(St.NEWLINE_REGEXP,Ku.EOL+n)}function Zb(t){let e=t.filter(n=>n.length>0).map(n=>n.search(PH)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}St.findIndentation=Zb;function NH(t){return t.replace(St.NEWLINE_REGEXP,Ku.EOL)}St.normalizeEOL=NH});var py=d(ta=>{"use strict";Object.defineProperty(ta,"__esModule",{value:!0});ta.expandTracedToNodeIf=ta.expandTracedToNode=ta.expandToNode=void 0;var nf=Ha(),dy=tf();function e0(t,...e){let r=xH(t),n=OH(t,e,r);return IH(n)}ta.expandToNode=e0;function t0(t,e,r){return(n,...i)=>(0,nf.traceToNode)(t,e,r)(e0(n,...i))}ta.expandTracedToNode=t0;function kH(t,e,r,n){return t?t0(typeof e=="function"?e():e,r,n):()=>{}}ta.expandTracedToNodeIf=kH;function xH(t){let e=t.join("_").split(dy.NEWLINE_REGEXP),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,dy.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function OH(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(dy.NEWLINE_REGEXP).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,v)=>v===0?n?[]:[m]:v===1&&f.length===0?[m]:f.concat(rf,m):(f,m,v)=>v===0?[m]:f.concat(rf,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,nf.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new nf.CompositeGeneratorNode(String(e[c])):c<e.length?r0:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===rf?o.slice(0,s-2):o.slice(0,s-1):o}var rf={isNewLine:!0},r0={isUndefinedSegment:!0},fy=t=>t===rf,DH=t=>t===r0;function IH(t){return t.reduce((r,n,i)=>DH(n)?r:fy(n)?{node:i===0||fy(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>{var a;let o=(i===0||fy(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):"",s;return{node:r.indented?r.node:o.length!==0?r.node.indent({indentation:o,indentImmediately:!1,indentedChildren:u=>s=u.append(n)}):r.node.append(n),indented:s??((a=r.indented)===null||a===void 0?void 0:a.append(n))}})(),{node:new nf.CompositeGeneratorNode}).node}});var Ha=d(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.NLEmpty=Oe.NL=Oe.NewLineNode=Oe.IndentNode=Oe.traceToNodeIf=Oe.traceToNode=Oe.CompositeGeneratorNode=Oe.toStringAndTrace=Oe.toString=Oe.isNewLineNode=Oe.isGeneratorNode=Oe.EOL=void 0;var $H=er(),i0=Jb(),n0=py();Oe.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function a0(t){return t instanceof Ai||t instanceof Wu||t instanceof Ka}Oe.isGeneratorNode=a0;function qH(t){return t instanceof Ka}Oe.isNewLineNode=qH;function LH(t,e){return a0(t)?(0,i0.processGeneratorNode)(t,e).text:String(t)}Oe.toString=LH;function MH(t,e){return(0,i0.processGeneratorNode)(t,e)}Oe.toStringAndTrace=MH;var Ai=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if((0,$H.isAstNode)(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(Oe.NL)}appendNewLineIf(e){return e?this.append(Oe.NL):this}appendNewLineIfNotEmpty(){return this.append(Oe.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append((0,n0.expandToNode)(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:a}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},o=new Wu(n,a,i);return this.contents.push(o),Array.isArray(r)?o.append(...r):r&&o.append(r),this}appendTraced(e,r,n){return i=>this.append(new Ai().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...a)=>this.append((0,n0.expandTracedToNode)(e,r,n)(i,...a))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};Oe.CompositeGeneratorNode=Ai;function o0(t,e,r){return n=>n instanceof Ai&&n.tracedSource===void 0?n.trace(t,e,r):new Ai().trace(t,e,r).append(n)}Oe.traceToNode=o0;function FH(t,e,r,n){return t?o0(typeof e=="function"?e():e,r,n):()=>{}}Oe.traceToNodeIf=FH;var Wu=class extends Ai{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Oe.IndentNode=Wu;var Ka=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Oe.EOL,this.ifNotEmpty=r}};Oe.NewLineNode=Ka;Oe.NL=new Ka;Oe.NLEmpty=new Ka(void 0,!0)});var Xo=d(Ce=>{"use strict";Object.defineProperty(Ce,"__esModule",{value:!0});Ce.isMandatoryPropertyType=Ce.propertyTypeToString=Ce.isTypeAssignable=Ce.TypeResolutionError=Ce.InterfaceType=Ce.UnionType=Ce.isInterfaceType=Ce.isUnionType=Ce.isStringType=Ce.isPrimitiveType=Ce.isValueType=Ce.flattenPropertyUnion=Ce.isPropertyUnion=Ce.isArrayType=Ce.isReferenceType=void 0;var Me=Ha(),zo=Jo();function Bu(t){return"referenceType"in t}Ce.isReferenceType=Bu;function Vu(t){return"elementType"in t}Ce.isArrayType=Vu;function kr(t){return"types"in t}Ce.isPropertyUnion=kr;function u0(t){if(kr(t)){let e=[];for(let r of t.types)e.push(...u0(r));return e}else return[t]}Ce.flattenPropertyUnion=u0;function Wa(t){return"value"in t}Ce.isValueType=Wa;function Hn(t){return"primitive"in t}Ce.isPrimitiveType=Hn;function na(t){return"string"in t}Ce.isStringType=na;function Yo(t){return t&&"type"in t}Ce.isUnionType=Yo;function vy(t){return t&&"properties"in t}Ce.isInterfaceType=vy;var my=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Me.CompositeGeneratorNode;return r.append(`export type ${this.name} = ${Ba(this.type,"AstType")};`,Me.NL),e&&(r.append(Me.NL),c0(r,this.name)),this.dataType&&jH(r,this),(0,Me.toString)(r)}toDeclaredTypesString(e){let r=new Me.CompositeGeneratorNode;return r.append(`type ${_y(this.name,e)} = ${Ba(this.type,"DeclaredType")};`,Me.NL),(0,Me.toString)(r)}};Ce.UnionType=my;var zu=class{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let a of i)r.has(a.name)||r.set(a.name,a)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=vy(e)?e.properties:[];for(let a of i)r.has(a.name)||r.set(a.name,a);for(let a of e.subTypes)this.getSubTypeProperties(a,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof zu)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Me.CompositeGeneratorNode,n=this.interfaceSuperTypes.map(a=>a.name),i=n.length>0?(0,zo.distinctAndSorted)([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,Me.NL),r.indent(a=>{this.containerTypes.size>0&&a.append(`readonly $container: ${(0,zo.distinctAndSorted)([...this.containerTypes].map(o=>o.name)).join(" | ")};`,Me.NL),this.typeNames.size>0&&a.append(`readonly $type: ${(0,zo.distinctAndSorted)([...this.typeNames]).map(o=>`'${o}'`).join(" | ")};`,Me.NL),s0(a,this.properties,"AstType")}),r.append("}",Me.NL),e&&(r.append(Me.NL),c0(r,this.name)),(0,Me.toString)(r)}toDeclaredTypesString(e){let r=new Me.CompositeGeneratorNode,n=_y(this.name,e),i=(0,zo.distinctAndSorted)(this.interfaceSuperTypes.map(a=>a.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,Me.NL),r.indent(a=>s0(a,this.properties,"DeclaredType",e)),r.append("}",Me.NL),(0,Me.toString)(r)}};Ce.InterfaceType=zu;var yy=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};Ce.TypeResolutionError=yy;function ra(t,e){return kr(t)?t.types.every(r=>ra(r,e)):kr(e)?e.types.some(r=>ra(t,r)):Wa(e)&&Yo(e.value)?Wa(t)&&Yo(t.value)&&e.value.name===t.value.name?!0:ra(t,e.value.type):Bu(t)?Bu(e)&&ra(t.referenceType,e.referenceType):Vu(t)?Vu(e)&&ra(t.elementType,e.elementType):Wa(t)?Yo(t.value)?ra(t.value.type,e):Wa(e)?Yo(e.value)?ra(t,e.value.type):l0(t.value,e.value,new Set):!1:Hn(t)?Hn(e)&&t.primitive===e.primitive:na(t)?Hn(e)&&e.primitive==="string"||na(e)&&e.string===t.string:!1}Ce.isTypeAssignable=ra;function l0(t,e,r){if(r.has(t.name)||(r.add(t.name),t.name===e.name))return!0;for(let n of t.superTypes)if(vy(n)&&l0(n,e,r))return!0;return!1}function Ba(t,e="AstType"){if(Bu(t)){let r=Ba(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${hy(t.referenceType,r)}`}else if(Vu(t)){let r=Ba(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${hy(t.elementType,r)}[]`}else if(kr(t)){let r=t.types.map(n=>hy(n,Ba(n,e)));return(0,zo.distinctAndSorted)(r).join(" | ")}else{if(Wa(t))return t.value.name;if(Hn(t))return t.primitive;if(na(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}Ce.propertyTypeToString=Ba;function hy(t,e){return kr(t)&&(e=`(${e})`),e}function s0(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:_y(a.name,n),s=a.optional&&!Ty(a.type),u=Ba(a.type,r);return`${o}${s?"?":""}: ${u}`}(0,zo.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),Me.NL))}function Ty(t){return Vu(t)?!0:Bu(t)?!1:kr(t)?t.types.every(e=>Ty(e)):Hn(t)?t.primitive==="boolean":!1}Ce.isMandatoryPropertyType=Ty;function c0(t,e){t.append(`export const ${e} = '${e}';`,Me.NL),t.append(Me.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,Me.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,Me.NL)),t.append("}",Me.NL)}function jH(t,e){switch(e.dataType){case"string":if(gy(e.type)){let r=Array.from(e.subTypes).map(a=>a.name),n=f0(e.type),i=d0(e.type);if(r.length===0&&n.length===0&&i.length===0)af(t,e.name,`typeof item === '${e.dataType}'`);else{let a=GH(r,n,i);af(t,e.name,a)}}break;case"number":case"boolean":case"bigint":af(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":af(t,e.name,"item instanceof Date");break;default:return}}function gy(t){let e=!0;if(Hn(t))return t.primitive==="string";if(na(t))return!0;if(kr(t)){for(let r of t.types)if(Wa(r))if(Yo(r.value)){if(!gy(r.value.type))return!1}else return!1;else if(Hn(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(kr(r))e=gy(r);else if(!na(r))return!1}else return!1;return e}function GH(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(a=>`/${a}/.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function _y(t,e){return e.has(t)?`^${t}`:t}function f0(t){let e=[];if(na(t))return[t.string];if(kr(t))for(let r of t.types)na(r)?e.push(r.string):kr(r)&&e.push(...f0(r));return e}function d0(t){let e=[];if(Hn(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),kr(t))for(let r of t.types)Hn(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):kr(r)&&e.push(...d0(r));return e}function af(t,e,r){t.append(Me.NL,`export function is${e}(item: unknown): item is ${e} {`,Me.NL),t.indent(n=>n.append(`return ${r};`,Me.NL)),t.append("}",Me.NL)}});var Jo=d(Xe=>{"use strict";Object.defineProperty(Xe,"__esModule",{value:!0});Xe.isAstType=Xe.findReferenceTypes=Xe.hasBooleanType=Xe.hasArrayType=Xe.sortInterfacesTopologically=Xe.mergeTypesAndInterfaces=Xe.mergeInterfaces=Xe.collectSuperTypes=Xe.collectTypeHierarchy=Xe.collectChildrenTypes=Xe.distinctAndSorted=Xe.collectAllPlainProperties=void 0;var Yu=gn(),bi=xe(),Kn=Xo();function UH(t){let e=new Yu.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.superTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}Xe.collectAllPlainProperties=UH;function HH(t,e){return Array.from(new Set(t)).sort(e)}Xe.distinctAndSorted=HH;function p0(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,bi.isInterface)(u)?(i.add(u),p0(u,e,r,n).forEach(c=>i.add(c))):u&&(0,bi.isType)(u.$container)&&i.add(u.$container)}),i}Xe.collectChildrenTypes=p0;function KH(t){let e=new Set(t),r=new Yu.MultiMap,n=new Yu.MultiMap;for(let o of e){for(let s of o.superTypes)e.has(s)&&(r.add(o.name,s.name),n.add(s.name,o.name));for(let s of o.subTypes)e.has(s)&&(r.add(s.name,o.name),n.add(o.name,s.name))}let i=new Yu.MultiMap,a=new Yu.MultiMap;for(let[o,s]of Array.from(r.entriesGroupedByKey()).sort(([u],[l])=>u.localeCompare(l)))i.addAll(o,Array.from(new Set(s)));for(let[o,s]of Array.from(n.entriesGroupedByKey()).sort(([u],[l])=>u.localeCompare(l)))a.addAll(o,Array.from(new Set(s)));return{superTypes:i,subTypes:a}}Xe.collectTypeHierarchy=KH;function Ry(t){let e=new Set;if((0,bi.isInterface)(t))e.add(t),t.superTypes.forEach(r=>{if((0,bi.isInterface)(r.ref)){e.add(r.ref);let n=Ry(r.ref);for(let i of n)e.add(i)}});else if((0,bi.isType)(t)){let r=h0(t.type);for(let n of r){let i=Ry(n);for(let a of i)e.add(a)}}return e}Xe.collectSuperTypes=Ry;function h0(t){var e;if((0,bi.isUnionType)(t))return t.types.flatMap(r=>h0(r));if((0,bi.isSimpleType)(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if((0,bi.isType)(r)||(0,bi.isInterface)(r))return[r]}return[]}function WH(t,e){return t.interfaces.concat(e.interfaces)}Xe.mergeInterfaces=WH;function BH(t){return t.interfaces.concat(t.unions)}Xe.mergeTypesAndInterfaces=BH;function VH(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.superTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}Xe.sortInterfacesTopologically=VH;function m0(t){return(0,Kn.isPropertyUnion)(t)?t.types.some(e=>m0(e)):!!(0,Kn.isArrayType)(t)}Xe.hasArrayType=m0;function y0(t){return(0,Kn.isPropertyUnion)(t)?t.types.some(e=>y0(e)):(0,Kn.isPrimitiveType)(t)?t.primitive==="boolean":!1}Xe.hasBooleanType=y0;function Ay(t){if((0,Kn.isPropertyUnion)(t))return t.types.flatMap(e=>Ay(e));if((0,Kn.isReferenceType)(t)){let e=t.referenceType;if((0,Kn.isValueType)(e))return[e.value.name]}else if((0,Kn.isArrayType)(t))return Ay(t.elementType);return[]}Xe.findReferenceTypes=Ay;function by(t){if((0,Kn.isPropertyUnion)(t))return t.types.every(by);if((0,Kn.isValueType)(t)){let e=t.value;return"type"in e?by(e.type):!0}return!1}Xe.isAstType=by});var Zo=d(Qo=>{"use strict";Object.defineProperty(Qo,"__esModule",{value:!0});Qo.DefaultNameProvider=Qo.isNamed=void 0;var zH=vt();function g0(t){return typeof t.name=="string"}Qo.isNamed=g0;var Cy=class{getName(e){if(g0(e))return e.name}getNameNode(e){return(0,zH.findNodeForProperty)(e.$cstNode,"name")}};Qo.DefaultNameProvider=Cy});var Xu=d((v0,of)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof of=="object"&&of.exports?of.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:v0,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var A=this.disjunction();this.consumeChar("/");for(var P={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(P,"global");break;case"i":o(P,"ignoreCase");break;case"m":o(P,"multiLine");break;case"u":o(P,"unicode");break;case"y":o(P,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:P,value:A,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],A=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(A)}},t.prototype.alternative=function(){for(var y=[],A=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(A)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var A;switch(this.popChar()){case"=":A="Lookahead";break;case"!":A="NegativeLookahead";break}s(A);var P=this.disjunction();return this.consumeChar(")"),{type:A,value:P,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var A,P=this.idx;switch(this.popChar()){case"*":A={atLeast:0,atMost:1/0};break;case"+":A={atLeast:1,atMost:1/0};break;case"?":A={atLeast:0,atMost:1};break;case"{":var w=this.integerIncludingZero();switch(this.popChar()){case"}":A={atLeast:w,atMost:w};break;case",":var C;this.isDigit()?(C=this.integerIncludingZero(),A={atLeast:w,atMost:C}):A={atLeast:w,atMost:1/0},this.consumeChar("}");break}if(y===!0&&A===void 0)return;s(A);break}if(!(y===!0&&A===void 0))return s(A),this.peekChar(0)==="?"?(this.consumeChar("?"),A.greedy=!1):A.greedy=!0,A.type="Quantifier",A.loc=this.loc(P),A},t.prototype.atom=function(){var y,A=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(A),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,A=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,A=!0;break;case"s":y=m;break;case"S":y=m,A=!0;break;case"w":y=f;break;case"W":y=f,A=!0;break}return s(y),{type:"Set",value:y,complement:A}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var A=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:A}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],A=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),A=!0);this.isClassAtom();){var P=this.classAtom(),w=P.type==="Character";if(w&&this.isRangeDash()){this.consumeChar("-");var C=this.classAtom(),b=C.type==="Character";if(b){if(C.value<P.value)throw Error("Range out of order in character class");y.push({from:P.value,to:C.value})}else a(P.value,y),y.push(i("-")),a(C.value,y)}else a(P.value,y)}return this.consumeChar("]"),{type:"Set",complement:A,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var A=this.disjunction();this.consumeChar(")");var P={type:"Group",capturing:y,value:A};return y&&(P.idx=this.groupIdx),P},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var A="",P=0;P<y;P++){var w=this.popChar();if(e.test(w)===!1)throw Error("Expecting a HexDecimal digits");A+=w}var C=parseInt(A,16);return{type:"Character",value:C}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,A){y.length!==void 0?y.forEach(function(P){A.push(P)}):A.push(y)}function o(y,A){if(y[A]===!0)throw"duplicate flag "+A;y[A]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var m=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var A in y){var P=y[A];y.hasOwnProperty(A)&&(P.type!==void 0?this.visit(P):Array.isArray(P)&&P.forEach(function(w){this.visit(w)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var za=d(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.partialRegex=tr.partialMatches=tr.getCaseInsensitivePattern=tr.escapeRegExp=tr.isWhitespaceRegExp=tr.isMultilineComment=tr.getTerminalParts=void 0;var T0=Xu(),_0=new T0.RegExpParser,Sy=class extends T0.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Ey(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Va=new Sy;function YH(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=_0.pattern(t),r=[];for(let n of e.value.value)Va.reset(t),Va.visit(n),r.push({start:Va.startRegex,end:Va.endRegex});return r}catch{return[]}}tr.getTerminalParts=YH;function XH(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Va.reset(t),Va.visit(_0.pattern(t)),Va.multiline}catch{return!1}}tr.isMultilineComment=XH;function JH(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}tr.isWhitespaceRegExp=JH;function Ey(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}tr.escapeRegExp=Ey;function QH(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Ey(e)).join("")}tr.getCaseInsensitivePattern=QH;function ZH(t,e){let r=R0(t),n=e.match(r);return!!n&&n[0].length>0}tr.partialMatches=ZH;function R0(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}tr.partialRegex=R0});var jt=d(ne=>{"use strict";var eK=ne&&ne.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),tK=ne&&ne.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),rK=ne&&ne.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&eK(e,t,r);return tK(e,t),e};Object.defineProperty(ne,"__esModule",{value:!0});ne.isPrimitiveType=ne.extractAssignments=ne.resolveTransitiveImports=ne.resolveImport=ne.resolveImportUri=ne.terminalRegex=ne.getRuleType=ne.getActionType=ne.getExplicitRuleType=ne.getTypeNameWithoutError=ne.getTypeName=ne.getActionAtElement=ne.isDataType=ne.hasDataTypeReturn=ne.isDataTypeRule=ne.isArrayOperator=ne.isArrayCardinality=ne.isOptionalCardinality=void 0;var ue=rK(xe()),A0=yn(),sf=be(),nK=Xo(),iK=za();function aK(t){return t==="?"||t==="*"}ne.isOptionalCardinality=aK;function oK(t){return t==="*"||t==="+"}ne.isArrayCardinality=oK;function sK(t){return t==="+="}ne.isArrayOperator=sK;function xy(t){return b0(t,new Set)}ne.isDataTypeRule=xy;function b0(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,sf.streamAllContents)(t))if(ue.isRuleCall(r)){if(!r.rule.ref||ue.isParserRule(r.rule.ref)&&!b0(r.rule.ref,e))return!1}else{if(ue.isAssignment(r))return!1;if(ue.isAction(r))return!1}return Boolean(t.definition)}function uK(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||ue.isType(r)&&C0(r)}ne.hasDataTypeReturn=uK;function C0(t){return wy(t.type,new Set)}ne.isDataType=C0;function wy(t,e){if(e.has(t))return!0;if(e.add(t),ue.isArrayType(t))return!1;if(ue.isReferenceType(t))return!1;if(ue.isUnionType(t))return t.types.every(r=>wy(r,e));if(ue.isSimpleType(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return ue.isType(r)?wy(r.type,e):!1}else return!1}else return!1}function S0(t){let e=t.$container;if(ue.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(ue.isAction(a))return a;{let o=(0,sf.streamAllContents)(r[i]).find(ue.isAction);if(o)return o}}}if(ue.isAbstractElement(e))return S0(e)}ne.getActionAtElement=S0;function Oy(t){var e;if(ue.isParserRule(t))return xy(t)?t.name:(e=Dy(t))!==null&&e!==void 0?e:t.name;if(ue.isInterface(t)||ue.isType(t)||ue.isReturnType(t))return t.name;if(ue.isAction(t)){let r=E0(t);if(r)return r}else if(ue.isInferredType(t))return t.name;throw new nK.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}ne.getTypeName=Oy;function lK(t){if(t)try{return Oy(t)}catch{return}}ne.getTypeNameWithoutError=lK;function Dy(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(ue.isParserRule(e))return e.name;if(ue.isInterface(e)||ue.isType(e))return e.name}}}ne.getExplicitRuleType=Dy;function E0(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Oy(t.type.ref)}ne.getActionType=E0;function cK(t){var e,r,n;return ue.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":xy(t)?t.name:(n=Dy(t))!==null&&n!==void 0?n:t.name}ne.getRuleType=cK;function P0(t){return Ju(t.definition)}ne.terminalRegex=P0;var Iy=/[\s\S]/.source;function Ju(t){if(ue.isTerminalAlternatives(t))return fK(t);if(ue.isTerminalGroup(t))return dK(t);if(ue.isCharacterRange(t))return mK(t);if(ue.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return Ci(P0(e),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(ue.isNegatedToken(t))return hK(t);if(ue.isUntilToken(t))return pK(t);if(ue.isRegexToken(t))return Ci(t.regex,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1});if(ue.isWildcard(t))return Ci(Iy,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}function fK(t){return Ci(t.elements.map(Ju).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function dK(t){return Ci(t.elements.map(Ju).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function pK(t){return Ci(`${Iy}*?${Ju(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function hK(t){return Ci(`(?!${Ju(t.terminal)})${Iy}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function mK(t){return t.right?Ci(`[${Py(t.left)}-${Py(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):Ci(Py(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Py(t){return(0,iK.escapeRegExp)(t.value)}function Ci(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function w0(t){if(t.path===void 0||t.path.length===0)return;let e=A0.Utils.dirname((0,sf.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),A0.Utils.resolvePath(e,r)}ne.resolveImportUri=w0;function $y(t,e){let r=w0(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ue.isGrammar(i))return i}}catch{}}ne.resolveImport=$y;function yK(t,e){if(ue.isGrammarImport(e)){let r=$y(t,e);if(r){let n=Ny(t,r);return n.push(r),n}return[]}else return Ny(t,e)}ne.resolveTransitiveImports=yK;function Ny(t,e,r=e,n=new Set,i=new Set){let a=(0,sf.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=$y(t,o);s&&Ny(t,s,r,n,i)}}return Array.from(i)}function ky(t){return ue.isAssignment(t)?[t]:ue.isAlternatives(t)||ue.isGroup(t)||ue.isUnorderedGroup(t)?t.elements.flatMap(e=>ky(e)):ue.isRuleCall(t)&&t.rule.ref?ky(t.rule.ref.definition):[]}ne.extractAssignments=ky;var gK=["string","number","boolean","Date","bigint"];function vK(t){return gK.includes(t)}ne.isPrimitiveType=vK});var df=d(at=>{"use strict";Object.defineProperty(at,"__esModule",{value:!0});at.flattenPlainType=at.mergePropertyTypes=at.plainToTypes=at.isPlainStringType=at.isPlainPrimitiveType=at.isPlainValueType=at.isPlainPropertyUnion=at.isPlainArrayType=at.isPlainReferenceType=at.isPlainUnion=at.isPlainInterface=void 0;var N0=Xo();function TK(t){return!k0(t)}at.isPlainInterface=TK;function k0(t){return"type"in t}at.isPlainUnion=k0;function uf(t){return"referenceType"in t}at.isPlainReferenceType=uf;function lf(t){return"elementType"in t}at.isPlainArrayType=lf;function Ly(t){return"types"in t}at.isPlainPropertyUnion=Ly;function cf(t){return"value"in t}at.isPlainValueType=cf;function x0(t){return"primitive"in t}at.isPlainPrimitiveType=x0;function O0(t){return"string"in t}at.isPlainStringType=O0;function _K(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new N0.InterfaceType(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new N0.UnionType(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let a of n.superTypes){let o=e.get(a)||r.get(a);o&&i.superTypes.add(o)}for(let a of n.subTypes){let o=e.get(a)||r.get(a);o&&i.subTypes.add(o)}for(let a of n.properties){let o=RK(a,e,r);i.properties.push(o)}}for(let n of t.unions){let i=r.get(n.name);i.type=Qu(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}at.plainToTypes=_K;function RK(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:Qu(t.type,void 0,e,r)}}function Qu(t,e,r,n){if(lf(t))return{elementType:Qu(t.elementType,e,r,n)};if(uf(t))return{referenceType:Qu(t.referenceType,void 0,r,n)};if(Ly(t))return{types:t.types.map(i=>Qu(i,e,r,n))};if(O0(t))return{string:t.string};if(x0(t))return{primitive:t.primitive,regex:t.regex};if(cf(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function AK(t,e){let r=ff(t),n=ff(e);for(let i of n)bK(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}at.mergePropertyTypes=AK;function bK(t,e){return t.some(r=>qy(r,e))}function qy(t,e){return lf(t)&&lf(e)?qy(t.elementType,e.elementType):uf(t)&&uf(e)?qy(t.referenceType,e.referenceType):cf(t)&&cf(e)?t.value===e.value:!1}function ff(t){return Ly(t)?t.types.flatMap(e=>ff(e)):[t]}at.flattenPlainType=ff});var F0=d(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.collectInferredTypes=void 0;var CK=Zo(),Gy=gn(),pt=xe(),Wn=jt(),I0=df(),My=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:D0(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return M0(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(D0(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ya();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function SK(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map($0)}}function D0(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>$0(e))}}function $0(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function EK(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...q0(i,u));let a=OK(n),o=DK(a),s=IK(a,o,r);for(let u of e){let l=PK(u);s.unions.push({name:u.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:u.dataType})}return s}pf.collectInferredTypes=EK;function PK(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Fy(t.definition,r);return e?{primitive:"string"}:n}function Fy(t,e){var r,n,i;if(t.cardinality)return e();if((0,pt.isAlternatives)(t))return{types:t.elements.map(a=>Fy(a,e))};if((0,pt.isGroup)(t)||(0,pt.isUnorderedGroup)(t))return t.elements.length!==1?e():Fy(t.elements[0],e);if((0,pt.isRuleCall)(t)){let a=(r=t.rule)===null||r===void 0?void 0:r.ref;return a?(0,pt.isTerminalRule)(a)?{primitive:(i=(n=a.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:(0,Wn.terminalRegex)(a)}:{value:a.name}:e()}else if((0,pt.isKeyword)(t))return{string:t.value};return e()}function q0(t,e){let r=Ya(e),n=new My(t,r);return e.definition&&jy(n,n.root,e.definition),n.getTypes()}function Ya(t){return{name:(0,pt.isParserRule)(t)||(0,pt.isAction)(t)?(0,Wn.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function jy(t,e,r){let n=(0,Wn.isOptionalCardinality)(r.cardinality);if((0,pt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,Ya()));for(let a of r.elements){let o=t.connect(e,Ya());i.push(jy(t,o,a))}return t.merge(...i)}else if((0,pt.isGroup)(r)||(0,pt.isUnorderedGroup)(r)){let i=t.connect(e,Ya()),a;n&&(a=t.connect(e,Ya()));for(let o of r.elements)i=jy(t,i,o);return a?t.merge(a,i):i}else{if((0,pt.isAction)(r))return wK(t,e,r);(0,pt.isAssignment)(r)?NK(e,r):(0,pt.isRuleCall)(r)&&kK(t,e,r)}return e}function wK(t,e,r){var n;if(!t.hasLeafNode(e)){let a=SK(e);t.connect(e,a)}let i=t.connect(e,Ya(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,CK.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:Xa(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function NK(t,e){let r={types:new Set,reference:!1};L0(e.terminal,r);let n=Xa(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Wn.isOptionalCardinality)(e.cardinality),type:n,astNodes:new Set([e])})}function L0(t,e){if((0,pt.isAlternatives)(t)||(0,pt.isUnorderedGroup)(t)||(0,pt.isGroup)(t))for(let r of t.elements)L0(r,e);else if((0,pt.isKeyword)(t))e.types.add(`'${t.value}'`);else if((0,pt.isRuleCall)(t)&&t.rule.ref)e.types.add((0,Wn.getRuleType)(t.rule.ref));else if((0,pt.isCrossReference)(t)&&t.type.ref){let r=(0,Wn.getTypeNameWithoutError)(t.type.ref);r&&e.types.add(r),e.reference=!0}}function kK(t,e,r){let n=r.rule.ref;if((0,pt.isParserRule)(n)&&n.fragment){let i=xK(n,t.context);(0,Wn.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,pt.isParserRule)(n)&&e.ruleCalls.push((0,Wn.getRuleType)(n))}function xK(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Wn.getTypeNameWithoutError)(t),a=q0(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function OK(t){let e=new Map,r=[],n=M0(t).map(i=>i.alt);for(let i of n){let a={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.superTypes.add(i.name)}return Array.from(e.values())}function M0(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Gy.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let m=a.find(v=>v.name===f.name);m?(m.type=(0,I0.mergePropertyTypes)(m.type,f.type),f.astNodes.forEach(v=>m.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function DK(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Gy.MultiMap;for(let i of t)for(let a of i.superTypes)n.add(a,i.name);for(let[i,a]of n.entriesGroupedByKey())if(!e.has(i)){let o={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:Xa(!1,!1,a)};r.push(o)}return r}function IK(t,e,r){let n=new Gy.MultiMap;for(let s of t)for(let u of s.superTypes)n.add(u,s.name);let i=new Set(r.interfaces.map(s=>s.name)),a={interfaces:[],unions:e},o=new Map(e.map(s=>[s.name,s]));for(let s of t){let u=new Set(n.get(s.name));if(s.properties.length===0&&u.size>0)if(i.has(s.name))s.abstract=!0,a.interfaces.push(s);else{let l=Xa(!1,!1,Array.from(u)),c=o.get(s.name);if(c)c.type=(0,I0.mergePropertyTypes)(c.type,l);else{let f={name:s.name,declared:!1,subTypes:u,superTypes:s.superTypes,type:l};a.unions.push(f),o.set(s.name,f)}}else a.interfaces.push(s)}for(let s of a.interfaces)s.superTypes=new Set([...s.superTypes].filter(u=>!o.has(u)));return a}function Xa(t,e,r){if(t)return{elementType:Xa(!1,e,r)};if(e)return{referenceType:Xa(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:(0,Wn.isPrimitiveType)(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>Xa(!1,!1,[n]))}}});var Hy=d(ts=>{"use strict";Object.defineProperty(ts,"__esModule",{value:!0});ts.typeDefinitionToPropertyType=ts.collectDeclaredTypes=void 0;var hf=xe(),Uy=jt();function $K(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let s of n.attributes)i.push({name:s.name,optional:s.isOptional,astNodes:new Set([s]),type:es(s.type)});let a=new Set;for(let s of n.superTypes)s.ref&&a.add((0,Uy.getTypeName)(s.ref));let o={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:a,subTypes:new Set};r.interfaces.push(o)}for(let n of e){let i={name:n.name,declared:!0,type:es(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}ts.collectDeclaredTypes=$K;function es(t){if((0,hf.isArrayType)(t))return{elementType:es(t.elementType)};if((0,hf.isReferenceType)(t))return{referenceType:es(t.referenceType)};if((0,hf.isUnionType)(t))return{types:t.types.map(es)};if((0,hf.isSimpleType)(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=(0,Uy.getTypeNameWithoutError)(r);if(n)return(0,Uy.isPrimitiveType)(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}ts.typeDefinitionToPropertyType=es});var G0=d(rs=>{"use strict";Object.defineProperty(rs,"__esModule",{value:!0});rs.collectAllAstResources=rs.collectTypeResources=void 0;var qK=F0(),LK=Hy(),MK=be(),FK=xe(),j0=jt();function jK(t,e){let r=Ky(t,e),n=(0,LK.collectDeclaredTypes)(r.interfaces,r.types),i=(0,qK.collectInferredTypes)(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}rs.collectTypeResources=jK;function Ky(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,MK.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,FK.isParserRule)(o)&&!o.fragment&&((0,j0.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,j0.resolveImport)(e,s)).filter(s=>s!==void 0);Ky(o,e,r,n)}}}return n}rs.collectAllAstResources=Ky});var Vy=d(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});Bn.specifyAstNodeProperties=Bn.createAstTypes=Bn.collectValidationAst=Bn.collectAst=void 0;var H0=Jo(),Si=Xo(),K0=G0(),GK=df();function UK(t,e){let{inferred:r,declared:n}=(0,K0.collectTypeResources)(t,e);return mf(r,n)}Bn.collectAst=UK;function HK(t,e){let{inferred:r,declared:n,astResources:i}=(0,K0.collectTypeResources)(t,e);return{astResources:i,inferred:mf(n,r),declared:mf(r,n)}}Bn.collectValidationAst=HK;function mf(t,e){var r,n;let i={interfaces:(0,H0.sortInterfacesTopologically)(U0(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:U0(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},a=(0,GK.plainToTypes)(i);return W0(a),a}Bn.createAstTypes=mf;function U0(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function W0(t){let e=WK(t),r=Array.from(e.values());BK(r),VK(r),KK(r)}Bn.specifyAstNodeProperties=W0;function KK(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(a=>n.typeNames.add(a))}};t.forEach(r)}function WK({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,a)=>(i.set(a.name,a),i),new Map),n=new Map;for(let i of e)n.set(i,Wy(i.type,new Set));for(let[i,a]of n)a&&r.delete(i.name);return r}function Wy(t,e){if(e.has(t))return!0;if(e.add(t),(0,Si.isPropertyUnion)(t))return t.types.every(r=>Wy(r,e));if((0,Si.isValueType)(t)){let r=t.value;return(0,Si.isUnionType)(r)?Wy(r.type,e):!1}else return(0,Si.isPrimitiveType)(t)||(0,Si.isStringType)(t)}function BK(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function VK(t){let e=t.filter(Si.isInterfaceType);for(let n of e){let i=n.properties.flatMap(a=>By(a.type,new Set));for(let a of i)a.containerTypes.add(n)}let r=zK(t);YK(r)}function By(t,e){return(0,Si.isPropertyUnion)(t)?t.types.flatMap(r=>By(r,e)):(0,Si.isValueType)(t)?e.has(t.value)?[]:(e.add(t.value),[t.value]):(0,Si.isArrayType)(t)?By(t.elementType,e):[]}function zK(t){function e(o){let s=[o];a.add(o);let u=[...i.subTypes.get(o.name),...i.superTypes.get(o.name)];for(let l of u){let c=r.get(l);c&&!a.has(c)&&s.push(...e(c))}return s}let r=new Map(t.map(o=>[o.name,o])),n=[],i=(0,H0.collectTypeHierarchy)(t),a=new Set;for(let o of t)a.has(o)||n.push(e(o));return n}function YK(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var Yy=d(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.interpretAstReflection=void 0;var XK=er(),JK=gn(),QK=xe(),ZK=Vy(),Ja=Jo();function eW(t,e){let r;(0,QK.isGrammar)(t)?r=(0,ZK.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.filter(s=>(0,Ja.isAstType)(s.type)).map(s=>s.name)),i=tW(r),a=rW(r),o=(0,Ja.collectTypeHierarchy)((0,Ja.mergeTypesAndInterfaces)(r)).superTypes;return new zy({allTypes:n,references:i,metaData:a,superTypes:o})}yf.interpretAstReflection=eW;var zy=class extends XK.AbstractAstReflection{constructor(e){super(),this.allTypes=e.allTypes,this.references=e.references,this.metaData=e.metaData,this.superTypes=e.superTypes}getAllTypes(){return this.allTypes}getReferenceType(e){let r=`${e.container.$type}:${e.property}`,n=this.references.get(r);if(n)return n;throw new Error("Could not find reference type for "+r)}getTypeMetaData(e){var r;return(r=this.metaData.get(e))!==null&&r!==void 0?r:{name:e,mandatory:[]}}computeIsSubtype(e,r){let n=this.superTypes.get(e);for(let i of n)if(this.isSubtype(i,r))return!0;return!1}};function tW(t){let e=new JK.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of(0,Ja.findReferenceTypes)(i.type))e.add(n.name,[i.name,a]);for(let i of n.interfaceSuperTypes){let a=e.get(i.name);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function rW(t){let e=new Map;for(let r of t.interfaces){let n=r.superProperties,i=n.filter(o=>(0,Ja.hasArrayType)(o.type)),a=n.filter(o=>!(0,Ja.hasArrayType)(o.type)&&(0,Ja.hasBooleanType)(o.type));(i.length>0||a.length>0)&&e.set(r.name,{name:r.name,mandatory:nW(i,a)})}return e}function nW(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}});var B0=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.LangiumGrammarGrammar=void 0;var iW=vt(),gf,aW=()=>gf??(gf=(0,iW.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "LangiumGrammar",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Grammar",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isDeclared",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "grammar"
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@59"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "with"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "usedGrammars",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "usedGrammars",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "definesHiddenTokens",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "hidden"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": ","
                          },
                          {
                            "$type": "Assignment",
                            "feature": "hiddenTokens",
                            "operator": "+=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/rules@11"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@59"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          }
                        ],
                        "cardinality": "*"
                      }
                    ],
                    "cardinality": "?"
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ],
                "cardinality": "?"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "imports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "rules",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "interfaces",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "types",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@10"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Interface",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "superTypes",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "superTypes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SchemaType",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "attributes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAttribute",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "isOptional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeDefinition",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@5"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnionType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnionType"
                },
                "feature": "types",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "types",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArrayType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ArrayType"
                },
                "feature": "elementType",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "["
              },
              {
                "$type": "Keyword",
                "value": "]"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReferenceType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ReferenceType"
                }
              },
              {
                "$type": "Keyword",
                "value": "@"
              },
              {
                "$type": "Assignment",
                "feature": "referenceType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SimpleType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "SimpleType"
                }
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "typeRef",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "primitiveType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@9"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "stringType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@60"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimitiveType",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "string"
          },
          {
            "$type": "Keyword",
            "value": "number"
          },
          {
            "$type": "Keyword",
            "value": "boolean"
          },
          {
            "$type": "Keyword",
            "value": "Date"
          },
          {
            "$type": "Keyword",
            "value": "bigint"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractRule",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GrammarImport",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Assignment",
            "feature": "path",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParserRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "entry",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "entry"
                }
              },
              {
                "$type": "Assignment",
                "feature": "fragment",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "fragment"
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "wildcard",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "*"
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "returns"
                  },
                  {
                    "$type": "Alternatives",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "returnType",
                        "operator": "=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/types@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Assignment",
                        "feature": "dataType",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@9"
                          },
                          "arguments": []
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": false
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "definesHiddenTokens",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "hidden"
                }
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "hiddenTokens",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@11"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InferredType",
      "parameters": [
        {
          "$type": "Parameter",
          "name": "imperative"
        }
      ],
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "ParameterReference",
                  "parameter": {
                    "$ref": "#/rules@14/parameters@0"
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infer"
                  }
                ]
              },
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "Negation",
                  "value": {
                    "$type": "ParameterReference",
                    "parameter": {
                      "$ref": "#/rules@14/parameters@0"
                    }
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infers"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleNameAndParams",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@16"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "parameters",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@16"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@59"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Alternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@18"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConditionalBranch",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                }
              },
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "guardCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@29"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ">"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnorderedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnorderedGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "&"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@20"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Group",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTokenWithCardinality",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@37"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@24"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Action",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Action"
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "type",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": true
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "feature",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@58"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "+="
                    }
                  ]
                }
              },
              {
                "$type": "Keyword",
                "value": "current"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Keyword",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@60"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleCall",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NamedArgument",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@16"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "calledByName",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "="
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LiteralCondition",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "true",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Disjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Disjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Conjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Conjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "&"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Negation",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Negation"
                }
              },
              {
                "$type": "Keyword",
                "value": "!"
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Atom",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedCondition",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterReference",
      "definition": {
        "$type": "Assignment",
        "feature": "parameter",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/rules@16"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedKeyword",
      "inferredType": {
        "$type": "InferredType",
        "name": "Keyword"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "RuleCall"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Assignment"
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "feature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "+="
                },
                {
                  "$type": "Keyword",
                  "value": "="
                },
                {
                  "$type": "Keyword",
                  "value": "?="
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedAssignableElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@38"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReference",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CrossReference"
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/types@0"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "deprecatedSyntax",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "|"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ":"
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "terminal",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@42"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReferenceableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "Group"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "hidden",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "hidden"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "fragment",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "fragment"
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "returns"
                      },
                      {
                        "$type": "Assignment",
                        "feature": "type",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@45"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "?"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalAlternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@48"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalTokenElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedTerminalElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "lookahead",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?="
                },
                {
                  "$type": "Keyword",
                  "value": "?!"
                }
              ]
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "TerminalRuleCall"
            }
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@46"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NegatedToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "NegatedToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UntilToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "UntilToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RegexToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "RegexToken"
            }
          },
          {
            "$type": "Assignment",
            "feature": "regex",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wildcard",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Wildcard"
            }
          },
          {
            "$type": "Keyword",
            "value": "."
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CharacterRange",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CharacterRange"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ".."
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FeatureName",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "current"
          },
          {
            "$type": "Keyword",
            "value": "entry"
          },
          {
            "$type": "Keyword",
            "value": "extends"
          },
          {
            "$type": "Keyword",
            "value": "false"
          },
          {
            "$type": "Keyword",
            "value": "fragment"
          },
          {
            "$type": "Keyword",
            "value": "grammar"
          },
          {
            "$type": "Keyword",
            "value": "hidden"
          },
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Keyword",
            "value": "returns"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Keyword",
            "value": "infer"
          },
          {
            "$type": "Keyword",
            "value": "infers"
          },
          {
            "$type": "Keyword",
            "value": "with"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\^?[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "RegexLiteral",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "AbstractType",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@1"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@10"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@23/definition/elements@0"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@13"
            }
          }
        ]
      }
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`));vf.LangiumGrammarGrammar=aW});var V0=d(Ur=>{"use strict";Object.defineProperty(Ur,"__esModule",{value:!0});Ur.LangiumGrammarGeneratedModule=Ur.LangiumGrammarGeneratedSharedModule=Ur.LangiumGrammarParserConfig=Ur.LangiumGrammarLanguageMetaData=void 0;var oW=xe(),sW=B0();Ur.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Ur.LangiumGrammarParserConfig={maxLookahead:3};Ur.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new oW.LangiumGrammarAstReflection};Ur.LangiumGrammarGeneratedModule={Grammar:()=>(0,sW.LangiumGrammarGrammar)(),LanguageMetaData:()=>Ur.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Ur.LangiumGrammarParserConfig}}});var Tr=d(Et=>{"use strict";Object.defineProperty(Et,"__esModule",{value:!0});Et.Deferred=Et.MutexLock=Et.interruptAndCheck=Et.isOperationCancelled=Et.OperationCancelled=Et.setInterruptionPeriod=Et.startCancelableOperation=Et.delayNextTick=void 0;var Tf=_i();function z0(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}Et.delayNextTick=z0;var Xy=0,Y0=10;function uW(){return Xy=Date.now(),new Tf.CancellationTokenSource}Et.startCancelableOperation=uW;function lW(t){Y0=t}Et.setInterruptionPeriod=lW;Et.OperationCancelled=Symbol("OperationCancelled");function X0(t){return t===Et.OperationCancelled}Et.isOperationCancelled=X0;async function cW(t){if(t===Tf.CancellationToken.None)return;let e=Date.now();if(e-Xy>=Y0&&(Xy=e,await z0()),t.isCancellationRequested)throw Et.OperationCancelled}Et.interruptAndCheck=cW;var Jy=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Tf.CancellationTokenSource}lock(e){this.cancel();let r=new Tf.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{X0(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};Et.MutexLock=Jy;var Qy=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};Et.Deferred=Qy});var Rf=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.DefaultScopeComputation=void 0;var Zy=_i(),J0=be(),fW=gn(),Q0=Tr(),eg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=Zy.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=J0.streamContents,i=Zy.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,Q0.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=Zy.CancellationToken.None){let n=e.parseResult.value,i=new fW.MultiMap;for(let a of(0,J0.streamAllContents)(n))await(0,Q0.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};_f.DefaultScopeComputation=eg});var bf=d(ia=>{"use strict";Object.defineProperty(ia,"__esModule",{value:!0});ia.DefaultScopeProvider=ia.EMPTY_SCOPE=ia.StreamScope=void 0;var dW=be(),Af=Ft(),ns=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};ia.StreamScope=ns;ia.EMPTY_SCOPE={getElement(){},getAllElements(){return Af.EMPTY_STREAM}};var tg=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,dW.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Af.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new ns((0,Af.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Af.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new ns(i,r,n)}getGlobalScope(e,r){return new ns(this.indexManager.allElements(e))}};ia.DefaultScopeProvider=tg});var Ei=d(is=>{"use strict";Object.defineProperty(is,"__esModule",{value:!0});is.relativeURI=is.equalURI=void 0;function pW(t,e){return t?.toString()===e?.toString()}is.equalURI=pW;function hW(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}is.relativeURI=hW});var tC=d(os=>{"use strict";Object.defineProperty(os,"__esModule",{value:!0});os.LangiumGrammarScopeComputation=os.LangiumGrammarScopeProvider=void 0;var mW=Rf(),rg=bf(),as=be(),Z0=Le(),eC=Ft(),yW=Ei(),Hr=xe(),ng=jt(),ig=class extends rg.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Hr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,as.getDocument)(r.container).precomputedScopes,a=(0,as.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,eC.stream)(s).filter(u=>u.type===Hr.Interface||u.type===Hr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,as.getContainerOfType)(r.container,Hr.isGrammar);if(!n)return rg.EMPTY_SCOPE;let i=(0,eC.stream)(n.imports).map(ng.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,yW.equalURI)(o.documentUri,s)));return e===Hr.AbstractType&&(a=a.filter(o=>o.type===Hr.Interface||o.type===Hr.Type)),new rg.StreamScope(a)}};os.LangiumGrammarScopeProvider=ig;var ag=class extends mW.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Hr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(a,a.name,n))}(0,as.streamAllContents)(e).forEach(a=>{if((0,Hr.isAction)(a)&&a.inferredType){let o=(0,ng.getActionType)(a);o&&r.push(this.createInterfaceDescription(a,o,n))}})}}processNode(e,r,n){(0,Hr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Hr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,this.createInterfaceDescription(o,o.name,r))}}processActionNode(e,r,n){let i=(0,as.findRootNode)(e);if(i&&(0,Hr.isAction)(e)&&e.inferredType){let a=(0,ng.getActionType)(e);a&&n.add(i,this.createInterfaceDescription(e,a,r))}}createInterfaceDescription(e,r,n=(0,as.getDocument)(e)){var i;let a=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,Z0.toDocumentSegment)(a),selectionSegment:(0,Z0.toDocumentSegment)(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};os.LangiumGrammarScopeComputation=ag});var dg=d(fr=>{"use strict";var gW=fr&&fr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),vW=fr&&fr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),TW=fr&&fr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&gW(e,t,r);return vW(e,t),e};Object.defineProperty(fr,"__esModule",{value:!0});fr.LangiumGrammarValidator=fr.IssueCodes=fr.registerValidationChecks=void 0;var og=$o(),aa=be(),oa=gn(),sg=Le(),sa=vt(),ug=Ft(),Ee=TW(xe()),lg=xe(),It=jt(),_W=Hy(),cg=df();function RW(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion};e.register(n,r)}fr.registerValidationChecks=RW;var cr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(cr=fr.IssueCodes||(fr.IssueCodes={}));var fg=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:cr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Ee.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Ee.isParserRule(a)&&!(0,It.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:cr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,It.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,ug.stream)(i.rules).filter(a=>!Zu(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,ug.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new oa.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,It.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new oa.MultiMap;for(let i of e.imports){let a=(0,It.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[og.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,It.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new oa.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,ug.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,It.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Ee.isParserRule)){if(Zu(u))continue;let l=(0,It.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,It.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:cr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=(0,sa.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:cr.InvalidInfers,data:(0,sg.toDocumentSegment)(m)})}}else if(l&&c){let m=(0,sa.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:cr.InvalidInfers,data:(0,sg.toDocumentSegment)(m)})}}for(let u of(0,aa.streamAllContents)(e).filter(Ee.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,It.getTypeNameWithoutError)(u);if(u.type&&f&&o.has(f)===c){let m=c?(0,sa.findNodeForKeyword)(u.$cstNode,"infer"):(0,sa.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?cr.SuperfluousInfer:cr.MissingInfer,data:(0,sg.toDocumentSegment)(m)})}else if(l&&f&&o.has(f)&&c&&u.$cstNode){let m=(0,sa.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,sa.findNodeForKeyword)(u.$cstNode,"{");m&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:cr.SuperfluousInfer,data:{start:v.range.end,end:m.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:cr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,It.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,aa.getContainerOfType)(e,i=>Ee.isTerminalRule(i)||Ee.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ee.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ee.isTerminalRule(n)&&n.fragment&&(0,aa.getContainerOfType)(e,Ee.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:cr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,It.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:cr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:cr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,sa.getAllReachableRules)(e,!0);for(let i of e.rules)Ee.isTerminalRule(i)&&i.hidden||Zu(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[og.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new oa.MultiMap,i=new Set;for(let l of e.rules)Ee.isTerminalRule(l)&&l.name&&n.add(l.name,l),Ee.isParserRule(l)&&(0,aa.streamAllContents)(l).filter(Ee.isKeyword).forEach(f=>i.add(f.value));let a=new oa.MultiMap,o=new oa.MultiMap;for(let l of e.imports){let c=(0,It.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let m of f.rules)Ee.isTerminalRule(m)&&m.name?a.add(m.name,l):Ee.isParserRule(m)&&m.name&&(0,aa.streamAllContents)(m).filter(Ee.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new oa.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new oa.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>u.add(m,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!Zu(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:cr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&AW.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,aa.getContainerOfType)(e,lg.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,It.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:cr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,aa.streamAllContents)(e).filter(Ee.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[og.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(Zu(e))return;let n=(0,It.hasDataTypeReturn)(e),i=(0,It.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,lg.isRuleCall)(e.terminal)&&(0,lg.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,aa.streamAllContents)(e.terminal).map(a=>Ee.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=(0,_W.typeDefinitionToPropertyType)(n.type),a=(0,cg.flattenPlainType)(i),o=!1,s=!1;for(let u of a)(0,cg.isPlainReferenceType)(u)?o=!0:(0,cg.isPlainReferenceType)(u)||(s=!0);o&&s&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,It.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Ee.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Ee.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,sa.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Ee.isRuleCall(e.terminal)&&Ee.isParserRule(e.terminal.rule.ref)&&!(0,It.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Ee.isType(e.type.ref)&&Ee.isUnionType(e.type.ref.type)){let n=rC(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;Ee.isParserRule((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){Ee.isSimpleType(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&Ee.isParserRule(e.ref)&&!(0,It.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,It.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Ee.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};fr.LangiumGrammarValidator=fg;function Zu(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var AW=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function rC(t){let e=[];return t.types.forEach(r=>{var n;Ee.isSimpleType(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Ee.isType(r.typeRef.ref)&&(Ee.isUnionType(r.typeRef.ref.type)?e.push(...rC(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}});var Ef=d(vn=>{"use strict";Object.defineProperty(vn,"__esModule",{value:!0});vn.DocumentValidator=vn.toDiagnosticSeverity=vn.getDiagnosticRange=vn.DefaultDocumentValidator=void 0;var Kr=$e(),nC=vt(),bW=be(),CW=Le(),Cf=Tr(),pg=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Kr.CancellationToken.None){let n=e.parseResult,i=[];await(0,Cf.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Kr.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Sf.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Kr.Range.create(0,0,0,0);else{let u=Kr.Position.create(s.endLine-1,s.endColumn);o=Kr.Range.create(u,u)}}}else o=(0,CW.tokenToRange)(a.token);if(o){let s={severity:Kr.DiagnosticSeverity.Error,range:o,message:a.message,code:Sf.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Sf.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Cf.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Cf.interruptAndCheck)(r),i}async validateAst(e,r,n=Kr.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,bW.streamAst)(e).map(async o=>{await(0,Cf.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:iC(n),severity:aC(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};vn.DefaultDocumentValidator=pg;function iC(t){if(Kr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,nC.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,nC.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}vn.getDiagnosticRange=iC;function aC(t){switch(t){case"error":return Kr.DiagnosticSeverity.Error;case"warning":return Kr.DiagnosticSeverity.Warning;case"info":return Kr.DiagnosticSeverity.Information;case"hint":return Kr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}vn.toDiagnosticSeverity=aC;var Sf;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Sf=vn.DocumentValidator||(vn.DocumentValidator={}))});var cC=d(Vn=>{"use strict";var SW=Vn&&Vn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),EW=Vn&&Vn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),PW=Vn&&Vn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&SW(e,t,r);return EW(e,t),e};Object.defineProperty(Vn,"__esModule",{value:!0});Vn.LangiumGrammarCodeActionProvider=void 0;var Wr=$e(),wW=yn(),oC=be(),sC=Le(),NW=vt(),uC=za(),lC=Ei(),kW=Ef(),hg=PW(xe()),Br=dg(),mg=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Br.IssueCodes.GrammarNameUppercase:case Br.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Br.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Br.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Br.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Br.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Br.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Br.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Br.IssueCodes.InvalidInfers:case Br.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Br.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Br.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case kW.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,sC.findLeafNodeAtOffset)(i,n),o=(0,oC.getContainerOfType)(a?.element,hg.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,uC.escapeRegExp)(s)}-${(0,uC.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,NW.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&hg.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,sC.findLeafNodeAtOffset)(a,i),s=(0,oC.getContainerOfType)(o?.element,hg.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(m=>m.name===r.refText),l=[],c=-1,f=-1;for(let m of u){if((0,lC.equalURI)(m.documentUri,n.uri))continue;let v=xW(n.uri,m.documentUri),y,A="",P=n.parseResult.value,w=P.imports.find(C=>C.path&&v<C.path);if(w)y=(i=w.$cstNode)===null||i===void 0?void 0:i.range.start;else if(P.imports.length>0){let C=P.imports[P.imports.length-1].$cstNode.range.end;C&&(y={line:C.line+1,character:0})}else P.rules.length>0&&(y=(a=P.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,A=`
`);y&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Wr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${A}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Vn.LangiumGrammarCodeActionProvider=mg;function xW(t,e){let r=wW.Utils.dirname(t),n=(0,lC.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var wf=d(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.DefaultFoldingRangeProvider=void 0;var yg=$e(),OW=be(),DW=Le(),gg=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,OW.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,DW.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,yg.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),yg.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===yg.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Pf.DefaultFoldingRangeProvider=gg});var fC=d(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.LangiumGrammarFoldingRangeProvider=void 0;var IW=wf(),$W=xe(),vg=class extends IW.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,$W.isParserRule)(e)}};Nf.LangiumGrammarFoldingRangeProvider=vg});var Rg=d(Tn=>{"use strict";Object.defineProperty(Tn,"__esModule",{value:!0});Tn.Formatting=Tn.FormattingRegion=Tn.DefaultNodeFormatter=Tn.AbstractFormatter=void 0;var kf=vt(),Tg=er(),qW=be(),dC=Le(),el=Ft(),_g=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new xf(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(a=>{var o;return(o=a.line)!==null&&o!==void 0?o:Number.MAX_VALUE}),...n.parserErrors.map(a=>{var o;return(o=a.token.startLine)!==null&&o!==void 0?o:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let m=this.nodeModeToKey(s,u),v=i.get(m),y=(c=l.options.priority)!==null&&c!==void 0?c:0,A=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||A<=y)&&i.set(m,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,qW.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,m=(0,Tg.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),y=r.get(v);if(r.delete(v),y){let w=this.createTextEdit(l,f,y,a);for(let C of w)C&&this.insideRange(C.range,i)&&this.isNecessary(C,e.textDocument)&&o.push(C)}let A=this.nodeModeToKey(f,"append"),P=r.get(A);if(r.delete(A),P){let w=(0,dC.getNextNode)(f);if(w){let C=this.createTextEdit(f,w,P,a);for(let b of C)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}}if(!y&&f.hidden){let w=this.createHiddenTextEdits(l,f,void 0,a);for(let C of w)C&&this.insideRange(C.range,i)&&this.isNecessary(C,e.textDocument)&&o.push(C)}m&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let A=r.text.split(`
`);A[0]=l+A[0];for(let P=0;P<A.length;P++){let w=o+P,C={character:0,line:w};if(v>0)s.push({newText:y,range:{start:C,end:C}});else{let b=A[P],O=0;for(;O<b.length;O++){let L=b.charAt(O);if(L!==" "&&L!=="	")break}s.push({newText:"",range:{start:C,end:{line:w,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return u!==void 0?m.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?m.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(o,Boolean(e),i)),(0,Tg.isLeafCstNode)(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new el.TreeStreamImpl(i,a=>this.iterateCst(a,r)):el.EMPTY_STREAM}iterateCst(e,r){if(!(0,Tg.isCompositeCstNode)(e))return el.EMPTY_STREAM;let n=r.indentation;return new el.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,el.DONE_RESULT))}};Tn.AbstractFormatter=_g;var xf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new _r(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new _r(r,this.collector)}property(e,r){let n=(0,kf.findNodeForProperty)(this.astNode.$cstNode,e,r);return new _r(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,kf.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new _r(r,this.collector)}keyword(e,r){let n=(0,kf.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new _r(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,kf.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new _r(r,this.collector)}cst(e){return new _r([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new _r([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new _r((0,dC.getInteriorNodes)(a,o),this.collector)}};Tn.DefaultNodeFormatter=xf;var _r=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new _r(this.nodes.slice(e,r),this.collector)}};Tn.FormattingRegion=_r;var LW;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var m,v,y,A,P,w;let C=(m=c.lines)!==null&&m!==void 0?m:0,b=(v=f.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,L=(A=f.tabs)!==null&&A!==void 0?A:0,W=(P=c.characters)!==null&&P!==void 0?P:0,ee=(w=f.characters)!==null&&w!==void 0?w:0;return C<b?-1:C>b?1:O<L?-1:O>L?1:W<ee?-1:W>ee?1:0}})(LW=Tn.Formatting||(Tn.Formatting={}))});var pC=d(zn=>{"use strict";var MW=zn&&zn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),FW=zn&&zn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),jW=zn&&zn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&MW(e,t,r);return FW(e,t),e};Object.defineProperty(zn,"__esModule",{value:!0});zn.LangiumGrammarFormatter=void 0;var Pe=Rg(),ua=jW(xe()),Ag=class extends Pe.AbstractFormatter{format(e){if(ua.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Pe.Formatting.noSpace());else if(ua.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Pe.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Pe.Formatting.oneSpace()):r.property("name").append(Pe.Formatting.noSpace()),r.properties("parameters").append(Pe.Formatting.noSpace()),r.keywords(",").append(Pe.Formatting.oneSpace()),r.keywords("<").append(Pe.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Pe.Formatting.noSpace()),r.interior(i,n).prepend(Pe.Formatting.indent()),n.prepend(Pe.Formatting.fit(Pe.Formatting.noSpace(),Pe.Formatting.newLine())),r.node(e).prepend(Pe.Formatting.noIndent())}else if(ua.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Pe.Formatting.oneSpace()),r.keyword("returns").append(Pe.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Pe.Formatting.oneSpace()),r.keyword(":").prepend(Pe.Formatting.noSpace()),r.keyword(";").prepend(Pe.Formatting.fit(Pe.Formatting.noSpace(),Pe.Formatting.newLine())),r.node(e).prepend(Pe.Formatting.noIndent())}else if(ua.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Pe.Formatting.noSpace()),r.keywords(".","+=","=").surround(Pe.Formatting.noSpace()),r.keyword("}").prepend(Pe.Formatting.noSpace())}else if(ua.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Pe.Formatting.oneSpace());else if(ua.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Pe.Formatting.noSpace());else if(ua.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Pe.Formatting.noSpace()),r.keyword(",").append(Pe.Formatting.oneSpace()),r.properties("arguments").append(Pe.Formatting.noSpace())}ua.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Pe.Formatting.noSpace())}};zn.LangiumGrammarFormatter=Ag});var If=d(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.SemanticTokensDecoder=Pt.AbstractSemanticTokenProvider=Pt.SemanticTokensBuilder=Pt.DefaultSemanticTokenOptions=Pt.AllSemanticTokenModifiers=Pt.AllSemanticTokenTypes=void 0;var pe=$e(),Of=vt(),GW=be(),UW=Tr(),HW=Le();Pt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};Pt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};Pt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Pt.AllSemanticTokenTypes),tokenModifiers:Object.keys(Pt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var Df=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Pt.SemanticTokensBuilder=Df;var bg=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Df;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,a=(0,GW.streamAst)(i,{range:this.currentRange}).iterator(),o;do if(o=a.next(),!o.done){await(0,UW.interruptAndCheck)(n);let s=o.value;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.currentRange&&!(0,HW.inRange)(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let o=Pt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=Pt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,m-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let m=u+1;m<l;m++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,Of.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,Of.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,Of.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,Of.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Pt.AbstractSemanticTokenProvider=bg;var KW;(function(t){function e(n,i){let a=new Map;Object.entries(Pt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(KW=Pt.SemanticTokensDecoder||(Pt.SemanticTokensDecoder={}))});var hC=d($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.LangiumGrammarSemanticTokenProvider=void 0;var la=$e(),WW=If(),ca=xe(),Cg=class extends WW.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,ca.isAssignment)(e)?r({node:e,property:"feature",type:la.SemanticTokenTypes.property}):(0,ca.isAction)(e)?e.feature&&r({node:e,property:"feature",type:la.SemanticTokenTypes.property}):(0,ca.isReturnType)(e)?r({node:e,property:"name",type:la.SemanticTokenTypes.type}):(0,ca.isSimpleType)(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:la.SemanticTokenTypes.type}):(0,ca.isParameter)(e)?r({node:e,property:"name",type:la.SemanticTokenTypes.parameter}):(0,ca.isParameterReference)(e)?r({node:e,property:"parameter",type:la.SemanticTokenTypes.parameter}):(0,ca.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:la.SemanticTokenTypes.type}):(0,ca.isTypeAttribute)(e)&&r({node:e,property:"name",type:la.SemanticTokenTypes.property})}};$f.LangiumGrammarSemanticTokenProvider=Cg});var yC=d(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.LangiumGrammarNameProvider=void 0;var BW=Zo(),VW=vt(),mC=xe(),Sg=class extends BW.DefaultNameProvider{getName(e){return(0,mC.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,mC.isAssignment)(e)?(0,VW.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};qf.LangiumGrammarNameProvider=Sg});var Mf=d(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.DefaultReferences=void 0;var zW=vt(),gC=er(),YW=be(),vC=Le(),XW=Ft(),JW=Ei(),Eg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,zW.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,gC.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,gC.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,vC.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let a=this.getReferenceToSelf(e);a&&n.push(a)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(a=>(0,JW.equalURI)(a.sourceUri,r.documentUri))),n.push(...i),(0,XW.stream)(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,YW.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,vC.toDocumentSegment)(r),local:!0}}}};Lf.DefaultReferences=Eg});var bC=d(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.LangiumGrammarReferences=void 0;var QW=Mf(),_n=be(),TC=Le(),_C=vt(),ZW=Ft(),RC=Ei(),Rn=xe(),AC=jt(),Pg=Jo(),wg=class extends QW.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,_C.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Rn.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Rn.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return(0,Rn.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,_n.getContainerOfType)(e,Rn.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,Pg.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,ZW.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Rn.isParserRule)(e)){let i=(0,AC.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,_n.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,_n.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,TC.toDocumentSegment)(a),local:(0,RC.equalURI)((0,_n.getDocument)(i).uri,(0,_n.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,_C.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,_n.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,_n.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,TC.toDocumentSegment)(a),local:(0,RC.equalURI)((0,_n.getDocument)(e).uri,(0,_n.getDocument)(r).uri)})}let i=(0,_n.getContainerOfType)(e,Rn.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,_n.getContainerOfType)(e,Rn.isParserRule),i=(0,AC.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Rn.isInterface)(n.returnType.ref)||(0,Rn.isType)(n.returnType.ref))){let a=(0,Pg.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,Pg.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Rn.isParserRule)(o)||(0,Rn.isAction)(o))&&r.push(o)}),r}};Ff.LangiumGrammarReferences=wg});var xg=d(Vr=>{"use strict";var eB=Vr&&Vr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),tB=Vr&&Vr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),rB=Vr&&Vr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&eB(e,t,r);return tB(e,t),e};Object.defineProperty(Vr,"__esModule",{value:!0});Vr.findFirstFeatures=Vr.findNextFeatures=void 0;var rr=rB(xe()),Pi=jt(),nB=er(),iB=be(),aB=vt();function oB(t,e){let r={stacks:t,tokens:e};return sB(r),r.stacks.flat().forEach(i=>{i.property=void 0}),EC(r.stacks).map(i=>i[i.length-1])}Vr.findNextFeatures=oB;function Ng(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(rr.isGroup(u.$container)){s=u.$container;break}else if(rr.isAbstractElement(u.$container))u=u.$container;else break;if((0,Pi.isArrayCardinality)(u.cardinality)){let l=ss({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...SC({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,Pi.isOptionalCardinality)(c.feature.cardinality)||(0,Pi.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Ng({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function CC(t){return(0,nB.isAstNode)(t)&&(t={feature:t}),ss({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Vr.findFirstFeatures=CC;function ss(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(rr.isGroup(u)){if(o.has(u))return[];o.add(u)}if(rr.isGroup(u))return SC(i,0,a,o,s).map(c=>jf(c,u.cardinality,a));if(rr.isAlternatives(u)||rr.isUnorderedGroup(u))return u.elements.flatMap(c=>ss({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>jf(c,u.cardinality,a));if(rr.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return ss({next:c,cardinalities:a,visited:o,plus:s}).map(f=>jf(f,u.cardinality,a))}else{if(rr.isAction(u))return Ng({next:{feature:u,new:!0,type:(0,Pi.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(rr.isRuleCall(u)&&rr.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,Pi.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return ss({next:f,cardinalities:a,visited:o,plus:s}).map(m=>jf(m,u.cardinality,a))}else return[i]}}function jf(t,e,r){return r.set(t.feature,e),t}function SC(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...ss({next:s,cardinalities:r,visited:n,plus:i})),!!(0,Pi.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function sB(t){for(let e of t.tokens){let r=EC(t.stacks,e);t.stacks=r}}function EC(t,e){let r=[];for(let n of t)r.push(...uB(n,e));return r}function uB(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(lB)),i=[];for(;t.length>0;){let a=t.pop(),o=Ng({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?kg(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,Pi.isOptionalCardinality)(s.feature.cardinality)||(0,Pi.isOptionalCardinality)(r.get(s.feature))))break}return i}function lB(t){if(t.cardinality==="+")return!0;let e=(0,iB.getContainerOfType)(t,rr.isAssignment);return!!(e&&e.cardinality==="+")}function kg(t,e){if(rr.isKeyword(t))return t.value===e.image;if(rr.isRuleCall(t))return cB(t.rule.ref,e);if(rr.isCrossReference(t)){let r=(0,aB.getCrossReferenceTerminal)(t);if(r)return kg(r,e)}return!1}function cB(t,e){return rr.isParserRule(t)?CC(t.definition).some(n=>kg(n.feature,e)):rr.isTerminalRule(t)?new RegExp((0,Pi.terminalRegex)(t)).test(e.image):!1}});var Uf=d(zr=>{"use strict";var fB=zr&&zr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),dB=zr&&zr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),pB=zr&&zr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&fB(e,t,r);return dB(e,t),e};Object.defineProperty(zr,"__esModule",{value:!0});zr.DefaultCompletionProvider=zr.mergeCompletionProviderOptions=void 0;var tl=$e(),rl=pB(xe()),hB=jt(),mB=be(),PC=Le(),wC=vt(),Og=Ft(),Gf=xg();function yB(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}zr.mergeCompletionProviderOptions=yB;var Dg=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){var n,i;let o=e.parseResult.value.$cstNode;if(!o)return;let s=[],u=e.textDocument,l=u.getText(),c=u.offsetAt(r.position),f=L=>{let W=this.fillCompletionItem(u,c,L);W&&s.push(W)},m=this.backtrackToAnyToken(l,c),v=(n=(0,PC.findLeafNodeAtOffset)(o,m))===null||n===void 0?void 0:n.element,y={document:e,textDocument:u,node:v,offset:c,position:r.position};if(!v){let L=(0,wC.getEntryRule)(this.grammar);return await this.completionForRule(y,L,f),tl.CompletionList.create(this.deduplicateItems(s),!0)}let A=[y];if(m===c&&m>0){let L=(i=(0,PC.findLeafNodeAtOffset)(o,m-1))===null||i===void 0?void 0:i.element;L!==v&&A.push({document:e,textDocument:u,node:L,offset:c,position:r.position})}let P=this.backtrackToTokenStart(l,c),w=this.findFeaturesAt(u,P),C=[],b=this.canReparse()&&c!==P;b&&(C=this.findFeaturesAt(u,c));let O=L=>rl.isKeyword(L.feature)?L.feature.value:L.feature;return await Promise.all((0,Og.stream)(w).distinct(O).map(L=>this.completionForContexts(A,L,f))),b&&await Promise.all((0,Og.stream)(C).exclude(w,O).distinct(O).map(L=>this.completionForContexts(A,L,f))),tl.CompletionList.create(this.deduplicateItems(s),!0)}deduplicateItems(e){return(0,Og.stream)(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:tl.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,wC.getEntryRule)(this.grammar),l=(0,Gf.findFirstFeatures)({feature:u.definition,new:!0,type:(0,hB.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,Gf.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,Gf.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(rl.isParserRule(r)){let i=(0,Gf.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}async completionForContexts(e,r,n){for(let i of e)await this.completionFor(i,r,n)}completionFor(e,r,n){if(rl.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(rl.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,mB.getContainerOfType)(r.feature,rl.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:tl.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:tl.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return NC<=e&&e<=kC&&gB<=r&&r<=vB||e===xC&&r!==xC}toUpperCharCode(e){return NC<=e&&e<=kC?e-32:e}};zr.DefaultCompletionProvider=Dg;var NC="a".charCodeAt(0),kC="z".charCodeAt(0),gB="A".charCodeAt(0),vB="Z".charCodeAt(0),xC="_".charCodeAt(0)});var qg=d(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.AbstractCallHierarchyProvider=void 0;var TB=$e(),OC=yn(),Ig=Le(),$g=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,Ig.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:TB.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(OC.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,Ig.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(OC.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,Ig.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};Hf.AbstractCallHierarchyProvider=$g});var IC=d(DC=>{"use strict";Object.defineProperty(DC,"__esModule",{value:!0})});var qC=d($C=>{"use strict";Object.defineProperty($C,"__esModule",{value:!0})});var MC=d(LC=>{"use strict";Object.defineProperty(LC,"__esModule",{value:!0})});var Mg=d(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.DefaultDefinitionProvider=void 0;var _B=$e(),RB=be(),AB=Le(),Lg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,AB.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[_B.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,RB.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};Kf.DefaultDefinitionProvider=Lg});var jg=d(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.DefaultDocumentHighlightProvider=void 0;var bB=$e(),CB=be(),SB=Le(),EB=Ei(),Fg=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,SB.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=(0,EB.equalURI)((0,CB.getDocument)(a).uri,e.uri),s={documentUri:e.uri,includeDeclaration:o};return this.references.findReferences(a,s).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return bB.DocumentHighlight.create(e.segment.range)}};Wf.DefaultDocumentHighlightProvider=Fg});var jC=d(FC=>{"use strict";Object.defineProperty(FC,"__esModule",{value:!0})});var Ug=d(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.DefaultDocumentSymbolProvider=void 0;var PB=$e(),wB=be(),Gg=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,wB.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return PB.SymbolKind.Field}};Bf.DefaultDocumentSymbolProvider=Gg});var GC=d(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.AbstractExecuteCommandHandler=void 0;var NB=$e(),Hg=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=NB.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};Vf.AbstractExecuteCommandHandler=Hg});var Wg=d(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.MultilineCommentHoverProvider=us.AstNodeHoverProvider=void 0;var kB=Le(),zf=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,kB.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};us.AstNodeHoverProvider=zf;var Kg=class extends zf{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};us.MultilineCommentHoverProvider=Kg});var UC=d(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.AbstractGoToImplementationProvider=void 0;var xB=$e(),OB=Le(),Bg=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=xB.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,OB.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};Yf.AbstractGoToImplementationProvider=Bg});var HC=d(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.AbstractInlayHintProvider=void 0;var DB=$e(),IB=be(),$B=Tr(),Vg=class{async getInlayHints(e,r,n=DB.CancellationToken.None){let i=e.parseResult.value,a=[],o=s=>a.push(s);for(let s of(0,IB.streamAst)(i,{range:r.range}))await(0,$B.interruptAndCheck)(n),this.computeInlayHint(s,o);return a}};Xf.AbstractInlayHintProvider=Vg});var fa=d(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.DefaultLangiumDocuments=wi.DefaultLangiumDocumentFactory=wi.DocumentState=void 0;var qB=Qm(),LB=yn(),MB=Ft(),ls;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(ls=wi.DocumentState||(wi.DocumentState={}));var zg=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??LB.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:ls.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:ls.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=ls.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=qB.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};wi.DefaultLangiumDocumentFactory=zg;var Yg=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,MB.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=ls.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=ls.Changed,this.documentMap.delete(r)),n}};wi.DefaultLangiumDocuments=Yg});var Jg=d(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.mergeSignatureHelpOptions=cs.AbstractSignatureHelpProvider=void 0;var FB=$e(),jB=Le(),Xg=class{provideSignatureHelp(e,r,n=FB.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,jB.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};cs.AbstractSignatureHelpProvider=Xg;function GB(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}cs.mergeSignatureHelpOptions=GB});var ev=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.createRequestHandler=J.createServerRequestHandler=J.createCallHierarchyRequestHandler=J.addCallHierarchyHandler=J.addCodeLensHandler=J.addSignatureHelpHandler=J.addDocumentLinkHandler=J.addExecuteCommandHandler=J.addConfigurationChangeHandler=J.addSemanticTokenHandler=J.addInlayHintHandler=J.addRenameHandler=J.addFormattingHandler=J.addFoldingRangeHandler=J.addHoverHandler=J.addDocumentHighlightsHandler=J.addGoToDeclarationHandler=J.addGoToImplementationHandler=J.addGoToTypeDefinitionHandler=J.addGotoDefinitionHandler=J.addDocumentSymbolHandler=J.addCodeActionHandler=J.addFindReferencesHandler=J.addCompletionHandler=J.addDiagnosticsHandler=J.addDocumentsHandler=J.startLanguageServer=J.DefaultLanguageServer=void 0;var Qa=$e(),nl=yn(),KC=Uu(),UB=Tr(),HB=fa(),KB=Uf(),WB=If(),BB=Jg(),Qg=class{constructor(e){this.onInitializeEmitter=new Qa.Emitter,this.onInitializedEmitter=new Qa.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,KC.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,KC.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var fe;return(fe=V.lsp.Formatter)===null||fe===void 0?void 0:fe.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,BB.mergeSignatureHelpOptions)(n.map(V=>{var fe;return(fe=V.lsp.SignatureHelp)===null||fe===void 0?void 0:fe.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),m=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=(0,KB.mergeCompletionProviderOptions)(n.map(V=>{var fe;return(fe=V.lsp.CompletionProvider)===null||fe===void 0?void 0:fe.completionOptions})),A=this.hasService(V=>V.lsp.ReferencesProvider),P=this.hasService(V=>V.lsp.DocumentSymbolProvider),w=this.hasService(V=>V.lsp.DefinitionProvider),C=this.hasService(V=>V.lsp.DocumentHighlightProvider),b=this.hasService(V=>V.lsp.FoldingRangeProvider),O=this.hasService(V=>V.lsp.HoverProvider),L=this.hasService(V=>V.lsp.RenameProvider),W=this.hasService(V=>V.lsp.CallHierarchyProvider),ee=this.services.lsp.CodeLensProvider,Ne=this.hasService(V=>V.lsp.DeclarationProvider),ke=this.services.lsp.InlayHintProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:Qa.TextDocumentSyncKind.Incremental,completionProvider:v?y:void 0,referencesProvider:A,documentSymbolProvider:P,definitionProvider:w,typeDefinitionProvider:f,documentHighlightProvider:C,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:b,hoverProvider:O,renameProvider:L?{prepareProvider:!0}:void 0,semanticTokensProvider:s?WB.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:W?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:ee?{resolveProvider:Boolean(ee.resolveCodeLens)}:void 0,declarationProvider:Ne,inlayHintProvider:ke?{resolveProvider:Boolean(ke.resolveInlayHint)}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};J.DefaultLanguageServer=Qg;function VB(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");WC(e,t),BC(e,t),VC(e,t),zC(e,t),XC(e,t),JC(e,t),QC(e,t),ZC(e,t),tS(e,t),nS(e,t),iS(e,t),YC(e,t),aS(e,t),rS(e,t),oS(e,t),sS(e,t),lS(e,t),fS(e,t),pS(e,t),dS(e,t),cS(e,t),uS(e,t),eS(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}J.startLanguageServer=VB;function WC(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([nl.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=[],u=[];for(let l of o.changes){let c=nl.URI.parse(l.uri);l.type===Qa.FileChangeType.Deleted?u.push(c):s.push(c)}i(s,u)})}J.addDocumentsHandler=WC;function BC(t,e){e.workspace.DocumentBuilder.onBuildPhase(HB.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}J.addDiagnosticsHandler=BC;function VC(t,e){t.onCompletion(Yt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}J.addCompletionHandler=VC;function zC(t,e){t.onReferences(Yt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}J.addFindReferencesHandler=zC;function YC(t,e){t.onCodeAction(Yt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}J.addCodeActionHandler=YC;function XC(t,e){t.onDocumentSymbol(Yt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}J.addDocumentSymbolHandler=XC;function JC(t,e){t.onDefinition(Yt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}J.addGotoDefinitionHandler=JC;function QC(t,e){t.onTypeDefinition(Yt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}J.addGoToTypeDefinitionHandler=QC;function ZC(t,e){t.onImplementation(Yt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}J.addGoToImplementationHandler=ZC;function eS(t,e){t.onDeclaration(Yt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}J.addGoToDeclarationHandler=eS;function tS(t,e){t.onDocumentHighlight(Yt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}J.addDocumentHighlightsHandler=tS;function rS(t,e){t.onHover(Yt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}J.addHoverHandler=rS;function nS(t,e){t.onFoldingRanges(Yt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}J.addFoldingRangeHandler=nS;function iS(t,e){t.onDocumentFormatting(Yt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Yt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Yt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}J.addFormattingHandler=iS;function aS(t,e){t.onRenameRequest(Yt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Yt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}J.addRenameHandler=aS;function oS(t,e){var r;let n=e.lsp.InlayHintProvider;if(n){t.languages.inlayHint.on(Ni((a,o,s,u)=>n.getInlayHints(o,s,u),e));let i=(r=n.resolveInlayHint)===null||r===void 0?void 0:r.bind(n);i&&t.languages.inlayHint.resolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Za(s)}})}}J.addInlayHintHandler=oS;function sS(t,e){let r={data:[]};t.languages.semanticTokens.on(Ni((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):r,e)),t.languages.semanticTokens.onDelta(Ni((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):r,e)),t.languages.semanticTokens.onRange(Ni((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):r,e))}J.addSemanticTokenHandler=sS;function uS(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}J.addConfigurationChangeHandler=uS;function lS(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return Za(o)}})}J.addExecuteCommandHandler=lS;function cS(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(Ni((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Za(s)}})}}J.addDocumentLinkHandler=cS;function fS(t,e){t.onSignatureHelp(Ni((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}J.addSignatureHelpHandler=fS;function dS(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(Ni((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Za(s)}})}}J.addCodeLensHandler=dS;function pS(t,e){t.languages.callHierarchy.onPrepare(Ni((r,n,i,a)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,a))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onIncomingCalls(Zg((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&a!==void 0?a:null},e)),t.languages.callHierarchy.onOutgoingCalls(Zg((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&a!==void 0?a:null},e))}J.addCallHierarchyHandler=pS;function Zg(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=nl.URI.parse(n.item.uri),o=r.getServices(a);if(!o){let s=`Could not find service instance for uri: '${a.toString()}'`;throw console.error(s),new Error(s)}try{return await t(o,n,i)}catch(s){return Za(s)}}}J.createCallHierarchyRequestHandler=Zg;function Ni(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=nl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return Za(l)}}}J.createServerRequestHandler=Ni;function Yt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=nl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return Za(l)}}}J.createRequestHandler=Yt;function Za(t){if((0,UB.isOperationCancelled)(t))return new Qa.ResponseError(Qa.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Qa.ResponseError)return t;throw t}});var rv=d(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.DefaultReferencesProvider=void 0;var zB=$e(),YB=Le(),tv=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,YB.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(zB.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};Jf.DefaultReferencesProvider=tv});var iv=d(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.DefaultRenameProvider=void 0;var XB=$e(),JB=Zo(),hS=Le(),nv=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,hS.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=XB.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,hS.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,JB.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};Qf.DefaultRenameProvider=nv});var mS=d(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.AbstractTypeDefinitionProvider=void 0;var QB=$e(),ZB=Le(),av=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=QB.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,ZB.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Zf.AbstractTypeDefinitionProvider=av});var ov=d(Fe=>{"use strict";var eV=Fe&&Fe.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ht=Fe&&Fe.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&eV(e,t,r)};Object.defineProperty(Fe,"__esModule",{value:!0});ht(Uf(),Fe);ht(xg(),Fe);ht(qg(),Fe);ht(IC(),Fe);ht(qC(),Fe);ht(MC(),Fe);ht(Mg(),Fe);ht(jg(),Fe);ht(jC(),Fe);ht(Ug(),Fe);ht(GC(),Fe);ht(wf(),Fe);ht(Rg(),Fe);ht(Wg(),Fe);ht(UC(),Fe);ht(HC(),Fe);ht(ev(),Fe);ht(rv(),Fe);ht(iv(),Fe);ht(If(),Fe);ht(Jg(),Fe);ht(mS(),Fe)});var yS=d(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.LangiumGrammarDefinitionProvider=void 0;var sv=$e(),tV=ov(),rV=be(),nV=vt(),iV=xe(),aV=jt(),uv=class extends tV.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,iV.isGrammarImport)(e.element)&&((n=(0,nV.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,aV.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:sv.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:sv.Range.create(0,0,0,0);return[sv.LocationLink.create(c.$document.uri.toString(),v,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,rV.streamContents)(e).head()}};ed.LangiumGrammarDefinitionProvider=uv});var vS=d(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.LangiumGrammarCallHierarchyProvider=void 0;var gS=$e(),oV=qg(),lv=be(),sV=Le(),td=xe(),cv=class extends oV.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,td.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,sV.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,lv.getContainerOfType)(s.element,td.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:gS.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,td.isParserRule)(e))return;let r=(0,lv.streamAllContents)(e).filter(td.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,lv.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:gS.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};rd.LangiumGrammarCallHierarchyProvider=cv});var RS=d(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.LangiumGrammarValidationResourcesCollector=void 0;var uV=gn(),_S=Ft(),nd=xe(),TS=jt(),id=Jo(),lV=Vy(),fv=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,lV.collectValidationAst)(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=cV(e);for(let s of(0,id.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,_S.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,id.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,Object.assign(Object.assign({},l??{}),{declared:s,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=(0,id.mergeInterfaces)(e,r),a=new Map(i.map(o=>[o.name,o]));for(let o of(0,id.mergeInterfaces)(e,r))n.set(o.name,this.addSuperProperties(o,a,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let a of e.superTypes){let o=r.get(a.name);o&&i.push(...this.addSuperProperties(o,r,n))}return i}};ad.LangiumGrammarValidationResourcesCollector=fv;function cV({parserRules:t,datatypeRules:e}){let r=new uV.MultiMap;(0,_S.stream)(t).concat(e).forEach(i=>r.add((0,TS.getRuleType)(i),i));function n(i){if((0,nd.isAction)(i)){let a=(0,TS.getActionType)(i);a&&r.add(a,i)}((0,nd.isAlternatives)(i)||(0,nd.isGroup)(i)||(0,nd.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var AS=d(da=>{"use strict";Object.defineProperty(da,"__esModule",{value:!0});da.isInferredAndDeclared=da.isInferred=da.isDeclared=void 0;function fV(t){return t&&"declared"in t}da.isDeclared=fV;function dV(t){return t&&"inferred"in t}da.isInferred=dV;function pV(t){return t&&"inferred"in t&&"declared"in t}da.isInferredAndDeclared=pV});var CS=d(Yr=>{"use strict";var hV=Yr&&Yr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),mV=Yr&&Yr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),yV=Yr&&Yr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&hV(e,t,r);return mV(e,t),e};Object.defineProperty(Yr,"__esModule",{value:!0});Yr.LangiumGrammarTypesValidator=Yr.registerTypeValidationChecks=void 0;var fs=yV(xe()),gV=gn(),vV=jt(),et=Xo(),dv=AS();function TV(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Yr.registerTypeValidationChecks=TV;var pv=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,dv.isDeclared)(a)&&(0,et.isInterfaceType)(a.declared)&&fs.isInterface(a.declaredNode)){let o=a;RV(o,r),AV(o,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,dv.isInferred)(a)&&a.inferred instanceof et.InterfaceType&&_V(a.inferred,r),(0,dv.isInferredAndDeclared)(a)&&SV(a,i,r)}checkActionIsNotUnionType(e,r){fs.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Yr.LangiumGrammarTypesValidator=pv;function _V(t,e){t.properties.forEach(r=>{var n;let i=(0,et.flattenPropertyUnion)(r.type);if(i.length>1){let a=s=>(0,et.isReferenceType)(s)?"ref":"other",o=a(i[0]);if(i.slice(1).some(s=>a(s)!==o)){let s=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;s&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:s})}}})}function RV({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&((0,et.isUnionType)(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function AV({declared:t,declaredNode:e},r){let n=t.properties.reduce((o,s)=>o.add(s.name,s),new gV.MultiMap);for(let[o,s]of n.entriesGroupedByKey())if(s.length>1)for(let u of s)r("error",`Cannot have two properties with the same name '${o}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let o=0;o<i.length;o++)for(let s=o+1;s<i.length;s++){let u=i[o],l=i[s],c=(0,et.isInterfaceType)(u)?u.superProperties:[],f=(0,et.isInterfaceType)(l)?l.superProperties:[],m=bV(c,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${l}'. Their ${m.map(v=>"'"+v+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let a=new Set;for(let o of i){let s=(0,et.isInterfaceType)(o)?o.superProperties:[];for(let u of s)a.add(u.name)}for(let o of t.properties)if(a.has(o.name)){let s=e.attributes.find(u=>u.name===o.name);s&&r("error",`Cannot redeclare property '${o.name}'. It is already inherited from another interface.`,{node:s,property:"name"})}}function bV(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!CV(n,i)&&r.push(n.name)}return r}function CV(t,e){return(0,et.isTypeAssignable)(t.type,e.type)&&(0,et.isTypeAssignable)(e.type,t.type)}function SV(t,e,r){let{inferred:n,declared:i,declaredNode:a,inferredNodes:o}=t,s=i.name,u=f=>m=>o.forEach(v=>r("error",`${m}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:fs.isAction(v)?"type":"name"})),l=(f,m)=>f.forEach(v=>r("error",m,{node:v,property:fs.isAssignment(v)||fs.isAction(v)?"feature":"name"})),c=f=>{o.forEach(m=>{fs.isParserRule(m)&&(0,vV.extractAssignments)(m.definition).find(y=>y.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${s}'.`,{node:m,property:"parameters"})})};if((0,et.isUnionType)(n)&&(0,et.isUnionType)(i))EV(n.type,i.type,u(`in a rule that returns type '${s}'`));else if((0,et.isInterfaceType)(n)&&(0,et.isInterfaceType)(i))PV(n,i,e,u(`in a rule that returns type '${s}'`),l,c);else{let f=`Inferred and declared versions of type '${s}' both have to be interfaces or unions.`;u()(f),r("error",f,{node:a,property:"name"})}}function EV(t,e,r){(0,et.isTypeAssignable)(t,e)||r(`Cannot assign type '${(0,et.propertyTypeToString)(t,"DeclaredType")}' to '${(0,et.propertyTypeToString)(e,"DeclaredType")}'`)}function bS(t){return t.optional||(0,et.isMandatoryPropertyType)(t.type)}function PV(t,e,r,n,i,a){let o=new Set(t.properties.map(f=>f.name)),s=new Map(t.allProperties.map(f=>[f.name,f])),u=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if((0,et.isPropertyUnion)(f))return{types:f.types.map(m=>l(m))};if((0,et.isReferenceType)(f))return{referenceType:l(f.referenceType)};if((0,et.isArrayType)(f))return{elementType:l(f.elementType)};if((0,et.isValueType)(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of s.entries()){let v=u.get(f);if(v){let y=(0,et.propertyTypeToString)(m.type,"DeclaredType"),A=(0,et.propertyTypeToString)(v.type,"DeclaredType");if(!(0,et.isTypeAssignable)(l(m.type),v.type)){let w=`The assigned type '${y}' is not compatible with the declared property '${f}' of type '${A}'.`;i(m.astNodes,w)}m.optional&&!bS(v)&&a(f)}else o.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let c=new Set;for(let[f,m]of u.entries())!s.get(f)&&!bS(m)&&c.add(f);if(c.size>0){let f=c.size>1?"Properties":"A property",m=c.size>1?"are expected":"is expected",v=Array.from(c).map(y=>`'${y}'`).sort().join(", ");n(`${f} ${v} ${m}.`)}}});var hv=d(eo=>{"use strict";Object.defineProperty(eo,"__esModule",{value:!0});eo.createLangiumGrammarServices=eo.LangiumGrammarModule=void 0;var SS=od(),ES=Uu(),PS=V0(),wS=tC(),NS=dg(),wV=cC(),NV=fC(),kV=pC(),xV=hC(),OV=yC(),DV=bC(),IV=yS(),$V=vS(),qV=RS(),kS=CS(),LV=Tr(),MV=fa();eo.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new NS.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new qV.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new kS.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new NV.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new wV.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new xV.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new kV.LangiumGrammarFormatter,DefinitionProvider:t=>new IV.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new $V.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new wS.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new wS.LangiumGrammarScopeProvider(t),References:t=>new DV.LangiumGrammarReferences(t),NameProvider:()=>new OV.LangiumGrammarNameProvider}};function FV(t,e){let r=(0,ES.inject)((0,SS.createDefaultSharedModule)(t),PS.LangiumGrammarGeneratedSharedModule,e),n=(0,ES.inject)((0,SS.createDefaultModule)({shared:r}),PS.LangiumGrammarGeneratedModule,eo.LangiumGrammarModule);return jV(r,n),r.ServiceRegistry.register(n),(0,NS.registerValidationChecks)(n),(0,kS.registerTypeValidationChecks)(n),{shared:r,grammar:n}}eo.createLangiumGrammarServices=FV;function jV(t,e){t.workspace.DocumentBuilder.onBuildPhase(MV.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,LV.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var mv=d(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.EmptyFileSystem=ds.EmptyFileSystemProvider=void 0;var sd=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};ds.EmptyFileSystemProvider=sd;ds.EmptyFileSystem={fileSystemProvider:()=>new sd}});var vt=d(he=>{"use strict";var GV=he&&he.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),UV=he&&he.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),HV=he&&he.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&GV(e,t,r);return UV(e,t),e};Object.defineProperty(he,"__esModule",{value:!0});he.createServicesForGrammar=he.loadGrammarFromJson=he.findNameAssignment=he.findAssignment=he.findNodesForKeywordInternal=he.findNodeForKeyword=he.findNodesForKeyword=he.findNodeForProperty=he.findNodesForProperty=he.isCommentTerminal=he.getCrossReferenceTerminal=he.getAllReachableRules=he.getHiddenRules=he.getEntryRule=void 0;var DS=yn(),xS=od(),OS=Uu(),KV=Yy(),dr=HV(xe()),WV=jt(),IS=hv(),BV=er(),ps=be(),VV=Le(),yv=mv();function $S(t){return t.rules.find(e=>dr.isParserRule(e)&&e.entry)}he.getEntryRule=$S;function qS(t){return t.rules.filter(e=>dr.isTerminalRule(e)&&e.hidden)}he.getHiddenRules=qS;function zV(t,e){let r=new Set,n=$S(t);if(!n)return new Set(t.rules);let i=[n].concat(qS(t));for(let o of i)LS(o,r,e);let a=new Set;for(let o of t.rules)(r.has(o.name)||dr.isTerminalRule(o)&&o.hidden)&&a.add(o);return a}he.getAllReachableRules=zV;function LS(t,e,r){e.add(t.name),(0,ps.streamAllContents)(t).forEach(n=>{if(dr.isRuleCall(n)||r&&dr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&LS(i,e,r)}})}function YV(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=MS(t.type.ref);return e?.terminal}}he.getCrossReferenceTerminal=YV;function XV(t){return t.hidden&&!" ".match((0,WV.terminalRegex)(t))}he.isCommentTerminal=XV;function JV(t,e){return!t||!e?[]:gv(t,e,t.element,!0)}he.findNodesForProperty=JV;function QV(t,e,r){if(!t||!e)return;let n=gv(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}he.findNodeForProperty=QV;function gv(t,e,r,n){if(!n){let i=(0,ps.getContainerOfType)(t.feature,dr.isAssignment);if(i&&i.feature===e)return[t]}return(0,BV.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>gv(i,e,r,!1)):[]}function ZV(t,e){return t?vv(t,e,t?.element):[]}he.findNodesForKeyword=ZV;function ez(t,e,r){if(!t)return;let n=vv(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}he.findNodeForKeyword=ez;function vv(t,e,r){if(t.element!==r)return[];if(dr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,VV.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?dr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}he.findNodesForKeywordInternal=vv;function tz(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,ps.getContainerOfType)(t.feature,dr.isAssignment);if(n)return n;t=t.parent}}he.findAssignment=tz;function MS(t){return dr.isInferredType(t)&&(t=t.$container),FS(t,new Map)}he.findNameAssignment=MS;function FS(t,e){var r;function n(i,a){let o;return(0,ps.getContainerOfType)(i,dr.isAssignment)||(o=FS(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,ps.streamAllContents)(t)){if(dr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(dr.isRuleCall(i)&&dr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(dr.isSimpleType(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function rz(t){var e;let r=(0,IS.createLangiumGrammarServices)(yv.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,DS.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}he.loadGrammarFromJson=rz;async function nz(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,IS.createLangiumGrammarServices)(yv.EmptyFileSystem).grammar,u=DS.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,ps.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},A={AstReflection:()=>(0,KV.interpretAstReflection)(f)},P={Grammar:()=>f,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},w=(0,OS.inject)((0,xS.createDefaultSharedModule)(yv.EmptyFileSystem),A,t.sharedModule),C=(0,OS.inject)((0,xS.createDefaultModule)({shared:w}),P,t.module);return w.ServiceRegistry.register(C),C}he.createServicesForGrammar=nz});var Tv=d(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.createGrammarConfig=void 0;var iz=Le(),az=vt(),oz=za(),sz=xe(),uz=jt();function lz(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,sz.isTerminalRule)(n)&&(0,az.isCommentTerminal)(n)&&(0,oz.isMultilineComment)((0,uz.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:iz.DefaultNameRegexp}}ud.createGrammarConfig=lz});var _v=d(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.VERSION=void 0;ld.VERSION="10.4.2"});var hs=d(($he,jS)=>{var cz=Object.prototype;function fz(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||cz;return t===r}jS.exports=fz});var Rv=d((qhe,GS)=>{function dz(t,e){return function(r){return t(e(r))}}GS.exports=dz});var HS=d((Lhe,US)=>{var pz=Rv(),hz=pz(Object.keys,Object);US.exports=hz});var Av=d((Mhe,KS)=>{var mz=hs(),yz=HS(),gz=Object.prototype,vz=gz.hasOwnProperty;function Tz(t){if(!mz(t))return yz(t);var e=[];for(var r in Object(t))vz.call(t,r)&&r!="constructor"&&e.push(r);return e}KS.exports=Tz});var bv=d((Fhe,WS)=>{var _z=typeof global=="object"&&global&&global.Object===Object&&global;WS.exports=_z});var An=d((jhe,BS)=>{var Rz=bv(),Az=typeof self=="object"&&self&&self.Object===Object&&self,bz=Rz||Az||Function("return this")();BS.exports=bz});var to=d((Ghe,VS)=>{var Cz=An(),Sz=Cz.Symbol;VS.exports=Sz});var JS=d((Uhe,XS)=>{var zS=to(),YS=Object.prototype,Ez=YS.hasOwnProperty,Pz=YS.toString,il=zS?zS.toStringTag:void 0;function wz(t){var e=Ez.call(t,il),r=t[il];try{t[il]=void 0;var n=!0}catch{}var i=Pz.call(t);return n&&(e?t[il]=r:delete t[il]),i}XS.exports=wz});var ZS=d((Hhe,QS)=>{var Nz=Object.prototype,kz=Nz.toString;function xz(t){return kz.call(t)}QS.exports=xz});var pa=d((Khe,rE)=>{var eE=to(),Oz=JS(),Dz=ZS(),Iz="[object Null]",$z="[object Undefined]",tE=eE?eE.toStringTag:void 0;function qz(t){return t==null?t===void 0?$z:Iz:tE&&tE in Object(t)?Oz(t):Dz(t)}rE.exports=qz});var bn=d((Whe,nE)=>{function Lz(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}nE.exports=Lz});var ms=d((Bhe,iE)=>{var Mz=pa(),Fz=bn(),jz="[object AsyncFunction]",Gz="[object Function]",Uz="[object GeneratorFunction]",Hz="[object Proxy]";function Kz(t){if(!Fz(t))return!1;var e=Mz(t);return e==Gz||e==Uz||e==jz||e==Hz}iE.exports=Kz});var oE=d((Vhe,aE)=>{var Wz=An(),Bz=Wz["__core-js_shared__"];aE.exports=Bz});var lE=d((zhe,uE)=>{var Cv=oE(),sE=function(){var t=/[^.]+$/.exec(Cv&&Cv.keys&&Cv.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Vz(t){return!!sE&&sE in t}uE.exports=Vz});var Sv=d((Yhe,cE)=>{var zz=Function.prototype,Yz=zz.toString;function Xz(t){if(t!=null){try{return Yz.call(t)}catch{}try{return t+""}catch{}}return""}cE.exports=Xz});var dE=d((Xhe,fE)=>{var Jz=ms(),Qz=lE(),Zz=bn(),e2=Sv(),t2=/[\\^$.*+?()[\]{}|]/g,r2=/^\[object .+?Constructor\]$/,n2=Function.prototype,i2=Object.prototype,a2=n2.toString,o2=i2.hasOwnProperty,s2=RegExp("^"+a2.call(o2).replace(t2,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function u2(t){if(!Zz(t)||Qz(t))return!1;var e=Jz(t)?s2:r2;return e.test(e2(t))}fE.exports=u2});var hE=d((Jhe,pE)=>{function l2(t,e){return t?.[e]}pE.exports=l2});var ha=d((Qhe,mE)=>{var c2=dE(),f2=hE();function d2(t,e){var r=f2(t,e);return c2(r)?r:void 0}mE.exports=d2});var gE=d((Zhe,yE)=>{var p2=ha(),h2=An(),m2=p2(h2,"DataView");yE.exports=m2});var cd=d((eme,vE)=>{var y2=ha(),g2=An(),v2=y2(g2,"Map");vE.exports=v2});var _E=d((tme,TE)=>{var T2=ha(),_2=An(),R2=T2(_2,"Promise");TE.exports=R2});var Ev=d((rme,RE)=>{var A2=ha(),b2=An(),C2=A2(b2,"Set");RE.exports=C2});var bE=d((nme,AE)=>{var S2=ha(),E2=An(),P2=S2(E2,"WeakMap");AE.exports=P2});var gs=d((ime,kE)=>{var Pv=gE(),wv=cd(),Nv=_E(),kv=Ev(),xv=bE(),NE=pa(),ys=Sv(),CE="[object Map]",w2="[object Object]",SE="[object Promise]",EE="[object Set]",PE="[object WeakMap]",wE="[object DataView]",N2=ys(Pv),k2=ys(wv),x2=ys(Nv),O2=ys(kv),D2=ys(xv),ro=NE;(Pv&&ro(new Pv(new ArrayBuffer(1)))!=wE||wv&&ro(new wv)!=CE||Nv&&ro(Nv.resolve())!=SE||kv&&ro(new kv)!=EE||xv&&ro(new xv)!=PE)&&(ro=function(t){var e=NE(t),r=e==w2?t.constructor:void 0,n=r?ys(r):"";if(n)switch(n){case N2:return wE;case k2:return CE;case x2:return SE;case O2:return EE;case D2:return PE}return e});kE.exports=ro});var Cn=d((ame,xE)=>{function I2(t){return t!=null&&typeof t=="object"}xE.exports=I2});var DE=d((ome,OE)=>{var $2=pa(),q2=Cn(),L2="[object Arguments]";function M2(t){return q2(t)&&$2(t)==L2}OE.exports=M2});var al=d((sme,qE)=>{var IE=DE(),F2=Cn(),$E=Object.prototype,j2=$E.hasOwnProperty,G2=$E.propertyIsEnumerable,U2=IE(function(){return arguments}())?IE:function(t){return F2(t)&&j2.call(t,"callee")&&!G2.call(t,"callee")};qE.exports=U2});var qe=d((ume,LE)=>{var H2=Array.isArray;LE.exports=H2});var fd=d((lme,ME)=>{var K2=9007199254740991;function W2(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=K2}ME.exports=W2});var Sn=d((cme,FE)=>{var B2=ms(),V2=fd();function z2(t){return t!=null&&V2(t.length)&&!B2(t)}FE.exports=z2});var GE=d((fme,jE)=>{function Y2(){return!1}jE.exports=Y2});var sl=d((ol,vs)=>{var X2=An(),J2=GE(),KE=typeof ol=="object"&&ol&&!ol.nodeType&&ol,UE=KE&&typeof vs=="object"&&vs&&!vs.nodeType&&vs,Q2=UE&&UE.exports===KE,HE=Q2?X2.Buffer:void 0,Z2=HE?HE.isBuffer:void 0,e3=Z2||J2;vs.exports=e3});var BE=d((dme,WE)=>{var t3=pa(),r3=fd(),n3=Cn(),i3="[object Arguments]",a3="[object Array]",o3="[object Boolean]",s3="[object Date]",u3="[object Error]",l3="[object Function]",c3="[object Map]",f3="[object Number]",d3="[object Object]",p3="[object RegExp]",h3="[object Set]",m3="[object String]",y3="[object WeakMap]",g3="[object ArrayBuffer]",v3="[object DataView]",T3="[object Float32Array]",_3="[object Float64Array]",R3="[object Int8Array]",A3="[object Int16Array]",b3="[object Int32Array]",C3="[object Uint8Array]",S3="[object Uint8ClampedArray]",E3="[object Uint16Array]",P3="[object Uint32Array]",tt={};tt[T3]=tt[_3]=tt[R3]=tt[A3]=tt[b3]=tt[C3]=tt[S3]=tt[E3]=tt[P3]=!0;tt[i3]=tt[a3]=tt[g3]=tt[o3]=tt[v3]=tt[s3]=tt[u3]=tt[l3]=tt[c3]=tt[f3]=tt[d3]=tt[p3]=tt[h3]=tt[m3]=tt[y3]=!1;function w3(t){return n3(t)&&r3(t.length)&&!!tt[t3(t)]}WE.exports=w3});var Ts=d((pme,VE)=>{function N3(t){return function(e){return t(e)}}VE.exports=N3});var cl=d((ul,_s)=>{var k3=bv(),zE=typeof ul=="object"&&ul&&!ul.nodeType&&ul,ll=zE&&typeof _s=="object"&&_s&&!_s.nodeType&&_s,x3=ll&&ll.exports===zE,Ov=x3&&k3.process,O3=function(){try{var t=ll&&ll.require&&ll.require("util").types;return t||Ov&&Ov.binding&&Ov.binding("util")}catch{}}();_s.exports=O3});var dd=d((hme,JE)=>{var D3=BE(),I3=Ts(),YE=cl(),XE=YE&&YE.isTypedArray,$3=XE?I3(XE):D3;JE.exports=$3});var xr=d((mme,QE)=>{var q3=Av(),L3=gs(),M3=al(),F3=qe(),j3=Sn(),G3=sl(),U3=hs(),H3=dd(),K3="[object Map]",W3="[object Set]",B3=Object.prototype,V3=B3.hasOwnProperty;function z3(t){if(t==null)return!0;if(j3(t)&&(F3(t)||typeof t=="string"||typeof t.splice=="function"||G3(t)||H3(t)||M3(t)))return!t.length;var e=L3(t);if(e==K3||e==W3)return!t.size;if(U3(t))return!q3(t).length;for(var r in t)if(V3.call(t,r))return!1;return!0}QE.exports=z3});var Rs=d((yme,ZE)=>{function Y3(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}ZE.exports=Y3});var tP=d((gme,eP)=>{function X3(){this.__data__=[],this.size=0}eP.exports=X3});var As=d((vme,rP)=>{function J3(t,e){return t===e||t!==t&&e!==e}rP.exports=J3});var fl=d((Tme,nP)=>{var Q3=As();function Z3(t,e){for(var r=t.length;r--;)if(Q3(t[r][0],e))return r;return-1}nP.exports=Z3});var aP=d((_me,iP)=>{var e5=fl(),t5=Array.prototype,r5=t5.splice;function n5(t){var e=this.__data__,r=e5(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():r5.call(e,r,1),--this.size,!0}iP.exports=n5});var sP=d((Rme,oP)=>{var i5=fl();function a5(t){var e=this.__data__,r=i5(e,t);return r<0?void 0:e[r][1]}oP.exports=a5});var lP=d((Ame,uP)=>{var o5=fl();function s5(t){return o5(this.__data__,t)>-1}uP.exports=s5});var fP=d((bme,cP)=>{var u5=fl();function l5(t,e){var r=this.__data__,n=u5(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}cP.exports=l5});var dl=d((Cme,dP)=>{var c5=tP(),f5=aP(),d5=sP(),p5=lP(),h5=fP();function bs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}bs.prototype.clear=c5;bs.prototype.delete=f5;bs.prototype.get=d5;bs.prototype.has=p5;bs.prototype.set=h5;dP.exports=bs});var hP=d((Sme,pP)=>{var m5=dl();function y5(){this.__data__=new m5,this.size=0}pP.exports=y5});var yP=d((Eme,mP)=>{function g5(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}mP.exports=g5});var vP=d((Pme,gP)=>{function v5(t){return this.__data__.get(t)}gP.exports=v5});var _P=d((wme,TP)=>{function T5(t){return this.__data__.has(t)}TP.exports=T5});var pl=d((Nme,RP)=>{var _5=ha(),R5=_5(Object,"create");RP.exports=R5});var CP=d((kme,bP)=>{var AP=pl();function A5(){this.__data__=AP?AP(null):{},this.size=0}bP.exports=A5});var EP=d((xme,SP)=>{function b5(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}SP.exports=b5});var wP=d((Ome,PP)=>{var C5=pl(),S5="__lodash_hash_undefined__",E5=Object.prototype,P5=E5.hasOwnProperty;function w5(t){var e=this.__data__;if(C5){var r=e[t];return r===S5?void 0:r}return P5.call(e,t)?e[t]:void 0}PP.exports=w5});var kP=d((Dme,NP)=>{var N5=pl(),k5=Object.prototype,x5=k5.hasOwnProperty;function O5(t){var e=this.__data__;return N5?e[t]!==void 0:x5.call(e,t)}NP.exports=O5});var OP=d((Ime,xP)=>{var D5=pl(),I5="__lodash_hash_undefined__";function $5(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=D5&&e===void 0?I5:e,this}xP.exports=$5});var IP=d(($me,DP)=>{var q5=CP(),L5=EP(),M5=wP(),F5=kP(),j5=OP();function Cs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Cs.prototype.clear=q5;Cs.prototype.delete=L5;Cs.prototype.get=M5;Cs.prototype.has=F5;Cs.prototype.set=j5;DP.exports=Cs});var LP=d((qme,qP)=>{var $P=IP(),G5=dl(),U5=cd();function H5(){this.size=0,this.__data__={hash:new $P,map:new(U5||G5),string:new $P}}qP.exports=H5});var FP=d((Lme,MP)=>{function K5(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}MP.exports=K5});var hl=d((Mme,jP)=>{var W5=FP();function B5(t,e){var r=t.__data__;return W5(e)?r[typeof e=="string"?"string":"hash"]:r.map}jP.exports=B5});var UP=d((Fme,GP)=>{var V5=hl();function z5(t){var e=V5(this,t).delete(t);return this.size-=e?1:0,e}GP.exports=z5});var KP=d((jme,HP)=>{var Y5=hl();function X5(t){return Y5(this,t).get(t)}HP.exports=X5});var BP=d((Gme,WP)=>{var J5=hl();function Q5(t){return J5(this,t).has(t)}WP.exports=Q5});var zP=d((Ume,VP)=>{var Z5=hl();function e4(t,e){var r=Z5(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}VP.exports=e4});var pd=d((Hme,YP)=>{var t4=LP(),r4=UP(),n4=KP(),i4=BP(),a4=zP();function Ss(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ss.prototype.clear=t4;Ss.prototype.delete=r4;Ss.prototype.get=n4;Ss.prototype.has=i4;Ss.prototype.set=a4;YP.exports=Ss});var JP=d((Kme,XP)=>{var o4=dl(),s4=cd(),u4=pd(),l4=200;function c4(t,e){var r=this.__data__;if(r instanceof o4){var n=r.__data__;if(!s4||n.length<l4-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new u4(n)}return r.set(t,e),this.size=r.size,this}XP.exports=c4});var hd=d((Wme,QP)=>{var f4=dl(),d4=hP(),p4=yP(),h4=vP(),m4=_P(),y4=JP();function Es(t){var e=this.__data__=new f4(t);this.size=e.size}Es.prototype.clear=d4;Es.prototype.delete=p4;Es.prototype.get=h4;Es.prototype.has=m4;Es.prototype.set=y4;QP.exports=Es});var ew=d((Bme,ZP)=>{var g4="__lodash_hash_undefined__";function v4(t){return this.__data__.set(t,g4),this}ZP.exports=v4});var rw=d((Vme,tw)=>{function T4(t){return this.__data__.has(t)}tw.exports=T4});var yd=d((zme,nw)=>{var _4=pd(),R4=ew(),A4=rw();function md(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new _4;++e<r;)this.add(t[e])}md.prototype.add=md.prototype.push=R4;md.prototype.has=A4;nw.exports=md});var Dv=d((Yme,iw)=>{function b4(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}iw.exports=b4});var gd=d((Xme,aw)=>{function C4(t,e){return t.has(e)}aw.exports=C4});var Iv=d((Jme,ow)=>{var S4=yd(),E4=Dv(),P4=gd(),w4=1,N4=2;function k4(t,e,r,n,i,a){var o=r&w4,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,m=!0,v=r&N4?new S4:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var y=t[f],A=e[f];if(n)var P=o?n(A,y,f,e,t,a):n(y,A,f,t,e,a);if(P!==void 0){if(P)continue;m=!1;break}if(v){if(!E4(e,function(w,C){if(!P4(v,C)&&(y===w||i(y,w,r,n,a)))return v.push(C)})){m=!1;break}}else if(!(y===A||i(y,A,r,n,a))){m=!1;break}}return a.delete(t),a.delete(e),m}ow.exports=k4});var $v=d((Qme,sw)=>{var x4=An(),O4=x4.Uint8Array;sw.exports=O4});var lw=d((Zme,uw)=>{function D4(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}uw.exports=D4});var vd=d((eye,cw)=>{function I4(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}cw.exports=I4});var mw=d((tye,hw)=>{var fw=to(),dw=$v(),$4=As(),q4=Iv(),L4=lw(),M4=vd(),F4=1,j4=2,G4="[object Boolean]",U4="[object Date]",H4="[object Error]",K4="[object Map]",W4="[object Number]",B4="[object RegExp]",V4="[object Set]",z4="[object String]",Y4="[object Symbol]",X4="[object ArrayBuffer]",J4="[object DataView]",pw=fw?fw.prototype:void 0,qv=pw?pw.valueOf:void 0;function Q4(t,e,r,n,i,a,o){switch(r){case J4:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case X4:return!(t.byteLength!=e.byteLength||!a(new dw(t),new dw(e)));case G4:case U4:case W4:return $4(+t,+e);case H4:return t.name==e.name&&t.message==e.message;case B4:case z4:return t==e+"";case K4:var s=L4;case V4:var u=n&F4;if(s||(s=M4),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=j4,o.set(t,e);var c=q4(s(t),s(e),n,i,a,o);return o.delete(t),c;case Y4:if(qv)return qv.call(t)==qv.call(e)}return!1}hw.exports=Q4});var Td=d((rye,yw)=>{function Z4(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}yw.exports=Z4});var Lv=d((nye,gw)=>{var e6=Td(),t6=qe();function r6(t,e,r){var n=e(t);return t6(t)?n:e6(n,r(t))}gw.exports=r6});var _d=d((iye,vw)=>{function n6(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}vw.exports=n6});var Mv=d((aye,Tw)=>{function i6(){return[]}Tw.exports=i6});var Rd=d((oye,Rw)=>{var a6=_d(),o6=Mv(),s6=Object.prototype,u6=s6.propertyIsEnumerable,_w=Object.getOwnPropertySymbols,l6=_w?function(t){return t==null?[]:(t=Object(t),a6(_w(t),function(e){return u6.call(t,e)}))}:o6;Rw.exports=l6});var bw=d((sye,Aw)=>{function c6(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}Aw.exports=c6});var ml=d((uye,Cw)=>{var f6=9007199254740991,d6=/^(?:0|[1-9]\d*)$/;function p6(t,e){var r=typeof t;return e=e??f6,!!e&&(r=="number"||r!="symbol"&&d6.test(t))&&t>-1&&t%1==0&&t<e}Cw.exports=p6});var Fv=d((lye,Sw)=>{var h6=bw(),m6=al(),y6=qe(),g6=sl(),v6=ml(),T6=dd(),_6=Object.prototype,R6=_6.hasOwnProperty;function A6(t,e){var r=y6(t),n=!r&&m6(t),i=!r&&!n&&g6(t),a=!r&&!n&&!i&&T6(t),o=r||n||i||a,s=o?h6(t.length,String):[],u=s.length;for(var l in t)(e||R6.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||v6(l,u)))&&s.push(l);return s}Sw.exports=A6});var Or=d((cye,Ew)=>{var b6=Fv(),C6=Av(),S6=Sn();function E6(t){return S6(t)?b6(t):C6(t)}Ew.exports=E6});var jv=d((fye,Pw)=>{var P6=Lv(),w6=Rd(),N6=Or();function k6(t){return P6(t,N6,w6)}Pw.exports=k6});var kw=d((dye,Nw)=>{var ww=jv(),x6=1,O6=Object.prototype,D6=O6.hasOwnProperty;function I6(t,e,r,n,i,a){var o=r&x6,s=ww(t),u=s.length,l=ww(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var m=s[f];if(!(o?m in e:D6.call(e,m)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var A=!0;a.set(t,e),a.set(e,t);for(var P=o;++f<u;){m=s[f];var w=t[m],C=e[m];if(n)var b=o?n(C,w,m,e,t,a):n(w,C,m,t,e,a);if(!(b===void 0?w===C||i(w,C,r,n,a):b)){A=!1;break}P||(P=m=="constructor")}if(A&&!P){var O=t.constructor,L=e.constructor;O!=L&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof L=="function"&&L instanceof L)&&(A=!1)}return a.delete(t),a.delete(e),A}Nw.exports=I6});var Mw=d((pye,Lw)=>{var Gv=hd(),$6=Iv(),q6=mw(),L6=kw(),xw=gs(),Ow=qe(),Dw=sl(),M6=dd(),F6=1,Iw="[object Arguments]",$w="[object Array]",Ad="[object Object]",j6=Object.prototype,qw=j6.hasOwnProperty;function G6(t,e,r,n,i,a){var o=Ow(t),s=Ow(e),u=o?$w:xw(t),l=s?$w:xw(e);u=u==Iw?Ad:u,l=l==Iw?Ad:l;var c=u==Ad,f=l==Ad,m=u==l;if(m&&Dw(t)){if(!Dw(e))return!1;o=!0,c=!1}if(m&&!c)return a||(a=new Gv),o||M6(t)?$6(t,e,r,n,i,a):q6(t,e,u,r,n,i,a);if(!(r&F6)){var v=c&&qw.call(t,"__wrapped__"),y=f&&qw.call(e,"__wrapped__");if(v||y){var A=v?t.value():t,P=y?e.value():e;return a||(a=new Gv),i(A,P,r,n,a)}}return m?(a||(a=new Gv),L6(t,e,r,n,i,a)):!1}Lw.exports=G6});var Uv=d((hye,Gw)=>{var U6=Mw(),Fw=Cn();function jw(t,e,r,n,i){return t===e?!0:t==null||e==null||!Fw(t)&&!Fw(e)?t!==t&&e!==e:U6(t,e,r,n,jw,i)}Gw.exports=jw});var Hw=d((mye,Uw)=>{var H6=hd(),K6=Uv(),W6=1,B6=2;function V6(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new H6;if(n)var m=n(l,c,u,t,e,f);if(!(m===void 0?K6(c,l,W6|B6,n,f):m))return!1}}return!0}Uw.exports=V6});var Hv=d((yye,Kw)=>{var z6=bn();function Y6(t){return t===t&&!z6(t)}Kw.exports=Y6});var Bw=d((gye,Ww)=>{var X6=Hv(),J6=Or();function Q6(t){for(var e=J6(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,X6(i)]}return e}Ww.exports=Q6});var Kv=d((vye,Vw)=>{function Z6(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}Vw.exports=Z6});var Yw=d((Tye,zw)=>{var e8=Hw(),t8=Bw(),r8=Kv();function n8(t){var e=t8(t);return e.length==1&&e[0][2]?r8(e[0][0],e[0][1]):function(r){return r===t||e8(r,t,e)}}zw.exports=n8});var Ps=d((_ye,Xw)=>{var i8=pa(),a8=Cn(),o8="[object Symbol]";function s8(t){return typeof t=="symbol"||a8(t)&&i8(t)==o8}Xw.exports=s8});var bd=d((Rye,Jw)=>{var u8=qe(),l8=Ps(),c8=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,f8=/^\w*$/;function d8(t,e){if(u8(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||l8(t)?!0:f8.test(t)||!c8.test(t)||e!=null&&t in Object(e)}Jw.exports=d8});var eN=d((Aye,Zw)=>{var Qw=pd(),p8="Expected a function";function Wv(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(p8);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(Wv.Cache||Qw),r}Wv.Cache=Qw;Zw.exports=Wv});var rN=d((bye,tN)=>{var h8=eN(),m8=500;function y8(t){var e=h8(t,function(n){return r.size===m8&&r.clear(),n}),r=e.cache;return e}tN.exports=y8});var iN=d((Cye,nN)=>{var g8=rN(),v8=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,T8=/\\(\\)?/g,_8=g8(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(v8,function(r,n,i,a){e.push(i?a.replace(T8,"$1"):n||r)}),e});nN.exports=_8});var cN=d((Sye,lN)=>{var aN=to(),R8=Rs(),A8=qe(),b8=Ps(),C8=1/0,oN=aN?aN.prototype:void 0,sN=oN?oN.toString:void 0;function uN(t){if(typeof t=="string")return t;if(A8(t))return R8(t,uN)+"";if(b8(t))return sN?sN.call(t):"";var e=t+"";return e=="0"&&1/t==-C8?"-0":e}lN.exports=uN});var Bv=d((Eye,fN)=>{var S8=cN();function E8(t){return t==null?"":S8(t)}fN.exports=E8});var yl=d((Pye,dN)=>{var P8=qe(),w8=bd(),N8=iN(),k8=Bv();function x8(t,e){return P8(t)?t:w8(t,e)?[t]:N8(k8(t))}dN.exports=x8});var ws=d((wye,pN)=>{var O8=Ps(),D8=1/0;function I8(t){if(typeof t=="string"||O8(t))return t;var e=t+"";return e=="0"&&1/t==-D8?"-0":e}pN.exports=I8});var Cd=d((Nye,hN)=>{var $8=yl(),q8=ws();function L8(t,e){e=$8(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[q8(e[r++])];return r&&r==n?t:void 0}hN.exports=L8});var yN=d((kye,mN)=>{var M8=Cd();function F8(t,e,r){var n=t==null?void 0:M8(t,e);return n===void 0?r:n}mN.exports=F8});var vN=d((xye,gN)=>{function j8(t,e){return t!=null&&e in Object(t)}gN.exports=j8});var Vv=d((Oye,TN)=>{var G8=yl(),U8=al(),H8=qe(),K8=ml(),W8=fd(),B8=ws();function V8(t,e,r){e=G8(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=B8(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&W8(i)&&K8(o,i)&&(H8(t)||U8(t)))}TN.exports=V8});var RN=d((Dye,_N)=>{var z8=vN(),Y8=Vv();function X8(t,e){return t!=null&&Y8(t,e,z8)}_N.exports=X8});var bN=d((Iye,AN)=>{var J8=Uv(),Q8=yN(),Z8=RN(),e9=bd(),t9=Hv(),r9=Kv(),n9=ws(),i9=1,a9=2;function o9(t,e){return e9(t)&&t9(e)?r9(n9(t),e):function(r){var n=Q8(r,t);return n===void 0&&n===e?Z8(r,t):J8(e,n,i9|a9)}}AN.exports=o9});var no=d(($ye,CN)=>{function s9(t){return t}CN.exports=s9});var EN=d((qye,SN)=>{function u9(t){return function(e){return e?.[t]}}SN.exports=u9});var wN=d((Lye,PN)=>{var l9=Cd();function c9(t){return function(e){return l9(e,t)}}PN.exports=c9});var kN=d((Mye,NN)=>{var f9=EN(),d9=wN(),p9=bd(),h9=ws();function m9(t){return p9(t)?f9(h9(t)):d9(t)}NN.exports=m9});var Xr=d((Fye,xN)=>{var y9=Yw(),g9=bN(),v9=no(),T9=qe(),_9=kN();function R9(t){return typeof t=="function"?t:t==null?v9:typeof t=="object"?T9(t)?g9(t[0],t[1]):y9(t):_9(t)}xN.exports=R9});var DN=d((jye,ON)=>{function A9(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}ON.exports=A9});var $N=d((Gye,IN)=>{var b9=DN(),C9=b9();IN.exports=C9});var LN=d((Uye,qN)=>{var S9=$N(),E9=Or();function P9(t,e){return t&&S9(t,e,E9)}qN.exports=P9});var FN=d((Hye,MN)=>{var w9=Sn();function N9(t,e){return function(r,n){if(r==null)return r;if(!w9(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}MN.exports=N9});var ma=d((Kye,jN)=>{var k9=LN(),x9=FN(),O9=x9(k9);jN.exports=O9});var UN=d((Wye,GN)=>{var D9=ma(),I9=Sn();function $9(t,e){var r=-1,n=I9(t)?Array(t.length):[];return D9(t,function(i,a,o){n[++r]=e(i,a,o)}),n}GN.exports=$9});var Gt=d((Bye,HN)=>{var q9=Rs(),L9=Xr(),M9=UN(),F9=qe();function j9(t,e){var r=F9(t)?q9:M9;return r(t,L9(e,3))}HN.exports=j9});var zv=d((Vye,KN)=>{function G9(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}KN.exports=G9});var BN=d((zye,WN)=>{var U9=no();function H9(t){return typeof t=="function"?t:U9}WN.exports=H9});var Ut=d((Yye,VN)=>{var K9=zv(),W9=ma(),B9=BN(),V9=qe();function z9(t,e){var r=V9(t)?K9:W9;return r(t,B9(e))}VN.exports=z9});var YN=d((Xye,zN)=>{var Y9=Rs();function X9(t,e){return Y9(e,function(r){return t[r]})}zN.exports=X9});var Yn=d((Jye,XN)=>{var J9=YN(),Q9=Or();function Z9(t){return t==null?[]:J9(t,Q9(t))}XN.exports=Z9});var QN=d((Qye,JN)=>{var e7=Object.prototype,t7=e7.hasOwnProperty;function r7(t,e){return t!=null&&t7.call(t,e)}JN.exports=r7});var Dr=d((Zye,ZN)=>{var n7=QN(),i7=Vv();function a7(t,e){return t!=null&&i7(t,e,n7)}ZN.exports=a7});var Yv=d((ege,ek)=>{var o7=ha(),s7=function(){try{var t=o7(Object,"defineProperty");return t({},"",{}),t}catch{}}();ek.exports=s7});var Sd=d((tge,rk)=>{var tk=Yv();function u7(t,e,r){e=="__proto__"&&tk?tk(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}rk.exports=u7});var gl=d((rge,nk)=>{var l7=Sd(),c7=As(),f7=Object.prototype,d7=f7.hasOwnProperty;function p7(t,e,r){var n=t[e];(!(d7.call(t,e)&&c7(n,r))||r===void 0&&!(e in t))&&l7(t,e,r)}nk.exports=p7});var Ns=d((nge,ik)=>{var h7=gl(),m7=Sd();function y7(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?m7(r,s,u):h7(r,s,u)}return r}ik.exports=y7});var ok=d((ige,ak)=>{var g7=Ns(),v7=Or();function T7(t,e){return t&&g7(e,v7(e),t)}ak.exports=T7});var uk=d((age,sk)=>{function _7(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}sk.exports=_7});var ck=d((oge,lk)=>{var R7=bn(),A7=hs(),b7=uk(),C7=Object.prototype,S7=C7.hasOwnProperty;function E7(t){if(!R7(t))return b7(t);var e=A7(t),r=[];for(var n in t)n=="constructor"&&(e||!S7.call(t,n))||r.push(n);return r}lk.exports=E7});var vl=d((sge,fk)=>{var P7=Fv(),w7=ck(),N7=Sn();function k7(t){return N7(t)?P7(t,!0):w7(t)}fk.exports=k7});var pk=d((uge,dk)=>{var x7=Ns(),O7=vl();function D7(t,e){return t&&x7(e,O7(e),t)}dk.exports=D7});var vk=d((Tl,ks)=>{var I7=An(),gk=typeof Tl=="object"&&Tl&&!Tl.nodeType&&Tl,hk=gk&&typeof ks=="object"&&ks&&!ks.nodeType&&ks,$7=hk&&hk.exports===gk,mk=$7?I7.Buffer:void 0,yk=mk?mk.allocUnsafe:void 0;function q7(t,e){if(e)return t.slice();var r=t.length,n=yk?yk(r):new t.constructor(r);return t.copy(n),n}ks.exports=q7});var _k=d((lge,Tk)=>{function L7(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}Tk.exports=L7});var Ak=d((cge,Rk)=>{var M7=Ns(),F7=Rd();function j7(t,e){return M7(t,F7(t),e)}Rk.exports=j7});var Xv=d((fge,bk)=>{var G7=Rv(),U7=G7(Object.getPrototypeOf,Object);bk.exports=U7});var Jv=d((dge,Ck)=>{var H7=Td(),K7=Xv(),W7=Rd(),B7=Mv(),V7=Object.getOwnPropertySymbols,z7=V7?function(t){for(var e=[];t;)H7(e,W7(t)),t=K7(t);return e}:B7;Ck.exports=z7});var Ek=d((pge,Sk)=>{var Y7=Ns(),X7=Jv();function J7(t,e){return Y7(t,X7(t),e)}Sk.exports=J7});var Qv=d((hge,Pk)=>{var Q7=Lv(),Z7=Jv(),eY=vl();function tY(t){return Q7(t,eY,Z7)}Pk.exports=tY});var Nk=d((mge,wk)=>{var rY=Object.prototype,nY=rY.hasOwnProperty;function iY(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&nY.call(t,"index")&&(r.index=t.index,r.input=t.input),r}wk.exports=iY});var Ed=d((yge,xk)=>{var kk=$v();function aY(t){var e=new t.constructor(t.byteLength);return new kk(e).set(new kk(t)),e}xk.exports=aY});var Dk=d((gge,Ok)=>{var oY=Ed();function sY(t,e){var r=e?oY(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}Ok.exports=sY});var $k=d((vge,Ik)=>{var uY=/\w*$/;function lY(t){var e=new t.constructor(t.source,uY.exec(t));return e.lastIndex=t.lastIndex,e}Ik.exports=lY});var jk=d((Tge,Fk)=>{var qk=to(),Lk=qk?qk.prototype:void 0,Mk=Lk?Lk.valueOf:void 0;function cY(t){return Mk?Object(Mk.call(t)):{}}Fk.exports=cY});var Uk=d((_ge,Gk)=>{var fY=Ed();function dY(t,e){var r=e?fY(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}Gk.exports=dY});var Kk=d((Rge,Hk)=>{var pY=Ed(),hY=Dk(),mY=$k(),yY=jk(),gY=Uk(),vY="[object Boolean]",TY="[object Date]",_Y="[object Map]",RY="[object Number]",AY="[object RegExp]",bY="[object Set]",CY="[object String]",SY="[object Symbol]",EY="[object ArrayBuffer]",PY="[object DataView]",wY="[object Float32Array]",NY="[object Float64Array]",kY="[object Int8Array]",xY="[object Int16Array]",OY="[object Int32Array]",DY="[object Uint8Array]",IY="[object Uint8ClampedArray]",$Y="[object Uint16Array]",qY="[object Uint32Array]";function LY(t,e,r){var n=t.constructor;switch(e){case EY:return pY(t);case vY:case TY:return new n(+t);case PY:return hY(t,r);case wY:case NY:case kY:case xY:case OY:case DY:case IY:case $Y:case qY:return gY(t,r);case _Y:return new n;case RY:case CY:return new n(t);case AY:return mY(t);case bY:return new n;case SY:return yY(t)}}Hk.exports=LY});var Vk=d((Age,Bk)=>{var MY=bn(),Wk=Object.create,FY=function(){function t(){}return function(e){if(!MY(e))return{};if(Wk)return Wk(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();Bk.exports=FY});var Yk=d((bge,zk)=>{var jY=Vk(),GY=Xv(),UY=hs();function HY(t){return typeof t.constructor=="function"&&!UY(t)?jY(GY(t)):{}}zk.exports=HY});var Jk=d((Cge,Xk)=>{var KY=gs(),WY=Cn(),BY="[object Map]";function VY(t){return WY(t)&&KY(t)==BY}Xk.exports=VY});var tx=d((Sge,ex)=>{var zY=Jk(),YY=Ts(),Qk=cl(),Zk=Qk&&Qk.isMap,XY=Zk?YY(Zk):zY;ex.exports=XY});var nx=d((Ege,rx)=>{var JY=gs(),QY=Cn(),ZY="[object Set]";function eX(t){return QY(t)&&JY(t)==ZY}rx.exports=eX});var sx=d((Pge,ox)=>{var tX=nx(),rX=Ts(),ix=cl(),ax=ix&&ix.isSet,nX=ax?rX(ax):tX;ox.exports=nX});var dx=d((wge,fx)=>{var iX=hd(),aX=zv(),oX=gl(),sX=ok(),uX=pk(),lX=vk(),cX=_k(),fX=Ak(),dX=Ek(),pX=jv(),hX=Qv(),mX=gs(),yX=Nk(),gX=Kk(),vX=Yk(),TX=qe(),_X=sl(),RX=tx(),AX=bn(),bX=sx(),CX=Or(),SX=vl(),EX=1,PX=2,wX=4,ux="[object Arguments]",NX="[object Array]",kX="[object Boolean]",xX="[object Date]",OX="[object Error]",lx="[object Function]",DX="[object GeneratorFunction]",IX="[object Map]",$X="[object Number]",cx="[object Object]",qX="[object RegExp]",LX="[object Set]",MX="[object String]",FX="[object Symbol]",jX="[object WeakMap]",GX="[object ArrayBuffer]",UX="[object DataView]",HX="[object Float32Array]",KX="[object Float64Array]",WX="[object Int8Array]",BX="[object Int16Array]",VX="[object Int32Array]",zX="[object Uint8Array]",YX="[object Uint8ClampedArray]",XX="[object Uint16Array]",JX="[object Uint32Array]",Je={};Je[ux]=Je[NX]=Je[GX]=Je[UX]=Je[kX]=Je[xX]=Je[HX]=Je[KX]=Je[WX]=Je[BX]=Je[VX]=Je[IX]=Je[$X]=Je[cx]=Je[qX]=Je[LX]=Je[MX]=Je[FX]=Je[zX]=Je[YX]=Je[XX]=Je[JX]=!0;Je[OX]=Je[lx]=Je[jX]=!1;function Pd(t,e,r,n,i,a){var o,s=e&EX,u=e&PX,l=e&wX;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!AX(t))return t;var c=TX(t);if(c){if(o=yX(t),!s)return cX(t,o)}else{var f=mX(t),m=f==lx||f==DX;if(_X(t))return lX(t,s);if(f==cx||f==ux||m&&!i){if(o=u||m?{}:vX(t),!s)return u?dX(t,uX(o,t)):fX(t,sX(o,t))}else{if(!Je[f])return i?t:{};o=gX(t,f,s)}}a||(a=new iX);var v=a.get(t);if(v)return v;a.set(t,o),bX(t)?t.forEach(function(P){o.add(Pd(P,e,r,P,t,a))}):RX(t)&&t.forEach(function(P,w){o.set(w,Pd(P,e,r,w,t,a))});var y=l?u?hX:pX:u?SX:CX,A=c?void 0:y(t);return aX(A||t,function(P,w){A&&(w=P,P=t[w]),oX(o,w,Pd(P,e,r,w,t,a))}),o}fx.exports=Pd});var ki=d((Nge,px)=>{var QX=dx(),ZX=4;function eJ(t){return QX(t,ZX)}px.exports=eJ});var hx=d(xs=>{"use strict";Object.defineProperty(xs,"__esModule",{value:!0});xs.PRINT_WARNING=xs.PRINT_ERROR=void 0;function tJ(t){console&&console.error&&console.error("Error: ".concat(t))}xs.PRINT_ERROR=tJ;function rJ(t){console&&console.warn&&console.warn("Warning: ".concat(t))}xs.PRINT_WARNING=rJ});var mx=d(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.timer=void 0;function nJ(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}wd.timer=nJ});var yx=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var Os=d(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.toFastProperties=Xn.timer=Xn.PRINT_ERROR=Xn.PRINT_WARNING=void 0;var gx=hx();Object.defineProperty(Xn,"PRINT_WARNING",{enumerable:!0,get:function(){return gx.PRINT_WARNING}});Object.defineProperty(Xn,"PRINT_ERROR",{enumerable:!0,get:function(){return gx.PRINT_ERROR}});var iJ=mx();Object.defineProperty(Xn,"timer",{enumerable:!0,get:function(){return iJ.timer}});var aJ=yx();Object.defineProperty(Xn,"toFastProperties",{enumerable:!0,get:function(){return aJ.toFastProperties}})});var Nd=d((Dge,vx)=>{function oJ(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}vx.exports=oJ});var _x=d((Ige,Tx)=>{var sJ=/\s/;function uJ(t){for(var e=t.length;e--&&sJ.test(t.charAt(e)););return e}Tx.exports=uJ});var Ax=d(($ge,Rx)=>{var lJ=_x(),cJ=/^\s+/;function fJ(t){return t&&t.slice(0,lJ(t)+1).replace(cJ,"")}Rx.exports=fJ});var Ex=d((qge,Sx)=>{var dJ=Ax(),bx=bn(),pJ=Ps(),Cx=0/0,hJ=/^[-+]0x[0-9a-f]+$/i,mJ=/^0b[01]+$/i,yJ=/^0o[0-7]+$/i,gJ=parseInt;function vJ(t){if(typeof t=="number")return t;if(pJ(t))return Cx;if(bx(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=bx(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=dJ(t);var r=mJ.test(t);return r||yJ.test(t)?gJ(t.slice(2),r?2:8):hJ.test(t)?Cx:+t}Sx.exports=vJ});var Nx=d((Lge,wx)=>{var TJ=Ex(),Px=1/0,_J=17976931348623157e292;function RJ(t){if(!t)return t===0?t:0;if(t=TJ(t),t===Px||t===-Px){var e=t<0?-1:1;return e*_J}return t===t?t:0}wx.exports=RJ});var Ds=d((Mge,kx)=>{var AJ=Nx();function bJ(t){var e=AJ(t),r=e%1;return e===e?r?e-r:e:0}kx.exports=bJ});var kd=d((Fge,xx)=>{var CJ=Nd(),SJ=Ds();function EJ(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:SJ(e),CJ(t,e<0?0:e,n)):[]}xx.exports=EJ});var _l=d((jge,Ox)=>{var PJ=pa(),wJ=qe(),NJ=Cn(),kJ="[object String]";function xJ(t){return typeof t=="string"||!wJ(t)&&NJ(t)&&PJ(t)==kJ}Ox.exports=xJ});var Ix=d((Gge,Dx)=>{var OJ=pa(),DJ=Cn(),IJ="[object RegExp]";function $J(t){return DJ(t)&&OJ(t)==IJ}Dx.exports=$J});var Zv=d((Uge,Lx)=>{var qJ=Ix(),LJ=Ts(),$x=cl(),qx=$x&&$x.isRegExp,MJ=qx?LJ(qx):qJ;Lx.exports=MJ});var jx=d((Hge,Fx)=>{var FJ=gl(),jJ=yl(),GJ=ml(),Mx=bn(),UJ=ws();function HJ(t,e,r,n){if(!Mx(t))return t;e=jJ(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=UJ(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=Mx(c)?c:GJ(e[i+1])?[]:{})}FJ(s,u,l),s=s[u]}return t}Fx.exports=HJ});var Ux=d((Kge,Gx)=>{var KJ=Cd(),WJ=jx(),BJ=yl();function VJ(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=KJ(t,o);r(s,o)&&WJ(a,BJ(o,t),s)}return a}Gx.exports=VJ});var eT=d((Wge,Hx)=>{var zJ=Rs(),YJ=Xr(),XJ=Ux(),JJ=Qv();function QJ(t,e){if(t==null)return{};var r=zJ(JJ(t),function(n){return[n]});return e=YJ(e),XJ(t,r,function(n,i){return e(n,i[0])})}Hx.exports=QJ});var Wx=d((Bge,Kx)=>{function ZJ(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}Kx.exports=ZJ});var zx=d((Vge,Vx)=>{var eQ=Wx(),Bx=Math.max;function tQ(t,e,r){return e=Bx(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=Bx(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),eQ(t,this,s)}}Vx.exports=tQ});var Xx=d((zge,Yx)=>{function rQ(t){return function(){return t}}Yx.exports=rQ});var Zx=d((Yge,Qx)=>{var nQ=Xx(),Jx=Yv(),iQ=no(),aQ=Jx?function(t,e){return Jx(t,"toString",{configurable:!0,enumerable:!1,value:nQ(e),writable:!0})}:iQ;Qx.exports=aQ});var tO=d((Xge,eO)=>{var oQ=800,sQ=16,uQ=Date.now;function lQ(t){var e=0,r=0;return function(){var n=uQ(),i=sQ-(n-r);if(r=n,i>0){if(++e>=oQ)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}eO.exports=lQ});var nO=d((Jge,rO)=>{var cQ=Zx(),fQ=tO(),dQ=fQ(cQ);rO.exports=dQ});var xd=d((Qge,iO)=>{var pQ=no(),hQ=zx(),mQ=nO();function yQ(t,e){return mQ(hQ(t,e,pQ),t+"")}iO.exports=yQ});var Rl=d((Zge,aO)=>{var gQ=As(),vQ=Sn(),TQ=ml(),_Q=bn();function RQ(t,e,r){if(!_Q(r))return!1;var n=typeof e;return(n=="number"?vQ(r)&&TQ(e,r.length):n=="string"&&e in r)?gQ(r[e],t):!1}aO.exports=RQ});var sO=d((eve,oO)=>{var AQ=xd(),bQ=Rl();function CQ(t){return AQ(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&bQ(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}oO.exports=CQ});var Al=d((tve,uO)=>{var SQ=gl(),EQ=Ns(),PQ=sO(),wQ=Sn(),NQ=hs(),kQ=Or(),xQ=Object.prototype,OQ=xQ.hasOwnProperty,DQ=PQ(function(t,e){if(NQ(e)||wQ(e)){EQ(e,kQ(e),t);return}for(var r in e)OQ.call(e,r)&&SQ(t,r,e[r])});uO.exports=DQ});var Dd=d(Se=>{"use strict";var xi=Se&&Se.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Is=Se&&Se.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Se,"__esModule",{value:!0});Se.serializeProduction=Se.serializeGrammar=Se.Terminal=Se.Alternation=Se.RepetitionWithSeparator=Se.Repetition=Se.RepetitionMandatoryWithSeparator=Se.RepetitionMandatory=Se.Option=Se.Alternative=Se.Rule=Se.NonTerminal=Se.AbstractProduction=void 0;var lO=Is(Gt()),IQ=Is(Ut()),tT=Is(_l()),$Q=Is(Zv()),Jn=Is(eT()),Qn=Is(Al());function qQ(t){return LQ(t)?t.LABEL:t.name}function LQ(t){return(0,tT.default)(t.LABEL)&&t.LABEL!==""}var Zn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,IQ.default)(this.definition,function(r){r.accept(e)})},t}();Se.AbstractProduction=Zn;var cO=function(t){xi(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Zn);Se.NonTerminal=cO;var fO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.Rule=fO;var dO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.Alternative=dO;var pO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.Option=pO;var hO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.RepetitionMandatory=hO;var mO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.RepetitionMandatoryWithSeparator=mO;var yO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.Repetition=yO;var gO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return e}(Zn);Se.RepetitionWithSeparator=gO;var vO=function(t){xi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Qn.default)(n,(0,Jn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Zn);Se.Alternation=vO;var Od=function(){function t(e){this.idx=1,(0,Qn.default)(this,(0,Jn.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Se.Terminal=Od;function MQ(t){return(0,lO.default)(t,bl)}Se.serializeGrammar=MQ;function bl(t){function e(a){return(0,lO.default)(a,bl)}if(t instanceof cO){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,tT.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof dO)return{type:"Alternative",definition:e(t.definition)};if(t instanceof pO)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof hO)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof mO)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:bl(new Od({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof gO)return{type:"RepetitionWithSeparator",idx:t.idx,separator:bl(new Od({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof yO)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof vO)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof Od){var n={type:"Terminal",name:t.terminalType.name,label:qQ(t.terminalType),idx:t.idx};(0,tT.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,$Q.default)(i)?i.source:i),n}else{if(t instanceof fO)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Se.serializeProduction=bl});var TO=d(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.GAstVisitor=void 0;var ei=Dd(),FQ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case ei.NonTerminal:return this.visitNonTerminal(r);case ei.Alternative:return this.visitAlternative(r);case ei.Option:return this.visitOption(r);case ei.RepetitionMandatory:return this.visitRepetitionMandatory(r);case ei.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case ei.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case ei.Repetition:return this.visitRepetition(r);case ei.Alternation:return this.visitAlternation(r);case ei.Terminal:return this.visitTerminal(r);case ei.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();Id.GAstVisitor=FQ});var RO=d((ive,_O)=>{var jQ=ma();function GQ(t,e){var r;return jQ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}_O.exports=GQ});var $d=d((ave,AO)=>{var UQ=Dv(),HQ=Xr(),KQ=RO(),WQ=qe(),BQ=Rl();function VQ(t,e,r){var n=WQ(t)?UQ:KQ;return r&&BQ(t,e,r)&&(e=void 0),n(t,HQ(e,3))}AO.exports=VQ});var CO=d((ove,bO)=>{function zQ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}bO.exports=zQ});var EO=d((sve,SO)=>{var YQ=ma();function XQ(t,e){var r=!0;return YQ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}SO.exports=XQ});var Cl=d((uve,PO)=>{var JQ=CO(),QQ=EO(),ZQ=Xr(),eZ=qe(),tZ=Rl();function rZ(t,e,r){var n=eZ(t)?JQ:QQ;return r&&tZ(t,e,r)&&(e=void 0),n(t,ZQ(e,3))}PO.exports=rZ});var rT=d((lve,wO)=>{function nZ(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}wO.exports=nZ});var kO=d((cve,NO)=>{function iZ(t){return t!==t}NO.exports=iZ});var OO=d((fve,xO)=>{function aZ(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}xO.exports=aZ});var qd=d((dve,DO)=>{var oZ=rT(),sZ=kO(),uZ=OO();function lZ(t,e,r){return e===e?uZ(t,e,r):oZ(t,sZ,r)}DO.exports=lZ});var Oi=d((pve,IO)=>{var cZ=qd(),fZ=Sn(),dZ=_l(),pZ=Ds(),hZ=Yn(),mZ=Math.max;function yZ(t,e,r,n){t=fZ(t)?t:hZ(t),r=r&&!n?pZ(r):0;var i=t.length;return r<0&&(r=mZ(i+r,0)),dZ(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&cZ(t,e,r)>-1}IO.exports=yZ});var $O=d(Jr=>{"use strict";var iT=Jr&&Jr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Jr,"__esModule",{value:!0});Jr.getProductionDslName=Jr.isBranchingProd=Jr.isOptionalProd=Jr.isSequenceProd=void 0;var gZ=iT($d()),vZ=iT(Cl()),TZ=iT(Oi()),ot=Dd();function _Z(t){return t instanceof ot.Alternative||t instanceof ot.Option||t instanceof ot.Repetition||t instanceof ot.RepetitionMandatory||t instanceof ot.RepetitionMandatoryWithSeparator||t instanceof ot.RepetitionWithSeparator||t instanceof ot.Terminal||t instanceof ot.Rule}Jr.isSequenceProd=_Z;function nT(t,e){e===void 0&&(e=[]);var r=t instanceof ot.Option||t instanceof ot.Repetition||t instanceof ot.RepetitionWithSeparator;return r?!0:t instanceof ot.Alternation?(0,gZ.default)(t.definition,function(n){return nT(n,e)}):t instanceof ot.NonTerminal&&(0,TZ.default)(e,t)?!1:t instanceof ot.AbstractProduction?(t instanceof ot.NonTerminal&&e.push(t),(0,vZ.default)(t.definition,function(n){return nT(n,e)})):!1}Jr.isOptionalProd=nT;function RZ(t){return t instanceof ot.Alternation}Jr.isBranchingProd=RZ;function AZ(t){if(t instanceof ot.NonTerminal)return"SUBRULE";if(t instanceof ot.Option)return"OPTION";if(t instanceof ot.Alternation)return"OR";if(t instanceof ot.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof ot.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof ot.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof ot.Repetition)return"MANY";if(t instanceof ot.Terminal)return"CONSUME";throw Error("non exhaustive match")}Jr.getProductionDslName=AZ});var Tt=d(me=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});me.isSequenceProd=me.isBranchingProd=me.isOptionalProd=me.getProductionDslName=me.GAstVisitor=me.serializeProduction=me.serializeGrammar=me.Alternative=me.Alternation=me.RepetitionWithSeparator=me.RepetitionMandatoryWithSeparator=me.RepetitionMandatory=me.Repetition=me.Option=me.NonTerminal=me.Terminal=me.Rule=void 0;var Qr=Dd();Object.defineProperty(me,"Rule",{enumerable:!0,get:function(){return Qr.Rule}});Object.defineProperty(me,"Terminal",{enumerable:!0,get:function(){return Qr.Terminal}});Object.defineProperty(me,"NonTerminal",{enumerable:!0,get:function(){return Qr.NonTerminal}});Object.defineProperty(me,"Option",{enumerable:!0,get:function(){return Qr.Option}});Object.defineProperty(me,"Repetition",{enumerable:!0,get:function(){return Qr.Repetition}});Object.defineProperty(me,"RepetitionMandatory",{enumerable:!0,get:function(){return Qr.RepetitionMandatory}});Object.defineProperty(me,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Qr.RepetitionMandatoryWithSeparator}});Object.defineProperty(me,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Qr.RepetitionWithSeparator}});Object.defineProperty(me,"Alternation",{enumerable:!0,get:function(){return Qr.Alternation}});Object.defineProperty(me,"Alternative",{enumerable:!0,get:function(){return Qr.Alternative}});Object.defineProperty(me,"serializeGrammar",{enumerable:!0,get:function(){return Qr.serializeGrammar}});Object.defineProperty(me,"serializeProduction",{enumerable:!0,get:function(){return Qr.serializeProduction}});var bZ=TO();Object.defineProperty(me,"GAstVisitor",{enumerable:!0,get:function(){return bZ.GAstVisitor}});var Ld=$O();Object.defineProperty(me,"getProductionDslName",{enumerable:!0,get:function(){return Ld.getProductionDslName}});Object.defineProperty(me,"isOptionalProd",{enumerable:!0,get:function(){return Ld.isOptionalProd}});Object.defineProperty(me,"isBranchingProd",{enumerable:!0,get:function(){return Ld.isBranchingProd}});Object.defineProperty(me,"isSequenceProd",{enumerable:!0,get:function(){return Ld.isSequenceProd}})});var Md=d($s=>{"use strict";var MO=$s&&$s.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($s,"__esModule",{value:!0});$s.RestWalker=void 0;var CZ=MO(kd()),qO=MO(Ut()),Rr=Tt(),SZ=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,qO.default)(e.definition,function(i,a){var o=(0,CZ.default)(e.definition,a+1);if(i instanceof Rr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof Rr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof Rr.Alternative)n.walkFlat(i,o,r);else if(i instanceof Rr.Option)n.walkOption(i,o,r);else if(i instanceof Rr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof Rr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof Rr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof Rr.Repetition)n.walkMany(i,o,r);else if(i instanceof Rr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Rr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=LO(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Rr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=LO(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,qO.default)(e.definition,function(o){var s=new Rr.Alternative({definition:[o]});i.walk(s,a)})},t}();$s.RestWalker=SZ;function LO(t,e,r){var n=[new Rr.Option({definition:[new Rr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var UO=d((gve,GO)=>{var FO=to(),EZ=al(),PZ=qe(),jO=FO?FO.isConcatSpreadable:void 0;function wZ(t){return PZ(t)||EZ(t)||!!(jO&&t&&t[jO])}GO.exports=wZ});var Fd=d((vve,KO)=>{var NZ=Td(),kZ=UO();function HO(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=kZ),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?HO(s,e-1,r,n,i):NZ(i,s):n||(i[i.length]=s)}return i}KO.exports=HO});var En=d((Tve,WO)=>{var xZ=Fd();function OZ(t){var e=t==null?0:t.length;return e?xZ(t,1):[]}WO.exports=OZ});var aT=d((_ve,BO)=>{var DZ=qd();function IZ(t,e){var r=t==null?0:t.length;return!!r&&DZ(t,e,0)>-1}BO.exports=IZ});var oT=d((Rve,VO)=>{function $Z(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}VO.exports=$Z});var jd=d((Ave,zO)=>{function qZ(){}zO.exports=qZ});var XO=d((bve,YO)=>{var sT=Ev(),LZ=jd(),MZ=vd(),FZ=1/0,jZ=sT&&1/MZ(new sT([,-0]))[1]==FZ?function(t){return new sT(t)}:LZ;YO.exports=jZ});var uT=d((Cve,JO)=>{var GZ=yd(),UZ=aT(),HZ=oT(),KZ=gd(),WZ=XO(),BZ=vd(),VZ=200;function zZ(t,e,r){var n=-1,i=UZ,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=HZ;else if(a>=VZ){var l=e?null:WZ(t);if(l)return BZ(l);o=!1,i=KZ,u=new GZ}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var m=u.length;m--;)if(u[m]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}JO.exports=zZ});var Gd=d((Sve,QO)=>{var YZ=uT();function XZ(t){return t&&t.length?YZ(t):[]}QO.exports=XZ});var fT=d(Zr=>{"use strict";var cT=Zr&&Zr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Zr,"__esModule",{value:!0});Zr.firstForTerminal=Zr.firstForBranching=Zr.firstForSequence=Zr.first=void 0;var JZ=cT(En()),eD=cT(Gd()),QZ=cT(Gt()),ZO=Tt(),lT=Tt();function Ud(t){if(t instanceof ZO.NonTerminal)return Ud(t.referencedRule);if(t instanceof ZO.Terminal)return nD(t);if((0,lT.isSequenceProd)(t))return tD(t);if((0,lT.isBranchingProd)(t))return rD(t);throw Error("non exhaustive match")}Zr.first=Ud;function tD(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,lT.isOptionalProd)(a),e=e.concat(Ud(a)),n=n+1,i=r.length>n;return(0,eD.default)(e)}Zr.firstForSequence=tD;function rD(t){var e=(0,QZ.default)(t.definition,function(r){return Ud(r)});return(0,eD.default)((0,JZ.default)(e))}Zr.firstForBranching=rD;function nD(t){return[t.terminalType]}Zr.firstForTerminal=nD});var dT=d(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.IN=void 0;Hd.IN="_~IN~_"});var uD=d(Ar=>{"use strict";var ZZ=Ar&&Ar.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),iD=Ar&&Ar.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.buildInProdFollowPrefix=Ar.buildBetweenProdsFollowPrefix=Ar.computeAllProdsFollows=Ar.ResyncFollowsWalker=void 0;var eee=Md(),tee=fT(),ree=iD(Ut()),nee=iD(Al()),aD=dT(),iee=Tt(),oD=function(t){ZZ(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=sD(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new iee.Alternative({definition:o}),u=(0,tee.first)(s);this.follows[a]=u},e}(eee.RestWalker);Ar.ResyncFollowsWalker=oD;function aee(t){var e={};return(0,ree.default)(t,function(r){var n=new oD(r).startWalking();(0,nee.default)(e,n)}),e}Ar.computeAllProdsFollows=aee;function sD(t,e){return t.name+e+aD.IN}Ar.buildBetweenProdsFollowPrefix=sD;function oee(t){var e=t.terminalType.name;return e+t.idx+aD.IN}Ar.buildInProdFollowPrefix=oee});var io=d((Nve,lD)=>{function see(t){return t===void 0}lD.exports=see});var fD=d((kve,cD)=>{function uee(t){return t&&t.length?t[0]:void 0}cD.exports=uee});var qs=d((xve,dD)=>{dD.exports=fD()});var Sl=d((Ove,pD)=>{function lee(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}pD.exports=lee});var pT=d((Dve,hD)=>{var cee=ma();function fee(t,e){var r=[];return cee(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}hD.exports=fee});var yD=d((Ive,mD)=>{var dee="Expected a function";function pee(t){if(typeof t!="function")throw new TypeError(dee);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}mD.exports=pee});var Kd=d(($ve,gD)=>{var hee=_d(),mee=pT(),yee=Xr(),gee=qe(),vee=yD();function Tee(t,e){var r=gee(t)?hee:mee;return r(t,vee(yee(e,3)))}gD.exports=Tee});var TD=d((qve,vD)=>{var _ee=yd(),Ree=aT(),Aee=oT(),bee=Rs(),Cee=Ts(),See=gd(),Eee=200;function Pee(t,e,r,n){var i=-1,a=Ree,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=bee(e,Cee(r))),n?(a=Aee,o=!1):e.length>=Eee&&(a=See,o=!1,e=new _ee(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}vD.exports=Pee});var RD=d((Lve,_D)=>{var wee=Sn(),Nee=Cn();function kee(t){return Nee(t)&&wee(t)}_D.exports=kee});var Wd=d((Mve,bD)=>{var xee=TD(),Oee=Fd(),Dee=xd(),AD=RD(),Iee=Dee(function(t,e){return AD(t)?xee(t,Oee(e,1,AD,!0)):[]});bD.exports=Iee});var SD=d((Fve,CD)=>{var $ee=qd(),qee=Ds(),Lee=Math.max;function Mee(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:qee(r);return i<0&&(i=Lee(n+i,0)),$ee(t,e,i)}CD.exports=Mee});var PD=d((jve,ED)=>{var Fee=Xr(),jee=Sn(),Gee=Or();function Uee(t){return function(e,r,n){var i=Object(e);if(!jee(e)){var a=Fee(r,3);e=Gee(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}ED.exports=Uee});var ND=d((Gve,wD)=>{var Hee=rT(),Kee=Xr(),Wee=Ds(),Bee=Math.max;function Vee(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Wee(r);return i<0&&(i=Bee(n+i,0)),Hee(t,Kee(e,3),i)}wD.exports=Vee});var Bd=d((Uve,kD)=>{var zee=PD(),Yee=ND(),Xee=zee(Yee);kD.exports=Xee});var El=d((Hve,xD)=>{var Jee=_d(),Qee=pT(),Zee=Xr(),ete=qe();function tte(t,e){var r=ete(t)?Jee:Qee;return r(t,Zee(e,3))}xD.exports=tte});var hT=d((Kve,DD)=>{var rte=xd(),nte=As(),ite=Rl(),ate=vl(),OD=Object.prototype,ote=OD.hasOwnProperty,ste=rte(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&ite(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=ate(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||nte(c,OD[l])&&!ote.call(t,l))&&(t[l]=a[l])}return t});DD.exports=ste});var $D=d((Wve,ID)=>{function ute(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}ID.exports=ute});var LD=d((Bve,qD)=>{function lte(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}qD.exports=lte});var Di=d((Vve,MD)=>{var cte=$D(),fte=ma(),dte=Xr(),pte=LD(),hte=qe();function mte(t,e,r){var n=hte(t)?cte:pte,i=arguments.length<3;return n(t,dte(e,4),r,i,fte)}MD.exports=mte});var zd=d(Ls=>{"use strict";Object.defineProperty(Ls,"__esModule",{value:!0});Ls.clearRegExpParserCache=Ls.getRegExpAst=void 0;var yte=Xu(),Vd={},gte=new yte.RegExpParser;function vte(t){var e=t.toString();if(Vd.hasOwnProperty(e))return Vd[e];var r=gte.pattern(e);return Vd[e]=r,r}Ls.getRegExpAst=vte;function Tte(){Vd={}}Ls.clearRegExpParserCache=Tte});var KD=d(nr=>{"use strict";var _te=nr&&nr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ms=nr&&nr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(nr,"__esModule",{value:!0});nr.canMatchCharCode=nr.firstCharOptimizedIndices=nr.getOptimizedStartCodesIndices=nr.failedOptimizationPrefixMsg=void 0;var GD=Xu(),Rte=Ms(qe()),Ate=Ms(Cl()),bte=Ms(Ut()),mT=Ms(Bd()),Cte=Ms(Yn()),gT=Ms(Oi()),FD=Os(),UD=zd(),Ii=vT(),HD="Complement Sets are not supported for first char optimization";nr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function Ste(t,e){e===void 0&&(e=!1);try{var r=(0,UD.getRegExpAst)(t),n=Xd(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===HD)e&&(0,FD.PRINT_WARNING)("".concat(nr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,FD.PRINT_ERROR)("".concat(nr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(GD.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}nr.getOptimizedStartCodesIndices=Ste;function Xd(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)Xd(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":Yd(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(HD);(0,bte.default)(o.value,function(l){if(typeof l=="number")Yd(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)Yd(f,e,r);else{for(var f=c.from;f<=c.to&&f<Ii.minOptimizationVal;f++)Yd(f,e,r);if(c.to>=Ii.minOptimizationVal)for(var m=c.from>=Ii.minOptimizationVal?c.from:Ii.minOptimizationVal,v=c.to,y=(0,Ii.charCodeToOptimizedIndex)(m),A=(0,Ii.charCodeToOptimizedIndex)(v),P=y;P<=A;P++)e[P]=P}}});break;case"Group":Xd(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&yT(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,Cte.default)(e)}nr.firstCharOptimizedIndices=Xd;function Yd(t,e,r){var n=(0,Ii.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&Ete(t,e)}function Ete(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Ii.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Ii.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function jD(t,e){return(0,mT.default)(t.value,function(r){if(typeof r=="number")return(0,gT.default)(e,r);var n=r;return(0,mT.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function yT(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,Rte.default)(t.value)?(0,Ate.default)(t.value,yT):yT(t.value):!1}var Pte=function(t){_te(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,gT.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?jD(r,this.targetCharCodes)===void 0&&(this.found=!0):jD(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(GD.BaseRegExpVisitor);function wte(t,e){if(e instanceof RegExp){var r=(0,UD.getRegExpAst)(e),n=new Pte(t);return n.visit(r),n.found}else return(0,mT.default)(e,function(i){return(0,gT.default)(t,i.charCodeAt(0))})!==void 0}nr.canMatchCharCode=wte});var vT=d(K=>{"use strict";var VD=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),mt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var zD=Xu(),je=Pl(),Nte=mt(qs()),YD=mt(xr()),XD=mt(Sl()),Qd=mt(qe()),kte=mt(Yn()),xte=mt(En()),JD=mt(Kd()),QD=mt(Wd()),WD=mt(SD()),st=mt(Gt()),$i=mt(Ut()),qi=mt(_l()),ep=mt(ms()),_T=mt(io()),Ote=mt(Bd()),ir=mt(Dr()),Dte=mt(Or()),ya=mt(Zv()),ti=mt(El()),Ite=mt(hT()),Zd=mt(Di()),tp=mt(Oi()),BD=Os(),Fs=KD(),ZD=zd(),ao="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function $te(){K.SUPPORT_STICKY=!1}K.disableSticky=$te;function qte(){K.SUPPORT_STICKY=!0}K.enableSticky=qte;function Lte(t,e){e=(0,Ite.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(C,b){return b()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){Vte()});var n;r("Reject Lexer.NA",function(){n=(0,JD.default)(t,function(C){return C[ao]===je.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,st.default)(n,function(C){var b=C[ao];if((0,ya.default)(b)){var O=b.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!b.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,tp.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?AT(b):RT(b)}else{if((0,ep.default)(b))return i=!0,{exec:b};if(typeof b=="object")return i=!0,b;if(typeof b=="string"){if(b.length===1)return b;var L=b.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(L);return e.useSticky?AT(W):RT(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,st.default)(n,function(C){return C.tokenTypeIdx}),s=(0,st.default)(n,function(C){var b=C.GROUP;if(b!==je.Lexer.SKIPPED){if((0,qi.default)(b))return b;if((0,_T.default)(b))return!1;throw Error("non exhaustive match")}}),u=(0,st.default)(n,function(C){var b=C.LONGER_ALT;if(b){var O=(0,Qd.default)(b)?(0,st.default)(b,function(L){return(0,WD.default)(n,L)}):[(0,WD.default)(n,b)];return O}}),l=(0,st.default)(n,function(C){return C.PUSH_MODE}),c=(0,st.default)(n,function(C){return(0,ir.default)(C,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var C=pI(e.lineTerminatorCharacters);f=(0,st.default)(n,function(b){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,st.default)(n,function(b){return(0,ir.default)(b,"LINE_BREAKS")?!!b.LINE_BREAKS:fI(b,C)===!1&&(0,Fs.canMatchCharCode)(C,b.PATTERN)}))});var m,v,y,A;r("Misc Mapping #2",function(){m=(0,st.default)(n,CT),v=(0,st.default)(a,cI),y=(0,Zd.default)(n,function(C,b){var O=b.GROUP;return(0,qi.default)(O)&&O!==je.Lexer.SKIPPED&&(C[O]=[]),C},{}),A=(0,st.default)(a,function(C,b){return{pattern:a[b],longerAlt:u[b],canLineTerminator:f[b],isCustom:m[b],short:v[b],group:s[b],push:l[b],pop:c[b],tokenTypeIdx:o[b],tokenType:n[b]}})});var P=!0,w=[];return e.safeMode||r("First Char Optimization",function(){w=(0,Zd.default)(n,function(C,b,O){if(typeof b.PATTERN=="string"){var L=b.PATTERN.charCodeAt(0),W=bT(L);TT(C,W,A[O])}else if((0,Qd.default)(b.START_CHARS_HINT)){var ee;(0,$i.default)(b.START_CHARS_HINT,function(ke){var Qe=typeof ke=="string"?ke.charCodeAt(0):ke,V=bT(Qe);ee!==V&&(ee=V,TT(C,V,A[O]))})}else if((0,ya.default)(b.PATTERN))if(b.PATTERN.unicode)P=!1,e.ensureOptimizations&&(0,BD.PRINT_ERROR)("".concat(Fs.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(b.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var Ne=(0,Fs.getOptimizedStartCodesIndices)(b.PATTERN,e.ensureOptimizations);(0,YD.default)(Ne)&&(P=!1),(0,$i.default)(Ne,function(ke){TT(C,ke,A[O])})}else e.ensureOptimizations&&(0,BD.PRINT_ERROR)("".concat(Fs.failedOptimizationPrefixMsg)+"	TokenType: <".concat(b.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),P=!1;return C},[])}),{emptyGroups:y,patternIdxToConfig:A,charCodeToPatternIdxToConfig:w,hasCustom:i,canBeOptimized:P}}K.analyzeTokenTypes=Lte;function Mte(t,e){var r=[],n=eI(t);r=r.concat(n.errors);var i=tI(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(Fte(a)),r=r.concat(sI(a)),r=r.concat(uI(a,e)),r=r.concat(lI(a)),r}K.validatePatterns=Mte;function Fte(t){var e=[],r=(0,ti.default)(t,function(n){return(0,ya.default)(n[ao])});return e=e.concat(rI(r)),e=e.concat(iI(r)),e=e.concat(aI(r)),e=e.concat(oI(r)),e=e.concat(nI(r)),e}function eI(t){var e=(0,ti.default)(t,function(i){return!(0,ir.default)(i,ao)}),r=(0,st.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:je.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,QD.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=eI;function tI(t){var e=(0,ti.default)(t,function(i){var a=i[ao];return!(0,ya.default)(a)&&!(0,ep.default)(a)&&!(0,ir.default)(a,"exec")&&!(0,qi.default)(a)}),r=(0,st.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:je.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,QD.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=tI;var jte=/[^\\][$]/;function rI(t){var e=function(i){VD(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(zD.BaseRegExpVisitor),r=(0,ti.default)(t,function(i){var a=i.PATTERN;try{var o=(0,ZD.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return jte.test(a.source)}}),n=(0,st.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:je.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=rI;function nI(t){var e=(0,ti.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,st.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:je.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=nI;var Gte=/[^\\[][\^]|^\^/;function iI(t){var e=function(i){VD(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(zD.BaseRegExpVisitor),r=(0,ti.default)(t,function(i){var a=i.PATTERN;try{var o=(0,ZD.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Gte.test(a.source)}}),n=(0,st.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:je.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=iI;function aI(t){var e=(0,ti.default)(t,function(n){var i=n[ao];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,st.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:je.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=aI;function oI(t){var e=[],r=(0,st.default)(t,function(a){return(0,Zd.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,tp.default)(e,s)&&s.PATTERN!==je.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,XD.default)(r);var n=(0,ti.default)(r,function(a){return a.length>1}),i=(0,st.default)(n,function(a){var o=(0,st.default)(a,function(u){return u.name}),s=(0,Nte.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:je.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=oI;function sI(t){var e=(0,ti.default)(t,function(n){if(!(0,ir.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==je.Lexer.SKIPPED&&i!==je.Lexer.NA&&!(0,qi.default)(i)}),r=(0,st.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:je.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=sI;function uI(t,e){var r=(0,ti.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,tp.default)(e,i.PUSH_MODE)}),n=(0,st.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:je.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=uI;function lI(t){var e=[],r=(0,Zd.default)(t,function(n,i,a){var o=i.PATTERN;return o===je.Lexer.NA||((0,qi.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,ya.default)(o)&&Hte(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,$i.default)(t,function(n,i){(0,$i.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&Ute(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:je.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=lI;function Ute(t,e){if((0,ya.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,ep.default)(e))return e(t,0,[],{});if((0,ir.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function Hte(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,Ote.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function RT(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=RT;function AT(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=AT;function Kte(t,e,r){var n=[];return(0,ir.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:je.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,ir.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:je.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,ir.default)(t,K.MODES)&&(0,ir.default)(t,K.DEFAULT_MODE)&&!(0,ir.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:je.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,ir.default)(t,K.MODES)&&(0,$i.default)(t.modes,function(i,a){(0,$i.default)(i,function(o,s){if((0,_T.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:je.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,ir.default)(o,"LONGER_ALT")){var u=(0,Qd.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,$i.default)(u,function(l){!(0,_T.default)(l)&&!(0,tp.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:je.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=Kte;function Wte(t,e,r){var n=[],i=!1,a=(0,XD.default)((0,xte.default)((0,kte.default)(t.modes))),o=(0,JD.default)(a,function(u){return u[ao]===je.Lexer.NA}),s=pI(r);return e&&(0,$i.default)(o,function(u){var l=fI(u,s);if(l!==!1){var c=dI(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,ir.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,Fs.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:je.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=Wte;function Bte(t){var e={},r=(0,Dte.default)(t);return(0,$i.default)(r,function(n){var i=t[n];if((0,Qd.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=Bte;function CT(t){var e=t.PATTERN;if((0,ya.default)(e))return!1;if((0,ep.default)(e))return!0;if((0,ir.default)(e,"exec"))return!0;if((0,qi.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=CT;function cI(t){return(0,qi.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=cI;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function fI(t,e){if((0,ir.default)(t,"LINE_BREAKS"))return!1;if((0,ya.default)(t.PATTERN)){try{(0,Fs.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:je.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,qi.default)(t.PATTERN))return!1;if(CT(t))return{issue:je.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function dI(t,e){if(e.issue===je.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===je.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=dI;function pI(t){var e=(0,st.default)(t,function(r){return(0,qi.default)(r)?r.charCodeAt(0):r});return e}function TT(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var Jd=[];function bT(t){return t<K.minOptimizationVal?t:Jd[t]}K.charCodeToOptimizedIndex=bT;function Vte(){if((0,YD.default)(Jd)){Jd=new Array(65536);for(var t=0;t<65536;t++)Jd[t]=t>255?255+~~(t/255):t}}});var rp=d((Jve,hI)=>{function zte(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}hI.exports=zte});var so=d(ce=>{"use strict";var ri=ce&&ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ce,"__esModule",{value:!0});ce.isTokenType=ce.hasExtendingTokensTypesMapProperty=ce.hasExtendingTokensTypesProperty=ce.hasCategoriesProperty=ce.hasShortKeyProperty=ce.singleAssignCategoriesToksMap=ce.assignCategoriesMapProp=ce.assignCategoriesTokensProp=ce.assignTokenDefaultProps=ce.expandCategories=ce.augmentTokenTypes=ce.tokenIdxToClass=ce.tokenShortNameIdx=ce.tokenStructuredMatcherNoCategories=ce.tokenStructuredMatcher=void 0;var Yte=ri(xr()),Xte=ri(Sl()),Jte=ri(qe()),Qte=ri(En()),Zte=ri(Wd()),ere=ri(Gt()),oo=ri(Ut()),wl=ri(Dr()),tre=ri(Oi()),rre=ri(ki());function nre(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}ce.tokenStructuredMatcher=nre;function ire(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}ce.tokenStructuredMatcherNoCategories=ire;ce.tokenShortNameIdx=1;ce.tokenIdxToClass={};function are(t){var e=mI(t);yI(e),vI(e),gI(e),(0,oo.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}ce.augmentTokenTypes=are;function mI(t){for(var e=(0,rre.default)(t),r=t,n=!0;n;){r=(0,Xte.default)((0,Qte.default)((0,ere.default)(r,function(a){return a.CATEGORIES})));var i=(0,Zte.default)(r,e);e=e.concat(i),(0,Yte.default)(i)?n=!1:r=i}return e}ce.expandCategories=mI;function yI(t){(0,oo.default)(t,function(e){TI(e)||(ce.tokenIdxToClass[ce.tokenShortNameIdx]=e,e.tokenTypeIdx=ce.tokenShortNameIdx++),ST(e)&&!(0,Jte.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),ST(e)||(e.CATEGORIES=[]),_I(e)||(e.categoryMatches=[]),RI(e)||(e.categoryMatchesMap={})})}ce.assignTokenDefaultProps=yI;function gI(t){(0,oo.default)(t,function(e){e.categoryMatches=[],(0,oo.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(ce.tokenIdxToClass[n].tokenTypeIdx)})})}ce.assignCategoriesTokensProp=gI;function vI(t){(0,oo.default)(t,function(e){ET([],e)})}ce.assignCategoriesMapProp=vI;function ET(t,e){(0,oo.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,oo.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,tre.default)(n,r)||ET(n,r)})}ce.singleAssignCategoriesToksMap=ET;function TI(t){return(0,wl.default)(t,"tokenTypeIdx")}ce.hasShortKeyProperty=TI;function ST(t){return(0,wl.default)(t,"CATEGORIES")}ce.hasCategoriesProperty=ST;function _I(t){return(0,wl.default)(t,"categoryMatches")}ce.hasExtendingTokensTypesProperty=_I;function RI(t){return(0,wl.default)(t,"categoryMatchesMap")}ce.hasExtendingTokensTypesMapProperty=RI;function ore(t){return(0,wl.default)(t,"tokenTypeIdx")}ce.isTokenType=ore});var PT=d(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.defaultLexerErrorProvider=void 0;np.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var Pl=d(Mi=>{"use strict";var Ir=Mi&&Mi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Mi,"__esModule",{value:!0});Mi.Lexer=Mi.LexerDefinitionErrorType=void 0;var Li=vT(),wT=Ir(jd()),ip=Ir(xr()),sre=Ir(qe()),ure=Ir(rp()),lre=Ir(Kd()),AI=Ir(Gt()),NT=Ir(Ut()),cre=Ir(Or()),fre=Ir(io()),bI=Ir(no()),CI=Ir(Al()),dre=Ir(Di()),SI=Ir(ki()),kT=Os(),pre=so(),hre=PT(),mre=zd(),yre;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(yre=Mi.LexerDefinitionErrorType||(Mi.LexerDefinitionErrorType={}));var Nl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:hre.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Nl);var gre=function(){function t(e,r){r===void 0&&(r=Nl);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,kT.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,CI.default)({},Nl,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===Nl.lineTerminatorsPattern)n.config.lineTerminatorsPattern=Li.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===Nl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,sre.default)(e)?a={modes:{defaultMode:(0,SI.default)(e)},defaultMode:Li.DEFAULT_MODE}:(o=!1,a=(0,SI.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Li.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,Li.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,NT.default)(a.modes,function(c,f){a.modes[f]=(0,lre.default)(c,function(m){return(0,fre.default)(m)})});var s=(0,cre.default)(a.modes);if((0,NT.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Li.validatePatterns)(c,s))}),(0,ip.default)(n.lexerDefinitionErrors)){(0,pre.augmentTokenTypes)(c);var m;n.TRACE_INIT("analyzeTokenTypes",function(){m=(0,Li.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=m.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=m.charCodeToPatternIdxToConfig,n.emptyGroups=(0,CI.default)({},n.emptyGroups,m.emptyGroups),n.hasCustom=m.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=m.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,ip.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,AI.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,NT.default)(n.lexerDefinitionWarning,function(c){(0,kT.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(Li.SUPPORT_STICKY?(n.chopInput=bI.default,n.match=n.matchWithTest):(n.updateLastIndex=wT.default,n.match=n.matchWithExec),o&&(n.handleModes=wT.default),n.trackStartLines===!1&&(n.computeNewColumn=bI.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=wT.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,dre.default)(n.canModeBeOptimized,function(f,m,v){return m===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,ip.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,mre.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,kT.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,ip.default)(this.lexerDefinitionErrors)){var n=(0,AI.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,m,v,y,A,P,w,C,b,O=e,L=O.length,W=0,ee=0,Ne=this.hasCustom?0:Math.floor(e.length/10),ke=new Array(Ne),Qe=[],V=this.trackStartLines?1:void 0,fe=this.trackStartLines?1:void 0,M=(0,Li.cloneEmptyGroups)(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,ae=[],oe=[],Q=[],ft=[];Object.freeze(ft);var rt;function Ot(){return ae}function tn(qt){var nn=(0,Li.charCodeToOptimizedIndex)(qt),an=oe[nn];return an===void 0?ft:an}var Pr=function(qt){if(Q.length===1&&qt.tokenType.PUSH_MODE===void 0){var nn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(qt);Qe.push({offset:qt.startOffset,line:qt.startLine,column:qt.startColumn,length:qt.image.length,message:nn})}else{Q.pop();var an=(0,ure.default)(Q);ae=n.patternIdxToConfig[an],oe=n.charCodeToPatternIdxToConfig[an],B=ae.length;var $n=n.canModeBeOptimized[an]&&n.config.safeMode===!1;oe&&$n?rt=tn:rt=Ot}};function Ao(qt){Q.push(qt),oe=this.charCodeToPatternIdxToConfig[qt],ae=this.patternIdxToConfig[qt],B=ae.length,B=ae.length;var nn=this.canModeBeOptimized[qt]&&this.config.safeMode===!1;oe&&nn?rt=tn:rt=Ot}Ao.call(this,r);for(var or,bo=this.config.recoveryEnabled;W<L;){l=null;var Co=O.charCodeAt(W),So=rt(Co),vu=So.length;for(i=0;i<vu;i++){or=So[i];var yt=or.pattern;c=null;var pi=or.short;if(pi!==!1?Co===pi&&(l=yt):or.isCustom===!0?(b=yt.exec(O,W,ke,M),b!==null?(l=b[0],b.payload!==void 0&&(c=b.payload)):l=null):(this.updateLastIndex(yt,W),l=this.match(yt,e,W)),l!==null){if(u=or.longerAlt,u!==void 0){var Tu=u.length;for(o=0;o<Tu;o++){var On=ae[u[o]],Ia=On.pattern;if(f=null,On.isCustom===!0?(b=Ia.exec(O,W,ke,M),b!==null?(s=b[0],b.payload!==void 0&&(f=b.payload)):s=null):(this.updateLastIndex(Ia,W),s=this.match(Ia,e,W)),s&&s.length>l.length){l=s,c=f,or=On;break}}}break}}if(l!==null){if(m=l.length,v=or.group,v!==void 0&&(y=or.tokenTypeIdx,A=this.createTokenInstance(l,W,y,or.tokenType,V,fe,m),this.handlePayload(A,c),v===!1?ee=this.addToken(ke,ee,A):M[v].push(A)),e=this.chopInput(e,m),W=W+m,fe=this.computeNewColumn(fe,m),q===!0&&or.canLineTerminator===!0){var Dn=0,$a=void 0,Lr=void 0;j.lastIndex=0;do $a=j.test(l),$a===!0&&(Lr=j.lastIndex-1,Dn++);while($a===!0);Dn!==0&&(V=V+Dn,fe=m-Lr,this.updateTokenEndLineColumnLocation(A,v,Lr,Dn,V,fe,m))}this.handleModes(or,Pr,Ao,A)}else{for(var rn=W,Eo=V,Po=fe,wr=bo===!1;wr===!1&&W<L;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var In=ae[a],yt=In.pattern,pi=In.short;if(pi!==!1?O.charCodeAt(W)===pi&&(wr=!0):In.isCustom===!0?wr=yt.exec(O,W,ke,M)!==null:(this.updateLastIndex(yt,W),wr=yt.exec(e)!==null),wr===!0)break}if(P=W-rn,C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,rn,P,Eo,Po),Qe.push({offset:rn,line:Eo,column:Po,length:P,message:C}),bo===!1)break}}return this.hasCustom||(ke.length=ee),{tokens:ke,groups:M,errors:Qe}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();Mi.Lexer=gre});var uo=d($t=>{"use strict";var xT=$t&&$t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($t,"__esModule",{value:!0});$t.tokenMatcher=$t.createTokenInstance=$t.EOF=$t.createToken=$t.hasTokenLabel=$t.tokenName=$t.tokenLabel=void 0;var vre=xT(_l()),Fi=xT(Dr()),Tre=xT(io()),_re=Pl(),OT=so();function Rre(t){return II(t)?t.LABEL:t.name}$t.tokenLabel=Rre;function Are(t){return t.name}$t.tokenName=Are;function II(t){return(0,vre.default)(t.LABEL)&&t.LABEL!==""}$t.hasTokenLabel=II;var bre="parent",EI="categories",PI="label",wI="group",NI="push_mode",kI="pop_mode",xI="longer_alt",OI="line_breaks",DI="start_chars_hint";function $I(t){return Cre(t)}$t.createToken=$I;function Cre(t){var e=t.pattern,r={};if(r.name=t.name,(0,Tre.default)(e)||(r.PATTERN=e),(0,Fi.default)(t,bre))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,Fi.default)(t,EI)&&(r.CATEGORIES=t[EI]),(0,OT.augmentTokenTypes)([r]),(0,Fi.default)(t,PI)&&(r.LABEL=t[PI]),(0,Fi.default)(t,wI)&&(r.GROUP=t[wI]),(0,Fi.default)(t,kI)&&(r.POP_MODE=t[kI]),(0,Fi.default)(t,NI)&&(r.PUSH_MODE=t[NI]),(0,Fi.default)(t,xI)&&(r.LONGER_ALT=t[xI]),(0,Fi.default)(t,OI)&&(r.LINE_BREAKS=t[OI]),(0,Fi.default)(t,DI)&&(r.START_CHARS_HINT=t[DI]),r}$t.EOF=$I({name:"EOF",pattern:_re.Lexer.NA});(0,OT.augmentTokenTypes)([$t.EOF]);function Sre(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}$t.createTokenInstance=Sre;function Ere(t,e){return(0,OT.tokenStructuredMatcher)(t,e)}$t.tokenMatcher=Ere});var Gs=d(Pn=>{"use strict";var $T=Pn&&Pn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pn,"__esModule",{value:!0});Pn.defaultGrammarValidatorErrorProvider=Pn.defaultGrammarResolverErrorProvider=Pn.defaultParserErrorProvider=void 0;var js=uo(),IT=$T(qs()),ga=$T(Gt()),Pre=$T(Di()),DT=Tt(),qI=Tt();Pn.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,js.hasTokenLabel)(e),o=a?"--> ".concat((0,js.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,IT.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,Pre.default)(e,function(v,y){return v.concat(y)},[]),c=(0,ga.default)(l,function(v){return"[".concat((0,ga.default)(v,function(y){return(0,js.tokenLabel)(y)}).join(", "),"]")}),f=(0,ga.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),m=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+m+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,IT.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,ga.default)(e,function(c){return"[".concat((0,ga.default)(c,function(f){return(0,js.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(Pn.defaultParserErrorProvider);Pn.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};Pn.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof DT.Terminal?c.terminalType.name:c instanceof DT.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,IT.default)(e),a=i.idx,o=(0,qI.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,ga.default)(t.prefixPath,function(i){return(0,js.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,ga.default)(t.prefixPath,function(i){return(0,js.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,qI.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,ga.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof DT.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var FI=d(ni=>{"use strict";var wre=ni&&ni.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),LI=ni&&ni.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ni,"__esModule",{value:!0});ni.GastRefResolverVisitor=ni.resolveGrammar=void 0;var Nre=br(),kre=LI(Ut()),xre=LI(Yn()),Ore=Tt();function Dre(t,e){var r=new MI(t,e);return r.resolveRefs(),r.errors}ni.resolveGrammar=Dre;var MI=function(t){wre(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,kre.default)((0,xre.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:Nre.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(Ore.GAstVisitor);ni.GastRefResolverVisitor=MI});var GI=d((iTe,jI)=>{function Ire(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}jI.exports=Ire});var HI=d((aTe,UI)=>{var $re=ma();function qre(t,e,r,n){return $re(t,function(i,a,o){e(n,i,r(i),o)}),n}UI.exports=qre});var WI=d((oTe,KI)=>{var Lre=GI(),Mre=HI(),Fre=Xr(),jre=qe();function Gre(t,e){return function(r,n){var i=jre(r)?Lre:Mre,a=e?e():{};return i(r,t,Fre(n,2),a)}}KI.exports=Gre});var qT=d((sTe,BI)=>{var Ure=Sd(),Hre=WI(),Kre=Object.prototype,Wre=Kre.hasOwnProperty,Bre=Hre(function(t,e,r){Wre.call(t,r)?t[r].push(e):Ure(t,r,[e])});BI.exports=Bre});var ap=d((uTe,VI)=>{var Vre=Fd(),zre=Gt();function Yre(t,e){return Vre(zre(t,e),1)}VI.exports=Yre});var op=d((lTe,zI)=>{var Xre=Nd(),Jre=Ds();function Qre(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Jre(e),e=n-e,Xre(t,0,e<0?0:e)):[]}zI.exports=Qre});var xl=d(ut=>{"use strict";var co=ut&&ut.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),fo=ut&&ut.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ut,"__esModule",{value:!0});ut.nextPossibleTokensAfter=ut.possiblePathsFrom=ut.NextTerminalAfterAtLeastOneSepWalker=ut.NextTerminalAfterAtLeastOneWalker=ut.NextTerminalAfterManySepWalker=ut.NextTerminalAfterManyWalker=ut.AbstractNextTerminalAfterProductionWalker=ut.NextAfterTokenWalker=ut.AbstractNextPossibleTokensWalker=void 0;var XI=Md(),up=fo(qs()),sp=fo(xr()),YI=fo(op()),pr=fo(kd()),Zre=fo(rp()),ene=fo(Ut()),lo=fo(ki()),tne=fT(),de=Tt(),JI=function(t){co(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,lo.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,lo.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,sp.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(XI.RestWalker);ut.AbstractNextPossibleTokensWalker=JI;var rne=function(t){co(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,tne.first)(o),this.found=!0}},e}(JI);ut.NextAfterTokenWalker=rne;var kl=function(t){co(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(XI.RestWalker);ut.AbstractNextTerminalAfterProductionWalker=kl;var nne=function(t){co(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(kl);ut.NextTerminalAfterManyWalker=nne;var ine=function(t){co(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(kl);ut.NextTerminalAfterManySepWalker=ine;var ane=function(t){co(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(kl);ut.NextTerminalAfterAtLeastOneWalker=ane;var one=function(t){co(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,up.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(kl);ut.NextTerminalAfterAtLeastOneSepWalker=one;function QI(t,e,r){r===void 0&&(r=[]),r=(0,lo.default)(r);var n=[],i=0;function a(l){return l.concat((0,pr.default)(t,i+1))}function o(l){var c=QI(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,ene.default)(s.definition,function(l){(0,sp.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,pr.default)(t,i)}),n}ut.possiblePathsFrom=QI;function sne(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,sp.default)(f);){var m=f.pop();if(m===o){s&&(0,Zre.default)(f).idx<=l&&f.pop();continue}var v=m.def,y=m.idx,A=m.ruleStack,P=m.occurrenceStack;if(!(0,sp.default)(v)){var w=v[0];if(w===i){var C={idx:y,def:(0,pr.default)(v),ruleStack:(0,YI.default)(A),occurrenceStack:(0,YI.default)(P)};f.push(C)}else if(w instanceof de.Terminal)if(y<u-1){var b=y+1,O=e[b];if(r(O,w.terminalType)){var C={idx:b,def:(0,pr.default)(v),ruleStack:A,occurrenceStack:P};f.push(C)}}else if(y===u-1)c.push({nextTokenType:w.terminalType,nextTokenOccurrence:w.idx,ruleStack:A,occurrenceStack:P}),s=!0;else throw Error("non exhaustive match");else if(w instanceof de.NonTerminal){var L=(0,lo.default)(A);L.push(w.nonTerminalName);var W=(0,lo.default)(P);W.push(w.idx);var C={idx:y,def:w.definition.concat(a,(0,pr.default)(v)),ruleStack:L,occurrenceStack:W};f.push(C)}else if(w instanceof de.Option){var ee={idx:y,def:(0,pr.default)(v),ruleStack:A,occurrenceStack:P};f.push(ee),f.push(o);var Ne={idx:y,def:w.definition.concat((0,pr.default)(v)),ruleStack:A,occurrenceStack:P};f.push(Ne)}else if(w instanceof de.RepetitionMandatory){var ke=new de.Repetition({definition:w.definition,idx:w.idx}),Qe=w.definition.concat([ke],(0,pr.default)(v)),C={idx:y,def:Qe,ruleStack:A,occurrenceStack:P};f.push(C)}else if(w instanceof de.RepetitionMandatoryWithSeparator){var V=new de.Terminal({terminalType:w.separator}),ke=new de.Repetition({definition:[V].concat(w.definition),idx:w.idx}),Qe=w.definition.concat([ke],(0,pr.default)(v)),C={idx:y,def:Qe,ruleStack:A,occurrenceStack:P};f.push(C)}else if(w instanceof de.RepetitionWithSeparator){var ee={idx:y,def:(0,pr.default)(v),ruleStack:A,occurrenceStack:P};f.push(ee),f.push(o);var V=new de.Terminal({terminalType:w.separator}),fe=new de.Repetition({definition:[V].concat(w.definition),idx:w.idx}),Qe=w.definition.concat([fe],(0,pr.default)(v)),Ne={idx:y,def:Qe,ruleStack:A,occurrenceStack:P};f.push(Ne)}else if(w instanceof de.Repetition){var ee={idx:y,def:(0,pr.default)(v),ruleStack:A,occurrenceStack:P};f.push(ee),f.push(o);var fe=new de.Repetition({definition:w.definition,idx:w.idx}),Qe=w.definition.concat([fe],(0,pr.default)(v)),Ne={idx:y,def:Qe,ruleStack:A,occurrenceStack:P};f.push(Ne)}else if(w instanceof de.Alternation)for(var M=w.definition.length-1;M>=0;M--){var q=w.definition[M],j={idx:y,def:q.definition.concat((0,pr.default)(v)),ruleStack:A,occurrenceStack:P};f.push(j),f.push(o)}else if(w instanceof de.Alternative)f.push({idx:y,def:w.definition.concat((0,pr.default)(v)),ruleStack:A,occurrenceStack:P});else if(w instanceof de.Rule)f.push(une(w,y,A,P));else throw Error("non exhaustive match")}}return c}ut.nextPossibleTokensAfter=sne;function une(t,e,r,n){var i=(0,lo.default)(r);i.push(t.name);var a=(0,lo.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Us=d(Re=>{"use strict";var r$=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),mo=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var MT=mo(xr()),n$=mo(En()),ho=mo(Cl()),lp=mo(Gt()),po=mo(Ut()),ZI=mo(Dr()),i$=mo(Di()),e$=xl(),lne=Md(),cp=so(),va=Tt(),cne=Tt(),wt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(wt=Re.PROD_TYPE||(Re.PROD_TYPE={}));function a$(t){if(t instanceof va.Option||t==="Option")return wt.OPTION;if(t instanceof va.Repetition||t==="Repetition")return wt.REPETITION;if(t instanceof va.RepetitionMandatory||t==="RepetitionMandatory")return wt.REPETITION_MANDATORY;if(t instanceof va.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return wt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof va.RepetitionWithSeparator||t==="RepetitionWithSeparator")return wt.REPETITION_WITH_SEPARATOR;if(t instanceof va.Alternation||t==="Alternation")return wt.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=a$;function fne(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=a$(n);return a===wt.ALTERNATION?jT(e,r,i):GT(e,r,a,i)}Re.getLookaheadPaths=fne;function dne(t,e,r,n,i,a){var o=jT(t,e,r),s=UT(o)?cp.tokenStructuredMatcherNoCategories:cp.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=dne;function pne(t,e,r,n,i,a){var o=GT(t,e,i,r),s=UT(o)?cp.tokenStructuredMatcherNoCategories:cp.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=pne;function hne(t,e,r,n){var i=t.length,a=(0,ho.default)(t,function(u){return(0,ho.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,lp.default)(u,function(b){return b.GATE}),c=0;c<i;c++){var f=t[c],m=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<m;y++){for(var A=f[y],P=A.length,w=0;w<P;w++){var C=this.LA(w+1);if(r(C,A[w])===!1)continue e}return c}}};if(a&&!n){var o=(0,lp.default)(t,function(u){return(0,n$.default)(u)}),s=(0,i$.default)(o,function(u,l,c){return(0,po.default)(l,function(f){(0,ZI.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,po.default)(f.categoryMatches,function(m){(0,ZI.default)(u,m)||(u[m]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var m=l[f],v=m.length,y=0;y<v;y++){var A=this.LA(y+1);if(r(A,m[y])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=hne;function mne(t,e,r){var n=(0,ho.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,n$.default)(t);if(a.length===1&&(0,MT.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,i$.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,po.default)(c.categoryMatches,function(m){l[m]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,m=0;m<f;m++){var v=this.LA(m+1);if(e(v,c[m])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=mne;var yne=function(t){r$(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,wt.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,wt.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,wt.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,wt.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,wt.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(lne.RestWalker),o$=function(t){r$(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,wt.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,wt.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,wt.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,wt.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,wt.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,wt.ALTERNATION)},e}(cne.GAstVisitor);function t$(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function LT(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function gne(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function FT(t,e){for(var r=(0,lp.default)(t,function(c){return(0,e$.possiblePathsFrom)([c],1)}),n=t$(r.length),i=(0,lp.default)(r,function(c){var f={};return(0,po.default)(c,function(m){var v=LT(m.partialPath);(0,po.default)(v,function(y){f[y]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=t$(s.length);for(var u=function(c){for(var f=s[c],m=0;m<f.length;m++){var v=f[m].partialPath,y=f[m].suffixDef,A=LT(v),P=gne(i,A,c);if(P||(0,MT.default)(y)||v.length===e){var w=n[c];if(s$(w,v)===!1){w.push(v);for(var C=0;C<A.length;C++){var b=A[C];i[c][b]=!0}}}else{var O=(0,e$.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,po.default)(O,function(L){var W=LT(L.partialPath);(0,po.default)(W,function(ee){i[c][ee]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=FT;function jT(t,e,r,n){var i=new o$(t,wt.ALTERNATION,n);return e.accept(i),FT(i.result,r)}Re.getLookaheadPathsForOr=jT;function GT(t,e,r,n){var i=new o$(t,r);e.accept(i);var a=i.result,o=new yne(e,t,r),s=o.startWalking(),u=new va.Alternative({definition:a}),l=new va.Alternative({definition:s});return FT([u,l],n)}Re.getLookaheadPathsForOptionalProd=GT;function s$(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=s$;function vne(t,e){return t.length<e.length&&(0,ho.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=vne;function UT(t){return(0,ho.default)(t,function(e){return(0,ho.default)(e,function(r){return(0,ho.default)(r,function(n){return(0,MT.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=UT});var Il=d(ye=>{"use strict";var KT=ye&&ye.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),HT=ye&&ye.__assign||function(){return HT=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},HT.apply(this,arguments)},Ht=ye&&ye.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ye,"__esModule",{value:!0});ye.checkPrefixAlternativesAmbiguities=ye.validateSomeNonEmptyLookaheadPath=ye.validateTooManyAlts=ye.RepetitionCollector=ye.validateAmbiguousAlternationAlternatives=ye.validateEmptyOrAlternative=ye.getFirstNoneTerminal=ye.validateNoLeftRecursion=ye.validateRuleIsOverridden=ye.validateRuleDoesNotAlreadyExist=ye.OccurrenceValidationCollector=ye.identifyProductionForDuplicates=ye.validateGrammar=ye.validateLookahead=void 0;var u$=Ht(qs()),fp=Ht(xr()),Tne=Ht(kd()),l$=Ht(En()),_ne=Ht(El()),Rne=Ht(Kd()),Ane=Ht(Wd()),Ta=Ht(Gt()),Dl=Ht(Ut()),bne=Ht(qT()),WT=Ht(Di()),Cne=Ht(eT()),Sne=Ht(Yn()),BT=Ht(Oi()),ji=Ht(ap()),Ene=Ht(ki()),Nn=br(),VT=Tt(),Hs=Us(),Pne=xl(),wn=Tt(),zT=Tt(),wne=Ht(op()),Nne=Ht(Sl()),kne=so();function xne(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,Ta.default)(e,function(r){return HT({type:Nn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}ye.validateLookahead=xne;function One(t,e,r,n){var i=(0,ji.default)(t,function(u){return Dne(u,r)}),a=Fne(t,e,r),o=(0,ji.default)(t,function(u){return y$(u,r)}),s=(0,ji.default)(t,function(u){return p$(u,t,n,r)});return i.concat(a,o,s)}ye.validateGrammar=One;function Dne(t,e){var r=new d$;t.accept(r);var n=r.allProductions,i=(0,bne.default)(n,c$),a=(0,Cne.default)(i,function(s){return s.length>1}),o=(0,Ta.default)((0,Sne.default)(a),function(s){var u=(0,u$.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,VT.getProductionDslName)(u),f={message:l,type:Nn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},m=f$(u);return m&&(f.parameter=m),f});return o}function c$(t){return"".concat((0,VT.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(f$(t))}ye.identifyProductionForDuplicates=c$;function f$(t){return t instanceof wn.Terminal?t.terminalType.name:t instanceof wn.NonTerminal?t.nonTerminalName:""}var d$=function(t){KT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(zT.GAstVisitor);ye.OccurrenceValidationCollector=d$;function p$(t,e,r,n){var i=[],a=(0,WT.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:Nn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}ye.validateRuleDoesNotAlreadyExist=p$;function Ine(t,e,r){var n=[],i;return(0,BT.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:Nn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}ye.validateRuleIsOverridden=Ine;function h$(t,e,r,n){n===void 0&&(n=[]);var i=[],a=Ol(e.definition);if((0,fp.default)(a))return[];var o=t.name,s=(0,BT.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Nn.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,Ane.default)(a,n.concat([t])),l=(0,ji.default)(u,function(c){var f=(0,Ene.default)(n);return f.push(c),h$(t,c,r,f)});return i.concat(l)}ye.validateNoLeftRecursion=h$;function Ol(t){var e=[];if((0,fp.default)(t))return e;var r=(0,u$.default)(t);if(r instanceof wn.NonTerminal)e.push(r.referencedRule);else if(r instanceof wn.Alternative||r instanceof wn.Option||r instanceof wn.RepetitionMandatory||r instanceof wn.RepetitionMandatoryWithSeparator||r instanceof wn.RepetitionWithSeparator||r instanceof wn.Repetition)e=e.concat(Ol(r.definition));else if(r instanceof wn.Alternation)e=(0,l$.default)((0,Ta.default)(r.definition,function(o){return Ol(o.definition)}));else if(!(r instanceof wn.Terminal))throw Error("non exhaustive match");var n=(0,VT.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Tne.default)(t);return e.concat(Ol(a))}else return e}ye.getFirstNoneTerminal=Ol;var YT=function(t){KT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(zT.GAstVisitor);function $ne(t,e){var r=new YT;t.accept(r);var n=r.alternations,i=(0,ji.default)(n,function(a){var o=(0,wne.default)(a.definition);return(0,ji.default)(o,function(s,u){var l=(0,Pne.nextPossibleTokensAfter)([s],[],kne.tokenStructuredMatcher,1);return(0,fp.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:Nn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}ye.validateEmptyOrAlternative=$ne;function qne(t,e,r){var n=new YT;t.accept(n);var i=n.alternations;i=(0,Rne.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,ji.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,Hs.getLookaheadPathsForOr)(s,t,u,o),c=Mne(l,o,t,r),f=g$(l,o,t,r);return c.concat(f)});return a}ye.validateAmbiguousAlternationAlternatives=qne;var m$=function(t){KT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(zT.GAstVisitor);ye.RepetitionCollector=m$;function y$(t,e){var r=new YT;t.accept(r);var n=r.alternations,i=(0,ji.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:Nn.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}ye.validateTooManyAlts=y$;function Lne(t,e,r){var n=[];return(0,Dl.default)(t,function(i){var a=new m$;i.accept(a);var o=a.allProductions;(0,Dl.default)(o,function(s){var u=(0,Hs.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,Hs.getLookaheadPathsForOptionalProd)(c,i,u,l),m=f[0];if((0,fp.default)((0,l$.default)(m))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:Nn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}ye.validateSomeNonEmptyLookaheadPath=Lne;function Mne(t,e,r,n){var i=[],a=(0,WT.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,Dl.default)(u,function(c){var f=[l];(0,Dl.default)(t,function(m,v){l!==v&&(0,Hs.containsPath)(m,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,Hs.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,Ta.default)(a,function(s){var u=(0,Ta.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:Nn.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function g$(t,e,r,n){var i=(0,WT.default)(t,function(o,s,u){var l=(0,Ta.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,Nne.default)((0,ji.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,_ne.default)(i,function(m){return e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<u&&(0,Hs.isStrictPrefixOfPath)(m.path,l)}),f=(0,Ta.default)(c,function(m){var v=[m.idx+1,u+1],y=e.idx===0?"":e.idx,A=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:m.path});return{message:A,type:Nn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return f}));return a}ye.checkPrefixAlternativesAmbiguities=g$;function Fne(t,e,r){var n=[],i=(0,Ta.default)(e,function(a){return a.name});return(0,Dl.default)(t,function(a){var o=a.name;if((0,BT.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:Nn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var R$=d(_a=>{"use strict";var v$=_a&&_a.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_a,"__esModule",{value:!0});_a.validateGrammar=_a.resolveGrammar=void 0;var jne=v$(Ut()),T$=v$(hT()),Gne=FI(),Une=Il(),_$=Gs();function Hne(t){var e=(0,T$.default)(t,{errMsgProvider:_$.defaultGrammarResolverErrorProvider}),r={};return(0,jne.default)(t.rules,function(n){r[n.name]=n}),(0,Gne.resolveGrammar)(r,e.errMsgProvider)}_a.resolveGrammar=Hne;function Kne(t){return t=(0,T$.default)(t,{errMsgProvider:_$.defaultGrammarValidatorErrorProvider}),(0,Une.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}_a.validateGrammar=Kne});var Ks=d(ar=>{"use strict";var $l=ar&&ar.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Wne=ar&&ar.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ar,"__esModule",{value:!0});ar.EarlyExitException=ar.NotAllInputParsedException=ar.NoViableAltException=ar.MismatchedTokenException=ar.isRecognitionException=void 0;var Bne=Wne(Oi()),A$="MismatchedTokenException",b$="NoViableAltException",C$="EarlyExitException",S$="NotAllInputParsedException",E$=[A$,b$,C$,S$];Object.freeze(E$);function Vne(t){return(0,Bne.default)(E$,t.name)}ar.isRecognitionException=Vne;var dp=function(t){$l(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),zne=function(t){$l(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=A$,a}return e}(dp);ar.MismatchedTokenException=zne;var Yne=function(t){$l(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=b$,a}return e}(dp);ar.NoViableAltException=Yne;var Xne=function(t){$l(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=S$,i}return e}(dp);ar.NotAllInputParsedException=Xne;var Jne=function(t){$l(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=C$,a}return e}(dp);ar.EarlyExitException=Jne});var JT=d(Nt=>{"use strict";var Qne=Nt&&Nt.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ra=Nt&&Nt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Nt,"__esModule",{value:!0});Nt.attemptInRepetitionRecovery=Nt.Recoverable=Nt.InRuleRecoveryException=Nt.IN_RULE_RECOVERY_EXCEPTION=Nt.EOF_FOLLOW_KEY=void 0;var ql=uo(),Zne=Ra(xr()),P$=Ra(op()),eie=Ra(En()),XT=Ra(Gt()),w$=Ra(Bd()),tie=Ra(Dr()),rie=Ra(Oi()),nie=Ra(ki()),iie=Ks(),aie=dT(),oie=br();Nt.EOF_FOLLOW_KEY={};Nt.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var N$=function(t){Qne(e,t);function e(r){var n=t.call(this,r)||this;return n.name=Nt.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);Nt.InRuleRecoveryException=N$;var sie=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,tie.default)(e,"recoveryEnabled")?e.recoveryEnabled:oie.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=k$)},t.prototype.getTokenToInsert=function(e){var r=(0,ql.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),m=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),A=new iie.MismatchedTokenException(y,c,a.LA(0));A.resyncedTokens=(0,P$.default)(u),a.SAVE_ERROR(A)};!l;)if(this.tokenMatcher(f,i)){m();return}else if(n.call(this)){m(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new N$("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,Zne.default)(r))return!1;var i=this.LA(1),a=(0,w$.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,rie.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,w$.default)(e,function(a){var o=(0,ql.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return Nt.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,XT.default)(r,function(i,a){return a===0?Nt.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,XT.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,eie.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===Nt.EOF_FOLLOW_KEY)return[ql.EOF];var r=e.ruleName+e.idxInCallingRule+aie.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,ql.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,P$.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,nie.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,XT.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();Nt.Recoverable=sie;function k$(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var m=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&m===void 0&&(m=ql.EOF,v=1),!(m===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(m,v,o)&&this.tryInRepetitionRecovery(t,e,r,m)}Nt.attemptInRepetitionRecovery=k$});var pp=d(we=>{"use strict";Object.defineProperty(we,"__esModule",{value:!0});we.getKeyForAutomaticLookahead=we.AT_LEAST_ONE_SEP_IDX=we.MANY_SEP_IDX=we.AT_LEAST_ONE_IDX=we.MANY_IDX=we.OPTION_IDX=we.OR_IDX=we.BITS_FOR_ALT_IDX=we.BITS_FOR_RULE_IDX=we.BITS_FOR_OCCURRENCE_IDX=we.BITS_FOR_METHOD_TYPE=void 0;we.BITS_FOR_METHOD_TYPE=4;we.BITS_FOR_OCCURRENCE_IDX=8;we.BITS_FOR_RULE_IDX=12;we.BITS_FOR_ALT_IDX=8;we.OR_IDX=1<<we.BITS_FOR_OCCURRENCE_IDX;we.OPTION_IDX=2<<we.BITS_FOR_OCCURRENCE_IDX;we.MANY_IDX=3<<we.BITS_FOR_OCCURRENCE_IDX;we.AT_LEAST_ONE_IDX=4<<we.BITS_FOR_OCCURRENCE_IDX;we.MANY_SEP_IDX=5<<we.BITS_FOR_OCCURRENCE_IDX;we.AT_LEAST_ONE_SEP_IDX=6<<we.BITS_FOR_OCCURRENCE_IDX;function uie(t,e,r){return r|e|t}we.getKeyForAutomaticLookahead=uie;var yTe=32-we.BITS_FOR_ALT_IDX});var ZT=d(Aa=>{"use strict";var hp=Aa&&Aa.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},x$=Aa&&Aa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Aa,"__esModule",{value:!0});Aa.LLkLookaheadStrategy=void 0;var QT=x$(ap()),lie=x$(xr()),mp=Gs(),cie=br(),yp=Il(),Ll=Us(),fie=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:cie.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,lie.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=hp(hp(hp(hp([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,QT.default)(e,function(r){return(0,yp.validateNoLeftRecursion)(r,r,mp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,QT.default)(e,function(r){return(0,yp.validateEmptyOrAlternative)(r,mp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,QT.default)(e,function(n){return(0,yp.validateAmbiguousAlternationAlternatives)(n,r,mp.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,yp.validateSomeNonEmptyLookaheadPath)(e,r,mp.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,Ll.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Ll.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,Ll.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,Ll.getProdType)(e.prodType),Ll.buildSingleAlternativeLookaheadFunction)},t}();Aa.LLkLookaheadStrategy=fie});var $$=d(ii=>{"use strict";var die=ii&&ii.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),D$=ii&&ii.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ii,"__esModule",{value:!0});ii.collectMethods=ii.LooksAhead=void 0;var yo=D$(Ut()),e_=D$(Dr()),O$=br(),Gi=pp(),pie=Tt(),Ws=Tt(),hie=ZT(),mie=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,e_.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:O$.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,e_.default)(e,"maxLookahead")?e.maxLookahead:O$.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,e_.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new hie.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,yo.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=I$(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,yo.default)(a,function(f){var m=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,Ws.getProductionDslName)(f)).concat(m),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,Gi.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Gi.OR_IDX,f.idx);r.setLaFuncCache(y,v)})}),(0,yo.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,Gi.MANY_IDX,"Repetition",f.maxLookahead,(0,Ws.getProductionDslName)(f))}),(0,yo.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Gi.OPTION_IDX,"Option",f.maxLookahead,(0,Ws.getProductionDslName)(f))}),(0,yo.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Gi.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,Ws.getProductionDslName)(f))}),(0,yo.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Gi.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,Ws.getProductionDslName)(f))}),(0,yo.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Gi.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,Ws.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Gi.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Gi.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();ii.LooksAhead=mie;var yie=function(t){die(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(pie.GAstVisitor),gp=new yie;function I$(t){gp.reset(),t.accept(gp);var e=gp.dslMethods;return gp.reset(),e}ii.collectMethods=I$});var q$=d(ai=>{"use strict";Object.defineProperty(ai,"__esModule",{value:!0});ai.addNoneTerminalToCst=ai.addTerminalToCst=ai.setNodeLocationFull=ai.setNodeLocationOnlyOffset=void 0;function gie(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}ai.setNodeLocationOnlyOffset=gie;function vie(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}ai.setNodeLocationFull=vie;function Tie(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}ai.addTerminalToCst=Tie;function _ie(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}ai.addNoneTerminalToCst=_ie});var L$=d(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.defineNameProp=void 0;var Rie="name";function Aie(t,e){Object.defineProperty(t,Rie,{enumerable:!1,configurable:!0,writable:!1,value:e})}vp.defineNameProp=Aie});var K$=d(Xt=>{"use strict";var Ui=Xt&&Xt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xt,"__esModule",{value:!0});Xt.validateMissingCstMethods=Xt.validateVisitor=Xt.CstVisitorDefinitionError=Xt.createBaseVisitorConstructorWithDefaults=Xt.createBaseSemanticVisitorConstructor=Xt.defaultVisit=void 0;var bie=Ui(xr()),Cie=Ui(Sl()),Sie=Ui(qe()),M$=Ui(Gt()),Eie=Ui(Ut()),Pie=Ui(El()),wie=Ui(Or()),Nie=Ui(ms()),kie=Ui(io()),F$=L$();function j$(t,e){for(var r=(0,wie.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}Xt.defaultVisit=j$;function xie(t,e){var r=function(){};(0,F$.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,Sie.default)(i)&&(i=i[0]),!(0,kie.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=U$(this,e);if(!(0,bie.default)(i)){var a=(0,M$.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}Xt.createBaseSemanticVisitorConstructor=xie;function Oie(t,e,r){var n=function(){};(0,F$.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,Eie.default)(e,function(a){i[a]=j$}),n.prototype=i,n.prototype.constructor=n,n}Xt.createBaseVisitorConstructorWithDefaults=Oie;var G$;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(G$=Xt.CstVisitorDefinitionError||(Xt.CstVisitorDefinitionError={}));function U$(t,e){var r=H$(t,e);return r}Xt.validateVisitor=U$;function H$(t,e){var r=(0,Pie.default)(e,function(i){return(0,Nie.default)(t[i])===!1}),n=(0,M$.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:G$.MISSING_METHOD,methodName:i}});return(0,Cie.default)(n)}Xt.validateMissingCstMethods=H$});var z$=d(Vs=>{"use strict";var Tp=Vs&&Vs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Vs,"__esModule",{value:!0});Vs.TreeBuilder=void 0;var Bs=q$(),hr=Tp(jd()),Die=Tp(Dr()),W$=Tp(Or()),B$=Tp(io()),V$=K$(),Iie=br(),$ie=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,Die.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:Iie.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=hr.default,this.cstFinallyStateUpdate=hr.default,this.cstPostTerminal=hr.default,this.cstPostNonTerminal=hr.default,this.cstPostRule=hr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Bs.setNodeLocationFull,this.setNodeLocationFromNode=Bs.setNodeLocationFull,this.cstPostRule=hr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=hr.default,this.setNodeLocationFromNode=hr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Bs.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Bs.setNodeLocationOnlyOffset,this.cstPostRule=hr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=hr.default,this.setNodeLocationFromNode=hr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=hr.default,this.setNodeLocationFromNode=hr.default,this.cstPostRule=hr.default,this.setInitialNodeLocation=hr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Bs.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Bs.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,B$.default)(this.baseCstVisitorConstructor)){var e=(0,V$.createBaseSemanticVisitorConstructor)(this.className,(0,W$.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,B$.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,V$.createBaseVisitorConstructorWithDefaults)(this.className,(0,W$.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();Vs.TreeBuilder=$ie});var X$=d(_p=>{"use strict";Object.defineProperty(_p,"__esModule",{value:!0});_p.LexerAdapter=void 0;var Y$=br(),qie=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):Y$.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?Y$.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();_p.LexerAdapter=qie});var Q$=d(zs=>{"use strict";var J$=zs&&zs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zs,"__esModule",{value:!0});zs.RecognizerApi=void 0;var Lie=J$(Yn()),Mie=J$(Oi()),Fie=Ks(),t_=br(),jie=Gs(),Gie=Il(),Uie=Tt(),Hie=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=t_.DEFAULT_RULE_CONFIG),(0,Mie.default)(this.definedRulesNames,e)){var i=jie.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:t_.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=t_.DEFAULT_RULE_CONFIG);var i=(0,Gie.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,Fie.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,Uie.serializeGrammar)((0,Lie.default)(this.gastProductionsCache))},t}();zs.RecognizerApi=Hie});var oq=d(Xs=>{"use strict";var oi=Xs&&Xs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xs,"__esModule",{value:!0});Xs.RecognizerEngine=void 0;var Z$=oi(xr()),r_=oi(qe()),n_=oi(En()),eq=oi(Cl()),Kie=oi(Gd()),Wie=oi(bn()),Ml=oi(Dr()),Fl=oi(Yn()),tq=oi(Di()),rq=oi(ki()),$r=pp(),Rp=Ks(),nq=Us(),Ys=xl(),iq=br(),Bie=JT(),aq=uo(),jl=so(),Vie=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=jl.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Ml.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,r_.default)(e)){if((0,Z$.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,r_.default)(e))this.tokensMap=(0,tq.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Ml.default)(e,"modes")&&(0,eq.default)((0,n_.default)((0,Fl.default)(e.modes)),jl.isTokenType)){var n=(0,n_.default)((0,Fl.default)(e.modes)),i=(0,Kie.default)(n);this.tokensMap=(0,tq.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,Wie.default)(e))this.tokensMap=(0,rq.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=aq.EOF;var a=(0,Ml.default)(e,"modes")?(0,n_.default)((0,Fl.default)(e.modes)):(0,Fl.default)(e),o=(0,eq.default)(a,function(s){return(0,Z$.default)(s.categoryMatches)});this.tokenMatcher=o?jl.tokenStructuredMatcherNoCategories:jl.tokenStructuredMatcher,(0,jl.augmentTokenTypes)((0,Fl.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Ml.default)(n,"resyncEnabled")?n.resyncEnabled:iq.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,Ml.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:iq.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<$r.BITS_FOR_METHOD_TYPE+$r.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var m=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(m),m}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(m){return this.invokeRuleCatch(m,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Rp.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,nq.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,$r.AT_LEAST_ONE_IDX,e,Ys.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Ys.NextTerminalAfterAtLeastOneSepWalker],u,$r.AT_LEAST_ONE_SEP_IDX,e,Ys.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,nq.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,$r.MANY_IDX,e,Ys.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Ys.NextTerminalAfterManySepWalker],u,$r.MANY_SEP_IDX,e,Ys.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,$r.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OR_IDX,r),i=(0,r_.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Rp.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Rp.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Rp.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===Bie.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,rq.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),aq.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();Xs.RecognizerEngine=Vie});var cq=d(Js=>{"use strict";var lq=Js&&Js.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Js,"__esModule",{value:!0});Js.ErrorHandler=void 0;var i_=Ks(),zie=lq(Dr()),sq=lq(ki()),uq=Us(),Yie=br(),Xie=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,zie.default)(e,"errorMessageProvider")?e.errorMessageProvider:Yie.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,i_.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,sq.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,sq.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,uq.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new i_.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,uq.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new i_.NoViableAltException(l,this.LA(1),u))},t}();Js.ErrorHandler=Xie});var pq=d(Qs=>{"use strict";var dq=Qs&&Qs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Qs,"__esModule",{value:!0});Qs.ContentAssist=void 0;var fq=xl(),Jie=dq(qs()),Qie=dq(io()),Zie=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,Qie.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,fq.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,Jie.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new fq.NextAfterTokenWalker(i,e).startWalking();return a},t}();Qs.ContentAssist=Zie});var Aq=d(Zs=>{"use strict";var eu=Zs&&Zs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Zs,"__esModule",{value:!0});Zs.GastRecorder=void 0;var Ap=eu(rp()),eae=eu(qe()),tae=eu($d()),rae=eu(Ut()),gq=eu(ms()),Ul=eu(Dr()),si=Tt(),nae=Pl(),vq=so(),Tq=uo(),iae=br(),aae=pp(),Cp={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Cp);var hq=!0,mq=Math.pow(2,aae.BITS_FOR_OCCURRENCE_IDX)-1,_q=(0,Tq.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:nae.Lexer.NA});(0,vq.augmentTokenTypes)([_q]);var Rq=(0,Tq.createTokenInstance)(_q,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(Rq);var oae={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},sae=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return iae.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new si.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return Gl.call(this,si.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){Gl.call(this,si.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){Gl.call(this,si.RepetitionMandatoryWithSeparator,r,e,hq)},t.prototype.manyInternalRecord=function(e,r){Gl.call(this,si.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){Gl.call(this,si.RepetitionWithSeparator,r,e,hq)},t.prototype.orInternalRecord=function(e,r){return uae.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(bp(r),!e||(0,Ul.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(yq(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Ap.default)(this.recordingProdStack),o=e.ruleName,s=new si.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?oae:Cp},t.prototype.consumeInternalRecord=function(e,r,n){if(bp(r),!(0,vq.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(yq(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Ap.default)(this.recordingProdStack),o=new si.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),Rq},t}();Zs.GastRecorder=sae;function Gl(t,e,r,n){n===void 0&&(n=!1),bp(r);var i=(0,Ap.default)(this.recordingProdStack),a=(0,gq.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,Ul.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Cp}function uae(t,e){var r=this;bp(e);var n=(0,Ap.default)(this.recordingProdStack),i=(0,eae.default)(t)===!1,a=i===!1?t:t.DEF,o=new si.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,Ul.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,tae.default)(a,function(u){return(0,gq.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,rae.default)(a,function(u){var l=new si.Alternative({definition:[]});o.definition.push(l),(0,Ul.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,Ul.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Cp}function yq(t){return t===0?"":"".concat(t)}function bp(t){if(t<0||t>mq){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(mq+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var bq=d(tu=>{"use strict";var lae=tu&&tu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(tu,"__esModule",{value:!0});tu.PerformanceTracer=void 0;var cae=lae(Dr()),fae=Os(),dae=br(),pae=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,cae.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=dae.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,fae.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();tu.PerformanceTracer=pae});var Cq=d(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.applyMixins=void 0;function hae(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Sp.applyMixins=hae});var br=d(He=>{"use strict";var wq=He&&He.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ru=He&&He.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(He,"__esModule",{value:!0});He.EmbeddedActionsParser=He.CstParser=He.Parser=He.EMPTY_ALT=He.ParserDefinitionErrorType=He.DEFAULT_RULE_CONFIG=He.DEFAULT_PARSER_CONFIG=He.END_OF_FILE=void 0;var a_=ru(xr()),mae=ru(Gt()),yae=ru(Ut()),ba=ru(Yn()),Sq=ru(Dr()),Nq=ru(ki()),gae=Os(),vae=uD(),Eq=uo(),kq=Gs(),Pq=R$(),Tae=JT(),_ae=$$(),Rae=z$(),Aae=X$(),bae=Q$(),Cae=oq(),Sae=cq(),Eae=pq(),Pae=Aq(),wae=bq(),Nae=Cq(),kae=Il();He.END_OF_FILE=(0,Eq.createTokenInstance)(Eq.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(He.END_OF_FILE);He.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:kq.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});He.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var xae;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(xae=He.ParserDefinitionErrorType||(He.ParserDefinitionErrorType={}));function Oae(t){return t===void 0&&(t=void 0),function(){return t}}He.EMPTY_ALT=Oae;var Ep=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,Sq.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,Sq.default)(r,"skipValidations")?r.skipValidations:He.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,gae.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,yae.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,Pq.resolveGrammar)({rules:(0,ba.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,a_.default)(i)&&e.skipValidations===!1){var a=(0,Pq.validateGrammar)({rules:(0,ba.default)(e.gastProductionsCache),tokenTypes:(0,ba.default)(e.tokensMap),errMsgProvider:kq.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,kae.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,ba.default)(e.gastProductionsCache),tokenTypes:(0,ba.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,a_.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,vae.computeAllProdsFollows)((0,ba.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,ba.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,ba.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,a_.default)(e.definitionErrors))throw r=(0,mae.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();He.Parser=Ep;(0,Nae.applyMixins)(Ep,[Tae.Recoverable,_ae.LooksAhead,Rae.TreeBuilder,Aae.LexerAdapter,Cae.RecognizerEngine,bae.RecognizerApi,Sae.ErrorHandler,Eae.ContentAssist,Pae.GastRecorder,wae.PerformanceTracer]);var Dae=function(t){wq(e,t);function e(r,n){n===void 0&&(n=He.DEFAULT_PARSER_CONFIG);var i=(0,Nq.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Ep);He.CstParser=Dae;var Iae=function(t){wq(e,t);function e(r,n){n===void 0&&(n=He.DEFAULT_PARSER_CONFIG);var i=(0,Nq.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Ep);He.EmbeddedActionsParser=Iae});var Oq=d(Ca=>{"use strict";var $ae=Ca&&Ca.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),nu=Ca&&Ca.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ca,"__esModule",{value:!0});Ca.buildModel=void 0;var xq=Tt(),Hl=nu(Gt()),qae=nu(En()),Lae=nu(Yn()),Mae=nu($d()),Fae=nu(qT()),jae=nu(Al());function Gae(t){var e=new Uae,r=(0,Lae.default)(t);return(0,Hl.default)(r,function(n){return e.visitRule(n)})}Ca.buildModel=Gae;var Uae=function(t){$ae(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,Fae.default)(n,function(o){return o.propertyName}),a=(0,Hl.default)(i,function(o,s){var u=!(0,Mae.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,Hl.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Pp(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Pp(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Pp(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Pp(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,Hl.default)(this.visitEach(r),function(i){return(0,jae.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,qae.default)((0,Hl.default)(r,function(i){return n.visit(i)}))},e}(xq.GAstVisitor);function Pp(t){return t instanceof xq.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var Iq=d((ITe,Dq)=>{var Hae=Nd();function Kae(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:Hae(t,e,r)}Dq.exports=Kae});var o_=d(($Te,$q)=>{var Wae="\\ud800-\\udfff",Bae="\\u0300-\\u036f",Vae="\\ufe20-\\ufe2f",zae="\\u20d0-\\u20ff",Yae=Bae+Vae+zae,Xae="\\ufe0e\\ufe0f",Jae="\\u200d",Qae=RegExp("["+Jae+Wae+Yae+Xae+"]");function Zae(t){return Qae.test(t)}$q.exports=Zae});var Lq=d((qTe,qq)=>{function eoe(t){return t.split("")}qq.exports=eoe});var Wq=d((LTe,Kq)=>{var Mq="\\ud800-\\udfff",toe="\\u0300-\\u036f",roe="\\ufe20-\\ufe2f",noe="\\u20d0-\\u20ff",ioe=toe+roe+noe,aoe="\\ufe0e\\ufe0f",ooe="["+Mq+"]",s_="["+ioe+"]",u_="\\ud83c[\\udffb-\\udfff]",soe="(?:"+s_+"|"+u_+")",Fq="[^"+Mq+"]",jq="(?:\\ud83c[\\udde6-\\uddff]){2}",Gq="[\\ud800-\\udbff][\\udc00-\\udfff]",uoe="\\u200d",Uq=soe+"?",Hq="["+aoe+"]?",loe="(?:"+uoe+"(?:"+[Fq,jq,Gq].join("|")+")"+Hq+Uq+")*",coe=Hq+Uq+loe,foe="(?:"+[Fq+s_+"?",s_,jq,Gq,ooe].join("|")+")",doe=RegExp(u_+"(?="+u_+")|"+foe+coe,"g");function poe(t){return t.match(doe)||[]}Kq.exports=poe});var Vq=d((MTe,Bq)=>{var hoe=Lq(),moe=o_(),yoe=Wq();function goe(t){return moe(t)?yoe(t):hoe(t)}Bq.exports=goe});var Yq=d((FTe,zq)=>{var voe=Iq(),Toe=o_(),_oe=Vq(),Roe=Bv();function Aoe(t){return function(e){e=Roe(e);var r=Toe(e)?_oe(e):void 0,n=r?r[0]:e.charAt(0),i=r?voe(r,1).join(""):e.slice(1);return n[t]()+i}}zq.exports=Aoe});var Jq=d((jTe,Xq)=>{var boe=Yq(),Coe=boe("toUpperCase");Xq.exports=Coe});var tL=d(iu=>{"use strict";var au=iu&&iu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(iu,"__esModule",{value:!0});iu.genDts=void 0;var Soe=au(En()),Eoe=au(qe()),wp=au(Gt()),Poe=au(Di()),woe=au(Gd()),Zq=au(Jq());function Noe(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,Soe.default)((0,wp.default)(t,function(n){return koe(n)}))),e.includeVisitorInterface&&(r=r.concat(Ioe(e.visitorInterfaceName,t))),r.join(`

`)+`
`}iu.genDts=Noe;function koe(t){var e=xoe(t),r=Ooe(t);return[e,r]}function xoe(t){var e=eL(t.name),r=l_(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function Ooe(t){var e=l_(t.name);return"export type ".concat(e,` = {
  `).concat((0,wp.default)(t.properties,function(r){return Doe(r)}).join(`
  `),`
};`)}function Doe(t){var e=qoe(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function Ioe(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,wp.default)(e,function(r){return $oe(r)}).join(`
  `),`
}`)}function $oe(t){var e=l_(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function qoe(t){if((0,Eoe.default)(t)){var e=(0,woe.default)((0,wp.default)(t,function(n){return Qq(n)})),r=(0,Poe.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return Qq(t)}function Qq(t){return t.kind==="token"?"IToken":eL(t.name)}function eL(t){return(0,Zq.default)(t)+"CstNode"}function l_(t){return(0,Zq.default)(t)+"CstChildren"}});var rL=d(ou=>{"use strict";var Np=ou&&ou.__assign||function(){return Np=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Np.apply(this,arguments)};Object.defineProperty(ou,"__esModule",{value:!0});ou.generateCstDts=void 0;var Loe=Oq(),Moe=tL(),Foe={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function joe(t,e){var r=Np(Np({},Foe),e),n=(0,Loe.buildModel)(t);return(0,Moe.genDts)(n,r)}ou.generateCstDts=joe});var iL=d(kp=>{"use strict";Object.defineProperty(kp,"__esModule",{value:!0});kp.createSyntaxDiagramsCode=void 0;var nL=_v();function Goe(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(nL.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(nL.VERSION,"/diagrams/diagrams.css"):a,s=`
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`,u=`
<link rel='stylesheet' href='`.concat(o,`'>
`),l=`
<script src='`.concat(i,`vendor/railroad-diagrams.js'><\/script>
<script src='`).concat(i,`src/diagrams_builder.js'><\/script>
<script src='`).concat(i,`src/diagrams_behavior.js'><\/script>
<script src='`).concat(i,`src/main.js'><\/script>
`),c=`
<div id="diagrams" align="center"></div>    
`,f=`
<script>
    window.serializedGrammar = `.concat(JSON.stringify(t,null,"  "),`;
<\/script>
`),m=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;return s+u+l+c+f+m}kp.createSyntaxDiagramsCode=Goe});var go=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var Uoe=_v();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return Uoe.VERSION}});var xp=br();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return xp.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return xp.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return xp.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return xp.EMPTY_ALT}});var aL=Pl();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return aL.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return aL.LexerDefinitionErrorType}});var su=uo();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return su.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return su.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return su.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return su.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return su.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return su.tokenName}});var Hoe=Us();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return Hoe.getLookaheadPaths}});var Koe=ZT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return Koe.LLkLookaheadStrategy}});var Woe=Gs();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return Woe.defaultParserErrorProvider}});var Kl=Ks();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return Kl.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return Kl.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return Kl.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return Kl.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return Kl.NoViableAltException}});var Boe=PT();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return Boe.defaultLexerErrorProvider}});var ui=Tt();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return ui.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return ui.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return ui.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return ui.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return ui.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return ui.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return ui.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return ui.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return ui.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return ui.Terminal}});var c_=Tt();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return c_.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return c_.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return c_.GAstVisitor}});var Voe=rL();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return Voe.generateCstDts}});function zoe(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=zoe;var Yoe=iL();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Yoe.createSyntaxDiagramsCode}});var Xoe=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=Xoe});var fL=d(Y=>{"use strict";var oL=Y&&Y.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Y,"__esModule",{value:!0});Y.createATN=Y.RuleTransition=Y.EpsilonTransition=Y.AtomTransition=Y.AbstractTransition=Y.ATN_LOOP_END=Y.ATN_PLUS_LOOP_BACK=Y.ATN_STAR_LOOP_ENTRY=Y.ATN_STAR_LOOP_BACK=Y.ATN_BLOCK_END=Y.ATN_RULE_STOP=Y.ATN_TOKEN_START=Y.ATN_STAR_BLOCK_START=Y.ATN_PLUS_BLOCK_START=Y.ATN_RULE_START=Y.ATN_BASIC=Y.ATN_INVALID_TYPE=Y.buildATNKey=void 0;var sL=oL(Gt()),Joe=oL(El()),Cr=go();function Bl(t,e,r){return`${t.name}_${e}_${r}`}Y.buildATNKey=Bl;Y.ATN_INVALID_TYPE=0;Y.ATN_BASIC=1;Y.ATN_RULE_START=2;Y.ATN_PLUS_BLOCK_START=4;Y.ATN_STAR_BLOCK_START=5;Y.ATN_TOKEN_START=6;Y.ATN_RULE_STOP=7;Y.ATN_BLOCK_END=8;Y.ATN_STAR_LOOP_BACK=9;Y.ATN_STAR_LOOP_ENTRY=10;Y.ATN_PLUS_LOOP_BACK=11;Y.ATN_LOOP_END=12;var uu=class{constructor(e){this.target=e}isEpsilon(){return!1}};Y.AbstractTransition=uu;var Op=class extends uu{constructor(e,r){super(e),this.tokenType=r}};Y.AtomTransition=Op;var Dp=class extends uu{constructor(e){super(e)}isEpsilon(){return!0}};Y.EpsilonTransition=Dp;var Wl=class extends uu{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};Y.RuleTransition=Wl;function Qoe(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Zoe(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=vo(e,i,i);a!==void 0&&cse(e,i,a)}return e}Y.createATN=Qoe;function Zoe(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=Kt(t,i,void 0,{type:Y.ATN_RULE_START}),o=Kt(t,i,void 0,{type:Y.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function uL(t,e,r){return r instanceof Cr.Terminal?f_(t,e,r.terminalType,r):r instanceof Cr.NonTerminal?lse(t,e,r):r instanceof Cr.Alternation?ise(t,e,r):r instanceof Cr.Option?ase(t,e,r):r instanceof Cr.Repetition?ese(t,e,r):r instanceof Cr.RepetitionWithSeparator?tse(t,e,r):r instanceof Cr.RepetitionMandatory?rse(t,e,r):r instanceof Cr.RepetitionMandatoryWithSeparator?nse(t,e,r):vo(t,e,r)}function ese(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_STAR_BLOCK_START});Sa(t,n);let i=lu(t,e,n,r,vo(t,e,r));return cL(t,e,r,i)}function tse(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_STAR_BLOCK_START});Sa(t,n);let i=lu(t,e,n,r,vo(t,e,r)),a=f_(t,e,r.separator,r);return cL(t,e,r,i,a)}function rse(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_PLUS_BLOCK_START});Sa(t,n);let i=lu(t,e,n,r,vo(t,e,r));return lL(t,e,r,i)}function nse(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_PLUS_BLOCK_START});Sa(t,n);let i=lu(t,e,n,r,vo(t,e,r)),a=f_(t,e,r.separator,r);return lL(t,e,r,i,a)}function ise(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_BASIC});Sa(t,n);let i=(0,sL.default)(r.definition,o=>uL(t,e,o));return lu(t,e,n,r,...i)}function ase(t,e,r){let n=Kt(t,e,r,{type:Y.ATN_BASIC});Sa(t,n);let i=lu(t,e,n,r,vo(t,e,r));return ose(t,e,r,i)}function vo(t,e,r){let n=(0,Joe.default)((0,sL.default)(r.definition,i=>uL(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:use(t,n)}function lL(t,e,r,n,i){let a=n.left,o=n.right,s=Kt(t,e,r,{type:Y.ATN_PLUS_LOOP_BACK});Sa(t,s);let u=Kt(t,e,r,{type:Y.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[Bl(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,kt(o,s),i===void 0?(kt(s,a),kt(s,u)):(kt(s,u),kt(s,i.left),kt(i.right,a)),{left:a,right:u}}function cL(t,e,r,n,i){let a=n.left,o=n.right,s=Kt(t,e,r,{type:Y.ATN_STAR_LOOP_ENTRY});Sa(t,s);let u=Kt(t,e,r,{type:Y.ATN_LOOP_END}),l=Kt(t,e,r,{type:Y.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,kt(s,a),kt(s,u),kt(o,l),i!==void 0?(kt(l,u),kt(l,i.left),kt(i.right,a)):kt(l,s),t.decisionMap[Bl(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function ose(t,e,r,n){let i=n.left,a=n.right;return kt(i,a),t.decisionMap[Bl(e,"Option",r.idx)]=i,n}function Sa(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function lu(t,e,r,n,...i){let a=Kt(t,e,n,{type:Y.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(kt(r,s.left),kt(s.right,a)):kt(r,a);let o={left:r,right:a};return t.decisionMap[Bl(e,sse(n),n.idx)]=r,o}function sse(t){if(t instanceof Cr.Alternation)return"Alternation";if(t instanceof Cr.Option)return"Option";if(t instanceof Cr.Repetition)return"Repetition";if(t instanceof Cr.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Cr.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Cr.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function use(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof Wl,l=s,c=e[a+1].left;o.left.type===Y.ATN_BASIC&&o.right.type===Y.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,fse(t,o.right)):kt(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function f_(t,e,r,n){let i=Kt(t,e,n,{type:Y.ATN_BASIC}),a=Kt(t,e,n,{type:Y.ATN_BASIC});return d_(i,new Op(a,r)),{left:i,right:a}}function lse(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=Kt(t,e,r,{type:Y.ATN_BASIC}),o=Kt(t,e,r,{type:Y.ATN_BASIC}),s=new Wl(i,n,o);return d_(a,s),{left:a,right:o}}function cse(t,e,r){let n=t.ruleToStartState.get(e);kt(n,r.left);let i=t.ruleToStopState.get(e);return kt(r.right,i),{left:n,right:i}}function kt(t,e){let r=new Dp(e);d_(t,r)}function Kt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function d_(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function fse(t,e){t.states.splice(t.states.indexOf(e),1)}});var pL=d(li=>{"use strict";var dse=li&&li.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(li,"__esModule",{value:!0});li.getATNConfigKey=li.ATNConfigSet=li.DFA_ERROR=void 0;var pse=dse(Gt());li.DFA_ERROR={};var p_=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=dL(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,pse.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};li.ATNConfigSet=p_;function dL(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}li.getATNConfigKey=dL});var mL=d((VTe,hL)=>{var hse=Ps();function mse(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!hse(o):r(o,s)))var s=o,u=a}return u}hL.exports=mse});var gL=d((zTe,yL)=>{function yse(t,e){return t<e}yL.exports=yse});var TL=d((YTe,vL)=>{var gse=mL(),vse=gL(),Tse=no();function _se(t){return t&&t.length?gse(t,Tse,vse):void 0}vL.exports=_se});var RL=d((XTe,_L)=>{var Rse=Xr(),Ase=uT();function bse(t,e){return t&&t.length?Ase(t,Rse(e,2)):[]}_L.exports=bse});var wL=d(cu=>{"use strict";var Pa=cu&&cu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(cu,"__esModule",{value:!0});cu.LLStarLookaheadStrategy=void 0;var qr=go(),kn=fL(),Ea=pL(),Cse=Pa(TL()),Sse=Pa(ap()),Ese=Pa(RL()),Vl=Pa(Gt()),Pse=Pa(En()),h_=Pa(Ut()),wse=Pa(xr()),AL=Pa(Di());function Nse(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var Ip=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},bL=new Ip,y_=class extends qr.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,kn.createATN)(e.rules),this.dfas=kse(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,kn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,Vl.default)((0,qr.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>(0,Vl.default)(m,v=>v[0]));if(CL(f,!1)&&!a){let m=(0,AL.default)(f,(v,y,A)=>((0,h_.default)(y,P=>{P&&(v[P.tokenTypeIdx]=A,(0,h_.default)(P.categoryMatches,w=>{v[w]=A}))}),v),{});return i?function(v){var y;let A=this.LA(1),P=m[A.tokenTypeIdx];if(v!==void 0&&P!==void 0){let w=(y=v[P])===null||y===void 0?void 0:y.GATE;if(w!==void 0&&w.call(this)===!1)return}return P}:function(){let v=this.LA(1);return m[v.tokenTypeIdx]}}else return i?function(m){let v=new Ip,y=m===void 0?0:m.length;for(let P=0;P<y;P++){let w=m?.[P].GATE;v.set(P,w===void 0||w.call(this))}let A=m_.call(this,o,c,v,s);return typeof A=="number"?A:void 0}:function(){let m=m_.call(this,o,c,bL,s);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,kn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,Vl.default)((0,qr.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>(0,Vl.default)(m,v=>v[0]));if(CL(f)&&f[0][0]&&!a){let m=f[0],v=(0,Pse.default)(m);if(v.length===1&&(0,wse.default)(v[0].categoryMatches)){let A=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let y=(0,AL.default)(v,(A,P)=>(P!==void 0&&(A[P.tokenTypeIdx]=!0,(0,h_.default)(P.categoryMatches,w=>{A[w]=!0})),A),{});return function(){let A=this.LA(1);return y[A.tokenTypeIdx]===!0}}}return function(){let m=m_.call(this,o,c,bL,s);return typeof m=="object"?!1:m===0}}};cu.LLStarLookaheadStrategy=y_;function CL(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function kse(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=Nse(t.decisionStates[n],n);return r}function m_(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=Gse(i.atnStartState);a=PL(i,EL(s)),i.start=a}return xse.apply(this,[i,a,r,n])}function xse(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=Lse(i,s);if(u===void 0&&(u=Ose.apply(this,[t,i,s,a,r,n])),u===Ea.DFA_ERROR)return qse(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function Ose(t,e,r,n,i,a){let o=Mse(e.configs,r,i);if(o.size===0)return SL(t,e,r,Ea.DFA_ERROR),Ea.DFA_ERROR;let s=EL(o),u=jse(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(Wse(o)){let l=(0,Cse.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,Dse.apply(this,[t,n,o.alts,a])}return s=SL(t,e,r,s),s}function Dse(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=Ise({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function Ise(t){let e=(0,Vl.default)(t.prefixPath,i=>(0,qr.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${$se(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function $se(t){if(t instanceof qr.NonTerminal)return"SUBRULE";if(t instanceof qr.Option)return"OPTION";if(t instanceof qr.Alternation)return"OR";if(t instanceof qr.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof qr.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof qr.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof qr.Repetition)return"MANY";if(t instanceof qr.Terminal)return"CONSUME";throw Error("non exhaustive match")}function qse(t,e,r){let n=(0,Sse.default)(e.configs.elements,a=>a.state.transitions),i=(0,Ese.default)(n.filter(a=>a instanceof kn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function Lse(t,e){return t.edges[e.tokenTypeIdx]}function Mse(t,e,r){let n=new Ea.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===kn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=Fse(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new Ea.ATNConfigSet;for(let o of n.elements)$p(o,a)}if(i.length>0&&!Hse(a))for(let o of i)a.add(o);return a}function Fse(t,e){if(t instanceof kn.AtomTransition&&(0,qr.tokenMatcher)(e,t.tokenType))return t.target}function jse(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function EL(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function SL(t,e,r,n){return n=PL(t,n),e.edges[r.tokenTypeIdx]=n,n}function PL(t,e){if(e===Ea.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function Gse(t){let e=new Ea.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};$p(a,e)}return e}function $p(t,e){let r=t.state;if(r.type===kn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};$p(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=Use(t,a);o!==void 0&&$p(o,e)}}function Use(t,e){if(e instanceof kn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof kn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function Hse(t){for(let e of t.elements)if(e.state.type===kn.ATN_RULE_STOP)return!0;return!1}function Kse(t){for(let e of t.elements)if(e.state.type!==kn.ATN_RULE_STOP)return!1;return!0}function Wse(t){if(Kse(t))return!0;let e=Bse(t.elements);return Vse(e)&&!zse(e)}function Bse(t){let e=new Map;for(let r of t){let n=(0,Ea.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function Vse(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function zse(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var NL=d(qp=>{"use strict";Object.defineProperty(qp,"__esModule",{value:!0});qp.LLStarLookaheadStrategy=void 0;var Yse=wL();Object.defineProperty(qp,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Yse.LLStarLookaheadStrategy}})});var v_=d(en=>{"use strict";Object.defineProperty(en,"__esModule",{value:!0});en.RootCstNodeImpl=en.CompositeCstNodeImpl=en.LeafCstNodeImpl=en.AbstractCstNode=en.CstNodeBuilder=void 0;var kL=$o(),Xse=er(),xL=Le(),g_=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new Lp(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new Xl;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Yl(e.startOffset,e.image.length,(0,xL.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Yl(r.startOffset,r.image.length,(0,xL.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,Xse.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};en.CstNodeBuilder=g_;var zl=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};en.AbstractCstNode=zl;var Yl=class extends zl{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};en.LeafCstNodeImpl=Yl;var Xl=class extends zl{constructor(){super(...arguments),this.children=new Jl(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:kL.Position.create(0,0),end:kL.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};en.CompositeCstNodeImpl=Xl;var Jl=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,Jl.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},Lp=class extends Xl{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};en.RootCstNodeImpl=Lp});var Gp=d(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.LangiumCompletionParser=mr.LangiumParserErrorMessageProvider=mr.LangiumParser=mr.AbstractLangiumParser=mr.DatatypeSymbol=void 0;var Fp=go(),Jse=NL(),Mp=xe(),OL=jt(),DL=be(),Qse=v_();mr.DatatypeSymbol=Symbol("Datatype");function T_(t){return t.$type===mr.DatatypeSymbol}var IL="\u200B",$L=t=>t.endsWith(IL)?t:t+IL,Ql=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new A_(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};mr.AbstractLangiumParser=Ql;var __=class extends Ql{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Qse.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,OL.isDataTypeRule)(e)?mr.DatatypeSymbol:(0,OL.getTypeName)(e),i=this.wrapper.DEFINE_RULE($L(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===mr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,Mp.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(T_(u)){let l=i.image;(0,Mp.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(T_(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,DL.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),T_(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,DL.getContainerOfType)(e,Mp.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,Mp.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let a=e[n];a===void 0?e[n]=i:Array.isArray(a)&&Array.isArray(i)&&(i.push(...a),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}};mr.LangiumParser=__;var jp=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return Fp.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return Fp.defaultParserErrorProvider.buildEarlyExitMessage(e)}};mr.LangiumParserErrorMessageProvider=jp;var R_=class extends Ql{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE($L(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};mr.LangiumCompletionParser=R_;var Zse={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new jp},A_=class extends Fp.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Zse),{lookaheadStrategy:n?new Fp.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new Jse.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var C_=d(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.assertUnreachable=fu.ErrorWithLocation=void 0;var b_=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};fu.ErrorWithLocation=b_;function eue(t){throw new Error("Error! The input value was not handled.")}fu.assertUnreachable=eue});var E_=d(Hp=>{"use strict";Object.defineProperty(Hp,"__esModule",{value:!0});Hp.createParser=void 0;var qL=go(),Ke=xe(),Zl=C_(),tue=Ft(),LL=jt(),ML=vt();function rue(t,e,r){return nue({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}Hp.createParser=rue;function nue(t,e){let r=(0,ML.getAllReachableRules)(e,!1),n=(0,tue.stream)(e.rules).filter(Ke.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,To(a,i.definition)))}}function To(t,e,r=!1){let n;if((0,Ke.isKeyword)(e))n=cue(t,e);else if((0,Ke.isAction)(e))n=iue(t,e);else if((0,Ke.isAssignment)(e))n=To(t,e.terminal);else if((0,Ke.isCrossReference)(e))n=FL(t,e);else if((0,Ke.isRuleCall)(e))n=aue(t,e);else if((0,Ke.isAlternatives)(e))n=sue(t,e);else if((0,Ke.isUnorderedGroup)(e))n=uue(t,e);else if((0,Ke.isGroup)(e))n=lue(t,e);else throw new Zl.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return jL(t,r?void 0:Up(e),n,e.cardinality)}function iue(t,e){let r=(0,LL.getTypeName)(e);return()=>t.parser.action(r,e)}function aue(t,e){let r=e.rule.ref;if((0,Ke.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?oue(r,e.arguments):()=>({});return a=>t.parser.subrule(n,GL(t,r),e,i(a))}else if((0,Ke.isTerminalRule)(r)){let n=t.consume++,i=S_(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,Zl.assertUnreachable)(r);else throw new Zl.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function oue(t,e){let r=e.map(n=>Hi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function Hi(t){if((0,Ke.isDisjunction)(t)){let e=Hi(t.left),r=Hi(t.right);return n=>e(n)||r(n)}else if((0,Ke.isConjunction)(t)){let e=Hi(t.left),r=Hi(t.right);return n=>e(n)&&r(n)}else if((0,Ke.isNegation)(t)){let e=Hi(t.value);return r=>!e(r)}else if((0,Ke.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Ke.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,Zl.assertUnreachable)(t)}function sue(t,e){if(e.elements.length===1)return To(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:To(t,i,!0)},o=Up(i);o&&(a.GATE=Hi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function uue(t,e){if(e.elements.length===1)return To(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:To(t,s,!0)},l=Up(s);l&&(u.GATE=Hi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let y=f.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let m=u.GATE;return m?c.GATE=()=>m(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=jL(t,Up(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function lue(t,e){let r=e.elements.map(n=>To(t,n));return n=>r.forEach(i=>i(n))}function Up(t){if((0,Ke.isGroup)(t))return t.guardCondition}function FL(t,e,r=e.terminal){if(r)if((0,Ke.isRuleCall)(r)&&(0,Ke.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,GL(t,r.rule.ref),e,i)}else if((0,Ke.isRuleCall)(r)&&(0,Ke.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=S_(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Ke.isKeyword)(r)){let n=t.consume++,i=S_(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,ML.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,LL.getTypeName)(e.type.ref));return FL(t,e,i)}}function cue(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function jL(t,e,r,n){let i=e&&Hi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,qL.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,qL.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,Zl.assertUnreachable)(n)}function GL(t,e){let r=fue(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function fue(t,e){if((0,Ke.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Ke.isParserRule)(n);)((0,Ke.isGroup)(n)||(0,Ke.isAlternatives)(n)||(0,Ke.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function S_(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var P_=d(Kp=>{"use strict";Object.defineProperty(Kp,"__esModule",{value:!0});Kp.createCompletionParser=void 0;var due=Gp(),pue=E_();function hue(t){let e=t.Grammar,r=t.parser.Lexer,n=new due.LangiumCompletionParser(t);return(0,pue.createParser)(e,n,r.definition),n.finalize(),n}Kp.createCompletionParser=hue});var w_=d(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.prepareLangiumParser=du.createLangiumParser=void 0;var mue=Gp(),yue=E_();function gue(t){let e=UL(t);return e.finalize(),e}du.createLangiumParser=gue;function UL(t){let e=t.Grammar,r=t.parser.Lexer,n=new mue.LangiumParser(t);return(0,yue.createParser)(e,n,r.definition)}du.prepareLangiumParser=UL});var x_=d(Bp=>{"use strict";Object.defineProperty(Bp,"__esModule",{value:!0});Bp.DefaultTokenBuilder=void 0;var vue=go(),N_=xe(),Tue=jt(),_ue=be(),Rue=vt(),Wp=za(),Aue=Ft(),k_=class{buildTokens(e,r){let n=(0,Aue.stream)((0,Rue.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,Wp.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(N_.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Tue.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,Wp.isWhitespaceRegExp)(r)?vue.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(N_.isParserRule).flatMap(i=>(0,_ue.streamAllContents)(i).filter(N_.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,Wp.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,Wp.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};Bp.DefaultTokenBuilder=k_});var D_=d(xt=>{"use strict";Object.defineProperty(xt,"__esModule",{value:!0});xt.convertBoolean=xt.convertNumber=xt.convertDate=xt.convertBigint=xt.convertInt=xt.convertID=xt.convertRegexLiteral=xt.convertString=xt.DefaultValueConverter=void 0;var HL=xe(),bue=jt(),Cue=vt(),O_=class{convert(e,r){let n=r.feature;if((0,HL.isCrossReference)(n)&&(n=(0,Cue.getCrossReferenceTerminal)(n)),(0,HL.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return VL(r);case"STRING":return KL(r);case"ID":return BL(r);case"REGEXLITERAL":return WL(r)}switch((i=(0,bue.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return XL(r);case"boolean":return JL(r);case"bigint":return zL(r);case"date":return YL(r);default:return r}}};xt.DefaultValueConverter=O_;function KL(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=Sue(i)}else e+=n}return e}xt.convertString=KL;function Sue(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function WL(t){return t.substring(1,t.length-1)}xt.convertRegexLiteral=WL;function BL(t){return t.charAt(0)==="^"?t.substring(1):t}xt.convertID=BL;function VL(t){return parseInt(t)}xt.convertInt=VL;function zL(t){return BigInt(t)}xt.convertBigint=zL;function YL(t){return new Date(t)}xt.convertDate=YL;function XL(t){return Number(t)}xt.convertNumber=XL;function JL(t){return t.toLowerCase()==="true"}xt.convertBoolean=JL});var q_=d(zp=>{"use strict";Object.defineProperty(zp,"__esModule",{value:!0});zp.DefaultLinker=void 0;var Eue=$e(),pu=er(),Vp=be(),Pue=Tr(),I_=fa(),$_=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Eue.CancellationToken.None){for(let n of(0,Vp.streamAst)(e.parseResult.value))await(0,Pue.interruptAndCheck)(r),(0,Vp.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=I_.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,pu.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,pu.isAstNode)(this._ref))return this._ref;if((0,pu.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,Vp.getDocument)(e).state<I_.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,pu.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,pu.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,pu.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,Vp.getDocument)(e.container);n.state<I_.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};zp.DefaultLinker=$_});var M_=d(Yp=>{"use strict";Object.defineProperty(Yp,"__esModule",{value:!0});Yp.DefaultJsonSerializer=void 0;var ec=er(),wue=be(),Nue=vt();function QL(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var L_=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){let n=r?.replacer,i=(o,s)=>this.replacer(o,s,r);return JSON.stringify(e,n?(o,s)=>n(o,s,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:a}={}){var o,s,u;if(!this.ignoreProperties.has(e))if((0,ec.isReference)(r)){let l=r.ref,c=n?r.$refText:void 0;return l?{$refText:c,$ref:"#"+(l&&this.astNodeLocator.getAstNodePath(l))}:{$refText:c,$error:(s=(o=r.error)===null||o===void 0?void 0:o.message)!==null&&s!==void 0?s:"Could not resolve reference"}}else{let l;if(a&&(0,ec.isAstNode)(r)&&(l=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&l?.$textRegion))try{l.$textRegion.documentURI=(0,wue.getDocument)(r).uri.toString()}catch{}return i&&!e&&(0,ec.isAstNode)(r)&&(l??(l=Object.assign({},r)),l.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),l??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(a=>!a.startsWith("$")).forEach(a=>{let o=(0,Nue.findNodesForProperty)(e.$cstNode,a).map(r);o.length!==0&&(i[a]=o)}),e}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];QL(c)?u[l]=this.reviveReference(e,s,r,c):(0,ec.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else QL(u)?e[s]=this.reviveReference(e,s,r,u):(0,ec.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};Yp.DefaultJsonSerializer=L_});var j_=d(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.DefaultServiceRegistry=void 0;var kue=yn(),F_=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=kue.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};Xp.DefaultServiceRegistry=F_});var U_=d(Jp=>{"use strict";Object.defineProperty(Jp,"__esModule",{value:!0});Jp.ValidationRegistry=void 0;var xue=gn(),Oue=Tr(),G_=class{constructor(e){this.validationChecks=new xue.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,Oue.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){if(e==="AstNode"){this.validationChecks.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e).concat(this.validationChecks.get("AstNode"))}};Jp.ValidationRegistry=G_});var B_=d(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.DefaultReferenceDescriptionProvider=hu.DefaultAstNodeDescriptionProvider=void 0;var Due=$e(),Iue=er(),Qp=be(),H_=Le(),$ue=Tr(),que=Ei(),K_=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=(0,Qp.getDocument)(e)){var i;r??(r=this.nameProvider.getName(e));let a=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${a} has no name.`);let o=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,H_.toDocumentSegment)(o),selectionSegment:(0,H_.toDocumentSegment)(e.$cstNode),type:e.$type,documentUri:n.uri,path:a}}};hu.DefaultAstNodeDescriptionProvider=K_;var W_=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Due.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,Qp.streamAst)(i))await(0,$ue.interruptAndCheck)(r),(0,Qp.streamReferences)(a).filter(o=>!(0,Iue.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,Qp.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,H_.toDocumentSegment)(n),local:(0,que.equalURI)(r.documentUri,i)}}};hu.DefaultReferenceDescriptionProvider=W_});var z_=d(Zp=>{"use strict";Object.defineProperty(Zp,"__esModule",{value:!0});Zp.DefaultAstNodeLocator=void 0;var V_=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Zp.DefaultAstNodeLocator=V_});var X_=d(eh=>{"use strict";Object.defineProperty(eh,"__esModule",{value:!0});eh.DefaultConfigurationProvider=void 0;var Lue=bt(),Y_=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(Lue.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};eh.DefaultConfigurationProvider=Y_});var Z_=d(rh=>{"use strict";Object.defineProperty(rh,"__esModule",{value:!0});rh.DefaultDocumentBuilder=void 0;var th=$e(),Mue=gn(),J_=Tr(),ci=fa(),Q_=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new Mue.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=th.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=th.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,J_.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),th.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,ci.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<ci.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,ci.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,ci.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,ci.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,ci.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,ci.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,ci.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,J_.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),th.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,J_.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=ci.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=ci.DocumentState.Validated}};rh.DefaultDocumentBuilder=Q_});var nR=d(nh=>{"use strict";Object.defineProperty(nh,"__esModule",{value:!0});nh.DefaultIndexManager=void 0;var ZL=$e(),Fue=be(),eR=Ft(),tR=Ei(),eM=fa(),rR=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,Fue.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,tR.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,eR.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,eR.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,eR.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=ZL.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=eM.DocumentState.IndexedContent}async updateReferences(e,r=ZL.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=eM.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,tR.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,tR.equalURI)(o.targetUri,n)):!1}};nh.DefaultIndexManager=rR});var oR=d(ih=>{"use strict";Object.defineProperty(ih,"__esModule",{value:!0});ih.DefaultWorkspaceManager=void 0;var jue=$e(),iR=yn(),Gue=Tr(),aR=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=jue.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,Gue.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return iR.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=iR.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=iR.Utils.extname(r.uri);return n.includes(a)}return!1}};ih.DefaultWorkspaceManager=aR});var cR=d(fi=>{"use strict";Object.defineProperty(fi,"__esModule",{value:!0});fi.isTokenTypeDictionary=fi.isIMultiModeLexerDefinition=fi.isTokenTypeArray=fi.DefaultLexer=void 0;var Uue=go(),sR=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=uR(r)?Object.values(r):r;this.chevrotainLexer=new Uue.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(uR(e))return e;let r=lR(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};fi.DefaultLexer=sR;function tM(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}fi.isTokenTypeArray=tM;function lR(t){return t&&"modes"in t&&"defaultMode"in t}fi.isIMultiModeLexerDefinition=lR;function uR(t){return!tM(t)&&!lR(t)}fi.isTokenTypeDictionary=uR});var hR=d(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isJSDoc=mu.parseJSDoc=void 0;var De=$e(),Hue=yn(),Kue=tf(),Wue=za();function Bue(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=De.Position.create(0,0));let a=iM(t),o=pR(n),s=Yue({lines:a,position:i,options:o});return ele({index:0,tokens:s,position:i})}mu.parseJSDoc=Bue;function Vue(t,e){let r=pR(e),n=iM(t);if(n.length===0)return!1;let i=n[0],a=n[n.length-1],o=r.start,s=r.end;return Boolean(o?.exec(i))&&Boolean(s?.exec(a))}mu.isJSDoc=Vue;function iM(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Kue.NEWLINE_REGEXP)}var rM=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,zue=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Yue(t){var e,r,n;let i=[],a=t.position.line,o=t.position.character;for(let s=0;s<t.lines.length;s++){let u=s===0,l=s===t.lines.length-1,c=t.lines[s],f=0;if(u&&t.options.start){let v=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);v&&(f=v.index+v[0].length)}else{let v=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);v&&(f=v.index+v[0].length)}if(l){let v=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);v&&(c=c.substring(0,v.index))}if(c=c.substring(0,Zue(c)),dR(c,0)>=c.length){if(i.length>0){let v=De.Position.create(a,o);i.push({type:"break",content:"",range:De.Range.create(v,v)})}}else{rM.lastIndex=f;let v=rM.exec(c);if(v){let y=v[0],A=v[1],P=De.Position.create(a,o+f),w=De.Position.create(a,o+f+y.length);i.push({type:"tag",content:A,range:De.Range.create(P,w)}),f+=y.length,f=dR(c,f)}if(f<c.length){let y=c.substring(f),A=Array.from(y.matchAll(zue));i.push(...Xue(A,y,a,o+f))}}a++,o=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Xue(t,e,r,n){let i=[];if(t.length===0){let a=De.Position.create(r,n),o=De.Position.create(r,n+e.length);i.push({type:"text",content:e,range:De.Range.create(a,o)})}else{let a=0;for(let s of t){let u=s.index,l=e.substring(a,u);l.length>0&&i.push({type:"text",content:e.substring(a,u),range:De.Range.create(De.Position.create(r,a+n),De.Position.create(r,u+n))});let c=l.length+1,f=s[1];if(i.push({type:"inline-tag",content:f,range:De.Range.create(De.Position.create(r,a+c+n),De.Position.create(r,a+c+f.length+n))}),c+=f.length,s.length===4){c+=s[2].length;let m=s[3];i.push({type:"text",content:m,range:De.Range.create(De.Position.create(r,a+c+n),De.Position.create(r,a+c+m.length+n))})}else i.push({type:"text",content:"",range:De.Range.create(De.Position.create(r,a+c+n),De.Position.create(r,a+c+n))});a=u+s[0].length}let o=e.substring(a);o.length>0&&i.push({type:"text",content:o,range:De.Range.create(De.Position.create(r,a+n),De.Position.create(r,a+n+o.length))})}return i}var Jue=/\S/,Que=/\s*$/;function dR(t,e){let r=t.substring(e).match(Jue);return r?e+r.index:t.length}function Zue(t){let e=t.match(Que);if(e&&typeof e.index=="number")return e.index}function ele(t){var e,r,n,i;let a=De.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new ah([],De.Range.create(a,a));let o=[];for(;t.index<t.tokens.length;){let l=tle(t,o[o.length-1]);l&&o.push(l)}let s=(r=(e=o[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:a,u=(i=(n=o[o.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:a;return new ah(o,De.Range.create(s,u))}function tle(t,e){let r=t.tokens[t.index];if(r.type==="tag")return oM(t,!1);if(r.type==="text"||r.type==="inline-tag")return aM(t);rle(r,e),t.index++}function rle(t,e){if(e){let r=new oh("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function aM(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(nle(t)),n=e,e=t.tokens[t.index];return new rc(i,De.Range.create(r.range.start,n.range.end))}function nle(t){return t.tokens[t.index].type==="inline-tag"?oM(t,!0):sM(t)}function oM(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let a=sM(t);return new tc(n,new rc([a],a.range),e,De.Range.create(r.range.start,a.range.end))}else{let a=aM(t);return new tc(n,a,e,De.Range.create(r.range.start,a.range.end))}else{let a=r.range;return new tc(n,new rc([],a),e,a)}}function sM(t){let e=t.tokens[t.index++];return new oh(e.content,e.range)}function pR(t){if(!t)return pR({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:fR(e,!0),end:fR(r,!1),line:fR(n,!0)}}function fR(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?(0,Wue.escapeRegExp)(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var ah=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=nM(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=nM(r)+i}return r.trim()}},tc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let a=ile(this.name,r,e??{});if(typeof a=="string")return a}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function ile(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let a=e.indexOf(" "),o=e;if(a>0){let u=dR(e,a);o=e.substring(u),e=e.substring(0,a)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(o=`\`${o}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,o))!==null&&i!==void 0?i:ale(e,o)}}function ale(t,e){try{return Hue.URI.parse(t,!0),`[${e}](${t})`}catch{return t}}var rc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],a=this.inlines[n+1];r+=i.toMarkdown(e),a&&a.range.start.line>i.range.start.line&&(r+=`
`)}return r}},oh=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function nM(t){return t.endsWith(`
`)?`
`:`

`}});var lM=d(sh=>{"use strict";Object.defineProperty(sh,"__esModule",{value:!0});sh.JSDocDocumentationProvider=void 0;var ole=er(),sle=be(),ule=Le(),uM=hR(),mR=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.grammarConfig=e.parser.GrammarConfig}getDocumentation(e){let r=(0,ule.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules);if((0,ole.isLeafCstNode)(r)&&(0,uM.isJSDoc)(r))return(0,uM.parseJSDoc)(r).toMarkdown({renderLink:(i,a)=>this.documentationLinkRenderer(e,i,a)})}documentationLinkRenderer(e,r,n){var i;let a=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(a&&a.nameSegment){let o=a.nameSegment.range.start.line+1,s=a.nameSegment.range.start.character+1,u=a.documentUri.with({fragment:`L${o},${s}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=(0,sle.getDocument)(e).precomputedScopes;if(!i)return;let a=e;do{let s=i.get(a).find(u=>u.name===r);if(s)return s;a=a.$container}while(a)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};sh.JSDocDocumentationProvider=mR});var yR=d(wa=>{"use strict";var lle=wa&&wa.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),cM=wa&&wa.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&lle(e,t,r)};Object.defineProperty(wa,"__esModule",{value:!0});cM(lM(),wa);cM(hR(),wa)});var od=d(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.createDefaultSharedModule=yu.createDefaultModule=void 0;var cle=$e(),fle=Qm(),dle=Tv(),ple=P_(),hle=Uf(),mle=jg(),yle=Ug(),gle=wf(),vle=Mg(),Tle=Wg(),_le=ev(),Rle=rv(),Ale=iv(),ble=w_(),Cle=x_(),Sle=D_(),Ele=q_(),Ple=Zo(),wle=Mf(),Nle=Rf(),kle=bf(),xle=M_(),Ole=j_(),Dle=Tr(),Ile=Ef(),$le=U_(),fM=B_(),qle=z_(),Lle=X_(),Mle=Z_(),dM=fa(),Fle=nR(),jle=oR(),Gle=cR(),Ule=yR();function Hle(t){return{documentation:{DocumentationProvider:e=>new Ule.JSDocDocumentationProvider(e)},parser:{GrammarConfig:e=>(0,dle.createGrammarConfig)(e),LangiumParser:e=>(0,ble.createLangiumParser)(e),CompletionParser:e=>(0,ple.createCompletionParser)(e),ValueConverter:()=>new Sle.DefaultValueConverter,TokenBuilder:()=>new Cle.DefaultTokenBuilder,Lexer:e=>new Gle.DefaultLexer(e)},lsp:{CompletionProvider:e=>new hle.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new yle.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new Tle.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new gle.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new Rle.DefaultReferencesProvider(e),DefinitionProvider:e=>new vle.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new mle.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new Ale.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new qle.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new fM.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new fM.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new Ele.DefaultLinker(e),NameProvider:()=>new Ple.DefaultNameProvider,ScopeProvider:e=>new kle.DefaultScopeProvider(e),ScopeComputation:e=>new Nle.DefaultScopeComputation(e),References:e=>new wle.DefaultReferences(e)},serializer:{JsonSerializer:e=>new xle.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new Ile.DefaultDocumentValidator(e),ValidationRegistry:e=>new $le.ValidationRegistry(e)},shared:()=>t.shared}}yu.createDefaultModule=Hle;function Kle(t){return{ServiceRegistry:()=>new Ole.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new _le.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new dM.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new dM.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Mle.DefaultDocumentBuilder(e),TextDocuments:()=>new cle.TextDocuments(fle.TextDocument),IndexManager:e=>new Fle.DefaultIndexManager(e),WorkspaceManager:e=>new jle.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Dle.MutexLock,ConfigurationProvider:e=>new Lle.DefaultConfigurationProvider(e)}}}yu.createDefaultSharedModule=Kle});var hM=d(pM=>{"use strict";Object.defineProperty(pM,"__esModule",{value:!0})});var gM=d(Na=>{"use strict";Object.defineProperty(Na,"__esModule",{value:!0});Na.joinTracedToNodeIf=Na.joinTracedToNode=Na.joinToNode=void 0;var gR=Ha();function mM(t,e=String,{filter:r,prefix:n,suffix:i,separator:a,appendNewLineIfNotEmpty:o}={}){return Ble(t,(s,u,l,c)=>{if(r&&!r(u,l,c))return s;let f=e(u,l,c);return(s??(s=new gR.CompositeGeneratorNode)).append(n&&n(u,l,c)).append(f).append(i&&i(u,l,c)).appendIf(!c&&f!==void 0,a).appendNewLineIfNotEmptyIf(!s.isEmpty()&&!!o)})}Na.joinToNode=mM;function yM(t,e){return(r,n=String,i)=>(0,gR.traceToNode)(t,e)(mM(r,t&&e?(a,o,s)=>(0,gR.traceToNode)(t,e,o)(n(a,o,s)):n,i))}Na.joinTracedToNode=yM;function Wle(t,e,r){return t?yM(typeof e=="function"?e():e,r):()=>{}}Na.joinTracedToNodeIf=Wle;function Ble(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var vM=d(yr=>{"use strict";var Vle=yr&&yr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),vR=yr&&yr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Vle(e,t,r)};Object.defineProperty(yr,"__esModule",{value:!0});yr.normalizeEOL=yr.expandToStringWithNL=yr.expandToString=void 0;vR(Ha(),yr);vR(gM(),yr);vR(py(),yr);var TR=tf();Object.defineProperty(yr,"expandToString",{enumerable:!0,get:function(){return TR.expandToString}});Object.defineProperty(yr,"expandToStringWithNL",{enumerable:!0,get:function(){return TR.expandToStringWithNL}});Object.defineProperty(yr,"normalizeEOL",{enumerable:!0,get:function(){return TR.normalizeEOL}})});var _M=d(TM=>{"use strict";Object.defineProperty(TM,"__esModule",{value:!0})});var RM=d(di=>{"use strict";var zle=di&&di.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),uh=di&&di.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&zle(e,t,r)};Object.defineProperty(di,"__esModule",{value:!0});uh(Yy(),di);uh(Tv(),di);uh(hv(),di);uh(_M(),di)});var bM=d(AM=>{"use strict";Object.defineProperty(AM,"__esModule",{value:!0})});var CM=d(Sr=>{"use strict";var Yle=Sr&&Sr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ka=Sr&&Sr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Yle(e,t,r)};Object.defineProperty(Sr,"__esModule",{value:!0});ka(P_(),Sr);ka(v_(),Sr);ka(w_(),Sr);ka(Gp(),Sr);ka(cR(),Sr);ka(bM(),Sr);ka(x_(),Sr);ka(D_(),Sr)});var SM=d(xn=>{"use strict";var Xle=xn&&xn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),nc=xn&&xn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Xle(e,t,r)};Object.defineProperty(xn,"__esModule",{value:!0});nc(q_(),xn);nc(Zo(),xn);nc(Mf(),xn);nc(Rf(),xn);nc(bf(),xn)});var EM=d(_o=>{"use strict";var Jle=_o&&_o.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Qle=_o&&_o.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Jle(e,t,r)};Object.defineProperty(_o,"__esModule",{value:!0});Qle(M_(),_o)});var PM=d(gr=>{"use strict";var Zle=gr&&gr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ki=gr&&gr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Zle(e,t,r)};Object.defineProperty(gr,"__esModule",{value:!0});Ki(be(),gr);Ki(gn(),gr);Ki(Le(),gr);Ki(C_(),gr);Ki(vt(),gr);Ki(Tr(),gr);Ki(za(),gr);Ki(Ft(),gr);Ki(Ei(),gr)});var NM=d(xa=>{"use strict";var ece=xa&&xa.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),wM=xa&&xa.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ece(e,t,r)};Object.defineProperty(xa,"__esModule",{value:!0});wM(Ef(),xa);wM(U_(),xa)});var kM=d(Er=>{"use strict";var tce=Er&&Er.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Oa=Er&&Er.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&tce(e,t,r)};Object.defineProperty(Er,"__esModule",{value:!0});Oa(B_(),Er);Oa(z_(),Er);Oa(X_(),Er);Oa(Z_(),Er);Oa(fa(),Er);Oa(mv(),Er);Oa(nR(),Er);Oa(oR(),Er)});var Da=d(We=>{"use strict";var xM=We&&We.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),rce=We&&We.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),vr=We&&We.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&xM(e,t,r)},nce=We&&We.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&xM(e,t,r);return rce(e,t),e};Object.defineProperty(We,"__esModule",{value:!0});We.GrammarAST=void 0;vr(od(),We);vr(Uu(),We);vr(j_(),We);vr(hM(),We);vr(er(),We);vr(yR(),We);vr(vM(),We);vr(RM(),We);vr(ov(),We);vr(CM(),We);vr(SM(),We);vr(EM(),We);vr(PM(),We);vr(NM(),We);vr(kM(),We);var ice=nce(xe());We.GrammarAST=ice});var DM=d(($_e,OM)=>{"use strict";OM.exports=$e()});var _R=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.ExpressionStatement=p.isExplicitCastExpression=p.ExplicitCastExpression=p.isExclusiveOrExpression=p.ExclusiveOrExpression=p.isEqualityExpression=p.EqualityExpression=p.isConstantExpression=p.ConstantExpression=p.isConditionalExpression=p.ConditionalExpression=p.isCompoundStatement=p.CompoundStatement=p.isCompositionExpression=p.CompositionExpression=p.isAssignmentStatement=p.AssignmentStatement=p.isAssignable=p.Assignable=p.isArgumentExpressionList=p.ArgumentExpressionList=p.isAndExpression=p.AndExpression=p.isAdditiveExpression=p.AdditiveExpression=p.isVeriFastOperator=p.isVeriFastFunction=p.isUnaryOperator=p.isTypeRef=p.TypeRef=p.isToplevelDeclaration=p.ToplevelDeclaration=p.isStatement=p.Statement=p.isSelectionStatement=p.SelectionStatement=p.isPredefinedFunctionName=p.isPostfixExpression=p.PostfixExpression=p.isLabeledOrCaseStatement=p.LabeledOrCaseStatement=p.isJumpStatement=p.JumpStatement=p.isIterationStatement=p.IterationStatement=p.isExpression=p.Expression=p.isCastExpression=p.CastExpression=p.isAssignmentOperator=void 0;p.RelationalExpression=p.isPredefinedTypeRef=p.PredefinedTypeRef=p.isPointer=p.Pointer=p.isParameterTypeList=p.ParameterTypeList=p.isParameterList=p.ParameterList=p.isMyWhile=p.MyWhile=p.isMySwitch=p.MySwitch=p.isMyReturn=p.MyReturn=p.isMyIf=p.MyIf=p.isMyGoto=p.MyGoto=p.isMyFor=p.MyFor=p.isMyDo=p.MyDo=p.isMyDefault=p.MyDefault=p.isMyContinue=p.MyContinue=p.isMyCase=p.MyCase=p.isMyBreak=p.MyBreak=p.isMultiplicativeExpression=p.MultiplicativeExpression=p.isModel=p.Model=p.isLogicalOrExpression=p.LogicalOrExpression=p.isLogicalAndExpression=p.LogicalAndExpression=p.isLabeled=p.Labeled=p.isInitExpression=p.InitExpression=p.isInclusiveOrExpression=p.InclusiveOrExpression=p.isFunctionInvocation=p.FunctionInvocation=p.isFunctionDeclaration=p.FunctionDeclaration=p.isExpressionStatement=void 0;p.reflection=p.CParser3AstReflection=p.isVeriFastStatement=p.VeriFastStatement=p.isskip=p.skip=p.isIncDecrement=p.IncDecrement=p.isComponentDotAccess=p.ComponentDotAccess=p.isComponentArrowAccess=p.ComponentArrowAccess=p.isArrayAccess=p.ArrayAccess=p.isVeriFastFunctionRef=p.VeriFastFunctionRef=p.isVeriFastExpression=p.VeriFastExpression=p.isVariableReference=p.VariableReference=p.isVariableDeclarationList=p.VariableDeclarationList=p.isVariableDeclaration=p.VariableDeclaration=p.isUnaryExpression=p.UnaryExpression=p.isStructTypeRef=p.StructTypeRef=p.isStructDeclaration=p.StructDeclaration=p.isStructComponentDeclarationList=p.StructComponentDeclarationList=p.isStructComponentDeclaration=p.StructComponentDeclaration=p.isStatementList=p.StatementList=p.isShiftExpression=p.ShiftExpression=p.isRelationalExpression=void 0;var ace=Da();function oce(t){return t==="="||t==="*="||t==="/="||t==="%="||t==="+="||t==="-="||t==="<<="||t===">>="||t==="&="||t==="^="||t==="|="}p.isAssignmentOperator=oce;p.CastExpression="CastExpression";function sce(t){return p.reflection.isInstance(t,p.CastExpression)}p.isCastExpression=sce;p.Expression="Expression";function uce(t){return p.reflection.isInstance(t,p.Expression)}p.isExpression=uce;p.IterationStatement="IterationStatement";function lce(t){return p.reflection.isInstance(t,p.IterationStatement)}p.isIterationStatement=lce;p.JumpStatement="JumpStatement";function cce(t){return p.reflection.isInstance(t,p.JumpStatement)}p.isJumpStatement=cce;p.LabeledOrCaseStatement="LabeledOrCaseStatement";function fce(t){return p.reflection.isInstance(t,p.LabeledOrCaseStatement)}p.isLabeledOrCaseStatement=fce;p.PostfixExpression="PostfixExpression";function dce(t){return p.reflection.isInstance(t,p.PostfixExpression)}p.isPostfixExpression=dce;function pce(t){return t==="malloc"||t==="abort"||t==="free"||t==="printf"||t==="assert"||t==="scanf"||t==="puts"}p.isPredefinedFunctionName=pce;p.SelectionStatement="SelectionStatement";function hce(t){return p.reflection.isInstance(t,p.SelectionStatement)}p.isSelectionStatement=hce;p.Statement="Statement";function mce(t){return p.reflection.isInstance(t,p.Statement)}p.isStatement=mce;p.ToplevelDeclaration="ToplevelDeclaration";function yce(t){return p.reflection.isInstance(t,p.ToplevelDeclaration)}p.isToplevelDeclaration=yce;p.TypeRef="TypeRef";function gce(t){return p.reflection.isInstance(t,p.TypeRef)}p.isTypeRef=gce;function vce(t){return t==="&"||t==="+"||t==="-"||t==="~"||t==="!"}p.isUnaryOperator=vce;function Tce(t){return t==="free"||t==="malloc_block_stack"||t==="malloc_block_node"||t==="stack_head"||t==="stack_cnt"}p.isVeriFastFunction=Tce;function _ce(t){return t==="<="||t==="=="||t===">="||t===">"||t==="<"||t==="+"||t==="-"}p.isVeriFastOperator=_ce;p.AdditiveExpression="AdditiveExpression";function Rce(t){return p.reflection.isInstance(t,p.AdditiveExpression)}p.isAdditiveExpression=Rce;p.AndExpression="AndExpression";function Ace(t){return p.reflection.isInstance(t,p.AndExpression)}p.isAndExpression=Ace;p.ArgumentExpressionList="ArgumentExpressionList";function bce(t){return p.reflection.isInstance(t,p.ArgumentExpressionList)}p.isArgumentExpressionList=bce;p.Assignable="Assignable";function Cce(t){return p.reflection.isInstance(t,p.Assignable)}p.isAssignable=Cce;p.AssignmentStatement="AssignmentStatement";function Sce(t){return p.reflection.isInstance(t,p.AssignmentStatement)}p.isAssignmentStatement=Sce;p.CompositionExpression="CompositionExpression";function Ece(t){return p.reflection.isInstance(t,p.CompositionExpression)}p.isCompositionExpression=Ece;p.CompoundStatement="CompoundStatement";function Pce(t){return p.reflection.isInstance(t,p.CompoundStatement)}p.isCompoundStatement=Pce;p.ConditionalExpression="ConditionalExpression";function wce(t){return p.reflection.isInstance(t,p.ConditionalExpression)}p.isConditionalExpression=wce;p.ConstantExpression="ConstantExpression";function Nce(t){return p.reflection.isInstance(t,p.ConstantExpression)}p.isConstantExpression=Nce;p.EqualityExpression="EqualityExpression";function kce(t){return p.reflection.isInstance(t,p.EqualityExpression)}p.isEqualityExpression=kce;p.ExclusiveOrExpression="ExclusiveOrExpression";function xce(t){return p.reflection.isInstance(t,p.ExclusiveOrExpression)}p.isExclusiveOrExpression=xce;p.ExplicitCastExpression="ExplicitCastExpression";function Oce(t){return p.reflection.isInstance(t,p.ExplicitCastExpression)}p.isExplicitCastExpression=Oce;p.ExpressionStatement="ExpressionStatement";function Dce(t){return p.reflection.isInstance(t,p.ExpressionStatement)}p.isExpressionStatement=Dce;p.FunctionDeclaration="FunctionDeclaration";function Ice(t){return p.reflection.isInstance(t,p.FunctionDeclaration)}p.isFunctionDeclaration=Ice;p.FunctionInvocation="FunctionInvocation";function $ce(t){return p.reflection.isInstance(t,p.FunctionInvocation)}p.isFunctionInvocation=$ce;p.InclusiveOrExpression="InclusiveOrExpression";function qce(t){return p.reflection.isInstance(t,p.InclusiveOrExpression)}p.isInclusiveOrExpression=qce;p.InitExpression="InitExpression";function Lce(t){return p.reflection.isInstance(t,p.InitExpression)}p.isInitExpression=Lce;p.Labeled="Labeled";function Mce(t){return p.reflection.isInstance(t,p.Labeled)}p.isLabeled=Mce;p.LogicalAndExpression="LogicalAndExpression";function Fce(t){return p.reflection.isInstance(t,p.LogicalAndExpression)}p.isLogicalAndExpression=Fce;p.LogicalOrExpression="LogicalOrExpression";function jce(t){return p.reflection.isInstance(t,p.LogicalOrExpression)}p.isLogicalOrExpression=jce;p.Model="Model";function Gce(t){return p.reflection.isInstance(t,p.Model)}p.isModel=Gce;p.MultiplicativeExpression="MultiplicativeExpression";function Uce(t){return p.reflection.isInstance(t,p.MultiplicativeExpression)}p.isMultiplicativeExpression=Uce;p.MyBreak="MyBreak";function Hce(t){return p.reflection.isInstance(t,p.MyBreak)}p.isMyBreak=Hce;p.MyCase="MyCase";function Kce(t){return p.reflection.isInstance(t,p.MyCase)}p.isMyCase=Kce;p.MyContinue="MyContinue";function Wce(t){return p.reflection.isInstance(t,p.MyContinue)}p.isMyContinue=Wce;p.MyDefault="MyDefault";function Bce(t){return p.reflection.isInstance(t,p.MyDefault)}p.isMyDefault=Bce;p.MyDo="MyDo";function Vce(t){return p.reflection.isInstance(t,p.MyDo)}p.isMyDo=Vce;p.MyFor="MyFor";function zce(t){return p.reflection.isInstance(t,p.MyFor)}p.isMyFor=zce;p.MyGoto="MyGoto";function Yce(t){return p.reflection.isInstance(t,p.MyGoto)}p.isMyGoto=Yce;p.MyIf="MyIf";function Xce(t){return p.reflection.isInstance(t,p.MyIf)}p.isMyIf=Xce;p.MyReturn="MyReturn";function Jce(t){return p.reflection.isInstance(t,p.MyReturn)}p.isMyReturn=Jce;p.MySwitch="MySwitch";function Qce(t){return p.reflection.isInstance(t,p.MySwitch)}p.isMySwitch=Qce;p.MyWhile="MyWhile";function Zce(t){return p.reflection.isInstance(t,p.MyWhile)}p.isMyWhile=Zce;p.ParameterList="ParameterList";function efe(t){return p.reflection.isInstance(t,p.ParameterList)}p.isParameterList=efe;p.ParameterTypeList="ParameterTypeList";function tfe(t){return p.reflection.isInstance(t,p.ParameterTypeList)}p.isParameterTypeList=tfe;p.Pointer="Pointer";function rfe(t){return p.reflection.isInstance(t,p.Pointer)}p.isPointer=rfe;p.PredefinedTypeRef="PredefinedTypeRef";function nfe(t){return p.reflection.isInstance(t,p.PredefinedTypeRef)}p.isPredefinedTypeRef=nfe;p.RelationalExpression="RelationalExpression";function ife(t){return p.reflection.isInstance(t,p.RelationalExpression)}p.isRelationalExpression=ife;p.ShiftExpression="ShiftExpression";function afe(t){return p.reflection.isInstance(t,p.ShiftExpression)}p.isShiftExpression=afe;p.StatementList="StatementList";function ofe(t){return p.reflection.isInstance(t,p.StatementList)}p.isStatementList=ofe;p.StructComponentDeclaration="StructComponentDeclaration";function sfe(t){return p.reflection.isInstance(t,p.StructComponentDeclaration)}p.isStructComponentDeclaration=sfe;p.StructComponentDeclarationList="StructComponentDeclarationList";function ufe(t){return p.reflection.isInstance(t,p.StructComponentDeclarationList)}p.isStructComponentDeclarationList=ufe;p.StructDeclaration="StructDeclaration";function lfe(t){return p.reflection.isInstance(t,p.StructDeclaration)}p.isStructDeclaration=lfe;p.StructTypeRef="StructTypeRef";function cfe(t){return p.reflection.isInstance(t,p.StructTypeRef)}p.isStructTypeRef=cfe;p.UnaryExpression="UnaryExpression";function ffe(t){return p.reflection.isInstance(t,p.UnaryExpression)}p.isUnaryExpression=ffe;p.VariableDeclaration="VariableDeclaration";function dfe(t){return p.reflection.isInstance(t,p.VariableDeclaration)}p.isVariableDeclaration=dfe;p.VariableDeclarationList="VariableDeclarationList";function pfe(t){return p.reflection.isInstance(t,p.VariableDeclarationList)}p.isVariableDeclarationList=pfe;p.VariableReference="VariableReference";function hfe(t){return p.reflection.isInstance(t,p.VariableReference)}p.isVariableReference=hfe;p.VeriFastExpression="VeriFastExpression";function mfe(t){return p.reflection.isInstance(t,p.VeriFastExpression)}p.isVeriFastExpression=mfe;p.VeriFastFunctionRef="VeriFastFunctionRef";function yfe(t){return p.reflection.isInstance(t,p.VeriFastFunctionRef)}p.isVeriFastFunctionRef=yfe;p.ArrayAccess="ArrayAccess";function gfe(t){return p.reflection.isInstance(t,p.ArrayAccess)}p.isArrayAccess=gfe;p.ComponentArrowAccess="ComponentArrowAccess";function vfe(t){return p.reflection.isInstance(t,p.ComponentArrowAccess)}p.isComponentArrowAccess=vfe;p.ComponentDotAccess="ComponentDotAccess";function Tfe(t){return p.reflection.isInstance(t,p.ComponentDotAccess)}p.isComponentDotAccess=Tfe;p.IncDecrement="IncDecrement";function _fe(t){return p.reflection.isInstance(t,p.IncDecrement)}p.isIncDecrement=_fe;p.skip="skip";function Rfe(t){return p.reflection.isInstance(t,p.skip)}p.isskip=Rfe;p.VeriFastStatement="VeriFastStatement";function Afe(t){return p.reflection.isInstance(t,p.VeriFastStatement)}p.isVeriFastStatement=Afe;var lh=class extends ace.AbstractAstReflection{getAllTypes(){return["AdditiveExpression","AndExpression","ArgumentExpressionList","ArrayAccess","Assignable","AssignmentStatement","CastExpression","ComponentArrowAccess","ComponentDotAccess","CompositionExpression","CompoundStatement","ConditionalExpression","ConstantExpression","EqualityExpression","ExclusiveOrExpression","ExplicitCastExpression","Expression","ExpressionStatement","FunctionDeclaration","FunctionInvocation","IncDecrement","InclusiveOrExpression","InitExpression","IterationStatement","JumpStatement","Labeled","LabeledOrCaseStatement","LogicalAndExpression","LogicalOrExpression","Model","MultiplicativeExpression","MyBreak","MyCase","MyContinue","MyDefault","MyDo","MyFor","MyGoto","MyIf","MyReturn","MySwitch","MyWhile","ParameterList","ParameterTypeList","Pointer","PostfixExpression","PredefinedTypeRef","RelationalExpression","SelectionStatement","ShiftExpression","Statement","StatementList","StructComponentDeclaration","StructComponentDeclarationList","StructDeclaration","StructTypeRef","ToplevelDeclaration","TypeRef","UnaryExpression","VariableDeclaration","VariableDeclarationList","VariableReference","VeriFastExpression","VeriFastFunctionRef","VeriFastStatement","skip"]}computeIsSubtype(e,r){switch(e){case p.ArrayAccess:case p.ComponentArrowAccess:case p.ComponentDotAccess:case p.IncDecrement:return this.isSubtype(p.Assignable,r);case p.Assignable:case p.CompositionExpression:case p.ConstantExpression:case p.FunctionInvocation:return this.isSubtype(p.PostfixExpression,r);case p.AssignmentStatement:case p.CompoundStatement:case p.ExpressionStatement:case p.IterationStatement:case p.JumpStatement:case p.LabeledOrCaseStatement:case p.SelectionStatement:return this.isSubtype(p.Statement,r);case p.ConditionalExpression:return this.isSubtype(p.Expression,r);case p.ExplicitCastExpression:case p.UnaryExpression:return this.isSubtype(p.CastExpression,r);case p.FunctionDeclaration:case p.StructDeclaration:return this.isSubtype(p.ToplevelDeclaration,r);case p.Labeled:case p.MyCase:case p.MyDefault:return this.isSubtype(p.LabeledOrCaseStatement,r);case p.MyBreak:case p.MyContinue:case p.MyGoto:case p.MyReturn:return this.isSubtype(p.JumpStatement,r);case p.MyDo:case p.MyFor:case p.MyWhile:return this.isSubtype(p.IterationStatement,r);case p.MyIf:case p.MySwitch:return this.isSubtype(p.SelectionStatement,r);case p.PredefinedTypeRef:case p.StructTypeRef:return this.isSubtype(p.TypeRef,r);case p.skip:return this.isSubtype(p.ExpressionStatement,r);case p.VeriFastStatement:return this.isSubtype(p.VeriFastExpression,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"ComponentArrowAccess:compArrow":case"ComponentDotAccess:compDot":return p.StructComponentDeclaration;case"FunctionInvocation:ref":return p.FunctionDeclaration;case"MyGoto:target":return p.Labeled;case"StructTypeRef:structRef":return p.StructDeclaration;case"VariableReference:ref":return p.VariableDeclaration;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"AdditiveExpression":return{name:"AdditiveExpression",mandatory:[{name:"exp",type:"array"},{name:"opl",type:"array"}]};case"AndExpression":return{name:"AndExpression",mandatory:[{name:"expl",type:"array"}]};case"ArgumentExpressionList":return{name:"ArgumentExpressionList",mandatory:[{name:"aexlist",type:"array"},{name:"aexplist",type:"array"}]};case"CompoundStatement":return{name:"CompoundStatement",mandatory:[{name:"varDeclL",type:"array"}]};case"EqualityExpression":return{name:"EqualityExpression",mandatory:[{name:"expl",type:"array"},{name:"opl",type:"array"}]};case"ExclusiveOrExpression":return{name:"ExclusiveOrExpression",mandatory:[{name:"expl",type:"array"}]};case"InclusiveOrExpression":return{name:"InclusiveOrExpression",mandatory:[{name:"expl",type:"array"}]};case"LogicalAndExpression":return{name:"LogicalAndExpression",mandatory:[{name:"expl",type:"array"}]};case"LogicalOrExpression":return{name:"LogicalOrExpression",mandatory:[{name:"expl",type:"array"}]};case"Model":return{name:"Model",mandatory:[{name:"tdecl",type:"array"}]};case"MultiplicativeExpression":return{name:"MultiplicativeExpression",mandatory:[{name:"exp",type:"array"},{name:"opl",type:"array"}]};case"ParameterList":return{name:"ParameterList",mandatory:[{name:"pdlist",type:"array"}]};case"RelationalExpression":return{name:"RelationalExpression",mandatory:[{name:"expl",type:"array"},{name:"opl",type:"array"}]};case"ShiftExpression":return{name:"ShiftExpression",mandatory:[{name:"expl",type:"array"},{name:"opl",type:"array"}]};case"StatementList":return{name:"StatementList",mandatory:[{name:"slist",type:"array"}]};case"StructComponentDeclarationList":return{name:"StructComponentDeclarationList",mandatory:[{name:"list",type:"array"}]};case"VariableDeclaration":return{name:"VariableDeclaration",mandatory:[{name:"isArray",type:"boolean"}]};case"VariableDeclarationList":return{name:"VariableDeclarationList",mandatory:[{name:"vlist",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.CParser3AstReflection=lh;p.reflection=new lh});var IM=d(fh=>{"use strict";Object.defineProperty(fh,"__esModule",{value:!0});fh.CParser3Grammar=void 0;var bfe=Da(),ch,Cfe=()=>ch!=null?ch:ch=(0,bfe.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "CParser3",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Model",
      "entry": true,
      "definition": {
        "$type": "Assignment",
        "feature": "tdecl",
        "operator": "+=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@1"
          },
          "arguments": []
        },
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ToplevelDeclaration",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StructDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "struct"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "sdl",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StructComponentDeclarationList",
      "definition": {
        "$type": "Assignment",
        "feature": "list",
        "operator": "+=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@4"
          },
          "arguments": []
        },
        "cardinality": "+"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StructComponentDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "tr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "p",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeRef",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StructTypeRef",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "struct"
          },
          {
            "$type": "Assignment",
            "feature": "structRef",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@2"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@57"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredefinedTypeRef",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "bool"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "void"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "char"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "short"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "int"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "long"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "float"
            }
          },
          {
            "$type": "Assignment",
            "feature": "v",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "double"
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vs",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "signed"
                }
              },
              {
                "$type": "Assignment",
                "feature": "v",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "short"
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vs",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "signed"
                }
              },
              {
                "$type": "Assignment",
                "feature": "v",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "int"
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vs",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "signed"
                }
              },
              {
                "$type": "Assignment",
                "feature": "v",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "long"
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vs",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "unsigned"
                }
              },
              {
                "$type": "Assignment",
                "feature": "v",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "short"
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vs",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "unsigned"
                }
              },
              {
                "$type": "Assignment",
                "feature": "v",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "int"
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vs",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "unsigned"
                }
              },
              {
                "$type": "Assignment",
                "feature": "v",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "long"
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Pointer",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "*"
              },
              {
                "$type": "Assignment",
                "feature": "p",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "returnType",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "p",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "ptl",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@10"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@60"
                        },
                        "arguments": []
                      },
                      {
                        "$type": "Assignment",
                        "feature": "ve",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@51"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": "&*&"
                          },
                          {
                            "$type": "Assignment",
                            "feature": "ve",
                            "operator": "=",
                            "terminal": {
                              "$type": "RuleCall",
                              "rule": {
                                "$ref": "#/rules@51"
                              },
                              "arguments": []
                            }
                          }
                        ],
                        "cardinality": "*"
                      },
                      {
                        "$type": "Keyword",
                        "value": ";"
                      }
                    ]
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@61"
                        },
                        "arguments": []
                      },
                      {
                        "$type": "Assignment",
                        "feature": "ve",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@51"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": "&*&"
                          },
                          {
                            "$type": "Assignment",
                            "feature": "ve",
                            "operator": "=",
                            "terminal": {
                              "$type": "RuleCall",
                              "rule": {
                                "$ref": "#/rules@51"
                              },
                              "arguments": []
                            }
                          }
                        ],
                        "cardinality": "*"
                      },
                      {
                        "$type": "Keyword",
                        "value": ";"
                      },
                      {
                        "$type": "Keyword",
                        "value": "@*/"
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@62"
                        },
                        "arguments": []
                      },
                      {
                        "$type": "Assignment",
                        "feature": "ve",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@51"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": "&*&"
                          },
                          {
                            "$type": "Assignment",
                            "feature": "ve",
                            "operator": "=",
                            "terminal": {
                              "$type": "RuleCall",
                              "rule": {
                                "$ref": "#/rules@51"
                              },
                              "arguments": []
                            }
                          }
                        ],
                        "cardinality": "*"
                      },
                      {
                        "$type": "Keyword",
                        "value": ";"
                      }
                    ]
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@63"
                        },
                        "arguments": []
                      },
                      {
                        "$type": "Assignment",
                        "feature": "ve",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@51"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": "&*&"
                          },
                          {
                            "$type": "Assignment",
                            "feature": "ve",
                            "operator": "=",
                            "terminal": {
                              "$type": "RuleCall",
                              "rule": {
                                "$ref": "#/rules@51"
                              },
                              "arguments": []
                            }
                          }
                        ],
                        "cardinality": "*"
                      },
                      {
                        "$type": "Keyword",
                        "value": ";"
                      },
                      {
                        "$type": "Keyword",
                        "value": "@*/"
                      }
                    ]
                  }
                ]
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "cs",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterTypeList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "plist",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@11"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Keyword",
                "value": "..."
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "pdlist",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "pdlist",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@12"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterDeclaration",
      "inferredType": {
        "$type": "InferredType",
        "name": "VariableDeclaration"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "p",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isArray",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "["
                }
              },
              {
                "$type": "Keyword",
                "value": "]"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableDeclarationList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "vlist",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@14"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "vlist",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "p",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isArray",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "["
                }
              },
              {
                "$type": "Keyword",
                "value": "]"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "initExp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@15"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InitExpression",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "ael",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@50"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "exp",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Statement",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CompoundStatement",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "varDeclL",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@13"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@18"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StatementList",
      "definition": {
        "$type": "Assignment",
        "feature": "slist",
        "operator": "+=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@16"
          },
          "arguments": []
        },
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LabeledOrCaseStatement",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyCase"
                }
              },
              {
                "$type": "Keyword",
                "value": "case"
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@45"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Labeled"
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@57"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyDefault"
                }
              },
              {
                "$type": "Keyword",
                "value": "default"
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "JumpStatement",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyGoto"
                }
              },
              {
                "$type": "Keyword",
                "value": "goto"
              },
              {
                "$type": "Assignment",
                "feature": "target",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@19/definition/elements@1/elements@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@57"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyContinue"
                }
              },
              {
                "$type": "Keyword",
                "value": "continue"
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyBreak"
                }
              },
              {
                "$type": "Keyword",
                "value": "break"
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyReturn"
                }
              },
              {
                "$type": "Keyword",
                "value": "return"
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SelectionStatement",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyIf"
                }
              },
              {
                "$type": "Keyword",
                "value": "if"
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ")"
              },
              {
                "$type": "Assignment",
                "feature": "ts",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "else"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "es",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@16"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "?"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MySwitch"
                }
              },
              {
                "$type": "Keyword",
                "value": "switch"
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ")"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignmentStatement",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "lv",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@43"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "op",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "aexp",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignmentOperator",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Keyword",
            "value": "*="
          },
          {
            "$type": "Keyword",
            "value": "/="
          },
          {
            "$type": "Keyword",
            "value": "%="
          },
          {
            "$type": "Keyword",
            "value": "+="
          },
          {
            "$type": "Keyword",
            "value": "-="
          },
          {
            "$type": "Keyword",
            "value": "<<="
          },
          {
            "$type": "Keyword",
            "value": ">>="
          },
          {
            "$type": "Keyword",
            "value": "&="
          },
          {
            "$type": "Keyword",
            "value": "^="
          },
          {
            "$type": "Keyword",
            "value": "|="
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IterationStatement",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyWhile"
                }
              },
              {
                "$type": "Keyword",
                "value": "while"
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ")"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyDo"
                }
              },
              {
                "$type": "Keyword",
                "value": "do"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "while"
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ")"
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "MyFor"
                }
              },
              {
                "$type": "Keyword",
                "value": "for"
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "es1",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@25"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "ass",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@22"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "varDeclL",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@13"
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "es2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              },
              {
                "$type": "Assignment",
                "feature": "s",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@16"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExpressionStatement",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "skip"
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@27"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConditionalExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "loe",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@28"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "?"
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "cexp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LogicalOrExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "||"
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@29"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LogicalAndExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "&&"
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InclusiveOrExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@31"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExclusiveOrExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "^"
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@32"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AndExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@33"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "&"
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@33"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EqualityExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "opl",
                "operator": "+=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "=="
                    },
                    {
                      "$type": "Keyword",
                      "value": "!="
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@34"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RelationalExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "opl",
                "operator": "+=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "<"
                    },
                    {
                      "$type": "Keyword",
                      "value": ">"
                    },
                    {
                      "$type": "Keyword",
                      "value": "<="
                    },
                    {
                      "$type": "Keyword",
                      "value": ">="
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@35"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ShiftExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expl",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "opl",
                "operator": "+=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "<<"
                    },
                    {
                      "$type": "Keyword",
                      "value": ">>"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expl",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@36"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AdditiveExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "exp",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@37"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "opl",
                "operator": "+=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@37"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MultiplicativeExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "exp",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "opl",
                "operator": "+=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    },
                    {
                      "$type": "Keyword",
                      "value": "%"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "exp",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@38"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CastExpression",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExplicitCastExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "tr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "cexp",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnaryExpression",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "pexp",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@42"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "++"
              },
              {
                "$type": "Assignment",
                "feature": "uexp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "--"
              },
              {
                "$type": "Assignment",
                "feature": "uexp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@41"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "cexp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@38"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "sizeof"
              },
              {
                "$type": "Assignment",
                "feature": "uexp",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "sizeof"
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "tr",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@5"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnaryOperator",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "&"
          },
          {
            "$type": "Keyword",
            "value": "+"
          },
          {
            "$type": "Keyword",
            "value": "-"
          },
          {
            "$type": "Keyword",
            "value": "~"
          },
          {
            "$type": "Keyword",
            "value": "!"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PostfixExpression",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignable",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "isPointer",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "*"
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "isAddress",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "&"
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "ref",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@44"
              },
              "arguments": []
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Action",
                    "inferredType": {
                      "$type": "InferredType",
                      "name": "ArrayAccess"
                    },
                    "feature": "receiver",
                    "operator": "="
                  },
                  {
                    "$type": "Keyword",
                    "value": "["
                  },
                  {
                    "$type": "Alternatives",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "indexExpC",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@46"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Assignment",
                        "feature": "indexExpV",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@44"
                          },
                          "arguments": []
                        }
                      }
                    ]
                  },
                  {
                    "$type": "Keyword",
                    "value": "]"
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Action",
                    "inferredType": {
                      "$type": "InferredType",
                      "name": "ComponentDotAccess"
                    },
                    "feature": "receiver",
                    "operator": "="
                  },
                  {
                    "$type": "Keyword",
                    "value": "."
                  },
                  {
                    "$type": "Assignment",
                    "feature": "compDot",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@4"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@57"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Action",
                    "inferredType": {
                      "$type": "InferredType",
                      "name": "ComponentArrowAccess"
                    },
                    "feature": "receiver",
                    "operator": "="
                  },
                  {
                    "$type": "Keyword",
                    "value": "->"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "compArrow",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@4"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@57"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Action",
                    "inferredType": {
                      "$type": "InferredType",
                      "name": "IncDecrement"
                    },
                    "feature": "receiver",
                    "operator": "="
                  },
                  {
                    "$type": "Assignment",
                    "feature": "op",
                    "operator": "=",
                    "terminal": {
                      "$type": "Alternatives",
                      "elements": [
                        {
                          "$type": "Keyword",
                          "value": "++"
                        },
                        {
                          "$type": "Keyword",
                          "value": "--"
                        }
                      ]
                    }
                  }
                ]
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableReference",
      "definition": {
        "$type": "Assignment",
        "feature": "ref",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/rules@12/inferredType"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstantExpression",
      "definition": {
        "$type": "Assignment",
        "feature": "c",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@46"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Constant",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@58"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CompositionExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "exp",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionInvocation",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "predn",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "ref",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@9"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@57"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "ael",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredefinedFunctionName",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "malloc"
          },
          {
            "$type": "Keyword",
            "value": "abort"
          },
          {
            "$type": "Keyword",
            "value": "free"
          },
          {
            "$type": "Keyword",
            "value": "printf"
          },
          {
            "$type": "Keyword",
            "value": "assert"
          },
          {
            "$type": "Keyword",
            "value": "scanf"
          },
          {
            "$type": "Keyword",
            "value": "puts"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArgumentExpressionList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "aexplist",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "aexlist",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VeriFastExpression",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "true"
              },
              {
                "$type": "Keyword",
                "value": "false"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "vffuncref",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VeriFastFunctionRef",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "vffunc",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@53"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@57"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VeriFastFunction",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "free"
          },
          {
            "$type": "Keyword",
            "value": "malloc_block_stack"
          },
          {
            "$type": "Keyword",
            "value": "malloc_block_node"
          },
          {
            "$type": "Keyword",
            "value": "stack_head"
          },
          {
            "$type": "Keyword",
            "value": "stack_cnt"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VeriFastOperator",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "<="
          },
          {
            "$type": "Keyword",
            "value": "=="
          },
          {
            "$type": "Keyword",
            "value": ">="
          },
          {
            "$type": "Keyword",
            "value": ">"
          },
          {
            "$type": "Keyword",
            "value": "<"
          },
          {
            "$type": "Keyword",
            "value": "+"
          },
          {
            "$type": "Keyword",
            "value": "-"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VeriFastStatement",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "lvar",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "rvar",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "|->"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "?",
                "cardinality": "?"
              },
              {
                "$type": "Assignment",
                "feature": "fvar",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@57"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "vfop",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@54"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@57"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "?"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "[0-9]+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "SL_COMMENT_VF_REQ",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/@\\\\s*requires"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "ML_COMMENT_VF_REQ",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*@\\\\s*requires"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "SL_COMMENT_VF_ENS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/@\\\\s*ensures"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "ML_COMMENT_VF_ENS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*@\\\\s*ensures"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_INCLUDE",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "#include[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`);fh.CParser3Grammar=Cfe});var $M=d(Wi=>{"use strict";Object.defineProperty(Wi,"__esModule",{value:!0});Wi.CParser3GeneratedModule=Wi.CParser3GeneratedSharedModule=Wi.CParser3LanguageMetaData=void 0;var Sfe=_R(),Efe=IM();Wi.CParser3LanguageMetaData={languageId:"c-parser-3",fileExtensions:[".cg3"],caseInsensitive:!1};Wi.CParser3GeneratedSharedModule={AstReflection:()=>new Sfe.CParser3AstReflection};Wi.CParser3GeneratedModule={Grammar:()=>(0,Efe.CParser3Grammar)(),LanguageMetaData:()=>Wi.CParser3LanguageMetaData,parser:{}}});var qM=d(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.CParser3Validator=gu.registerValidationChecks=void 0;function Pfe(t){let e=t.validation.ValidationRegistry,r=t.validation.CParser3Validator,n={};e.register(n,r)}gu.registerValidationChecks=Pfe;var RR=class{};gu.CParser3Validator=RR});var LM=d(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.CParser3ScopeProvider=void 0;var wfe=Da(),dh=_R(),AR=class extends wfe.DefaultScopeProvider{getScope(e){if(e.property==="ref"&&(0,dh.isVariableReference)(e.container)){let r=e.container;return this.scopeVars(r)}if(e.property==="compArrow"&&e.property==="compArrow"&&(0,dh.isComponentArrowAccess)(e.container)){let r=e.container;return this.scopeStructComponents(r)}return super.getScope(e)}scopeVars(e){var r,n=null;for(n=e.$container;!(0,dh.isCompoundStatement)(n)&&n!=null;)n=n.$container;let i=n,a=i.varDeclL.flatMap(l=>l.vlist),s=(r=i.$container.ptl)===null||r===void 0?void 0:r.plist.pdlist;i!=null&&(n=i.$container);let u=a.concat(s);return this.createScopeForNodes(u)}scopeStructComponents(e){var r=null;for(r=e.$container;r.$container!=null;)r=r.$container;let i=r.tdecl.filter(a=>(0,dh.isStructDeclaration)(a)).map(a=>a).flatMap(a=>a.sdl).filter(a=>(a==null?void 0:a.list)!=null).flatMap(a=>a==null?void 0:a.list).filter(a=>a!=null);return this.createScopeForNodes(i)}};ph.CParser3ScopeProvider=AR});var MM=d(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.parseAndGenerate=void 0;var Nfe=yn();async function kfe(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,Nfe.URI.parse("memory://minilogo.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validationChecks:"all"}),(r=n.parseResult)===null||r===void 0?void 0:r.value}var xfe=Da(),Ofe=bR();async function Dfe(t){let e=(0,Ofe.createCParser3Services)(xfe.EmptyFileSystem).CParser3,r=await kfe(t,e);return Promise.resolve(r)}hh.parseAndGenerate=Dfe});var bR=d(Ro=>{"use strict";Object.defineProperty(Ro,"__esModule",{value:!0});Ro.createCParser3Services=Ro.CParser3Module=void 0;var mh=Da(),Ife=Da(),FM=$M(),jM=qM(),$fe=LM(),qfe=MM();Ro.CParser3Module={references:{ScopeProvider:t=>new $fe.CParser3ScopeProvider(t)},validation:{CParser3Validator:()=>new jM.CParser3Validator}};function Lfe(t){let e=(0,mh.inject)((0,mh.createDefaultSharedModule)(t),FM.CParser3GeneratedSharedModule),r=(0,mh.inject)((0,mh.createDefaultModule)({shared:e}),FM.CParser3GeneratedModule,Ro.CParser3Module);return e.lsp.ExecuteCommandHandler=new CR,e.ServiceRegistry.register(r),(0,jM.registerValidationChecks)(r),{shared:e,CParser3:r}}Ro.createCParser3Services=Lfe;var CR=class extends Ife.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,qfe.parseAndGenerate)(r[0]))}}});var Hfe=d(UM=>{Object.defineProperty(UM,"__esModule",{value:!0});var GM=Da(),SR=DM(),Mfe=bR(),Ffe=new SR.BrowserMessageReader(self),jfe=new SR.BrowserMessageWriter(self),Gfe=(0,SR.createConnection)(Ffe,jfe),{shared:Ufe}=(0,Mfe.createCParser3Services)(Object.assign({connection:Gfe},GM.EmptyFileSystem));(0,GM.startLanguageServer)(Ufe)});Hfe();})();
