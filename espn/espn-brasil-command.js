/* This Commmand was maked to Mozilla Ubiquity 0.6.x */
CmdUtils.CreateCommand({
  names: ['espn-br', 'espn-brasil'],
  icon: 'http://espn.estadao.com.br/img/fe/favicon.gif',
  description: 'Mostra as ultimas noticias do site ESPN.com.br',
  help: 'Digite espn-br e o termo que você quer buscar!',
  author: {
    name: 'Clauber Stipkovic', 
    email: 'clauber.halic@gmail.com'
  },
  license: 'GPL',
  homepage: 'http://github.com/ClauberStipkovic/ubiquity-commands',
  arguments: [{
    role: 'object', 
    nountype: noun_arb_text, 
    label: 'search term'
  }],
  /* Function that makes Ajax request at ESPN.com.br RSS url */
  _getEspnBrNews: function getEspnBrNews__getEspnBrNews(pblock, args) {
    pblock.innerHTML = 
      'Procurando no ESPN Brasil por <b>'+ 
      args.object.text +'</b>.<br /><br />';

    var urlSearchESPN_BR = 
      "http://espn.estadao.com.br/rss/"+ args.object.text;
    $.ajax({
      url: urlSearchESPN_BR,
      success: function (responseData) {
        if ($(responseData).find('item').length > 1) {
          pblock.innerHTML += "<dl>";
          $(responseData).find("item").each( function () {
            pblock.innerHTML += 
              "<dt style=\"font-size: 0.9em\">"+
                "<b><a href="+ $(this).find("link").text() +">"+ 
                $(this).find("title").text() +"</a></b>"+
              "</dt>";
	  
            pblock.innerHTML += 
              "<dd style=\"font-size: 0.8em\">"+ 
                $(this).find("description").text() +
              "</dd><br />";
          )}; 
          pblock.innerHTML += "</dl>";
        } else {
          pblock.innerHTML = 'Assunto não encontrado no ESPN.com.br';
        }
      },
      error: function () {
        pblock.innerHTML = "Assunto não encontrado no ESPN.com.br";
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
    displayMessage("teste");
    Utils.openUrlInBrowser("http://espn.estadao.com.br/"+ args.object.text);
  }
});

