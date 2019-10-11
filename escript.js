let count = 3, num = 0, seconds = 15;
let t, sum, icon = false;
let score = 0; //คะแนน

timedCount();
//randomโจทย์
random();

//แสดงค่า
document.getElementById("score").innerHTML = score;

//Set speech recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.continuous = true;
//Start speech recognition
recognition.start();
let transcript;
recognition.onresult = (e) => {
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        if (e.results[i].isFinal) {
            transcript = e.results[i][0].transcript;
        }
    }
    //กรณีตอบถูก
    if (sum.toString() == transcript.trim()) {
        //alert("true");
        icon = true;
        score += 10;
        //document.getElementById("test").innerHTML = transcript;
        //transcript = '';
    }
    else {
        --count;

    }
    //random
    random();
    //Output transcript
    document.getElementById("test").innerHTML = transcript;
    document.getElementById("score").innerHTML = score;


}

//recognition.addEventListener('end', recognition.start);
function timedCount() {
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("time").innerHTML = "00:" + seconds;
    document.getElementById("count").innerHTML = count;
    seconds -= 1;
    t = setTimeout(timedCount, 1000);

    //สำหรับการrandomคำถามใหม่เมื่อหมดเวลา
    if (count > -1 && seconds < 0) {
        //clearTimeout(t);
        count--;
        //ดักการrandomใหม่เมื่อ count=-1
        if (count != -1) {
            random();
        }
        //seconds = 10;
        //random();
        //timedCount();
    }
    //เรียกตัวเอง

    //ถ้าcountเป็น0จะแสดง lost time แล้วก็เคลียค่า t
    if (count == -1 || num == 11) {
        document.getElementById("count").innerHTML = 0;
        recognition.stop();
        clearTimeout(t);

        if (score <= 50) {
            swal({
                title: score + "/100",
                text: "ต้องปรับปรุง",
                icon: "error",
                button: true
            })
                .then((value) => {
                    window.location.href = 'index.html';
                });
        }
        else if (score == 60) {
            swal({
                title: score + "/100",
                text: "พอใช้",
                icon: "error",
                button: true
            })
                .then((value) => {
                    window.location.href = 'index.html';
                });
        }
        else if (score == 70) {
            swal({
                title: score + "/100",
                text: "ดี",
                icon: "success",
                button: true
            })
                .then((value) => {
                    window.location.href = 'index.html';
                });
        }
        else if (score == 80) {
            swal({
                title: score + "/100",
                text: "ดีมาก",
                icon: "success",
                button: true
            })
                .then((value) => {
                    window.location.href = 'index.html';
                });
        }
        else {
            swal({
                title: score + "/100",
                text: "ดีมากๆๆๆที่สุด",
                icon: "success",
                button: true
            })
                .then((value) => {
                    window.location.href = 'index.html';
                });
        }

    }
}

function noti() {
    if (num != 0) {
        if (icon) {
            icon = false;
            swal({
                text: "CORRECT",
                icon: "success",
                button: false,
                timer: 1500,
                className: "myClass"
            });
        }
        else {

            swal({
                text: "WRONG",
                icon: "error",
                button: false,
                timer: 1500,
                className: "myClass"
            });
        }
    }
}

function random() {
    noti();

    const operator = ['+', '-', '*', '/'];
    let op = operator[Math.floor(Math.random() * 2)];
    //op = operator[4];
    let n1 = Math.floor(Math.random() * 20);
    let n2 = Math.floor(Math.random() * 20);
    if (op == '+') {
        document.getElementById("demo").innerHTML = n1 + " + " + n2 + " =&nbsp;";
        sum = n1 + n2;
        while (sum == 10) {
            n1 = Math.floor(Math.random() * 20);
            n2 = Math.floor(Math.random() * 20);
        }
    }
    else if (op == '-') {
        while (n2 > n1) {
            n1 = Math.floor(Math.random() * 20);
            n2 = Math.floor(Math.random() * 20);
        }
        document.getElementById("demo").innerHTML = n1 + " - " + n2 + " =&nbsp;";
        sum = n1 - n2;
        while (sum == 10) {
            n1 = Math.floor(Math.random() * 20);
            n2 = Math.floor(Math.random() * 20);
        }
    }
    else if (op == '*') {
        document.getElementById("demo").innerHTML = n1 + " * " + n2 + " =&nbsp;";
        sum = n1 * n2;
        while (sum == 10) {
            n1 = Math.floor(Math.random() * 20);
            n2 = Math.floor(Math.random() * 20);
        }
    }
    else {
        document.getElementById("demo").innerHTML = n1 + " / " + n2 + " =&nbsp;";
        sum = n1 / n2;
        sum = Math.round(sum);
        while (sum == 10 || n2 == 0) {
            n1 = Math.floor(Math.random() * 20);
            n2 = Math.floor(Math.random() * 20);
        }
    }
    seconds = 15;
    ++num;
    if (num == 11) {
        document.getElementById("num").innerHTML = 10;
    }
    else document.getElementById("num").innerHTML = num;

}