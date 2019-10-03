let count = 3; //นับจำนวนครั้งที่ผิด
let num = 1; //เลขข้อ
var seconds = 10; //เวลาที่กดหนด
var t;

function timedCount() {
    //document.getElementById("time").value = c;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("time").innerHTML = "00:" + seconds;
    document.getElementById("count").innerHTML = count;
    seconds -= 1;
    //สำหรับการrandomคำถามใหม่เมื่อหมดเวลา
    if (count > 0 && seconds < 0) {
        //clearTimeout(t);
        count--;
        if (count != 0) {
            //ดักการrandomใหม่เมื่อ count=0
            n = Math.floor(Math.random() * 10);
            ++num;
        }
        seconds = 10;
        document.getElementById("num").innerHTML = num;
        document.getElementById("demo").innerHTML = lv1[n] + " = ";
        //timedCount();
    }
    //เรียกตัวเอง
    t = setTimeout(timedCount, 1000);
    //ถ้าcountเป็น0จะแสดง lost time แล้วก็เคลียค่า t
    if (count == 0) {
        document.getElementById("lost").innerHTML = "LOSE TIME";
        document.getElementById("count").innerHTML = count;
        clearTimeout(t);
    }

}

//คำถามและคำตอบ
const lv1 = ['4 + 5', '9 + 6', '7 + 8', '10 + 13', '1 + 9', '7 + 3', '19 + 4', '16 + 18', '3 + 3', '0 + 9', '5 - 3', '6 - 4', '5 - 5', '3 - 1'],
    ans1 = ['9', '15', '15', '23', '10', '10', '23', '34', '6', '9'];

let score = 0; //คะแนน
let n = Math.floor(Math.random() * 10); //เริ่มต้นrandom
//แสดงค่า
document.getElementById("num").innerHTML = num;
document.getElementById("score").innerHTML = score;
document.getElementById("demo").innerHTML = lv1[n] + " =&nbsp;";

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
    //const transcript = e.results[0][0].transcript;
    //กรณีตอบถูก
    if (ans1[n] == transcript) {
        //alert("true");
        ++score;
        document.getElementById("test").innerHTML = transcript;
        document.getElementById("lost").innerHTML = "current";
        transcript = '';
    }
    /*if (transcript.includes('hi')) {
        alert("Hi");
        transcript = '';
    }*/
    else document.getElementById("lost").innerHTML = "fail";
    //random
    random();
    //Output transcript
    document.getElementById("test").innerHTML = transcript;
    document.getElementById("score").innerHTML = score;


}
//เรียกให้เริ่มใหม่
//recognition.addEventListener('end', recognition.start);


function random() {
    n = Math.floor(Math.random() * 10);
    document.getElementById("demo").innerHTML = lv1[n] + " = ";
    seconds = 10;
    ++num;
    document.getElementById("num").innerHTML = num;
}