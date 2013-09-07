$(function() {

function slide_handler(){
    var window_h = $(window).height(),
        window_w = $(window).width(),
        slide = $(".slide"),
        slide_w =  slide.width(),
        slide_h =  slide.height(),
        hide_nav =0;


    console.log("11");
    self = {
         preedit_slide: function(){
             for(var i=0; i<slide.length;i++){
                $("div.slide:eq("+i+")").attr("data-num",i);
             }
             slide.clone().prependTo(".mini_slide_inner");
         },

         status_show : function(slide_num){
             var status_step = slide_w/slide.length;
             $(".status").animate({"width":(slide_num+1)*status_step})
         },

         navigate: function(slide_num){
             var active_slide = $(".presentation .slide.active"),
                 next_slide =  $(".presentation .slide[data-num =" +slide_num+"]"),
                 delta_num = active_slide.attr("data-num") - slide_num,
                 delta_slide = window_w +slide_w,
                 navDirect=-1;

             if (slide_num >=0 && slide_num <slide.length){
                 (delta_num <0)&& (navDirect=1);

                 next_slide.css({"marginLeft":delta_slide*navDirect,"display":"block"})
                            .animate({"marginLeft":-slide_w/2})
                           .addClass("active");

                 active_slide.animate({"marginLeft": +delta_slide*-navDirect},
                                    function(){active_slide.removeClass("active")
                                               .css({"display":"none"})
                                    });
                 self.status_show(+slide_num);
             }
         },

         bindEvents: function(){
             $(".navigation").bind("click",function(){
                 (hide_nav==0)?
                     ($(this).animate({"marginTop":"10px"}))&&(hide_nav=1):
                     ($(this).animate({"marginTop":"-110px"}))&&(hide_nav=0)
             });

             $(".mini_slide_inner").on("scrolling", function moveObject(event){
                 var currPos=$(this).css("left").slice(0,-2),
                     delta = 0;

                 this.addEventListener('DOMMouseScroll', moveObject, false);
                 this.onmousewheel = moveObject;
                 delta = event.detail/-3 || event.wheelDelta/120;

                 currPos-=(delta*20);
                 (currPos<=0 && currPos>-($(this).width()-$(".navigation").width()))&&
                 ($(this).css({"left":currPos}))
             });
             $(".mini_slide_inner").trigger("scrolling");

             $(window).keypress(function (e) {
                 var code = (e.keyCode ? e.keyCode : e.which);
                 var next_slide_num = parseInt($(".presentation .slide.active").attr("data-num"));
                 (code == 39 || code == 38) && self.navigate(next_slide_num+1);
                 (code == 37 || code == 40)&& self.navigate(next_slide_num-1);
             })

             $(".navigation .slide").bind("click",function(){
                 var nav_next_slide = $(this).attr("data-num");
                 (nav_next_slide != $(".presentation .slide.active").attr("data-num")) &&
                 self.navigate(nav_next_slide);
             })
         },

         init: function(){
             self.preedit_slide();
             self.bindEvents();
             self.status_show(0);
         }
    };
    return self.init();
}


/*    function load_html(url){
        $(".presentation").load(url+ " .slide",function(){
            $(".slide:first").addClass(function(){
                slide_handler();
                return "active";
            })
        })
    };*/

/*    load_html("html_file/1.html");*/
/*    var kk = $(".presentation").load("html/2.html");
    console.log(kk)*/

    function load_xml(data_file){
        var url = "html_file/"+data_file+".xml";
        $.ajax({
            url: url,
            dataType: "xml",
            success: function(xml){
                $(xml).find("slide").each(function(i){
                    var _this = $(this),
                        h1 = _this.find("h1").text(),
                        content = _this.find("content").text();

                    $("<div class='slide'></div>").html("<h1>"+h1+"</h1><section>"+content+"</section>").appendTo(".presentation");
                    (i==0) && $(".slide").addClass("active");
                })
            },
            error: function(error){
                console.log(error)
            },
            complete: function(){
                slide_handler();
                $(".navigation").fadeIn("def");
                $(".presentation").fadeIn("def");
                $(".status").fadeIn("def");
            }
        });
    }

/*    load_xml();*/

      function change_present(file_num,n){
        $(".navigation").hide();
        $(".presentation").hide();
        $(".status").hide();
        $(".present_change").hide();
        $.ajax({
            url: "html_file/"+file_num+".xml",
            dataType: "xml",
            success: function(xml){
                        $(xml).find("slide").each(function(i){
                        var _this = $(this),
                            h1 = _this.find("h1").text(),
                            content = _this.find("content").text();
                        if(i>0)return;
                        $("<div class='present' data-file='"+file_num+"'></div>").html("<h1>"+h1+"</h1><section>"+content+"</section>").appendTo(".present_change");
                        })
            },
            error: function(error){
                n =1;
                $(".present_change").fadeIn("def");
            },
            complete:function(){
                file_num++;
                (n==0) && (change_present(file_num,n))
            }
        });

    }


    setTimeout(function(){
        $(".present").click(function(){
            console.log($(this));
            var data_file=$(this).attr("data-file");
            console.log(data_file);
            load_xml(data_file);
        });
    },2000);

    change_present(1,0);


})















