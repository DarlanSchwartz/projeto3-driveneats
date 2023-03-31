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


// Pegar todos os pratos do site e para cada prato adicionar um onClick - Lambda - Função de selecionar
// ou deselecionar um item e deselecionar todos os outros da mesma classe

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

  // Função que checa quando deve ser ativo o botão de Fechar pedido
  function CheckCompleteCheckout()
  {
    // Preciso que tenha pelo menos uma sobremesa uma comida e uma bebida para ativar o botão
    if(selectedDessert != null && selectedDish !=null && selectedDrink !=null )
    {
        // Config do botão ativo
        checkoutButton.textContent = "Fechar pedido";
        checkoutButton.style.backgroundColor = "rgba(50, 183, 47, 1)";
        checkoutButton.style.cursor = "pointer";
        canBuy = true;
    }
    else
    {
        // Config do botão desativado
        checkoutButton.textContent = "Selecione os 3 itens para fechar o pedido";
        checkoutButton.style.backgroundColor = "rgba(203, 203, 203, 1)";
        checkoutButton.style.cursor = "not-allowed";
        canBuy = false;
    }
  }

// Função de quando clico no botão de Fechar Pedido
  function Checkout()
  {
    // Se eu cheguei aqui de alguma maneira sem ter os 3 itens selecionados paro a função
    if(!canBuy)
    {
      return;
    }

    // Pegar os preços da comida bebida e sobremesa e dividilos pelo espaço em branco formando uma array [R$][7,90]

    let dishValue= selectedDish.querySelector('.dish-price').textContent.split(' ');
    let drinkValue= selectedDrink.querySelector('.dish-price').textContent.split(' ');
    let dessertValue= selectedDessert.querySelector('.dish-price').textContent.split(' ');

    // Pegar os nomes da comida bebida e sobremesa

    let dishName = selectedDish.querySelector('.dish-title').textContent;
    let drinkName = selectedDrink.querySelector('.dish-title').textContent;
    let dessertName = selectedDessert.querySelector('.dish-title').textContent;

    // Setar o nome da comida na janela de checkout

    confirmWindow.querySelector('.dish-order-name').textContent = dishName;
    confirmWindow.querySelector('.dish-order-price').textContent = dishValue[1];

    // Setar o nome da bebida na janela de checkout
    confirmWindow.querySelector('.drink-order-name').textContent = drinkName;
    confirmWindow.querySelector('.drink-order-price').textContent = drinkValue[1];

    // Setar o nome da sobremesa na janela de checkout
    confirmWindow.querySelector('.dessert-order-name').textContent = dessertName;
    confirmWindow.querySelector('.dessert-order-price').textContent = dessertValue[1];

    // Substituir o valor 1 '(7,90)' das arrays que guardam os preços por um ponto para que o parse possa ser dado
    dishValue[1] = dishValue[1].replace(',','.');
    drinkValue[1] = drinkValue[1].replace(',','.');
    dessertValue[1] = dessertValue[1].replace(',','.');

    // Transformar os precos das comidas que estão no formato [7.90] agora em numeros float
    dishValue = parseFloat(dishValue[1]);
    drinkValue = parseFloat(drinkValue[1]);
    dessertValue = parseFloat(dessertValue[1]);

    // Somar os tres valores float e fixar o numero de casas em duas, para que não fique 7.900000000000000003
    let totalValue = (dishValue + drinkValue + dessertValue).toFixed(2);

    // Setar o valor total e substituir o ponto por uma vírgula para ficar mais legível
    confirmWindow.querySelector('.total-value').textContent = "R$ " + totalValue.replace('.',',');

    // Mostrar a tela de checkout
    confirmWindow.style.display = "flex";

    // Montar um texto com o nome e valor total dos items selecionados para este checkout
    formattedText = ("Olá, gostaria de fazer o pedido: %0a- Prato: "+ dishName + "%0A - Bebida: " + drinkName + "%0A - Sobremesa: " + dessertName + "%0A Total : " + "R$ " + totalValue.replace('.',','));
  }

  // Fechar a tela de checkout
  function CloseCheckoutWindow ()
  {
    confirmWindow.style.display = "none";
  }

  // Função quando aperta o botão "Tudo bem pode pedir!"
  function ConfirmCheckout()
  {
    //Perguntar nome e endereço e concatenar ao texto que iniciará a conversa do whatssapp
    let userName = prompt('Qual o seu nome?');
    let userAdress = prompt('Qual o seu endereço?');
    window.open("https://wa.me/5551998788448?text=" + formattedText + "%0A Seu nome: " + userName + "%0A Seu endereço: " + userAdress, "_blank");
    
    //  https://wa.me/99999999?text=urlencodedtext
   /* Olá, gostaria de fazer o pedido:
- Prato: Frango Yin Yang
- Bebida: Coquinha Gelada
- Sobremesa: Pudim
Total: R$ 27,70*/
  }



