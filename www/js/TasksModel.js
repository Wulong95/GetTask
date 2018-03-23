function getTasks(){
	this.itens = [
	  {nome: "Primeiro", finalizada: false},
	  {nome: "Segundo", finalizada: false},
	  {nome: "Terceiro", finalizada: false},
	  {nome: "Quarto", finalizada: false}];

	this.add = function(item) {
		this.itens.push(item);
	}

	this.edit = function(item){
		this.itens.data = { response: item.nome };
	}

	this.remove = function(item){
		var pos = this.itens.indexOf(item);
		this.itens.splice(pos, 1);
	};

}
