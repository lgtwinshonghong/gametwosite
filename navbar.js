import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase 인증 가져오기
const auth = getAuth();

// 로그인 상태 확인
onAuthStateChanged(auth, (user) => {
  const topMenu = document.getElementById("top_menu");

  if (user) {
    // 로그인된 경우
    const userName = user.displayName || user.email.split("@")[0]; // 이름 없으면 이메일 사용
    topMenu.innerHTML = `
      <a href="mainpage.html">HOME |</a>
      <span>${userName}님 환영합니다</span>
    `;
  } else {
    // 로그아웃 상태
    topMenu.innerHTML = `
      <a href="mainpage.html">HOME |</a>
      <a href="login.html">로그인 |</a>
      <a href="signup.html">회원가입</a>
    `;
  }
});
