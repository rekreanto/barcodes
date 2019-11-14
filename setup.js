var runButton=null;
var inpField=null;
var outpField=null;
var INPUT = "barcode_generator_input";

function setup(){
	// help text
	var showHelp = function(){$("#help-text").show(); $("#help-link").text("x");$("#shadow").css("display", "block");}
	var hideHelp = function(){$("#help-text").hide(); $("#help-link").text("?");$("#shadow").css("display", "none");}
	var toggle = function(a,b){
		var transitions = [a,b];
		var state = 0;
		return (function transit(e){
			e.preventDefault();
			transitions[state]();
			state = 1-state;
		});
	};
	hideHelp();
	$("#shadow").click(hideHelp);
	$("#help-link").click( toggle(showHelp, hideHelp) );


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
