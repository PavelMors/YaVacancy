$(function() {

var window_h = $(window).height();
var window_w = $(window).width();

function add_data_num(){
    for(var i=0; i<$("div.slide").length;i++){
        $("div.slide:eq("+i+")").attr("data-num",i);
    }
}

    add_data_num();

function navigate (slide_num){
    console.log(slide_num);
    var delta_num = ($("div.slide.active").attr("data-num")) - slide_num;
    (delta_num >0)? navDirect = 1:navDirect=-1;
    console.log(delta_num);
    var delta_slide = window_w - ($("div.slide").css("marginLeft")).slice(0, -2);
    $("div.slide.active").animate({marginLeft:delta_slide*delta_num})
        .removeClass("active");
    $("div.slide[data-num = "+slide_num+"]").addClass("active")

}

$("div.slide").click(function(){
    navigate (1);
});

    $(window).keypress(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var next_slide_num = $("div.slide.active").attr("data-num");
    (code == 39)&& navigate(next_slide_num+1);
    (code == 37)&& navigate(next_slide_num-1);
    })


})