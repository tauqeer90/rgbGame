var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1Display = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var pickedColor;
var colors = [];

init();

function init () {
	resetColorHolders(6);
	var isHard = true;

	for(var i = 0; i < modeButtons.length; i++)
	{
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			isHard = this.textContent === "Easy" ? false : true;
			resetColorHolders(isHard ? 6 : 3);
		});
	}

	resetButton.addEventListener("click", function () {
		resetColorHolders(isHard ? 6 : 3);
	});

}

function resetColorHolders (numOfHolders) {
	colors = generateRandomColors(numOfHolders);
	pickedColor = pickRandomColor();
	colorDisplay.textContent = pickedColor;
	h1Display.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Game";
	setupColorHolders();
	messageDisplay.textContent = "";
}

function setupColorHolders () {
	for(var i = 0; i < squares.length; i++)
	{
		if(colors[i])
		{
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
			squares[i].addEventListener("click", function () {
			var clickedColor = this.style.backgroundColor;

			if(clickedColor === pickedColor)
			{
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again?";
				changeColor(pickedColor);
				h1Display.style.backgroundColor = pickedColor;
			} else {
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
			});
		} else {
			squares[i].style.display = "none";
		}
	}
}

function changeColor (color) {
	for(var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

function pickRandomColor()
{
	return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num)
{
	var arr = [];
	for(var i = 0; i < num; i++)
	{	
		arr.push(generateRandomColor());
	}

	return arr;
}

function generateRandomColor()
{
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}