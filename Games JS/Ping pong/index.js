var game = function() {
    // tiempo de intervalo de la bola
    let time = 30;

    // movimiento de la bola
    let movement = 20;

    // movimiento de las barras
    let movementBar = 20;

    // Tamaño y ancho de la pantalla menos la barras
    let width = document.documentElement.clientWidth - movement;
    let height = document.documentElement.clientHeight - movement;

    // detener el intervalo cuando termina el juego
    let controlGame;

    let player1
    let player2;





    // Inicia el juego
    function start() {
        init();

        // cada 30milisegundos se mueve el juego
        controlGame = setInterval(play, time);
    }






    function init() {
        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1 //right 1, left 2

        player1 = new Object();
        player2 = new Object();

        player1.keyPress = false;
        player1.keyCode = null;

        player2.keyPress = false;
        player2.keyCode = null;
    }



    // detiene el juego
    function stop() {
        clearInterval(controlGame);
        document.body.style.background = "red";
    }






    // inicia el juego
    function play() {
        moverBar();
        moveball();
        checkIflost();
    }






    // mover las barras con las teclas
    function moverBar() {
        if(player1.keyPress) {

            // Para subir la barra
            if(player1.keyCode == 81 && bar1.offsetTop >= 0) {
                bar1.style.top = (bar1.offsetTop - movementBar) + "px"; 
            }

            // Para bajar la barra
            if(player1.keyCode == 65 && (bar1.offsetTop + bar1.clientHeight) <= height) {
                bar1.style.top = (bar1.offsetTop + movementBar) + "px"; 
            }
        }



        if(player2.keyPress) {
              // Para subir la barra
              if(player2.keyCode == 79 && bar2.offsetTop >= 0) {
                bar2.style.top = (bar2.offsetTop - movementBar) + "px"; 
            }

            // Para bajar la barra
            if(player2.keyCode == 76 && (bar2.offsetTop + bar2.clientHeight) <= height) {
                bar2.style.top = (bar2.offsetTop + movementBar) + "px"; 
            }
        }
    }







    // movimiento de la bola
    function moveball() {
        checkBallState();
        switch(ball.state) {
            case 1: //derecha, abajo
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;





            case 2: //derecha, arriba
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;





            case 3: //izquierda, abajo
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;





            case 4: //izquierda, arriba
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
        }
    }










    // para cambiar el estado de la bola
    function checkBallState() {

        // para cambiar el estado de la bola
        if (ball.direction === 1) {
            if(ball.offsetTop >= height) ball.state = 2; // de derecha y abajo a arriba
            else if(ball.offsetTop <= 0) ball.state = 1;
        } else {
            if(ball.offsetTop >= height) ball.state = 4; // de izquierda y abajo a arriba
            else if(ball.offsetTop <= 0) ball.state = 3;
        }


        // para cambiar la direccion al chocar con una de las barras
        if(collidePlayer2()) {
            ball.direction = 2;
            if(ball.state == 1) ball.state = 3;
            if(ball.state == 2) ball.state = 4;
        } else if (collidePlayer1()) {
            ball.direction = 1;
            if(ball.state == 3) ball.state = 1;
            if(ball.state == 4) ball.state = 2;
        }


    };







    









    // colision de barra1
    function collidePlayer1 () {
        if(ball.offsetLeft <= (bar1.clientWidth) && 
        ball.offsetTop >= bar1.offsetTop &&
        ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {
            return true;
        }
    }


    // colision de barra2
    function collidePlayer2 () {
        if(ball.offsetLeft >= (width-bar2.clientWidth) && 
        ball.offsetTop >= bar2.offsetTop &&
        ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {
            return true;
        }
    }



    









    
    // si la bola sale del mapa, pierdes
    function checkIflost() {
        if(ball.offsetLeft >= width) {
            stop();
            console.log("Punto para Player 1");
        }


        if(ball.offsetLeft <= 0) {
            stop();
            console.log("Punto para Player 2");
        }
    }




















    // detectar que tecla tocamos y guardarlo
    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 81: //Q
            case 65: //A
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
            break;



            case 79: //O
            case 76: //L
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
        }
    }








    // Detectar cuando soltamos la tecla
    document.onkeyup = function(e) {
        if(e.keyCode == 81 || e.keyCode == 65)
            player1.keyPress = false;
        if(e.keyCode == 79 || e.keyCode == 76)
            player2.keyPress = false;
    }


    start();
}();


