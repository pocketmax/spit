var c = require('colors');
var _ = require('lodash');
var is = require('is');

var count = 1;
var headTxt = '';
var headErr = false;

var nest = [];

// TODO auto indent blocks of info by detecting open head() without closing foot()

var attr = function(obj,pre){
	if(!pre) pre = '';
	var str = JSON.stringify(obj, null, 2).replace(/[\r\n]/g, "\n" + pre);
//	return JSON.stringify(obj, null, 2);
	return pre + str;

};

var indent = function(num, str){
	if(!num || num <1) num = 0;
	if(!str) str = "\t";

	return _.repeat(str, num);
};

var build = function(lines, pre){
	if(!_.isArray(lines)) lines = [lines];
	if(pre){
		_.each(lines, function(val, key){
			lines[key] = pre + val;
		});
	}
	return lines.join("\n");
};

module.exports = {

	head: function(str, err){
		err = err || null;
		var pre = indent(nest.length);
		var nestItm = {
			head: str,
			err: err
		};
		nest.push(nestItm);
		var top = _.repeat('*', str.length + 4);
		var left = "* ";
		var right = " *";
		var bottom = _.repeat('=', str.length + 4);

		var out = [
			top,
			left + str + right,
			bottom];
		if(nestItm.err){
			console.log(build(out, pre).red);
		} else {
			console.log(build(out, pre).green);
		}

	},
	foot: function(){
		var nestItm = nest.pop();
		var pre = indent(nest.length);
		var str = nestItm.head;

		var top = _.repeat('_', str.length + 4);
		var left = "* ";
		var right = " *";

		var out = [
			top,
			left + str + right];
		if(nestItm.err){
			console.log(build(out, pre).red);
		} else {
			console.log(build(out, pre).green);
		}

	},
	num: function(str, val){
		var pre = indent(nest.length - 1);
		var nestItm = _.last(nest);

		var left = count + '. ';
		if(val){
			var out = (left + str + ': ').bold + val;
		} else {
			var out = left + str.bold;
		}
		count++;
		if(nestItm.err){
			console.log(build(out, pre).red);
		} else {
			console.log(build(out, pre).yellow);
		}

	},
	bul: function(str, val){
		var pre = indent(nest.length - 1);
		var nestItm = _.last(nest);

		var left = '- ';

		if(val){
			var sep = ': ';
			if(is.decimal(val)) {
				val = c.gray(val);
			} else if(_.isNumber(val)){
				val = c.red(val);
			} else if(_.isBoolean(val)){
				val = c.magenta(val);
			} else if(_.isPlainObject(val)){
				val = c.green(attr(val, pre));
				var sep = "...\n";
			} else {
				val = c.cyan(val);
			}

			var out = (left + str + sep).bold + val;

		} else {

			var out = left + str.bold;

		}
		if(nestItm.err){
			console.log(build(out, pre).red);
		} else {
			console.log(build(out, pre).yellow);
		}

	},
	err: function(str){

		var left = "* ";
		console.log((left + str).red);

	}

};
