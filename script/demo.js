$(document).ready(init);

function init() {
/* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */

$.fn.scrollPath("getPath")
// Move to 'start' element
.moveTo(100, 0, {name: "start"})

//.arc(600, -600, 650,  3*Math.PI/4, Math.PI/4, true)


 //.lineTo(2100, 0, {name: "description"})
.lineTo(4100, 0, {
callback: function() {
highlight($(".settings"));
},
name: "syntax"
})
// Continue line to 'scrollbar'
.lineTo(6100, 0, {
callback: function() {
highlight($(".sp-scroll-handle"));
},
name: "scrollbar"
})

// Line to 'rotations'
.lineTo(8100, 0, {
name: "rotations"
})

// Continue upwards to 'source'
.lineTo(10100, -0, {
name: "source"
})


//Line to 'follow1'
.lineTo(12100, -0, {
name: "follow1"
})

//Line to 'follow'
.lineTo(14100, -0, {
name: "follow"
})

//Line to 'nextup'
.lineTo(16100, 0, {
	name: "nextup"
})

//line to 'straight1'
.lineTo(18100, 0, {
	name: "straight1"
})

//line to 'straight2'
.lineTo(20100, 0, {
	name: "straight2"
})

.lineTo(22100, 0, {
	name: "straight3"
})

// We're done with the path, let's initate the plugin on our wrapper element
$(".wrapper").scrollPath({drawPath: true, wrapAround: true});

// Add scrollTo on click on the navigation anchors
$("nav").find("a").each(function() {
var target = $(this).attr("href").replace("#", "");
$(this).click(function(e) {
e.preventDefault();

// Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
// for extra easing functions like the one below
$.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
});
});

/* ===================================================================== */

$(".settings .show-path").click(function(e) {
e.preventDefault();
$(".sp-canvas").toggle();
}).toggle(function() {
$(this).text("Hide Path");
}, function() {
$(this).text("Show Path");
});

$(".tweet").click(function(e) {
open(this.href, "", "width=550, height=450");
e.preventDefault();
});

$.getJSON("http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=http%3A%2F%2Fjoelb.me%2Fscrollpath",
function(data) {
if(data && data.count !== undefined) {
$(".follow .count").html("the " + ordinal(data.count + 1) + " kind person to");
}
});
}


function highlight(element) {
if(!element.hasClass("highlight")) {
element.addClass("highlight");
setTimeout(function() { element.removeClass("highlight"); }, 2000);
}
}
function ordinal(num) {
return num + (
(num % 10 == 1 && num % 100 != 11) ? 'st' :
(num % 10 == 2 && num % 100 != 12) ? 'nd' :
(num % 10 == 3 && num % 100 != 13) ? 'rd' : 'th'
);
}