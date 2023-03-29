let canBuy = false;

let selectedDish = null;
let selectedDrink = null;
let selectedDessert = null;

let formattedText = "";

const dishes = document.querySelectorAll('.dish-content');
const drinks = document.querySelectorAll('.drink-content');
const desserts = document.querySelectorAll('.dessert-content');
const checkoutButton = document.querySelector('.checkout-btn');
const confirmWindow = document.querySelector('.confirm-window');
const cancelCheckoutButton = document.querySelector('.cancel-checkout-btn');
const confirmCheckoutButton = document.querySelector('.confirm-checkout-btn');

cancelCheckoutButton.addEventListener('click',CloseCheckoutWindow);
checkoutButton.addEventListener('click',Checkout);
confirmCheckoutButton.addEventListener('click',ConfirmCheckout);

  dishes.forEach(dish => {
    dish.addEventListener('click', () => {
      if (dish.classList.contains('selected')) {
        dish.classList.remove('selected');
        dish.querySelector("ion-icon").classList.add("hide")
        selectedDish = null;
      } else {
        dishes.forEach(dish => {
          dish.classList.remove('selected');
          dish.querySelector("ion-icon").classList.add("hide")
        });
        dish.classList.add('selected');
        dish.querySelector("ion-icon").classList.remove("hide")
        selectedDish = dish;
      }

      CheckCompleteCheckout();
    });
  });

  drinks.forEach(drink => {
    drink.addEventListener('click', () => {
      if (drink.classList.contains('selected')) {
        drink.classList.remove('selected');
        drink.querySelector("ion-icon").classList.add("hide")
        selectedDrink = null;
      } else {
        drinks.forEach(drink => {
            drink.classList.remove('selected');
            drink.querySelector("ion-icon").classList.add("hide")
        });
        drink.classList.add('selected');
        drink.querySelector("ion-icon").classList.remove("hide")
        selectedDrink = drink;
      }

      CheckCompleteCheckout();
    });
  });

  desserts.forEach(dessert => {
    dessert.addEventListener('click', () => {
      if (dessert.classList.contains('selected')) {
        dessert.classList.remove('selected');
        dessert.querySelector("ion-icon").classList.add("hide");
        selectedDessert = null;
      } else {
        desserts.forEach(dessert => {
            dessert.classList.remove('selected');
            dessert.querySelector("ion-icon").classList.add("hide");
        });
        dessert.classList.add('selected');
        dessert.querySelector("ion-icon").classList.remove("hide")
        selectedDessert = dessert;
      }

      CheckCompleteCheckout();
    });
  });


  function CheckCompleteCheckout()
  {
    if(selectedDessert != null && selectedDish !=null && selectedDrink !=null )
    {
        checkoutButton.textContent = "Fechar pedido";
        checkoutButton.style.backgroundColor = "rgba(50, 183, 47, 1)";
        checkoutButton.style.cursor = "pointer";
        canBuy = true;
    }
    else
    {
        checkoutButton.textContent = "Selecione os 3 itens para fechar o pedido";
        checkoutButton.style.backgroundColor = "rgba(203, 203, 203, 1)";
        checkoutButton.style.cursor = "not-allowed";
        canBuy = false;
    }
  }

  function Checkout()
  {
    
    if(!canBuy)
    {
      return;
    }

    let dishValue= selectedDish.querySelector('.dish-price').textContent.split(' ');
    let drinkValue= selectedDrink.querySelector('.dish-price').textContent.split(' ');
    let dessertValue= selectedDessert.querySelector('.dish-price').textContent.split(' ');

    let dishName = selectedDish.querySelector('.dish-title').textContent;
    let drinkName = selectedDrink.querySelector('.dish-title').textContent;
    let dessertName = selectedDessert.querySelector('.dish-title').textContent;

    confirmWindow.querySelector('.dish-order-name').textContent = dishName;
    confirmWindow.querySelector('.dish-order-price').textContent = dishValue[1];

    confirmWindow.querySelector('.drink-order-name').textContent = drinkName;
    confirmWindow.querySelector('.drink-order-price').textContent = drinkValue[1];

    confirmWindow.querySelector('.dessert-order-name').textContent = dessertName;
    confirmWindow.querySelector('.dessert-order-price').textContent = dessertValue[1];

    dishValue[1] = dishValue[1].replace(',','.');
    drinkValue[1] = drinkValue[1].replace(',','.');
    dessertValue[1] = dessertValue[1].replace(',','.');

    dishValue = parseFloat(dishValue[1]);
    drinkValue = parseFloat(drinkValue[1]);
    dessertValue = parseFloat(dessertValue[1]);

    let totalValue = (dishValue + drinkValue + dessertValue).toFixed(2);

    confirmWindow.querySelector('.total-value').textContent = "R$ " + totalValue.replace('.',',');
    confirmWindow.style.display = "flex";

    formattedText = "Olá, gostaria de fazer o pedido: - Prato: "+ dishName + " - Bebida: " + drinkName + " - Sobremesa: " + dessertName + " ------ Total:" + "R$ " + totalValue.replace('.',',');
  }

  function CloseCheckoutWindow ()
  {
    confirmWindow.style.display = "none";
  }

  function ConfirmCheckout()
  {
    window.open("https://wa.me/51998788448?text=" + formattedText, "_blank");
    
    //https://wa.me/51998788448?text=urlencodedtext
  }



