// Download DOM before running jQuery script
// $(document).ready(onLoad);

// var scope = {};
// text function to test creation of new egg
function onLoad()
{


    // calling testFirstChicken function in 1 second after DOM loads
    // setTimeout() is used to start function after 1 second
    // window.setTimeout(testFirstChicken, 1000);

    // function testFirstChicken(){
    //  // getting first chicken div from the DOM
    //  var $firstChickenDiv = $('div.chicken').first();
    //  // creating firstChicken object from Class Chicken, and passing $firstChickenDiv
    //  // as a parameter
    //  var firstChicken = new Chicken($firstChickenDiv);
    //  // calling function hatchEggs
    //  firstChicken.hatchEggs();
    // }


}

// creat Chicken Class with parameter $chickenDiv
function Chicken($chickenDiv)
{
    // Tạo hàm đệ qui với setTimeout trong đó time out là ngẫu nhiên
    this.hatchEggs = function ()
    {
        if(scope.life>0){
            this.nextEgg = new Egg($chickenDiv);
            // calling function startFall of nextEgg object
            this.nextEgg.startFall();
            // calculate period when next egg will start falling in milliseconds
            var nextEggTime = getRandomInt((6-scope.level)*1000, 10000);
            // credit for bind this http://.com/questions/5911211/settimeout-inside-javascript-class-using-this
            window.setTimeout(this.hatchEggs.bind(this), nextEggTime)
        }
    };


}

// getRandomInt function credit: https://gist.github.com/kerimdzhanov/7529623

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
