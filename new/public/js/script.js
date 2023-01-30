/* javascriptのコードを記載 */
jQuery(function($){

    function clearForm(selector) {
        var frmObj = $(selector);
        if (frmObj.length == 0) {
            return;
        }

        $("input[type=text]", frmObj).val("");
        $("select option", frmObj).removeAttr("selected");
    }

    $('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });

    $.fn.extend({
        scrollToMe: function() {
            if($(this).length){
                var top = $(this).offset().top - 100;
                $('html,body').animate({scrollTop: top}, 600);
            }
        },
        scrollToJustMe: function(){
            if($(this).length){
                var top = $(this).offset().top;
                $('html,body').animate({scrollTop: top}, 600);
            }
        }
    });

    $(document).ready(function() {
        $("#totop").click(function () {
            $("html, body").animate({scrollTop: 0}, 300);
        });

        $('a[href*="#"]').off("click").on("click", function(){
            if($(this).attr("href") == "#")
                return false;
            else if($($(this).attr("href")).length)
                $($(this).attr("href")).scrollToJustMe();
            else
                window.location.href=store_base_url + $(this).attr("href");
            return false;
        });

        $(".m-tab > ul a").off("click").on("click", function(){
            if(!$(this).hasClass("active")) {
                $(this).parent().parent().find("a.active").removeClass("active");
                $(this).addClass("active");
                $("#"+$(this).data("tabid")).parent().children().hide();
                $("#"+$(this).data("tabid")).show();
            }
        });

        $(".search-popup-link").off("click").on("click", function(){
            $("#"+$(this).data("popup")).fadeIn();
            $(".popup-overlay").fadeIn();
        });

        $(".popup a.popup-close,.popup-overlay").off("click").on("click", function(){
            $(".popup").fadeOut();
            $(".popup-overlay").fadeOut();
            clearForm("#search-form");
        });

        $(".sticky-action.has-action > h3").off("click").on("click", function(){
            if($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active");
            } else {
                $(this).parent().addClass("active");
            }
        });

        $(".rating-group > i").off("click").on("click", function(){
            var rating = $(this).data("rating");
            $(this).parent().children("select").val(rating);
            $(this).parent().children("i").each(function(){
                if($(this).data("rating") <= rating) {
                    $(this).removeClass("far").addClass("fa");
                } else {
                    $(this).removeClass("fa").addClass("far");
                }
            });
        });

        $("#submit-reg-data").on("click", function () {
            let methodTag = $("input[name='_method']").get(0);
            if (methodTag != undefined)
                methodTag.value = 'PUT';
            $("#form-data-con").submit();
        });

        $("#submit-del-data").on("click", function () {
            $("#"+$(this).data("popup")).fadeIn();
            $(".popup-overlay").fadeIn();
        });

        $("#popup-delete-confirm.popup a.popup-ok").off("click").on("click", function(){
            let methodTag = $("input[name='_method']").get(0);
            if (methodTag != undefined)
                methodTag.value = 'DELETE';
            $("#form-data-con").submit();
        });
    });

});
