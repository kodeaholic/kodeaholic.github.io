// create Basket Class
function Basket(){
  this.divBasket = $('div.basket');
  this.basketPosition = this.divBasket.position();

  this.basketTop = this.basketPosition.top;
  this.basketLeft = this.basketPosition.left;

  this.basketRight = this.basketLeft + this.divBasket.width();
  this.basketBottom = this.basketTop + this.divBasket.height();
}


