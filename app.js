/*                START GAME FUNCTION with SPACE and COUNTDOWN TIMER        */

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        function countdown() {
            let i = document.getElementById('timer');
            i.innerHTML = parseInt(i.innerHTML)-1;
            if (parseInt(i.innerHTML)==0) {
               clearInterval(timerId);
               document.getElementById('time-alert').innerHTML='Game over'
            }   
        }
         var timerId = setInterval(function(){ countdown(); },1000);
    }
}


//////////////////////////////////////////////////