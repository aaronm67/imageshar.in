/*
jQuery ruler v1.0
https://github.com/alexteg/jQuery-ruler
Copyright 2012, Alexander Teglund
Licensed under the MIT license
*/
(function(d){d.fn.ruler=function(a){a=d.extend({},{minWidth:30,maxWidth:screen.width,width:300,draggable:!0,resizable:!0,autoResize:!1},a);return this.each(function(){var c=d(this).addClass("ruler").css({minWidth:a.minWidth,maxWidth:a.maxWidth,width:a.width}),e=c.html('<div class="ruler-wrapper"></div>').find(".ruler-wrapper"),h="ruler-small_line",f=!1,g=a.autoResize,i=0,j=0;a.autoResize||e.append('<div class="ruler-resize"></div>');for(var b=0;b<=a.maxWidth;b+=2)h=0==(b+2)%10?0==(b+2)%20?"ruler-large_line":
"ruler-medium_line":"ruler-small_line",e.append('<div class="'+h+'" style="left: '+b+'px"></div>'),0==b%20&&e.append('<div class="ruler-label" style="left: '+b+'px">'+b+"</div>");a.draggable&&c.addClass("ruler-draggable").bind("mousedown",function(a){f=!0;i=a.pageX-c.offset().left;j=a.pageY-c.offset().top;return!1});a.resizable&&c.find(".ruler-resize").bind("mousedown",function(){g=!0;return!1});(a.draggable||a.resizable)&&d(document).bind("mousemove",function(b){a.draggable&&f?c.css({top:b.pageY-
j,left:b.pageX-i}):a.resizable&&g&&c.css({width:b.pageX-c.offset().left});return!1}).bind("mouseup",function(){f=!1;a.autoResize||(g=!1)});c.bind("selectstart",function(){return!1})})}})(jQuery);