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

// MILESTONE 3
// Click sul contatto​ mostra la conversazione del contatto cliccato, è possibile inserirenuovi messaggi per ogni conversazione●Cancella messaggio: ​cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

//
// intercetto il click su un contatto
$('.chat-nella-lista').click(function() {

    // tolgo la classe active a tutti i div chat-nella-lista
    $('.chat-nella-lista').removeClass('active');
    // aggiungo la classe active al contatto su cui ho cliccato
    $(this).addClass('active');

    // recupero il valore dell'attributo data-chat del contatto su cui ho cliccato
    var chat = $(this).data('chat');
    console.log(chat);
    // tolgo la classe active a tutti i div contenitore-chat per nascondere tutti i pannelli delle chat
    $('.contenitore-chat').removeClass('active');


    // recupero il div contenitore-chat che ha lo stesso attributo data-chat del contatto su cui ho cliccato  e ci assegno  la classe active
    $('.contenitore-chat').each(function(){
        var chat_messaggi = $(this).attr('data-chat');
        console.log('data-chat messaggi' + chat_messaggi);
        // se questo data-chat tra i contatti è uguale alla data-chat  del contenitore-chat, allora gli aggiungo la classe 'active'
        if (chat == chat_messaggi) {
            $(this).addClass('active');
        }
    });

    // o più semplicemente
    // $('.contenitore-chat[data-chat="'+ chat +'"]').addClass('active');

    // prendo il nome del contatto su cui ho cliccato
    var nome_contatto = $(this).find('.nome-persona').text();
    // console.log(nome_contatto);
    // inserisco il nome del contatto nella chat aperta di destra, con i messaggi
    $('.nome-chat-aperta').text(nome_contatto);

    // recupero il percorso del file dell'immagine del contatto su cui ho cliccato
    var src_contatto = $(this).find('.cerchio-immagine img').attr('src');
    // console.log(src_contatto);
    // imposto il percorso del file dell'immagine nella parte di intestazione di destra
    $('.cerchio-avatar img ').attr('src', src_contatto);

});

// intercetto il click sull'icona del dropdown del messaggio
$('.contenitore-chat').on('click' , '.message-options', function(){
    console.log('click');

// visualizzo il div "message-options-panel" corrispondente al messaggio su cui ho cliccato
    $(this).siblings('.message-options-panel').toggleClass('active');
});

// Minestone 1

// funzione per inviare un nuovo messaggio
function invia_messaggio(){
    // recupero il testo inserito dall'utente nell'input
    var testo_utente = $(".testo-inserito").val();
    if(testo_utente !=''){
        // faccio una copia del template per creare un nuovo messaggio
        var nuovo_messaggio = $('.template .message').clone();
        console.log(nuovo_messaggio);

        // inserisco il testo dell'utente nello span message-text
        nuovo_messaggio.children('.message-text').text(testo_utente);
        // aggiungo la classe "sent" al nuovo_messaggio
        nuovo_messaggio.addClass('messaggio-inviato');
        // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
        $('.contenitore-chat.active').append(nuovo_messaggio);
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
    $('.contenitore-chat.active').append(nuovo_messaggio_pc);
}
