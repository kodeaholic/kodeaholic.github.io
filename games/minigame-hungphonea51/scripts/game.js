// Download DOM before running jQuery script
$(document).ready(onLoad);

// Create global object so jQuery doesn't have to
// repeat the search for elements in the DOM
var scope = {};
// begin jQuery execution
function onLoad()
{
    let i;
    scope.user             = (getStorage("user") != null)?getStorage("user"): {};
    if(scope.user != null && scope.user.score != null){
         if (getStartTime() > scope.user.date){
             scope.user.date = getStartTime();
             scope.user.score = 0;
         }
    } else {
        scope.user.score = 0;
    }
    scope.user.score       = (scope.user == null || scope.user.score == null)? 0: scope.user.score;
    scope.previous_time    = 0;
    scope.$container       = $("div.game");
    scope.$basket          = $("div.basket");
    scope.$allChickens     = $("div.chicken");
    scope.$lifeContainer   = $("div.life-container");
    scope.$life            = `<div class="life"></div>`;
    scope.$egg             = $("div.egg");
    scope.pointer_width    = 0;
    scope.basket_width     = $(".basket").width();
    //Số điểm tăng thêm khi hứng được
    scope.point            = 10;
    //Số mạng chơi
    scope.life             = 3;
    //Số điểm
    scope.score            = 0;
    //Số điểm tăng cấp mỗi level
    scope.score_per_lever  = 100;
    //Level lúc đầu
    scope.level            = 1;
    //Level max
    scope.level_max        = 4;
    //Tốc độ(milliseconds)
    scope.speed            = 3;
    //Vị trí con trỏ trên cái giỏ
    scope.pointer_position = scope.basket_width / 2;
    //Position của phần tử cha
    scope.parentRect       = $("div.game")[0].getBoundingClientRect();
    scope.parentRectLeft   = $("div.chick-1")[0].getBoundingClientRect().left;
    scope.parentRectRight  = $("div.chick-3")[0].getBoundingClientRect().right;
    //Set life
    for (i = 1; i <= scope.life; i++)
    {
        let life = $(scope.$life).addClass("life-" + i);
        $(scope.$lifeContainer).append($(life));
    }

    if(scope.user.phone == null ) {
        $.confirm({
                      title: 'Chú ý !',
                      content: 'Bạn chưa đăng nhập',
                      columnClass: 'col-md-5 col-sm-12',
                      type: 'orange',
                      typeAnimated: true,
                      buttons: {
                          close: {
                              text: 'OK',
                              action : function () {
                                  localStorage.clear();
                                  redirectToHome();
                              }
                          }
                      }
                  });

    }
    if(!scope.user.phone.match(/^[0-9]{10}$/g)) {
        $.confirm({
                      title: 'Chú ý !',
                      content: 'Số điện thoại không đúng định dạng!',
                      type: 'orange',
                      typeAnimated: true,
                      columnClass: 'col-md-5 col-sm-12',
                      buttons: {
                          close: {
                              text: 'OK',
                              action : function () {
                                  localStorage.clear();
                                  redirectToHome();
                              }
                          }
                      }
                  });
    }
    if(!CSS.supports("justify-content:space-around")){
        $.confirm({
                      title: 'Chú ý !',
                      content: 'Trình duyệt của bạn không hỗ trợ hiệu ứng, cập nhập trình duyệt hoặc đổi trình duyệt',
                      type: 'orange',
                      typeAnimated: true,
                      columnClass: 'col-md-5 col-sm-12',
                      buttons: {
                          close: {
                              text: 'OK',
                              action : function () {
                                  redirectToHome();
                              }
                          }
                      }
                  });
    } else {
        window.setTimeout(chickensStartHatch, 2500);
    }
};
//add mouse over event to move basket
$("div.game").on("mousemove", function (e)
{
    //Nếu con trỏ vượt qua mép trái or phải thì ko di chuyển giỏ
    if (e.pageX - scope.pointer_position + 50 >= scope.parentRectLeft && e.pageX + scope.pointer_position <=
        scope.parentRectRight + 50)
    {
        scope.$basket.css("left", e.pageX - scope.parentRect.left - scope.pointer_position);
    }
});

//add touchmove event to move basket on mobile
$("div.game").on("touchmove", function (e)
{
    let cursor = e.originalEvent.touches[0].pageX;
    //Nếu con trỏ vượt qua mép trái or phải thì ko di chuyển giỏ
    if (cursor - scope.pointer_position + 50 > scope.parentRectLeft && cursor + scope.pointer_position <
        scope.parentRectRight + 50)
    {
        scope.$basket.css("left", cursor - scope.parentRect.left - scope.pointer_position);
    }
});

// select all chicken divs
function chickensStartHatch()
{
    // Lấy ngẫu nhiên 1 trong các div chicken để ấp trứng
    let random_index    = Math.floor(Math.random() * scope.$allChickens.length);
    let $eachChickenDiv = $(scope.$allChickens.splice(random_index, 1));
    // create object chicken object from Chicken class
    let $eachChickenObject = new Chicken($eachChickenDiv);
    $eachChickenObject.hatchEggs();
}
