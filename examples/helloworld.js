var sp = require('../app/app');

// TODO tiered config pull configs from .spit config file in project with in project overrides
//sp.config();

// TODO basic
// sp('my test');
sp.log('my test');

// TODO basic key val
sp.log('my key','my val');

// TODO headers
sp.head().log('my key');

// TODO header with key/val
sp.head().log('my key','my val');

// TODO pass/fail
sp.fail().head().log('the thing');
sp.pass().head().log('the thing');
sp.pass().head().log('the thing','the other thing');

// TODO number list with errors
sp.fail().head().log('numbered list');
sp.fail().num().log('first');
sp.fail().num().log('second');
sp.fail().num().log('third');

// TODO bullet point list
// bullet point list
sp.pass().head().log('bullet list');
sp.bul().log('first bul');
sp.bul().log('second bul');
sp.bul().log('third bul');

// TODO bullet point with value
sp.head().log('bullet list with value');
sp.bul().log('first', 1);
sp.bul().log('second', 2.22);
sp.bul().log('third', '3rd');
sp.bul().log('bool', true);
sp.bul().log('obj', {foo: 'bar', test: {ing: 'testing123'}});

// TODO sub header
sp.head().log('sub header');
sp.bul().log('a. aa');
sp.bul().log('b. bb');
sp.tab(1).head(2).log('2nd header');
sp.num().log('one');
sp.tab(0).num().log('two',3);
sp.head().log('3rd header');
sp.num().log('a. aaaa');
sp.num().log('b. bbbb');

// TODO pass/fail as sub header
sp.head().pass().log('pass/fail sub header');
sp.bul().log('a. aa');
sp.bul().log('b. bb');
sp.tab(1).head(2).fail().log('2nd header');
sp.num().log('one');
sp.num().log('two');
sp.head().log('3rd header');
sp.num().log('a. aaaa');
sp.num().log('b. bbbb');


// TODO pass/fail as sub header AND as num or bul list
/*
bullet pass/fail header
********************
- header......pass *
====================
*/
//sp.bul().head().bool('open car door').pass();

/*
bullet pass/fail header with bul
********************
- header......pass *
====================
*/
//sp.bul().head().bool('open car door').pass();

/*
bullet pass/fail header with num
****************************
1. open car door......pass *
============================
	- test: ing
	- foo: bar
	- my obj...
	{
		goo: 'ber'
	}
*/
//sp.num().head('open car door').pass();
//sp.bul('test','ing');
//sp.bul('foo','bar');
//sp.bul('my obj',{goo:'ber'});

// TODO chained bullet list
/*
sp
	.bul('first');
	.bul('second');
	.bul('third');
*/
// TODO nested head/foot pairs


/* example - other
****************************
1. get into car
****************************
	============================
	2. get into car
	============================
	a. put key into door lock
	b. turn key
	c. pull key out of car door
		- test: ing...pass
		- foo: bar... fail
		- my obj...
		{
			goo: 'ber'
		}
	d. lift handle on car door
	e. open car door
	f. sit in drivers seat
	------------
	2. start car
	------------
	a. put key into ignition
	b. turn key
	::::::::::::::::::::::::
	3. back out of driveway
	::::::::::::::::::::::::
		a. put car in reverse
		b. press foot on accelerator
		c. turn steering wheel
		........................
		3. back out of driveway
		........................
*/

/*
sp.ol();    // true mean use letters
sp.li().head().log('get into car');
	sp.ol();
	sp.li().head().log('put key into door lock');
	sp.li().log('turn key');
	sp.li().log('pull key out of car door');
		sp.ul();
		sp.li().log('turn key');
		sp.li().log('foo','bar');
		sp.ul(false);
	sp.li().log('pull key out of car door');

sp.head('get into car');

sp.num().head('open car door').pass();
sp.bul('test','ing');
sp.bul('foo','bar');
sp.bul('my obj',{goo:'ber'});
*/