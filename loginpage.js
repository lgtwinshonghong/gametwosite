const id = document.getElementById('id')
const password = document.getElementById('password')
const login = document.getElementById('login')
let errStack =0;

login.addEventListener('click',() =>{
   if(id.value == 'acid'){
     if(password.value = '0000'){
       alert('로그인 성공')
     }
     else{
        alert('아이디와 비밀번호를 다시한번 확인해주세요!!!')
        errStack++;
       }
   }
   else{
    alert('존재하지 않는 계정입니다.')
   }

   if(errStack >= 5){
     alert('비밀번호를 5회이상 틀리셨습니다 능지에 문제가 있어보입니다')
   }
})