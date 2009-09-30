/* This is a template command. */
CmdUtils.CreateCommand({
    names: ["o que significa", "what means", "dicionario"],
    icon: "http://www.priberam.pt/images/logo_priberam.jpg",
    description: "Busca o significado e uma palavra utilizando o conteúdo do site Priberam.",
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
	_getWordMeans: function getWordMeans__getWordMeans(pblock, args){
		pblock.innerHTML = "Procurando no Michaelis UOL por <b>" + args.object.text + "</b>.<br /><br />";
		
		var urlSearchMichaelisUOL = "http://michaelis.uol.com.br/moderno/portugues/index.php?lingua=portugues-portugues&palavra="+ args.object.text;
		
	},
    preview: function preview(pblock, args){
        if (!args.object.text || args.object.text < 2) {
            pblock.innerHTML = "Procura o significado de uma palavra no site Michaelis UOL.";
            return;
        }
		this._getWordMeans(pblock, args);
    },
    execute: function execute(args){
        displayMessage("You selected: " + args.object.text, this);
    }
});
