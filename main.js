// l’utente scrive un testo nella parte bassa e cliccando“invia” il testo viene aggiunto al thread sopra, come messaggio verde

// intercetto il click sul pulsante
$(".fa-microphone").click(function(){
    // leggo il testo inserito dall'utente
    var testo_utente = $(".testo-inserito").val();
    console.log(testo_utente);

    // copio l'elemento template
    var nuovo_mess_inviato = $(".template .testo-template").clone();
    // inserisco il testo letto dall'input
    nuovo_mess_inviato.text(testo_utente);
    $("contenitore").append(nuovo_mess_inviato);
});
