$(function() {

var window_h = $(window).height();
var window_w = $(window).width();
var slide = $(".slide");
var slide_w =  slide.width();
var slide_h =  slide.height();

var hide_nav =0;



function add_data_num(){
    for(var i=0; i<slide.length;i++){
        $("div.slide:eq("+i+")").attr("data-num",i);
    }
}
    add_data_num();

function add_mini_slide(){
    var html_code = $(".presentation").html();
    $(".mini_slide_inner").append(html_code);
}

    add_mini_slide();

    function navigate (slide_num){
    var active_slide = $(".presentation .slide.active");
    var next_slide =  $(".presentation .slide[data-num =" +slide_num+"]");
    var delta_num = active_slide.attr("data-num") - slide_num;
    var delta_slide = window_w +slide_w;
    var navDirect=-1;

    if (slide_num >=0 && slide_num <slide.length){
        (delta_num <0)&& (navDirect=1);

        next_slide.css({"marginLeft":delta_slide*navDirect,"display":"block"});
        next_slide.animate({"marginLeft":-slide_w/2})
                  .addClass("active");

        active_slide.animate({"marginLeft": +delta_slide*-navDirect},
                              function(){active_slide.removeClass("active")
                                                .css({"display":"none"})
                              })
    }
}

    $(".navigation").click(function(){
        (hide_nav==0)?
            ($(this).animate({"marginTop":"10px"}))&&(hide_nav=1):
            ($(this).animate({"marginTop":"-110px"}))&&(hide_nav=0)
        });


    $(".mini_slide_inner").on("scrolling", function moveObject(event){
        this.addEventListener('DOMMouseScroll', moveObject, false);
        this.onmousewheel = moveObject;
        var delta = 0;
        delta = event.detail/-3 || event.wheelDelta/120;
        var currPos=$(this).css("left").slice(0,-2);
        currPos-=(delta*20);
        (currPos<=0 && currPos>-($(this).width()-$(".navigation").width()))&&
        ($(this).css({"left":currPos}))
       /* var nav_w = $(".nav").width()
        var ul_width_active = $(".mini_slide_inner").width() - window_w;

        (currPos >=0 && delta<0)?currPos=0 : currPos-=(delta*20);
        (currPos < -ul_width_active && delta>0)?currPos = -ul_width_active : $(this).offset({left:currPos});*/
      });

    $(".mini_slide_inner").trigger("scrolling");

    $(window).keypress(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var next_slide_num = parseInt($(".presentation .slide.active").attr("data-num"));
    (code == 39 || code == 38) && navigate(next_slide_num+1);
    (code == 37 || code == 40)&& navigate(next_slide_num-1);
    })



})