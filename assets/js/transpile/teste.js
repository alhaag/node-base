/**
 * Created by alhaag on 05/09/15.
 */
//"use strict";

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$(document).ready(function () {

    var alerta = "Esta variável foi criada com let TESTE";

    $('h1').css('font-size', '50px');
    $('body').css('background-color', '#ccc');

    console.log(alerta);

    var bool = true;

    if (bool == true) {
        console.log('teste');
    }

    var Produto = function Produto(codigo, nome, imagem, promocao, preco, desconto) {
        _classCallCheck(this, Produto);

        this.codigo = codigo;
        this.nome = nome;
        this.imagem = imagem;
        this.promocao = promocao;
        this.preco = preco;
        this.desconto = desconto;
    };

    var prod = new Produto(1, "Andre", 'scr/img.png', null, null, null);

    console.log(prod.nome);
});