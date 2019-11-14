//The complete data
// barcode format: sequence of unit lengths, implicit color: BWBW..B
rev = function(xs){return xs.slice(0).reverse();}
cp = function(xs){return xs.slice(0);}
id = function(xs){return xs;}
function pint(str){return parseInt(str,10);}
Array.prototype.flatten = function flatten(){
   var flat = [];
   for (var i = 0, l = this.length; i < l; i++){
       var type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase();
       if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten.call(this[i]) : this[i]); }
   }
   return flat;
};

var EAN13 = {};
EAN13.valid = function
  // 13 digits -> Bool
  (xs){
    if(xs.length !== 13) return false;
    var digsum = 0;
    for(var i = 0;i<13;i++) digsum += (i%2===1?3:1)*xs[i];
    return digsum%10 === 0;
  }

paddings=[
	[1,1,1],
	[1,1,1,1,1],
	[1,1,1]];
digitBars=[
	[3,2,1,1],[2,2,2,1],[2,1,2,2],
	[1,4,1,1],[1,1,3,2],[1,2,3,1],
	[1,1,1,4],[1,3,1,2],[1,2,1,3],
	[3,1,1,2]];
rPatterns=[
	[0,0,0,0,0,0],[0,0,1,0,1,1],[0,0,1,1,0,1],
	[0,0,1,1,1,0],[0,1,0,0,1,1],[0,1,1,0,0,1],
	[0,1,1,1,0,0],[0,1,0,1,0,1],[0,1,0,1,1,0],
	[0,1,1,0,1,0]];

/*invariants about the data:
  - no digit bar can be reversed into a digit bar
  - there are 10 digit bars: 0..9
  - each digit bar has length 7
  - there are 10 rPatterns: 0..9
*/


//bar-code:: [15 * color-span]
//ean-code:: [13 * digits]
//digits2barcode:: ean-code -> bar-code
function digits2barcode(xs){
	//xs="4902030193881".split('');
	pat=rPatterns[xs[0]];
	//console.log(pat)
	r=[];
	xs.slice(1).forEach(function(x,i){r.push((pat[i]?rev:cp)(digitBars[x]));});
	//console.log(r.toString())
	r2=[[1,1,1],
		r.slice(0,6),
		[1,1,1,1,1],
		r.slice(6,12),
	[1,1,1]]
	return r2.flatten()
}

//rects:: 47*[x-pos,width,height]
function barcode2rects(rs){
	FPOS=15; BASE=2;HEIGHT=90;DIGSIZE=9;
	FULL={0:true,2:true,28:true,30:true,56:true,58:true}
	svgTextLines=[]
	pos=FPOS;
	isBlack=true;
	rects=[]
	rs.forEach(function(x,i){
		//console.log(i)
		if(isBlack){rects.push([pos,x*BASE,FULL[i]?HEIGHT:HEIGHT-DIGSIZE]);}
		isBlack=!isBlack
		pos+=x*BASE
	})
	return rects;
}

//rects2svg:: rects, ean -> svg
function rects2svg(rs,digits,scale){ var ok, rects, svg;
    ok = EAN13.valid(digits);
    console.log("OK?",digits,ok)

	scale=scale||1;
	rects=[
    /*, '<rect x="0" y="0" width="220" height="2" fill="black" />'*/
    ]

	rs.forEach(function(xw){rects.push('<rect x="'+xw[0]+'" y="0" width="'+xw[1]+'" height="'+xw[2]+'" fill="black" />')})
	svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 220 '+HEIGHT+'" width="'
    +120*scale+'px" height="'+58*scale+'px" >'+rects.join('\n');

    if(!ok){svg+='<text x=5 y=50 font-family="Sans-serif" font-size="40" fill="red" style="stroke:white;stroke-width:2px;font-weight:bold" >NOT VALID</text>'}

    svg += '<text x="2, 27,39,52, 68,80,92, 118,131,144,161,173,185,207" y="'+(HEIGHT+5)+'" font-family="Sans-serif" font-size="14" fill="black" >'
    +digits.join('') + '</text>';

    svg+= '</svg>';
    return svg;
}


function str2svg(xs){ var ds,bc,rs,svg;
	ds = xs.replace(/\s+/g,'').split('').map(pint);
	//xs="4902030193881".split('');
	bc = digits2barcode( ds );

	rs = barcode2rects( bc ) ;
	//console.log(rs);
	svg = rects2svg( rs, ds ,1.05);
	//console.log(svg);

	return svg;
}

ean="4902030193881"
str2svg(ean);
