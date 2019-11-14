/*
Expr               type        ty
==========================================
[ 123			// Number   -- num
, "hello"		// String   -- str
, [1,2,3]		// Array    -- arr
, {}			// Object   -- obj
, /hello/		// RegExp   -- re
, function(){}	// Function -- fn
, true			// Boolean  -- bool
, new Date()    // Date     -- date
].map(type)



*/

function type(obj){
    return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1]; }

var _ty_ex = {"RegExp":"re","Boolean":"bool", "Date":"date"};
function ty(obj){
    var _r;
    _r = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1];
    return (_ty_ex)[_r]||_r.toLowerCase().slice(0,3); }


//----------------------
var spl = function(pat){
	return function(str){
		return str.split(pat);
	};
};
