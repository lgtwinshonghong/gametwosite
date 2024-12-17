// Firebase SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyCHPrzsiHxveJJzKRqdQDNv3CvdDhc3yDc",
  authDomain: "social-baseball-data.firebaseapp.com",
  projectId: "social-baseball-data",
  storageBucket: "social-baseball-data.firebasestorage.app",
  messagingSenderId: "670574481404",
  appId: "1:670574481404:web:9c70fca95f8b5a45adec79",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ReCAPTCHA 초기화
window.onload = () => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': () => {
      console.log("ReCAPTCHA 확인됨");
    }
  }, auth);
};

// **아이디 중복 확인**
window.checkEmail = async () => {
  const email = document.getElementById("email").value;
  const resultElement = document.getElementById("email-check-result");
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      resultElement.style.color = "red";
      resultElement.innerText = "이미 사용중인 아이디 입니다.";
    } else {
      resultElement.style.color = "green";
      resultElement.innerText = "사용 가능한 아이디 입니다.";
    }
  } catch (error) {
    console.error("에러 발생:", error.message);
  }
};

// **전화번호 인증 코드 전송**
window.sendVerificationCode = () => {
  const phoneNumber = document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("인증 코드가 전송되었습니다.");
    })
    .catch((error) => {
      console.error("인증 코드 전송 실패:", error.message);
      alert("인증 코드 전송 실패: " + error.message);
    });
};

// **전화번호 인증 코드 확인**
window.verifyCode = () => {
  const code = document.getElementById("code").value;

  window.confirmationResult.confirm(code)
    .then(() => {
      document.getElementById("phone-check-result").innerText = "전화번호 인증 완료!";
      alert("전화번호 인증 성공!");
    })
    .catch((error) => {
      alert("인증 실패: " + error.message);
      console.error("인증 실패:", error.message);
    });
};

// **회원가입 및 Firestore 저장**
window.registerUser = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const city = document.getElementById("city").value;
  const birthdate = document.getElementById("birthdate").value;
  const phoneNumber = document.getElementById("phone").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Firestore에 추가 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        city: city,
        birthdate: birthdate,
        phone: phoneNumber
      });

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      window.location.href = "login.html"; // 성공 시 로그인 페이지로 리디렉션
    })
    .catch((error) => {
      alert("회원가입 실패: " + error.message);
      console.error("회원가입 실패:", error.message);
    });
};
