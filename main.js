// MINESTONE 1
// intercetto il click sull'icona del microfono pe rinviare il testo
$('.smile-microfono-contenitore').click(invia_messaggio);

// intercetto l'input "invio" della tastiera per inviare il messaggio
$('.testo-inserito').keypress(function(event){
    // verifico che l'utente abbia inserito "enter" che corrisponde al numeno 13 per keypress
    if (event.which == 13 ) {
        invia_messaggio();
    }
});

// MINESTONE 1 cambio icona
// intercetto il focus nell'imput dell' invia_messaggio
// Associa un gestore eventi all'evento JavaScript "focus" o attiva quell'evento su un elemento
$('#input-scrivi-messaggio').focus(function(){
    // tolgo la classe "fa-microphone" dell'icona a destra dell'input
    // aggiungo la classe "fa paper plane"
    $('.smile-microfono-contenitore').removeClass('.fa-microphone').addClass('.fa-paper-plane');
});

$('.testo-inserito').blur(function(){
    // tolgo la classe "fa-microphone" dell'icona a destra dell'input
    // aggiungo la classe "fa paper plane"
    $('.smile-microfono-contenitore').removeClass('.fas .fa-paper-plane').addClass('.fas .fa-microphone');
});

// Minestone 2 parte 2

// intercetto il click sull'icona della lente per la ricerca
// $('.search-label').click(function(){
// intercetto l'utente che digita nell'input della ricercato
$('.sezione-input').keyup(function(){
    // recupero il testo contenuto nell'input di ricerca
    var testo_ricerca = $('.sezione-input').val().trim().toLowerCase();
    console.log(testo_ricerca);
    // recupero tutti i contatti e per ciascuno verifico se il nome corrisponde al testo cercato
    if(testo_ricerca != ''){
        // il testo ricercato non è vuoto => applico la ricerca e filtro i contatti
        $('.chat-nella-lista').each(function(){
            // recupero il nome di questo contatto
            var nome_contatto = $(this).find('.nome-persona').text().toLowerCase();
            console.log(nome_contatto);
            if (nome_contatto.includes(testo_ricerca)) {
                // se corrisponde visualizzo il contatto
                $(this).show();
                console.log('corrisponde');
            } else {
                // altrimenti, nascondo il contatto
                $(this).hide();
                console.log('non corrisponde');
            }
        });
    }else {
        // il testo ricercato è vuoto => visualizzo tutti i contatti
        $('.chat-nella-lista').show();
    }
});


// Minestone 1

// funzione per inviare un nuovo messaggio
function invia_messaggio(){
    // recupero il testo inserito dall'utente nell'input
    var testo_utente = $(".testo-inserito").val();
    console.log(testo_utente);
    if(testo_utente !=''){
        // faccio una copia del template per creare un nuovo messaggio
        var nuovo_messaggio = $('.template .message').clone();
        console.log(nuovo_messaggio);

        // inserisco il testo dell'utente nello span message-text
        nuovo_messaggio.children('.message-text').text(testo_utente);
        // aggiungo la classe "sent" al nuovo_messaggio
        nuovo_messaggio.addClass('messaggio-inviato');
        // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
        $('#contenitore-chat').append(nuovo_messaggio);
        // svuoto la charset: imposto l'input a stringa vuota
        $('.testo-inserito').val('');
        // risposta del pc
        // imposto un timeout di 1 secondo e poi ci sarà la risposta del pc
        setTimeout(risposta_pc, 1000);
    }
}

// Minestone 2 prima parte

// funzione per aggiungere alla conversazione la risposta del pc
function risposta_pc(){
    // faccio una copia del template per creare un nuovo invia_messaggio
    var nuovo_messaggio_pc = $('.template .message').clone();
    // aggiungo la classe "received" al messaggio
    nuovo_messaggio_pc.addClass('messaggio-ricevuto');
    // inserisco il testo "ok" nello span "message-text"
    nuovo_messaggio_pc.children('.message-text').text('ok');
    // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
    $('#contenitore-chat').append(nuovo_messaggio_pc);
}
