// creat Chicken Class with parameter $chickenDiv
function Chicken($chickenDiv)
{
    this.hatchEggs = function ()
    {
        if(scope.life>0){
            let random_index    = Math.floor(Math.random() * $("div.chicken").length);
            let $eachChickenDiv = $($("div.chicken")[random_index]);
            this.nextEgg        = new Egg($eachChickenDiv);
            // calling function startFall of nextEgg object
            this.nextEgg.startFall();
        }
    };


}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * max) + min;
}
