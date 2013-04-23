/*js script file for itc298/assignments/shopping/index.html*/
/*Written by Mario Keeney-Ditolla of mardit.com on 2/24/2013, please do not reuse unless you give me credit!*/
/*dependent files: index.html, jquery-1.9.0.js, styles.css*/

//Array containing the drinks and their details.
//format is as follows:
/*
Main array = drinkList.
drinkList = [[drink1][drink2][drink3]];

drink = ["Name", "Description", "imageFileName (-.jpg extension)", price];

When entering a new drink, simply follow the format. 
1) Add a comma where it says "next drink here".
2) Fill in the info in the [] next to "drink = ", leaving the commas and [] in place
3) Copy and paste everything between the [] symbols, INCLUDING the symbols themselves, into the space after the comma you placed in step 1.
4) Add a comma and a new zero in the 'numDrinks' line under the drink list.
5) Save the file, and when you run it, you should see the new drinks added.
6) Place an image for the drink with the same name that you put in image file name into the folder named 'images'.  Make sure you did not put an extension such as .jpg on the file when you put it into it's spot above/below.  The image must be saved as a .jpg file and the program will do everything else for you.

*/
var drinkList = [
	[
		"Vanilla Latte",
		"A lovely foamy latte made with whole milk, with just a dash of Vanilla. (Comes with 2 shots of coffee)",
		"vanillaLatte",
		5.59
	],
	[
		"Hot Chocolate",
		"A delicious and chocolatey hot drink topped with decadent whipped cream.",
		"hotChocolate",
		3.29
	],
	[
		"Strawberry Smoothie",
		"A chilled beverage with no less than 8 strawberries and a dash of apple juice blended with ice.",
		"strawberrySmoothie",
		7.89
	],
	[
		"Iced Mocha",
		"A lovely iced chocolate mocha with whipped cream. (Comes with 2 shots of coffee)",
		"icedMocha",
		6.39
	]//add next drink here
]//leave this alone.  End drinkList[]

//when adding a new drink, put another comma and 0 into the line below.
//i.e. [0, 0, 0] becomes [0, 0, 0, 0, 0] if you add two drinks.
//Make sure you count the 0's, if there is not an equal number of 0 comma pairs and drinks, the app will crash.
var numDrinks = [0, 0, 0, 0];//<-------Add the 0 over there. Tracks the number of drinks ordered for each beverage


/*DO NOT CHANGE ANYTHING BELOW THS LINE!!! DO NOT CHANGE ANYTHING BELOW THS LINE!!! DO NOT CHANGE ANYTHING BELOW THS LINE!!!*/

//tracks which cell is currently highlighted in the drinks_list table
var currentHighlight = "";

//asks if anything is highlighted
var highlighted = false;

//allows code that makes the photo visible to run if a photo is not visible
var hidden = true;

//tracks the array address of the drink being targeted with the current highlight
var arrayTarget = 0;

//grand total price
var grandTotal = 0;

//total number of drinks ordered
var totalDrinks = 0;


$(function(){
	$('#image_preview img').hide();//hides the image on pageload
	
	createDrinkList();//fills the drink_list table, also loads the shopping cart
	
	$('#drink_list td').click(changeDrink);//td click event handler, runs changeDrink when a #drink_list td is clicked.
	
	$('#add_item').click(addToCart);//when the add to cart button is clicked
	$('#remove_item').click(removeFromCart);//remove from cart button
	$('#clear_cart').click(clearCart);//clear cart button
	rowColor();
	teacherAlert();
});

function teacherAlert(){
	alert('Please read the notes below and look at my JavaScript. I wrote it all from scratch.');
	alert('I mean it!');
	alert('Seriously!');	
}

