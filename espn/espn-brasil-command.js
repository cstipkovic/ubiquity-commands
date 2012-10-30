/* This Commmand was maked to Mozilla Ubiquity 0.6.x */
CmdUtils.CreateCommand({
  names: ["espn-br", "espn-brasil"],  
  description: "Mostra as ultimas noticias do site ESPN.com.br",
  help: "Digite espn-br e o termo que você quer buscar!",
  author: {
    name: "Clauber Stipkovic",
    email: "clauber.halic@gmail.com",
    homepage: "http://clauber.coffeebreakers.org"
  },
  license: 'GPL',
  homepage: 'http://github.com/ClauberStipkovic/ubiquity-commands',
  icon: "http://espn.estadao.com.br/img/favicon.gif",
  arguments: [{
    role: "object", 
    nountype: noun_arb_text, 
    label: "search term"
  }],
  /* Function that makes Ajax request at ESPN.com.br RSS url */
  _getEspnBrNews: function getEspnBrNews__getEspnBrNews(pblock, args) {
    pblock.innerHTML = "Procurando no ESPN Brasil por <b>"+ 
                        args.object.text +'</b>.<br /><br />';

    var urlSearchESPN_BR = "http://espn.estadao.com.br/rss/"+ args.object.text;
    $.ajax({
      url: urlSearchESPN_BR,
      success: function(responseData) {
        var itemsNews = $(responseData).find('item');

        if (itemsNews.length) {
          pblock.innerHTML = "As dez últimas noticías encontradas sobre <b>"+ 
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
          pblock.innerHTML = 'Assunto não encontrado no ESPN.com.br';
        }
      },
      error: function () {
        pblock.innerHTML += "Assunto não encontrado no ESPN.com.br";
      }
    });
  },
  preview: function preview (pblock, args) {
    if (!args.object.text || args.object.text < 2) {
      pblock.innerHTML = "Procura noticias no site ESPN.com.br";
      return;
    }
    this._getEspnBrNews(pblock, args);
  },
  execute: function execute (args) {
    Utils.openUrlInBrowser("http://espn.estadao.com.br/"+ args.object.text);
  }
});
