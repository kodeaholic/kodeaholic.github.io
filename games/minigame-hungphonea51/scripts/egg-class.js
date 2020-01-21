function Egg($chickenDiv)
{
    //Set vị trí cho trứng rơi
    this.chickenDivPosition = $chickenDiv.position();
    this.startPosLeft       = this.chickenDivPosition.left + $chickenDiv.width() / 2-17;
    this.startPosTop        = this.chickenDivPosition.top + $chickenDiv.height() - 50;



    // create div in memory to hold egg image
    // set left and top position via input parameters
    this.$eggImageDiv = $("<div class='egg'></div>").css({"left": this.startPosLeft,"top" : this.startPosTop});

    $chickenDiv.append(this.$eggImageDiv);
    // calculate distance of egg fall by subtracting it's position from the window
    let basket            = new Basket();
    //Khoảng cách từ giỏ tới con gà, tăng giảm để set vị trí khi hứng trứng
    this.distanceToBasket = basket.basketTop-$("div.egg").height()/3;

    //create function startFall to animate egg drop and find out the height
    // of the window and myltipy by to 10 to control speed.
    // this.breakEgg is a callback function that will called after
    // egg animation is complete
    let milliSeconds = (window.innerHeight*scope.speed - scope.level*500);
    // var milliSeconds = (2500 - scope.level*400);

    var eggObject = this;

    this.startFall = function ()
    {
        let start = 1;
        this.$eggImageDiv.animate({top: this.distanceToBasket},{
            duration: milliSeconds,
            easing : "linear",
            step : function( now, fx ) {
                let time = (scope.level>3)?fx.end*0.9:fx.end*0.75;
                if(now>= time && start <2){
                    chickensStartHatch();
                    start++;
                }
            },
            complete: this.catchEgg
        });
    };


    // this.breakEgg is a callback function triggered by animate function
    // after animation is complete
    // remove() is opposite of append to remove from DOM
    this.catchEgg = function ()
    {
        if(scope.life>0){
            var $eggDiv      = $(this);
            var $eggPosition = $eggDiv.position();
            var basket       = new Basket();
            var basketRight  = basket.basketRight;
            var basketLeft   = basket.basketLeft;
            var eggLeft      = $eggPosition.left;
            var eggRight     = $eggPosition.left + $eggDiv.width();
            var isCatched    = basketRight > eggRight && basketLeft < eggLeft;

            if (isCatched)
            {
                $eggDiv.fadeOut("slow", function () {$eggDiv.remove();});
                scope.score += scope.point;
                let current_level = scope.score % scope.score_per_lever;
                if(current_level == 0){
                    if(scope.level < scope.level_max){
                        scope.level+= 0.5;
                    }else{
                        scope.level = scope.level_max;
                    }
                }
                $("div.score").text(scope.score);
            } else {
                eggObject.missedEgg();
            }
        }
    };


    this.missedEgg = function ()
    {
        var $egg = eggObject.$eggImageDiv;
        $egg.animate({top: scope.$basket.position().top+scope.$basket.height()-$egg.height()}, 500, "linear", eggObject.breakEgg);
    };

    this.breakEgg = function ()
    {
        //Lấy ra div life đầu tiên để remove
        let $divLife = $(scope.$lifeContainer).find(">:first-child");
        $($divLife).remove();
        //remove trứng đã rơi
        $(this).remove();
        scope.life--;
        if (scope.life == 0)
        {
            $("div.egg").remove();
            if(scope.score > parseInt(scope.user.score)){
                scope.user.score = scope.score;
                $.ajax({
                    headers: {
                        // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: 'https://order.hoanghamobile.com/api/gamea51/user',
                    type: 'POST',
                    processData: false,
                    contentType: 'application/json',
                    data: JSON.stringify(scope.user),
                    success: function success(data) {
                        if(data.success == true){
                            scope.user.score = scope.score;
                            setStorage("user",scope.user);
                        } else {
                            console.log('Error- '+ data.message);
                        }
                    },
                    error: function error(xhr, ajaxOptions, thrownError) {
                        console.log('Error ' + xhr.status + ' | ' + thrownError);
                    }
                });
            }
            $.confirm({
                title: 'Chúc mừng',
                content: 'Bạn đã được ' + scope.score + ' điểm!',
                type: 'red',
                columnClass: 'col-md-5 col-sm-12',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Chơi lại',
                        btnClass: 'btn-red',
                        action: function(){
                            window.location.reload();
                        }
                    },
                    close: {
                        text: 'Kết thúc',
                        action : function () {
                            redirectToHome();
                        }
                    }
                    }
            });
        }
    };
};





