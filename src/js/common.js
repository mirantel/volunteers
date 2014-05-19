$(window).load(function(){

$('#vote-btn').attr('disabled', 'disabled');
$("#js-voteData").height($("#js-voteResult").height() - 4);

var valdYear = false;
var valdList = false;
var valdLocation = false;

function valid(){
	if ( valdYear && valdList && valdLocation) {
		$('#vote-btn').removeAttr("disabled");
	}
	else {
		$('#vote-btn').attr('disabled', 'disabled');
	}
}

$("#js-voteData, .vote__cell").sortable({
	placeholder: "ui-sortable-placeholder",
	connectWith: ".js-sortable:not(\".full\")",
	update: function () {
		if (($(this).children().length >= 1) && ($(this).hasClass("vote__cell"))) {
			$(this).addClass("full");
		}
		$(this).children("input.js-votePlace").val($(this).children(".vote__item").attr("id"));
		if ($("#js-voteResult").find(".vote__item").length){
			valdList = true;
		}
		else {
			valdList = false;
		}
		valid();
	},
	remove: function () {
		if ($(this).hasClass("vote__cell")) {
			$(this).removeClass("full");
		}
	},
});

$('#js-voteYear').on('input propertychange keyup', function(){
	var minAge = 18;
	var maxYear = new Date().getFullYear() - minAge;
	var minYear = maxYear - 90;
	var myYear = $(this).val();

	if (myYear.length > 3){
		if ((myYear > minYear) && (myYear < maxYear)) {
			$(this).parent().removeClass("has-error").addClass("has-success");
			valdYear = true;
		}
		else {
			$(this).parent().removeClass("has-success").addClass("has-error");
			valdYear = false;
		}
	}
	else {
		$(this).parent().removeClass("has-success has-error").removeClass("");
		valdYear = false;
	}
	valid();
});

$('#js-voteLocation').change(function() {
	if ($("#js-voteLocation :selected").val() == 0){
		$(this).parent().removeClass("has-success").addClass("has-error");
		valdLocation = false;
	}
	else {
		$(this).parent().removeClass("has-error").addClass("has-success");
		valdLocation = true;
	}
	valid();
});

});