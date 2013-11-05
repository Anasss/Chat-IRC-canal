
          
            var socket = io.connect('http://localhost:8080');

var nomClient = prompt('Entrer votre nom :');
            socket.emit('nouveau_client', nomClient);
            document.title = nomClient + ' - ' + document.title;

            socket.on('message', function(data) {
                insereMessage(data.nomClient, data.message)
            })
      socket.on('nouveau_client', function(nomClient) {
                $('#zone_chat').prepend('<p><i>' + nomClient + ' vient de rejoindre le Chat !</i></p>');
            })
            $('#formulaire_chat').submit(function () {
                var message = $('#message').val();
                socket.emit('message', message); 
                insereMessage(nomClient, message); 
                $('#message').val('').focus(); 
                return false; 
            });
            
        function insereMessage(nomClient, message) {
          $('#zone_chat').prepend('<p><ul><li><strong>' + nomClient + '</strong> Dit :</li></ul>  ' + message + '</p>');
            }
