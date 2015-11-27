$(document).ready(function () {
    //elements
    var on_upload         = $('.on-upload');
    var on_select_archive = $('.on-select-archive');
    var on_verify         = $('.on-verify');
    var progress          = $('#progress');
    var progressbox       = $('#progressbox');
    var progressbar       = $('#progressbar');
    var statustxt         = $('#statustxt');
    var output            = $("#output");
    var completed         = '0%';
    var timer             = null;

    on_select_archive.show();
    on_upload.hide();
    on_verify.hide();
    $('#arquivo-restore').val('');

    $('#bt-send').click(function (e) {
        e.preventDefault();
        //dlgRestore.unsetMensagens();
        if (validateRestore() && confirmRestore()) {
            $('.dlg_btn').prop("disabled", true);
            // progress
            statustxt.empty();
            progress.show();
            var path = $('#arquivo-restore').val();
            var fileName = path.match(/[^\/\\]+$/);
            $('span.archive').html(fileName);
            on_select_archive.hide();
            on_upload.show();
            progressbar.width(completed); //inicia em 0%
            statustxt.html(completed); //exibe o texto
            statustxt.css('color', '#000'); //define a cor					

            $.ajax({
                //url: '../action/UploadAction.php',
                url: '/upload/send',
                type: "POST",
                data: new FormData($("form#restore")[0]),
                cache: false,
                contentType: false,
                processData: false,
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            progressbar.width(percentComplete + '%'); //atualiza o tamanho da barra
                            statustxt.html(percentComplete + '%'); //atualiza o texto
                            if (percentComplete > 50) {
                                statustxt.css('color', '#fff'); //troca a cor acima dos 50%
                            }
                            if (percentComplete === 100) {
                                on_verify.show();
                                // set interval
                                timer = setInterval(mycode, 1000);
                                function mycode() {
                                    output.find('.points').append('.');
                                }
                            }
                        }
                    }, false);
                    return xhr;
                },
                success: function (result) {
                    // verifica a resposta do servidor
                    if (result.status === 'success') {
                        alert('SUCESSO!');
                        /*if (executaRestore(result.path)) {
                         atualizarPagina('?restore=sim');
                         } else {
                         dlgRestore.fechar();
                         dlgRestore.setMensagem(__("Erro na execução da restauração"), 'msg_erro');
                         }*/
                    } else if (result.status === 'error') {
                        alert(result.message); // error
                    } else {
                        // improvavel acontecer esta condição
                        alert('Sem resposta do servidor'); // error
                    }
                    //$('.dlg_buttom').prop("disabled", false);
                },
                complete: function () {
                    //clearInterval(timer); // para o timer
                    //$('.dlg_btn').prop("disabled", false);
                    /*on_select_archive.show();
                    on_upload.hide();
                    on_verify.hide();*/
                }
            });
        }
    });

});

function confirmRestore() {
    if (confirm('Atenção\n\nOs dados da plataforma serão sobrescritos!\nEsta operação não pode ser cancelada!\n\nDeseja continuar?')) {
        return true;
    }
    return false;
}

function validateRestore() {
    if ($('#arquivo-restore').val() === '') {
        alert('Selecione o arquivo com as configurações que serão restauradas');
        return false;
    }

    return true;
}
