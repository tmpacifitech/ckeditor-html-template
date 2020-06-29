﻿/*
 Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function F(a){function b(){this.deflated||(a.widgets.focused==this.widget&&(this.focused=!0),a.widgets.destroy(this.widget),this.deflated=!0)}function k(){var d=a.editable(),c=a.document;if(this.deflated)this.widget=a.widgets.initOn(this.element,"image",this.widget.data),this.widget.inline&&!(new CKEDITOR.dom.elementPath(this.widget.wrapper,d)).block&&(d=c.createElement(a.activeEnterMode==CKEDITOR.ENTER_P?"p":"div"),d.replace(this.widget.wrapper),this.widget.wrapper.move(d)),this.focused&&
(this.widget.focus(),delete this.focused),delete this.deflated;else{var h=this.widget,d=e,c=h.wrapper,b=h.data.align,h=h.data.hasCaption;if(d){for(var m=3;m--;)c.removeClass(d[m]);"center"==b?h&&c.addClass(d[1]):"none"!=b&&c.addClass(d[r[b]])}else"center"==b?(h?c.setStyle("text-align","center"):c.removeStyle("text-align"),c.removeStyle("float")):("none"==b?c.removeStyle("float"):c.setStyle("float",b),c.removeStyle("text-align"))}}var e=a.config.image2_alignClasses,g=a.config.image2_captionedClass;
return{allowedContent:G(a),requiredContent:"img[src,alt]",features:H(a),styleableElements:"img figure",contentTransformations:[["img[width]: sizeToAttribute"]],editables:{caption:{selector:"figcaption",allowedContent:"br em strong sub sup u s; a[!href,target]"}},parts:{image:"img",caption:"figcaption"},dialog:"image2",template:'\x3cimg alt\x3d"" src\x3d"" /\x3e',data:function(){var d=this.features;this.data.hasCaption&&!a.filter.checkFeature(d.caption)&&(this.data.hasCaption=!1);"none"==this.data.align||
a.filter.checkFeature(d.align)||(this.data.align="none");this.shiftState({widget:this,element:this.element,oldData:this.oldData,newData:this.data,deflate:b,inflate:k});this.data.link?this.parts.link||(this.parts.link=this.parts.image.getParent()):this.parts.link&&delete this.parts.link;this.parts.image.setAttributes({src:this.data.src,"data-cke-saved-src":this.data.src,alt:this.data.alt});if(this.oldData&&!this.oldData.hasCaption&&this.data.hasCaption)for(var c in this.data.classes)this.parts.image.removeClass(c);
if(a.filter.checkFeature(d.dimension)){d=this.data;d={width:d.width,height:d.height};c=this.parts.image;for(var e in d)d[e]?c.setAttribute(e,d[e]):c.removeAttribute(e)}this.oldData=CKEDITOR.tools.extend({},this.data)},init:function(){var d=CKEDITOR.plugins.image2,c=this.parts.image,b={hasCaption:!!this.parts.caption,src:c.getAttribute("src"),alt:c.getAttribute("alt")||"",width:c.getAttribute("width")||"",height:c.getAttribute("height")||"",lock:this.ready?d.checkHasNaturalRatio(c):!0},k=c.getAscendant("a");
k&&this.wrapper.contains(k)&&(this.parts.link=k);b.align||(c=b.hasCaption?this.element:c,e?(c.hasClass(e[0])?b.align="left":c.hasClass(e[2])&&(b.align="right"),b.align?c.removeClass(e[r[b.align]]):b.align="none"):(b.align=c.getAttribute("align")||c.getStyle("float")||"none",c.removeStyle("float")));a.plugins.link&&this.parts.link&&(b.link=d.getLinkAttributesParser()(a,this.parts.link),(c=b.link.advanced)&&c.advCSSClasses&&(c.advCSSClasses=CKEDITOR.tools.trim(c.advCSSClasses.replace(/cke_\S+/,""))));
this.wrapper[(b.hasCaption?"remove":"add")+"Class"]("cke_image_nocaption");this.setData(b);a.filter.checkFeature(this.features.dimension)&&!0!==a.config.image2_disableResizer&&I(this);this.shiftState=d.stateShifter(this.editor);this.on("contextMenu",function(a){a.data.image=CKEDITOR.TRISTATE_OFF;if(this.parts.link||this.wrapper.getAscendant("a"))a.data.link=a.data.unlink=CKEDITOR.TRISTATE_OFF})},addClass:function(a){t(this).addClass(a)},hasClass:function(a){return t(this).hasClass(a)},removeClass:function(a){t(this).removeClass(a)},
getClasses:function(){var a=new RegExp("^("+[].concat(g,e).join("|")+")$");return function(){var b=this.repository.parseElementClasses(t(this).getAttribute("class")),e;for(e in b)a.test(e)&&delete b[e];return b}}(),upcast:J(a),downcast:K(a),getLabel:function(){return this.editor.lang.widget.label.replace(/%1/,(this.data.alt||"")+" "+this.pathName)}}}function J(a){var b=u(a),k=a.config.image2_captionedClass;return function(a,g){var d={width:1,height:1},c=a.name,h;if(!a.attributes["data-cke-realelement"]&&
(b(a)?("div"==c&&(h=a.getFirst("figure"))&&(a.replaceWith(h),a=h),g.align="center",h=a.getFirst("img")||a.getFirst("a").getFirst("img")):"figure"==c&&a.hasClass(k)?h=a.find(function(a){return"img"===a.name&&-1!==CKEDITOR.tools.array.indexOf(["figure","a"],a.parent.name)},!0)[0]:n(a)&&(h="a"==a.name?a.children[0]:a),h)){for(var D in d)(d=h.attributes[D])&&d.match(L)&&delete h.attributes[D];return a}}}function K(a){var b=a.config.image2_alignClasses;return function(a){var e="a"==a.name?a.getFirst():
a,g=e.attributes,d=this.data.align;if(!this.inline){var c=a.getFirst("span");c&&c.replaceWith(c.getFirst({img:1,a:1}))}d&&"none"!=d&&(c=CKEDITOR.tools.parseCssText(g.style||""),"center"==d&&"figure"==a.name?a=a.wrapWith(new CKEDITOR.htmlParser.element("div",b?{"class":b[1]}:{style:"text-align:center"})):d in{left:1,right:1}&&b&&e.addClass(b[r[d]]),b||CKEDITOR.tools.isEmpty(c)||(g.style=CKEDITOR.tools.writeCssText(c)),g.align=d);return a}}function u(a){var b=a.config.image2_captionedClass,k=a.config.image2_alignClasses,
e={figure:1,a:1,img:1};return function(g){if(!(g.name in{div:1,p:1}))return!1;var d=g.children;if(1!==d.length)return!1;d=d[0];if(!(d.name in e))return!1;if("p"==g.name){if(!n(d))return!1}else if("figure"==d.name){if(!d.hasClass(b))return!1}else if(a.enterMode==CKEDITOR.ENTER_P||!n(d))return!1;return(k?g.hasClass(k[1]):"center"==CKEDITOR.tools.parseCssText(g.attributes.style||"",!0)["text-align"])?!0:!1}}function n(a){return"img"==a.name?!0:"a"==a.name?1==a.children.length&&a.getFirst("img"):!1}function I(a){var b=
a.editor,k=b.editable(),e=b.document,g=a.resizer=e.createElement("span");g.addClass("cke_image_resizer");g.setAttribute("title",b.lang.image2.resizer);g.append(new CKEDITOR.dom.text("​",e));if(a.inline)a.wrapper.append(g);else{var d=a.parts.link||a.parts.image,c=d.getParent(),h=e.createElement("span");h.addClass("cke_image_resizer_wrapper");h.append(d);h.append(g);a.element.append(h,!0);c.is("span")&&c.remove()}g.on("mousedown",function(c){function d(a,b,c){var m=CKEDITOR.document,f=[];e.equals(m)||
f.push(m.on(a,b));f.push(e.on(a,b));if(c)for(a=f.length;a--;)c.push(f.pop())}function v(){w=r+l*z;x=Math.round(w/y)}function f(){x=u-p;w=Math.round(x*y)}var h=a.parts.image,B=function(){var a=b.config.image2_maxSize,c;if(!a)return null;a=CKEDITOR.tools.copy(a);c=CKEDITOR.plugins.image2.getNatural(h);a.width=Math.max("natural"===a.width?c.width:a.width,15);a.height=Math.max("natural"===a.height?c.height:a.height,15);return a}(),l="right"==a.data.align?-1:1,M=c.data.$.screenX,t=c.data.$.screenY,r=h.$.clientWidth,
u=h.$.clientHeight,y=r/u,n=[],E="cke_image_s"+(~l?"e":"w"),C,w,x,q,z,p,A;b.fire("saveSnapshot");d("mousemove",function(a){C=a.data.$;z=C.screenX-M;p=t-C.screenY;A=Math.abs(z/p);1==l?0>=z?0>=p?v():A>=y?v():f():0>=p?A>=y?f():v():f():0>=z?0>=p?A>=y?f():v():f():0>=p?v():A>=y?v():f();a=B&&(w>B.width||x>B.height);15>w||15>x||a||(q={width:w,height:x},h.setAttributes(q))},n);d("mouseup",function(){for(var c;c=n.pop();)c.removeListener();k.removeClass(E);g.removeClass("cke_image_resizing");if(q){a.setData(q);
c=new Image;c.src=a.data.src;for(var d=a.data.src.match(/fileName=([^&]*)/)[0],m=d.replace("fileName\x3d",""),f=a.data.src.replace(d,""),d=a.data.src.match(/currentFolder=([^&]*)/)[0],f=f.replace(d,""),d=a.data.src.match(/hash=([^&]*)/)[0],f=f.replace(d,""),d=a.data.src.match(/lang=([^&]*)/)[0],f=f.replace(d,""),d=a.data.src.match(/command=([^&]*)/)[0],f=f.replace(d,"command\x3dQuickUpload");"\x26"===f[f.length-1];)f=f.substring(0,f.length-1);f=f.replace("\x26\x26","\x26");f+="\x26responseType\x3djson";
c.onload=function(){var a=document.createElement("canvas");a.width=q.width;a.height=q.height;var c=a.getContext("2d");c.drawImage(this,0,0,this.width,this.height,0,0,a.width,a.height);c.canvas.toBlob(function(a){a=new File([a],m,{type:a.type,lastModified:Date.now()});a=b.uploadRepository.create(a);a.on("uploaded",function(a){b.fire("saveSnapshot");q=!1});a.loadAndUpload(f)})}}},n);k.addClass(E);g.addClass("cke_image_resizing")});a.on("data",function(){g["right"==a.data.align?"addClass":"removeClass"]("cke_image_resizer_left")})}
function N(a){var b=[],k;return function(e){var g=a.getCommand("justify"+e);if(g){b.push(function(){g.refresh(a,a.elementPath())});if(e in{right:1,left:1,center:1})g.on("exec",function(d){var c=l(a);if(c){c.setData("align",e);for(c=b.length;c--;)b[c]();d.cancel()}});g.on("refresh",function(d){var c=l(a),b={right:1,left:1,center:1};c&&(void 0===k&&(k=a.filter.checkFeature(a.widgets.registered.image.features.align)),k?this.setState(c.data.align==e?CKEDITOR.TRISTATE_ON:e in b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED):
this.setState(CKEDITOR.TRISTATE_DISABLED),d.cancel())})}}}function O(a){if(a.plugins.link){var b=CKEDITOR.on("dialogDefinition",function(b){b=b.data;if("link"==b.name){b=b.definition;var e=b.onShow,g=b.onOk;b.onShow=function(){var b=l(a),c=this.getContentElement("info","linkDisplayText").getElement().getParent().getParent();b&&(b.inline?!b.wrapper.getAscendant("a"):1)?(this.setupContent(b.data.link||{}),c.hide()):(c.show(),e.apply(this,arguments))};b.onOk=function(){var b=l(a);if(b&&(b.inline?!b.wrapper.getAscendant("a"):
1)){var c={};this.commitContent(c);b.setData("link",c)}else g.apply(this,arguments)}}});a.on("destroy",function(){b.removeListener()});a.getCommand("unlink").on("exec",function(b){var e=l(a);e&&e.parts.link&&(e.setData("link",null),this.refresh(a,a.elementPath()),b.cancel())});a.getCommand("unlink").on("refresh",function(b){var e=l(a);e&&(this.setState(e.data.link||e.wrapper.getAscendant("a")?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),b.cancel())})}}function l(a){return(a=a.widgets.focused)&&
"image"==a.name?a:null}function G(a){var b=a.config.image2_alignClasses;a={div:{match:u(a)},p:{match:u(a)},img:{attributes:"!src,alt,width,height,align"},figure:{classes:"!"+a.config.image2_captionedClass},figcaption:!0};b?(a.div.classes=b[1],a.p.classes=a.div.classes,a.img.classes=b[0]+","+b[2],a.figure.classes+=","+a.img.classes):(a.div.styles="text-align",a.p.styles="text-align",a.img.styles="float",a.figure.styles="float,display");return a}function H(a){a=a.config.image2_alignClasses;return{dimension:{requiredContent:"img[width,height]"},
align:{requiredContent:"img"+(a?"("+a[0]+")":"{float}")},caption:{requiredContent:"figcaption"}}}function t(a){return a.data.hasCaption?a.element:a.parts.image}var P=new CKEDITOR.template('\x3cfigure class\x3d"{captionedClass}"\x3e\x3cimg alt\x3d"" src\x3d"" /\x3e\x3cfigcaption\x3e{captionPlaceholder}\x3c/figcaption\x3e\x3c/figure\x3e'),r={left:0,center:1,right:2},L=/^\s*(\d+\%)\s*$/i;CKEDITOR.plugins.add("image2",{lang:"af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
requires:"widget,dialog",icons:"image",hidpi:!0,onLoad:function(){CKEDITOR.addCss('.cke_image_nocaption{line-height:0}.cke_editable.cke_image_sw, .cke_editable.cke_image_sw *{cursor:sw-resize !important}.cke_editable.cke_image_se, .cke_editable.cke_image_se *{cursor:se-resize !important}.cke_image_resizer{display:none;position:absolute;width:10px;height:10px;bottom:-5px;right:-5px;background:#000;outline:1px solid #fff;line-height:0;cursor:se-resize;}.cke_image_resizer_wrapper{position:relative;display:inline-block;line-height:0;}.cke_image_resizer.cke_image_resizer_left{right:auto;left:-5px;cursor:sw-resize;}.cke_widget_wrapper:hover .cke_image_resizer,.cke_image_resizer.cke_image_resizing{display:block}.cke_editable[contenteditable\x3d"false"] .cke_image_resizer{display:none;}.cke_widget_wrapper\x3ea{display:inline-block}')},
init:function(a){if(!a.plugins.detectConflict("image2",["easyimage"])){var b=a.config,k=a.lang.image2,e=F(a);b.filebrowserImage2BrowseUrl=b.filebrowserImageBrowseUrl;b.filebrowserImage2UploadUrl=b.filebrowserImageUploadUrl;e.pathName=k.pathName;e.editables.caption.pathName=k.pathNameCaption;a.widgets.add("image",e);a.ui.addButton&&a.ui.addButton("Image",{label:a.lang.common.image,command:"image",toolbar:"insert,10"});a.contextMenu&&(a.addMenuGroup("image",10),a.addMenuItem("image",{label:k.menu,command:"image",
group:"image"}));CKEDITOR.dialog.add("image2",this.path+"dialogs/image2.js")}},afterInit:function(a){var b={left:1,right:1,center:1,block:1},k=N(a),e;for(e in b)k(e);O(a)}});CKEDITOR.plugins.image2={stateShifter:function(a){function b(a,b){var c={};g?c.attributes={"class":g[1]}:c.styles={"text-align":"center"};c=e.createElement(a.activeEnterMode==CKEDITOR.ENTER_P?"p":"div",c);k(c,b);b.move(c);return c}function k(b,d){if(d.getParent()){var f=a.createRange();f.moveToPosition(d,CKEDITOR.POSITION_BEFORE_START);
d.remove();c.insertElementIntoRange(b,f)}else b.replace(d)}var e=a.document,g=a.config.image2_alignClasses,d=a.config.image2_captionedClass,c=a.editable(),h=["hasCaption","align","link"],l={align:function(c,d,f){var e=c.element;c.changed.align?c.newData.hasCaption||("center"==f&&(c.deflate(),c.element=b(a,e)),c.changed.hasCaption||"center"!=d||"center"==f||(c.deflate(),d=e.findOne("a,img"),d.replace(e),c.element=d)):"center"==f&&c.changed.hasCaption&&!c.newData.hasCaption&&(c.deflate(),c.element=
b(a,e));!g&&e.is("figure")&&("center"==f?e.setStyle("display","inline-block"):e.removeStyle("display"))},hasCaption:function(b,c,f){b.changed.hasCaption&&(c=b.element.is({img:1,a:1})?b.element:b.element.findOne("a,img"),b.deflate(),f?(f=CKEDITOR.dom.element.createFromHtml(P.output({captionedClass:d,captionPlaceholder:a.lang.image2.captionPlaceholder}),e),k(f,b.element),c.replace(f.findOne("img")),b.element=f):(c.replace(b.element),b.element=c))},link:function(b,c,d){if(b.changed.link){var g=b.element.is("img")?
b.element:b.element.findOne("img"),h=b.element.is("a")?b.element:b.element.findOne("a"),k=b.element.is("a")&&!d||b.element.is("img")&&d,l;k&&b.deflate();d?(c||(l=e.createElement("a",{attributes:{href:b.newData.link.url}}),l.replace(g),g.move(l)),d=CKEDITOR.plugins.image2.getLinkAttributesGetter()(a,d),CKEDITOR.tools.isEmpty(d.set)||(l||h).setAttributes(d.set),d.removed.length&&(l||h).removeAttributes(d.removed)):(d=h.findOne("img"),d.replace(h),l=d);k&&(b.element=l)}}};return function(a){var b,c;
a.changed={};for(c=0;c<h.length;c++)b=h[c],a.changed[b]=a.oldData?a.oldData[b]!==a.newData[b]:!1;for(c=0;c<h.length;c++)b=h[c],l[b](a,a.oldData?a.oldData[b]:null,a.newData[b]);a.inflate()}},checkHasNaturalRatio:function(a){var b=a.$;a=this.getNatural(a);return Math.round(b.clientWidth/a.width*a.height)==b.clientHeight||Math.round(b.clientHeight/a.height*a.width)==b.clientWidth},getNatural:function(a){if(a.$.naturalWidth)a={width:a.$.naturalWidth,height:a.$.naturalHeight};else{var b=new Image;b.src=
a.getAttribute("src");a={width:b.width,height:b.height}}return a},getLinkAttributesGetter:function(){return CKEDITOR.plugins.link.getLinkAttributes},getLinkAttributesParser:function(){return CKEDITOR.plugins.link.parseLinkAttributes}}})();CKEDITOR.config.image2_captionedClass="image";