/* 
	This Commmand was maked to Mozilla Ubiquity 0.5.x 
	Show the last sport news at ESPN web site
*/
CmdUtils.CreateCommand({
	names: ['espn', 'espn-com'],
	icon: 'http://espnbrasil.terra.com.br/img/fe/favicon.gif',
	description: 'Shows the last news about sports from ESPN.com web site',
	help: 'Type espn or espn-com and the term that you want to search!',
	author: {name: 'Clauber Stipkovic', email: 'clauber.halic@gmail.com'},
	license: 'GPL',
	homepage: 'http://github.com/ClauberStipkovic/ubiquity-commands',
	arguments: [{role: 'object', nountype: noun_arb_text, label: 'search term'}], 
	/* Function that makes Ajax request at ESPN.com RSS url */
	_getEspnComNews: function getEspnComNews__getEspnComNews(pblock, args) {
		pblock.innerHTML = 'Searching at ESPN.com for <b>' + args.object.text + '</b>.<br /><br />';
	 
		var urlSearchESPN_COM = 'http://search.espn.go.com/rss/'+ args.object.text;
		$.ajax({
			url: urlSearchESPN_COM,
			success: function(responseData) {
				if($(responseData).find('item').length > 1) {
					pblock.innerHTML += '<dl>';
					$(responseData).find('item').each(function() {
						pblock.innerHTML += '<dt style=\"font-size: 0.9em\"><b><a href='+ $(this).find('link').text() +'>'+ $(this).find('title').text() + '</a></b></dt>';
						pblock.innerHTML += '<dd style=\"font-size: 0.8em\">'+ $(this).find('description').text() +'</dd><br />';
					});
					pblock.innerHTML += '</dl>';
				} else {
					pblock.innerHTML = 'Subject not found at ESPN.com.';
				}
			},
			error: function() {
				pblock.innerHTML = 'Subject not found at ESPN.com.';
			}
		});
	},
	preview: function preview(pblock, args) {
		if(!args.object.text || args.object.text < 2) {
			pblock.innerHTML = 'Search news about sports at ESPN.com.';
			return;
		}
		this._getEspnComNews(pblock, args);
	},
	execute: function execute(args) {
		Utils.openUrlInBrowser('http://search.espn.go.com/'+ args.object.text);
	}
});
