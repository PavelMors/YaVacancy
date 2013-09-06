$(function() {

var window_h = $(window).height();
var window_w = $(window).width();
var slide = $(".slide");
var slide_w =  slide.width();
var slide_h =  slide.height();

var hide_nav =0;

/*function add_html(url){

    *//*$.ajax({
        url: url,
        dataType: "html",
        success: function(msg){
            console.log($(msg+" div.slide"));


 *//**//*           while(msg.indexOf("h1",n)){
               var next_n = msg.indexOf("h1",n+1);
               console.log(next_n);
               tt = msg.substring(n-1 , next_n );
               console.log(tt);
               n = msg.indexOf("h1",next_n);
            }*//**//*
        }})*//*
    $(".presentation").load(url+ " .slide",function(){
        $(".slide:first").addClass("active");

    });
}*/



/*add_html("html/1.html");*/



function add_data_num(){
    console.log(slide[1]);
    for(var i=0; i<slide.length;i++){
        $("div.slide:eq("+i+")").attr("data-num",i);
    }
}
    add_data_num();

function add_mini_slide(){
     slide.clone().prependTo(".mini_slide_inner");
}
    add_mini_slide();


function status_show(slide_num){
    var status_step = slide_w/slide.length;
   $(".status").animate({"width":(slide_num+1)*status_step})
   console.log(slide_num+"   "+status_step)
}
status_show(0);

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
                              });
         status_show(+slide_num);
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


    $(".navigation .slide").click(function(){
        var nav_next_slide = $(this).attr("data-num");
        (nav_next_slide != $(".presentation .slide.active").attr("data-num")) &&
        navigate(nav_next_slide);
    })

})