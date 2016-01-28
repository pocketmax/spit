var c = require('colors');
var _ = require('lodash');
var is = require('is');

var itm = {};
var numCount = 0;


// TODO auto indent blocks of info by detecting open head() without closing foot()


// turn object into string
var objToStr = function(obj, arg1, arg2 ){
	if(!arg1) arg1=null;
	if(!arg2) arg2=2;

	return JSON.stringify(obj, arg1, arg2);
};


// prefix str with prefix
var pre = function(str, prefix){

	// split string by \n and append prefix to each line
	var tmpArr = str.split("\n");
	var tmpList = [];
	_.each(tmpArr, function(val){
		tmpList.push(prefix + val);
	});

	return tmpList.join("\n");
};

var header = function(str, chr){

	if(_.isNumber(chr)) {
		switch(chr){
			case 1:
				chr = '#';
				break;
			case 2:
				chr = '*';
				break;
			case 3:
				chr = '=';
				break;
			case 4:
				chr = '-';
				break;
			case 5:
				chr = '_';
				break;
			case 6:
				chr = '.';
				break;
			default:
				chr = '#';
				break;
		}
	} else if(!chr){

		chr = '#';

	}

	return  _.repeat(chr, str.length + 4) + "\n" +
			chr + ' ' + str + ' ' + chr + "\n" +
			_.repeat(chr, str.length + 4);

};

module.exports = {

	log: function(str, arg1){

		// num / bul check
		if(itm.li === 'num'){
			numCount++;
			str = numCount + '. ' + str;

		// num / bul check
		} else if(itm.li === 'bul'){
			str = '- ' + str;
		}

		if(arg1){
			var sep = ': ';
			var rawStr = str + sep + arg1;

			 if(is.decimal(arg1)) {
				 arg1 = c.gray(arg1);
			 } else if(_.isNumber(arg1)){
				 arg1 = c.red(arg1);
			 } else if(_.isBoolean(arg1)){
				 arg1 = c.magenta(arg1);
			 } else if(_.isPlainObject(arg1)){
				 arg1 = c.green(objToStr(arg1));
				 var sep = "...\n";
			 } else {
				 arg1 = c.cyan(arg1);
			 }

			var out = str.bold + sep + arg1;

		} else {
			var rawStr = str;
			var out = str;
		}

		// bool check
		if( itm.bool === false ){
			rawStr += '...fail';
		} else if( itm.bool === true ){
			rawStr += '...pass';
		}


		// header check
		if(itm.header){
			if(itm.header === true) {
				out = header(rawStr);
			} else {
				out = header(rawStr, itm.header);
			}
			delete itm.header;
		}

		// tmpTab check
		if(itm.tmpTab){
			out = pre(out,"\t");
			delete itm.tmpTab;
		}

		// tab count check
		if(itm.tabCount){
			out = pre(out,_.repeat("\t", itm.tabCount));
		}

		// bool check
		if( itm.bool === false ){
			out = c.red(out);
		} else if( itm.bool === true ){
			out = c.green(out);
		} else {
			out = c.yellow(out);
		}

		delete itm.bool;
		console.log(out);

	},
	head: function(arg){
		itm.header=arg || true;
		return this;
	},
	fail: function(){
		itm.bool = false;
		return this;
	},
	pass: function(){
		itm.bool = true;
		return this;
	},
	num: function(){
		itm.li = 'num';
		return this;
	},
	bul: function(){
		itm.li = 'bul';
		return this;
	},
	tab: function(arg){
		if(arg === 1){
			if(!itm.tabCount) itm.tabCount=0;
			itm.tabCount++;
		} else if(arg === 0) {
			itm.tabCount--;
			if(itm.tabCount<0) itm.tabCount=0;
		} else {
			itm.tmpTab = true;
		}
		return this;
	}

};
