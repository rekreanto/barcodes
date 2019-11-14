var runButton=null;
var inpField=null;
var outpField=null;
var INPUT = "barcode_generator_input";

function setup(){
	// help text
	var showHelp = function(){
		$("#help-text").show();
		$("#help-link").text("x").css("color","white");
		$("#shadow").css("display", "block").css("opacity", "0.3");;
	};
	var hideHelp = function(){
		$("#help-text").hide();
		$("#help-link").text("?").css("color","black");;
		$("#shadow").css("display", "none").css("opacity", "0");
	};
	var toggleHelp = (function(a,b){
		var transitions = [a,b];
		var state = 0;
		return (function TOGGLE(e){
			e.preventDefault();
			transitions[state]();
			state = 1-state;
		});
	})(showHelp,hideHelp);;
	hideHelp();
	$("#shadow").click( toggleHelp );
	$("#help-link").click( toggleHelp );


	inpField = $("textarea.input");
	outpField= $("div#output");
	runButton = $("button.run");

	var stored = localStorage.getItem(INPUT);
	if(stored){ inpField.val(localStorage.getItem(INPUT)); }
	inpField.focus();
	runButton.click(update);

	update()
}


function update(){
		var text = inpField.val();
		localStorage.setItem(INPUT,text);
		outpField.html( replEAN( replBold( replLine( replTitle( text ) ) ) ) );
}


function replBold(str){
	return str.replace(/[*](.+?)[*]/g,"<b>$1</b>");
}


function replTitle(str){
	return str.replace(/^(=+)(.+?)(=*)$/mg,function(m,a,title,c){
		var tag = 'h'+a.length;
		return '<'+tag+'>'+title+'</'+tag+'>';
	});
}


function replLine(str){
	return str.replace(/---+/g,"<hr />");
}



function replEAN(str){
	return str.replace(/\d\d\d\d\s?\d\d\d\s?\d\d\d\s?\d\d\d/g,str2svg);
}
