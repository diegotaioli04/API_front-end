/* https://stackoverflow.com/questions/17650776/add-remove-html-inside-div-using-javascript */

function modifica(id) {
    //$("#printhere").html("funziona: " + id);
    var result = (id).split('i');
    //alert(result[2]);
    //$("#printhere").html("modifica: " + result[1]);
    var iden = result[1];
    var impiegato =
        {
            "id":  iden,
            "name": "Marco",
            "surname": "Doe",
            "sidi_code": "tasall43",
            "tax_code": "swdwe242"
        };
    var jsonStr = JSON.stringify(impiegato);
    $('#printhere').html(jsonStr);
    $.ajax({
        url: 'http://localhost:8080/student.php' + id,
        type: 'put',
        data: JSON.stringify(impiegato),
        contentType: 'application/json',
        success: function (data, textstatus, jQxhr) {
            $("#printhere").html(textstatus);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

$(document).ready(function() {
    //identifica il bottone dall'id e procede se viene clickato
    //la variabile copia il contenuto del input con id esp
    aggiorna();
    //var ultimo = $("#c").children().last().attr("id"); //restituisce l id dell'ultimo div
    //$('#printhere').html(ultimo);
    function aggiorna() {
        var cont = 0;
        $.ajax(
           {
               url: 'http://localhost:8080/student.php',
               method: 'GET',
               contenttype: 'json',
               success: function (data, textStatus, jQxhr) {
                    $.each(data.students, function (i, post) {
                        aggiungi(post.id, post.name, post.surname, post.sidi_code, post.tax_code)
                        cont++;
                    });
               },
               error: function (jQxhr, textStatus, errorThrown) {
                   console.log(errorThrown);
               }
           });
        return cont;
    }

    $('#submit').click(function () {
        alert("inserisci");
        var first = $('#first').val();
        var last = $('#last').val();
        var code = $('#posta').val();
        var tax = $('#telefono').val();
        var ultimo = $("#c:last").attr("id");
        ultimo = ultimo+1;
        var impiegato =
        {
            "id": ultimo,
            "name": first,
            "surname": last,
            "sidi_code": code,
            "tax_code": tax
        };
        $.ajax({
            url: 'http://localhost:8080/student.php',
            type: 'post',
            data: JSON.stringify(impiegato),
            contentType: 'application/json',
            success: function (data, textstatus, jQxhr) {
            }
        });
    });

    $('#bt1').click(function () {
        var size = $("#c div");
        var cont = 0;
        var caselle = new Array();
        var someObj = {};
        someObj.caselle = [];

        $("input:checkbox").each(function () {
            var $this = $(this);
            if ($this.is(":checked")) {
                someObj.caselle.push($this.attr("id"));
                $('#printhere').html("cancella: " + $this.attr("id"));
               cancella($this.attr("id"));
            }
        });
    });

    function cancella(identit) {
        $.ajax(
        {
            url: 'http://localhost:8080/student.php'+identit,
            method: 'DELETE',
            contenttype: 'string',
            success: function (textStatus, jQxhr) {
                $('#printhere').html(textStatus);
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    function aggiungi(ID, firstName, lastName, email, phone) {
        var div = document.createElement('div');
        div.className = 'row';
        
        //var i = parseInt(ultimo, 10); //converte in intero la stringa onclick='modifica(this.id)'
        //i++
        div.innerHTML = "<div id='d" + ID + "' class='row'>" +
            "<div class='col-md-2'> " + ID + " </div> <div class='col-md-1'> <input name='sottolinea' id=" + ID +
            " type='checkbox' /> </div>" + "<div class='col-md-2'>" + firstName + " " + lastName +
            "</div><div class='col-md-2'>" + email + "</div> <div class='col-md-2'>" + phone +
            "</div>" + "<div class='col-md-2'> <button id='mi" + ID +"' class='mod' type='button' onclick='modifica(this.id)'> mod </button> " +
            "<button id=del" + ID + " class='del' type='button' > del </button> </div><div class='col-md-1'> </div </div>";
        document.getElementById('c').appendChild(div);
    }
});
