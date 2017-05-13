$(document).ready(function()
{
	createQuizLayout();
	initQuiz();
});

function createQuizLayout()
{
	var countries = ["USA", "Uk", "India", "Germany", "Turkey", 
					"France", "Nepal", "Japan", "South Africa", "Maldives"];
	var capitals = ["Washington", "London", "Delhi", "Berlin", "Istanbul",
					"Paris", "Kathmandu", "Tokio", "Capetown", "Male"];

	var arrCountry = [];
	for (var i = 0; i < countries.length; i++) {
		arrCountry.push('<li data-index="' + (i+1) + '"> ' + countries[i] + '</li>');
	}
	var arrCapital = [];
	for (var i = 0; i < capitals.length; i++) {
		arrCapital.push('<li data-index="' + (i+1) + '"> ' + capitals[i] + '</li>');
	}

	arrCountry = shuffle(arrCountry);
	arrCapital = shuffle(arrCapital);

	$('#source').html(arrCountry.join(''));
	$('#target').html(arrCapital.join(''));
}

function shuffle(o) 
{
	for (var j, x, i = o.length; i; 
			j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function initQuiz()
{
	$('#source li').draggable(
	{
		revert : true,
		revertDuration : 200,
		cursor : "move"
	});
}