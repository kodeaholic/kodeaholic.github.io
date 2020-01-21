// create Basket Class
function Basket(){
  this.basketPosition = scope.$basket.position();

  this.basketTop      = this.basketPosition.top;
  this.basketLeft     = this.basketPosition.left;

  this.basketRight    = this.basketLeft + scope.$basket.width();
  this.basketBottom   = this.basketTop + scope.$basket.height();
}


