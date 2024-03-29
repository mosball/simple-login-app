const mainComponent = {
    getComponent() {
        return `
        <pre id="default-body">
            <h2>기술요구사항</h2>
            <h3>일반공통</h3>
            <ul>
                <li>서버환경은 구현하지 않으며, 서버와 데이터 동기화는 하지 않는다.</li>
                <li>PC 기준 웹 화면을 개발한다. Mobile Web을 고려하지 않는다.</li>
                <li>크롬브라우저를 기준으로 개발한다.</li>
                <li>반응형웹을 고려하지 않는다.</li>
                <li>라이브러리를 사용할 수 없다. (jQuery, React, Vue, lodash, bootstrap, materialUI등등)</li>
                <li>단, 로그인UI 개발에서는 CSS지원을 받을 수 있는 라이브러리를 필수로 사용해야 한다.</li>
            </ul>
            <h3>HTML</h3>
            <ul>
                <li>HTML5 Layout 태그를 사용한다(header, footer 등)</li>
                <li>의미에 맞는 적절한 태그를 선택해서 사용한다.</li>
                <li>W3C Validator 를 통과하도록 한다.</li>
                </ul>
            <h3>CSS</h3>
            <ul>
                <li>모든 엘리먼트의 크기는 임의로 크기를 정할 수 있으나, layout은 반듯하고, 불규칙적이거나, 삐뚤어지는 부분이 없어야 한다.</li>
                <li>의미적으로 같은 엘리먼트들은 같은 넓이와 크기를 갖도록 한다.</li>
                <li>font 크기도 자유롭게 정해서 사용하되, 일관된 크기를 사용한다.</li>
                <li>padding 과 margin을 일관된 크기로 사용한다.</li>
                <li>CSS 클래스 이름 규칙을 스스로 정하고, 이를 지키며 개발한다.</li>
                <li>flexbox 속성을 이용하여 레이아웃을 구성한다.</li>
                <li>CSS variables 을 사용한다.</li>
            </ul>
            <h3>JavaScript</h3>
            <ul>
                <li>전역변수를 최소화 한다.</li>
                <li>함수는 <strong>동사+명사</strong>로 구성한다. 변수는 명사를 사용한다.</li>
                <li>기능단위로 객체를 만들고, 객체는 literal방식을 사용한다.</li>
                <li>literal은 2개 이상 만든다.</li>
                <li>객체내의 메서드의 크기는 최소한의 크기로 유지한다.</li>
                <li>framework나 라이브러리를 사용하지 않는다.</li>
                <li>ES2015 문법을 적극 사용한다.</li>
                <li>표준 DOM API를 사용한다.</li>
                <li>addEventListener를 사용해서 개발한다.</li>
                <li>정규표현식을 사용할 수 있다.</li>
            </ul>
        </pre>
        `
    }
}