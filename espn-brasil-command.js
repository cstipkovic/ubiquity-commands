/*
 * This Commmand was maked to Mozilla Ubiquity 0.5.x 
 * Show the last sport news at ESPN Brazil web site
 */
CmdUtils.CreateCommand({
    names: ["espn-brasil", "espn-br"],
    icon: "http://espnbrasil.terra.com.br/img/fe/favicon.gif",
    description: "Mostra as ultimas noticias de esportes do site da ESPN-Brasil",
    help: "Digite espn-brasil ou espn-br seguido do termo que você quer buscar!",
    author: {
        name: "Clauber Stipkovic",
        email: "clauber.halic@gmail.com"
    },
    license: "GPL",
    homepage: "http://github.com/ClauberStipkovic/espn-br-ubiquity-command",
    arguments: [{
        role: 'object',
        nountype: noun_arb_text
    }],
    /* Function that makes Ajax request at ESPN-Brasil RSS url */
    _getEspnBrasilNews: function getEspnBrasilNews__getEspnBrasilNews(pblock, args){
        pblock.innerHTML = "Procurando no ESPN Brasil por <b>" + args.object.text + "</b>.<br /><br />";
        
        var urlSearchESPN_BR = "http://espnbrasil.terra.com.br/rss/" + args.object.text;
        $.ajax({
            url: urlSearchESPN_BR,
            success: function(responseData){
                if ($(responseData).find("item").length > 1) {
                    pblock.innerHTML += "<dl>";
                    $(responseData).find("item").each(function(){
                        pblock.innerHTML += "<dt style=\"font-size: 0.9em\"><b><a href=" + $(this).find("link").text() + ">" + $(this).find("title").text() + "</a></b></dt>";
                        pblock.innerHTML += "<dd style=\"font-size: 0.8em\">" + $(this).find("description").text() + "</dd><br />";
                    });
                    pblock.innerHTML += "</dl>";
                }
                else {
                    pblock.innerHTML = "Assunto não encontrado no ESPN Brasil.";
                }
            },
            error: function(){
                pblock.innerHTML = "Assunto não encontrado no ESPN Brasil.";
            }
        });
    },
    preview: function preview(pblock, args){
        if (!args.object.text || args.object.text < 2) {
            pblock.innerHTML = "Procura noticias de esportes no site ESPN-Brasil.";
            return;
        }
        this._getEspnBrasilNews(pblock, args);
    },
    execute: function execute(args){
        Utils.openUrlInBrowser("http://espnbrasil.terra.com.br/" + args.object.text);
    }
});