function changeDrink() {
		//provides drinkList primary array address in a variable
		arrayTarget = $(this).attr('rel');
		
		//finds the drink image name in the drinkList array
		var picSrc = "images/" + drinkList[arrayTarget][2] + ".jpg";
		
		//changes src attribute to new drink
		$('#image_preview img').attr('src', picSrc);
		
		//checks to see if hidden is true, and if so reveals the picture and makes hidden false to prevent unnecessary js in following clicks.
		if(hidden){
			$('#image_preview img').show();
			hidden = false;	
		}
		
		//changes the image preview elements based on the drinkList primary array address variable
		$('p.drink_name').html(drinkList[arrayTarget][0]);
		$('p.drink_desc').html(drinkList[arrayTarget][1]);
		$('p.drink_price').html("$" + drinkList[arrayTarget][3]);
		
		//records the class name of the element clicked for use in the highlight function
		var thisClass = $(this).attr('class');
		highlightIt(thisClass);
}//end changeDrink()

function highlightIt(thisClass){
	
	//makes sure the js doesn't run the first time an image is clicked
	if (currentHighlight != ""){
		$(currentHighlight).removeClass('highlight');
	}
	
	//highlights the paragraph tag that has the same class as the td clicked
	$('p.' + thisClass).addClass('highlight');
	currentHighlight = 'p.' + thisClass;
	highlighted = true;
}//end highlightIt()


function createDrinkList(){
	//creates all the drinks based on the information in the drinkList array
	for (var i = 0; i < drinkList.length; i++){
		
		//drink_list table
		$('#drink_list').append('<tr><td class="drink_name" rel="' + i + '">' + drinkList[i][0] + '</td><td class="drink_desc" rel="' + i + '">' + drinkList[i][1] + '</td><td class="drink_price" rel="' + i + '">$' + drinkList[i][3] + '</td></tr>');
	}//end for
	
	updateCart();//writes the cart
}//end createDrinkList()

function addToCart(){
	if (highlighted) {
		numDrinks[arrayTarget]++;
		updateCart();
		
	}//end if highlighted
	
	if (!highlighted) {
		alert('Please click a drink before attempting to add it to your order!');	
	}
}//end addToCart()

function removeFromCart(){
	if (numDrinks[arrayTarget] > 0){//prevents someone from removing an item that isn't already in the cart.
		numDrinks[arrayTarget]--;//removes a single drink and updates the cart.
		updateCart();	
	} else {
		alert("You haven't ordered that drink!");	
	}
}

function clearCart(drinksAmount) {//clears the cart by resetting all values and running upDateCart()

	//allows numDrinks to clear dynamically, to allow users to increase the array at the top of the page and not worry about the clear cart function
	for (var i = 0; i < numDrinks.length; i++){
		numDrinks[i] = 0;	
	}
	grandTotal = 0;
	totalDrinks = 0;
	updateCart();	
}

function updateCart(){
	
	//completely empties the tbody of the shopping cart
	$('#shopping_cart tbody').empty();
	
	//set totalDrinks and grandTotal to 0 to avoid constant pile-up.
	totalDrinks = 0;
	grandTotal = 0;
	
	for(var i = 0; i < numDrinks.length; i++){
		
	//rewrites the body of the shopping cart, updating it
	$('#shopping_cart tbody').append('<tr><td>' + drinkList[i][0] + '</td><td class="num_drinks" class="' + i + '">' + numDrinks[i] + '</td><td class="drink_price">$' + (drinkList[i][3] * numDrinks[i]).toFixed(2) + '</td></tr>');
	

	//adds up the grand total number of drinks in the order and the grand total price
	totalDrinks += numDrinks[i];
	grandTotal += (drinkList[i][3] * numDrinks[i]);
}//end for
	
	//rewrites the grand total number of drinks and grand total price
	$('#drinks_total').html(totalDrinks);
	$('#grand_total').html('$' + grandTotal.toFixed(2));
	}//end updateCart()

	
function rowColor(){
	$('#shopping_cart tbody tr:even').addClass('blueish');
	$('#drink_list tr:even').addClass('reddish');	
}