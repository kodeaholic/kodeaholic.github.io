function getStartTime() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function redirectToGame() {
    let href                = window.location.href;
    if (href.indexOf('index.') !== -1) {
        href                    = href.replace('index.', 'game.');
    }
    else {
        // truong hop URL khong chua "index.html"
        href += 'game.html'
    }
    window.location.href    = href
}

function redirectToHome() {
    let href                = window.location.href;
    href                    = href.replace('game.', 'index.');
    window.location.href    = href
}

function setStorage(key, value,serialize = true) {
    localStorage.setItem(key,(serialize == true) ? JSON.stringify(value):value);
}

function getStorage(key, defaultValue = null, unserialize = true) {
    if (localStorage.getItem(key))
    {
        return (unserialize == true)?JSON.parse(localStorage.getItem(key)):localStorage.getItem(key);
    }
    return defaultValue;
}

function removeStorage(key) {
    localStorage.removeItem(key);
}

function warning(content,columnClass = 'col-md-5 col-sm-12') {
    $.confirm({
        title: 'Chú ý !',
        content: content,
        type: 'orange',
        typeAnimated: true,
        columnClass: columnClass,
        buttons: {
            close: {
                text: 'OK',
                action : function () {
                }
            }
        }
    });
}

function setNextEgg() {
    let random_index    = Math.floor(Math.random() * $("div.chicken").length);
    let $eachChickenDiv = $($("div.chicken")[random_index]);
    var now = Date.now();
    if(scope.previous_time == 0){
        scope.previous_time       = now;
    }
    var nextEggTime = getRandomInt(500,2000);
    let timeFromLastEgg = now - scope.previous_time;
    if(timeFromLastEgg + nextEggTime < 1500 ){
        nextEggTime = (timeFromLastEgg < 0)?1000 - timeFromLastEgg : timeFromLastEgg;
    }
    console.log(nextEggTime);
    let $eachChickenObject = new Chicken($eachChickenDiv);
    window.setTimeout(function ()
        {
            $eachChickenObject.hatchEggs();
        },  nextEggTime
    );
    scope.previous_time = Date.now() + nextEggTime;
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * max) + min;
}