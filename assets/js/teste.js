/**
 * Created by alhaag on 05/09/15.
 */
//"use strict";

$(document).ready(function() {

    let alerta = "Esta variável foi criada com let TESTE";

    console.log(alerta);

    let bool = true;

    if(bool == true){
        console.log('teste');
    }

    class Produto{
        constructor(codigo,nome,imagem,promocao,preco,desconto){
            this.codigo = codigo;
            this.nome = nome;
            this.imagem = imagem;
            this.promocao = promocao;
            this.preco = preco;
            this.desconto = desconto;
        }
    }

    let prod = new Produto(1, "Andre", 'scr/img.png', null, null, null);

    console.log(prod.nome);

});