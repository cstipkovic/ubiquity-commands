/* This Commmand was maked to Mozilla Ubiquity 0.6.x */
CmdUtils.CreateCommand({
  names: ["espn", "espn-com"],
  description: "Shows the last news about sports from ESPN.com",
  help: "Type espn or espn-com and the term that you want to search!",
  author: {
    name: "Clauber Stipkovic",
    email: "clauber.halic@gmail.com",
    homepage: "http://clauber.coffeebreakers.org"
  },
  license: "GPL",
  homepage: "http://github.com/ClauberStipkovic/ubiquity-commands",
  icon: "http://a.espncdn.com/favicon.ico",
  arguments: [{
    role: "object",
    nountype: noun_arb_text,
    label: "search term"
  }],
  /* Function that makes Ajax request at ESPN.com RSS url */
  _getEspnComNews: function getEspnComNews__getEspnComNews(pblock, args) {
    pblock.innerHTML = 'Searching at ESPN.com for <b>'+
                          args.object.text +'</b>.<br /><br />';

    var seachString = args.object.text;
    var urlSearchESPN = "http://search.espn.go.com/rss/"+ 
                        seachString.replace(/\s/, "-");
    $.ajax({
      url: urlSearchESPN,
      success: function(responseData) {
        var itemsNews = $(responseData).find("item");

        if (itemsNews.length) {
          pblock.innerHTML = "The ten lastest news about <b>"+ 
                              args.object.text +"</b>"
          pblock.innerHTML += "<br /><dl>";
          for (i = 0; i < 10; i++) {
            var itemContent = 
              "<dt style='font-size: 0.9em'>" +
                "<b><a href="+ $(itemsNews).eq(i).find("link").text() +">"+
                $(itemsNews).eq(i).find("title").text() +"</a></b>"+
              "</dt>"+
              "<dd style='font-size: 0.8em'>"+ 
                $(itemsNews).eq(i).find("description").text() +
              "</dd><br />";
            pblock.innerHTML += itemContent;
          }
          pblock.innerHTML += "</dl>";
        } else {
          pblock.innerHTML = "Subject not found at ESPN.com";
        }
	    }
	  });
  },
  preview: function preview(pblock, args) {
    if (!args.object.text || args.object.text < 2) {
      pblock.innerHTML = "Search news about sports at ESPN.com";
      return;
    }
    this._getEspnComNews(pblock, args);
  },
  execute: function execute(args) {
    Utils.openUrlInBrowser("http://search.espn.go.com/"+ args.object.text);
  }
});
