$(function() {

function slide_handler(){                           //функция работы с загруженой призентацией
    var window_h = $(window).height(),
        window_w = $(window).width(),
        slide = $(".slide"),
        slide_w =  slide.width(),
        slide_h =  slide.height(),
        hide_nav = 0,
        slide_click =1;

    self = {
         preedit_slide: function(){                   //создание полосы выбора слайда.
             for(var i=0; i<slide.length;i++){
                $("div.slide:eq("+i+")").attr("data-num",i);
             }
             slide.clone().prependTo(".mini_slide_inner");
         },
         status_position: function(){                  //позиционирование полосы загрузки слайдов
             $(".status").css({"top":window_h/2+slide_h/2,"left":window_w/2-slide_w/2});
         },

         status_show : function(slide_num){             //функция работы полосы загрузки слайдов
             var status_step = slide_w/slide.length;
             $(".status").animate({"width":(slide_num+1)*status_step})
         },

         navigate: function(slide_num){                 //функция навигации по слайдам
             var active_slide = $(".presentation .slide.active"),
                 next_slide =  $(".presentation .slide[data-num =" +slide_num+"]"),
                 delta_num = active_slide.attr("data-num") - slide_num,
                 delta_slide = window_w +slide_w,
                 navDirect=-1;

             if  (slide_click==1){
                 slide_click =0;
             if (slide_num >=0 && slide_num <slide.length){
                 (delta_num <0)&& (navDirect=1);

                 next_slide.css({"marginLeft":delta_slide*navDirect,"display":"block"})
                            .animate({"marginLeft":-slide_w/2})
                            .addClass("active");

                 active_slide.animate({"marginLeft": +delta_slide*-navDirect},
                                    function(){active_slide.removeClass("active")
                                               .css({"display":"none"});
                                        slide_click = 1;
                                    });

                 self.status_show(+slide_num);
             }
         }},

         bindEvents: function(){                            //обработка событий
             $(".button").bind("click",function(){
                 if(hide_nav==0){
                     $(".navigation").animate({"marginTop":"10px"});
                     hide_nav=1;
                     $(".button").animate({"top":"123px"})
                 }else{
                     $(".navigation").animate({"marginTop":"-120px"});
                     hide_nav=0;
                     $(".button").animate({"top":"0"})
                 }
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
                 e.preventDefault();
                 var code = (e.keyCode ? e.keyCode : e.which);
                 var next_slide_num = parseInt($(".presentation .slide.active").attr("data-num"));
                 (code == 39 || code == 38 || code ==32) && self.navigate(next_slide_num+1);
                 (code == 37 || code == 40)&& self.navigate(next_slide_num-1);
             });

             $(".navigation .slide").bind("click",function(){
                 var nav_next_slide = $(this).attr("data-num");
                 (nav_next_slide != $(".presentation .slide.active").attr("data-num")) &&
                 self.navigate(nav_next_slide);
             })

         },

         init: function(){
             self.preedit_slide();
             self.bindEvents();
             self.status_position();
             self.status_show(0);

         }
    };
    return self.init();
}

    function load_xml(data_file){                       //загрузка файла призенации
        var url = "html_file/"+data_file+".xml";
        $.ajax({
            url: url,
            dataType: "xml",
            success: function(xml){
                $(xml).find("slide").each(function(i){
                    var _this = $(this),
                        header = _this.find("header").html(),
                        content = _this.find("content").html();

                    $("<div class='slide'></div>").html("<header>"+(header || "")+"</header><section>"+
                     (content || "")+"</section>").appendTo(".presentation");
                    (i==0) && $(".slide").addClass("active");
                })
            },
            complete: function(){
                slide_handler();
                $(".navigation").fadeIn("def");
                $(".presentation").fadeIn("def");
                $(".status").fadeIn("def");
                $(".button").fadeIn("def");
            }
        });
    }

/*    load_xml();*/

      function change_present(file_num,n){                      //фунция выбора призентации
        $(".navigation").hide();
        $(".presentation").hide();
        $(".status").hide();
        $(".present_change").hide();
        $(".button").hide();
        $.ajax({
            url: "html_file/"+file_num+".xml",
            dataType: "xml",
            success: function(xml){
                        $(xml).find("slide").each(function(i){
                        var _this = $(this),
                            header = _this.find("header").html(),
                            content = _this.find("content").html();
                        if(i>0)return;
                        $("<div class='present' data-file='"+file_num+"'></div>").html("<header>"+(header||"")+"</header><section>"+(content||"")+"</section>").appendTo(".present_change");
                        })
            },
            error: function(error){
                n =1;
                $(".present_change").fadeIn("def");
                $(".present").click(function(){
                    var data_file=$(this).attr("data-file");
                    load_xml(data_file);
                });
            },
            complete:function(){
                file_num++;
                (n==0) && (change_present(file_num,n))
            }
        });

    }

    change_present(1,0);

})















