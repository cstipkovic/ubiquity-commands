/* This is a template command. */
CmdUtils.CreateCommand({
  names: ["o que significa", "what means", "dicionario"],
  icon: "http://www.priberam.pt/Portals/_default/Skins/PRIBERAM_2009/images/marca.gif",
  description: "Busca o significado e uma palavra utilizando o conteúdo do site Wikicionario.",
  help: "Digite dicionario e em seguida a palavra que você deseja busca.",
  author: {
    name: "Clauber Stipkovic",
    email: "clauber.halic@gmail.com"
  },
  license: "GPL",
  homepage: "http://labs.mozilla.com/",
  arguments: [{
    role: 'object',
    nountype: noun_arb_text
  }],
  _getWordMeans: function getWordMeans__getWordMeans(pblock, args) {
    pblock.innerHTML = "Procurando no Wikicionario por <b>" + args.object.text + "</b>.<br /><br />";
		
		  var apiUrl = "http://pt.wiktionary.org/w/api.php";
		  var apiParams = {
		    format: "json",
		    action: "query",
		    titles: args.object.text,
		    rvprop: "content",
		    prop: "revisions",
		    rvparse: true
		  }
		  
		  CmdUtils.previewAjax(pblock, {
		    type: "GET",
		    url: apiUrl, 
		    data: apiParams,
		    dataType: "json",
		    success: function (data, textStatus) {
		      $.each(data.query.pages, function(i, item) {
		        var content = $(item.revisions);
		        Components.utils.reportError($(content));
		      });
		    }
		  });
  },
  preview: function preview(pblock, args) {
    if (!args.object.text || args.object.text < 2) {
      pblock.innerHTML = "Procura o significado de uma palavra no Wikicionario.";
      return;
    }
    this._getWordMeans(pblock, args);
  },
  execute: function execute(args){
    Utils.openUrlInBrowser('http://pt.wiktionary.org/wiki/'+ args.object.text);
  }
});
