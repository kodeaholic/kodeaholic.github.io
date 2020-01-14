// Create Egg Class in a separate js files as a prototype
// for mulitple eggs

// Create Class Egg with parameter $chickenDiv
// because I need to know where to create the egg div.
function Egg($chickenDiv)
{
    // this. is used to point to individual object
    // of future egg objects
    // position: https://api.jquery.com/position/
    //Set vị trí cho trứng rơi
    this.chickenDivPosition = $chickenDiv.position();
    this.startPosLeft       = this.chickenDivPosition.left + $chickenDiv.width() / 2-17;
    this.startPosTop        = this.chickenDivPosition.top + $chickenDiv.height() - 50;



    // create div in memory to hold egg image
    // set width, height and background via class egg in egg_style.css
    // set left and top position via input parameters
    this.$eggImageDiv = $("<div></div>").attr("class", "egg").css({"left": this.startPosLeft,"top" : this.startPosTop});

    $chickenDiv.append(this.$eggImageDiv);
    // calculate distance of egg fall by subtracting it's position from the window
    var basket            = new Basket();
    //Khoảng cách từ giỏ tới con gà, tăng giảm để set vị trí khi hứng trứng
    this.distanceToBasket = basket.basketTop-13;

    //create function startFall to animate egg drop and find out the height
    // of the window and myltipy by to 10 to control speed.
    // this.breakEgg is a callback function that will called after
    // egg animation is complete
    var milliSeconds = window.innerHeight * (scope.speed - scope.level);

    //capture 'this' into separate variable to use it for
    // further calcution. 'this' will change its meaning inside
    // local functions and loops therefore we need to capture it in
    // a separate variabe. Credit for 'var basketObject = 'this' goes to:
    // http://stackoverflow.com/questions/520019/controlling-the-value-of-this-in-a-jquery-event

    var eggObject = this;

    this.startFall = function ()
    {
        this.$eggImageDiv.animate({top: this.distanceToBasket}, milliSeconds, "linear", this.catchEgg);
    };


    // this.breakEgg is a callback function triggered by animate function
    // after animation is complete
    // remove() is opposite of append to remove from DOM
    this.catchEgg = function ()
    {
        if(scope.life>0){
            // $(this).fadeOut('slow', function(){$(this).remove();});
            var $eggDiv      = $(this);
            // $eggDiv.css('border', '20px solid purple');
            var $eggPosition = $eggDiv.position();

            var basket      = new Basket();
            var basketRight = basket.basketRight;
            var basketLeft  = basket.basketLeft;
            var eggLeft     = $eggPosition.left;
            var eggRight    = $eggPosition.left + $eggDiv.width();
            var isCatched = basketRight > eggRight && basketLeft < eggLeft;

            if (isCatched)
            {
                $eggDiv.fadeOut("slow", function () {$eggDiv.remove();});
                scope.score += scope.point;
                let current_level = scope.score % scope.score_per_lever;
                if(current_level == 0){
                    if(scope.level < scope.level_max){
                        scope.level++;
                    }else{
                        scope.level = scope.level_max;
                    }
                }
                $("div.score").text(scope.score);
            } else
            {
                eggObject.missedEgg();
            }
        }
    };


    this.missedEgg = function ()
    {
        var $egg = eggObject.$eggImageDiv;
        $egg.animate({top: scope.$basket.position().top+scope.$basket.height()-$egg.height()}, 500, "linear", eggObject.breakEgg);
        scope.life = (--scope.life < 0) ? 0 : scope.life;
    };

    this.breakEgg = function ()
    {
        var player   = $.urlParam("player");
        //Lấy ra div life đầu tiên để remove
        let $divLife = $(scope.$lifeContainer).find(">:first-child");
        $($divLife).remove();
        //remove trứng đã rơi
        $(this).remove();
        if (scope.life <= 0)
        {
            $("div.egg").remove();
            alert("Chúc mừng, bạn đã được "+scope.score+" điểm!");
            // $.ajax({
            //     headers: {
            //         // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //     },
            //     url: "http://localhost:2750/saveScore",
            //     type: 'POST',
            //     data:{arrId:arrId,arrOldImage:arrOldImage},
            //     beforeSend: function(){
            //         if(_isLoading==0){
            //             _isLoading = 1;
            //         }else{
            //             notify(_error, 'error',_messageLoading, '#AA3131', '#792A2A');
            //             return false;
            //         }
            //     },
            //     success: function success(data) {
            //         if(data.status == _statusOK){
            //             toastr.success(data.message, '',{timeOut: 2000});
            //             // window.location.reload();
            //         }else{
            //             notify(_error, 'error',data.message, '#AA3131', '#792A2A');
            //         }
            //     },
            //     error: function error(xhr, ajaxOptions, thrownError) {
            //         console.log('Error ' + xhr.status + ' | ' + thrownError);
            //     }
            // });
        }
    };


};


// plugin function from http://snipplr.com/view/26662/get-url-parameters-with-jquery--improved/

$.urlParam = function (name)
{

    url = window.location.href;

    var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(url);
    if (!results)
    {
        return undefined;
    }
    return unescape(results[1]) || undefined;
};






