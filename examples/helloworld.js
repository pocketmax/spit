var sp = require('../app/app');

var c = require('colors');

// TODO tiered config pull configs from .spit config file in project with in project overrides
//sp.config();

// TODO basic
// sp("my test");

// numbered list with error
sp.head('numbered list', true);
sp.num("first");
sp.num("second");
sp.num("third");
sp.foot();

// bullet point list
sp.head('bullet list');
sp.bul("first bul");
sp.bul("second bul");
sp.bul("third bul");
sp.foot();

// bullet point with value
sp.head('bullet list with value');
sp.bul("first", 1);
sp.bul("second", 2.22);
sp.bul("third", '3rd');
sp.bul("bool", true);
sp.bul("obj", {foo: 'bar',test: {ing: 'testing123'}});
sp.foot();

// TODO nested blocks
sp.head('parent block', true);
sp.head('child block');
sp.bul("first bul");
sp.bul("second bul");
sp.bul("third bul");
sp.foot();
sp.foot();

// TODO chained bullet list
/*
sp
	.bul("first")
	.bul("second")
	.bul("third");
*/
// TODO nested head/foot pairs
