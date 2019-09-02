const joinComponent = {
    getComponent() {
        return `
        <form id="join-form" method="POST" action="">
            <div class="join-form-box">
                <h3>회원가입</h3>
            </div>
    
            <div id="id-field" class="join-form-box">
                <div class="join-form-box-title">
                    아이디
                </div>
                <div class="join-form-box-input">
                    <input type="text" name="id" data-target="#id-field > .join-form-box-infomsg"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="password-field" class="join-form-box">
                <div class="join-form-box-title">
                    비밀번호
                </div>
                <div class="join-form-box-input">
                    <input type="password" name="password" data-target="#password-field > .join-form-box-infomsg"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="password2-field" class="join-form-box">
                <div class="join-form-box-title">
                    비밀번호 재확인
                </div>
                <div class="join-form-box-input">
                    <input type="password" name="password2" data-target="#password2-field > .join-form-box-infomsg"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="name-field" class="join-form-box">
                <div class="join-form-box-title">
                    이름
                </div>
                <div class="join-form-box-input">
                    <input type="text" name="name"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="birth-field" class="join-form-box">
                <div class="join-form-box-title">
                    생년월일
                </div>
                <div class="join-form-box-input">
                    <input type="text" name="year" placeholder=" 년(4자)" data-target="#birth-field > .join-form-box-infomsg"/>
                    <select name="month">
                        <option selected hidden>월</option>
                        <option value = 1>1</option>
                        <option value = 2>2</option>
                        <option value = 3>3</option>
                        <option value = 4>4</option>
                        <option value = 5>5</option>
                        <option value = 6>6</option>
                        <option value = 7>7</option>
                        <option value = 8>8</option>
                        <option value = 9>9</option>
                        <option value = 10>10</option>
                        <option value = 11>11</option>
                        <option value = 12>12</option>
                    </select>
                    <input type="text" name="day" placeholder=" 일" data-target="#birth-field > .join-form-box-infomsg"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="gender-field" class="join-form-box">
                <div class="join-form-box-title">
                    성별
                </div>
                <div class="join-form-box-input">
                    <select name="gender">
                        <option selected hidden>성별</option>
                        <option value = 'male'>남성</option>
                        <option value = 'female'>여성</option>
                    </select>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="email-field" class="join-form-box">
                <div class="join-form-box-title">
                    이메일
                </div>
                <div class="join-form-box-input">
                    <input type="text" name="email" data-target="#email-field > .join-form-box-infomsg"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="phone-field" class="join-form-box">
                <div class="join-form-box-title">
                    휴대전화
                </div>
                <div class="join-form-box-input">
                    <input type="text" name="phone" placeholder=" - 없이 입력하세요. ex:01012341234" 
                    data-target="#phone-field > .join-form-box-infomsg"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="interest-field" class="join-form-box">
                <div class="join-form-box-title">
                    관심사
                </div>
                <div class="join-form-box-input">
                    <input type = "text" data-target="#interest-field > .join-form-box-infomsg" maxLength="12"/>
                </div>
                <div class="join-form-box-infomsg">
                </div>
            </div>
    
            <div id="rules" class="join-form-box">
                <span class="join-form-box-title">약관에 동의합니다.</span>
                <input type="checkbox" name="rules" disabled />
            </div>
    
            <div id="btn-group" class="join-form-box">
                <button id="init-btn">초기화</button>
                <button id="join-btn">가입하기</button>
            </div>
        </form>
        `
    }
}