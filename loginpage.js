// Firebase SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// **로그인 폼 이벤트 리스너**
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault(); // 기본 폼 제출 방지

  // 입력 필드에서 값 가져오기
  const email = document.querySelector("input[name='username']").value; // 이메일 입력 필드
  const password = document.querySelector("input[name='password']").value; // 비밀번호 입력 필드

  try {
    // Firebase Authentication 로그인 처리
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 로그인 성공
    alert("로그인 성공! 환영합니다.");
    console.log("로그인된 사용자:", user);
    window.location.href = "mainpage.html"; // 성공 시 메인 페이지로 이동
  } catch (error) {
    // 로그인 실패 처리
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === "auth/invalid-email") {
      alert("유효하지 않은 이메일 형식입니다.");
    } else if (errorCode === "auth/wrong-password") {
      alert("비밀번호가 올바르지 않습니다.");
    } else if (errorCode === "auth/user-not-found") {
      alert("등록되지 않은 이메일입니다.");
    } else {
      alert("로그인 실패: " + errorMessage);
    }

    console.error("로그인 오류:", error);
  }
});
