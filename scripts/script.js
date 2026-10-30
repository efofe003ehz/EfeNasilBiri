import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-database.js";

const commentInput = document.getElementById("commentInput");
const nameInput = document.getElementById("nameInput");
const infoP = document.getElementById("infoP");
const sendBtn = document.getElementById("sendBtn");

const firebaseConfig = {
    apiKey: "AIzaSyCQXT7Jjdic5F3rWjq4UQdQpsdbrvGeojU",
    authDomain: "efenasilbiri.firebaseapp.com",
    projectId: "efenasilbiri",
    storageBucket: "efenasilbiri.firebasestorage.app",
    messagingSenderId: "558287006059",
    appId: "1:558287006059:web:0c6b667bf00edf8013042e",
    databaseURL: "https://efenasilbiri-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const comRef = ref(db, "comments");

sendBtn.addEventListener("click", () => {
    const comment = commentInput.value;
    const name = nameInput.value;
    
    if (!(comment === "") && !(name === "")) {
        signInAnonymously(auth).then(() => {
            return push(comRef, {
                comment: comment,
                name: name
            });
        }).then(() => {
            infoP.textContent = `güzel geldi tmm çık şimdi`;
        }).catch((e) => {
            infoP.textContent = `hata oldu sen anlaman boşver tmm`;
        }).finally(() => {
            setTimeout(() => { infoP.textContent = ``; }, 2000);
        });
        commentInput.value = "";
        nameInput.value = "";
    } else {
        infoP.textContent = "şu soktumun yorumuyla ismini girsene canım";
        setTimeout(() => { infoP.textContent = ""; }, 2000);
    }
});