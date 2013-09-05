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
    var active_slide = $("div.slide.active");
    var next_slide =  $("div.slide[data-num =" +slide_num+"]");
    var delta_num = active_slide.attr("data-num") - slide_num;
    var delta_slide = window_w +slide_w;
    var navDirect=-1;

    if (slide_num >=0 && slide_num <slide.length){
        (delta_num <0)&& (navDirect=1);

        next_slide.css({"marginLeft":delta_slide*navDirect,"display":"block"});
        next_slide.animate({"marginLeft":-slide_w/2})
                  .addClass("active");

        active_slide.animate({"marginLeft": +delta_slide*-navDirect},
                              function(){$(this).removeClass("active")
                                                .css({"display":"none"})
                              })
    }
}

    $(".navigation").click(function(){
        (hide_nav==0)?
            ($(this).animate({"marginTop":"10px"}))&&(hide_nav=1):
            ($(this).animate({"marginTop":"-110px"}))&&(hide_nav=0)
        })




    $(window).keypress(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var next_slide_num = parseInt($("div.slide.active").attr("data-num"));
    (code == 39 || code == 38)&& navigate(next_slide_num+1);
    (code == 37 || code == 40)&& navigate(next_slide_num-1);

    })


})