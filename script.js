console.log("script 실행됨")
// URL에서 count 가져오기
const params = new URLSearchParams(window.location.search);
const count = parseInt(params.get("count"));

const container = document.getElementById("options");

// 입력창 생성
for (let i = 0; i < count; i++) {
    const input = document.createElement("input");
    input.placeholder = `선택지 ${i+1}`; // ' 아니라 백틱
    input.className = "choiceInput";
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
}

function decide()   {
    const inputs = document.querySelectorAll(".choiceInput");
    const values = [];

    inputs.forEach(input => {
        if (input.value) {
            values.push(input.value);
        }
    });

    if (values.length < 2) {
        alert("최소 두 개 이상 입력해주세요!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * values.length);
    const result = values[randomIndex];

    //결과 페이지로 이동하면서 값 전달
    window.location.href = "result.html?result=" + encodeURIComponent(result);
}