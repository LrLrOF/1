function addCharacter() {
  const copyright = document.getElementById("copyright").value;
  const name = document.getElementById("name").value;
  const info = document.getElementById("info").value;
  const featureText = document.getElementById("feature").value;
  const animal = document.getElementById("animal").value;
  const palette = document.getElementById("palette").value;
  const imageColor = document.getElementById("imageColor").value;
  const file = document.getElementById("imageInput").files[0];

  if (!file) {
    alert("이미지는 필수입니다.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const card = document.createElement("div");
    card.className = "card";

    const colors = palette.split(',');

    card.innerHTML = 
      <img src="${e.target.result}">
      ${copyright ? <div class="copyright-text">${copyright}</div> : ''}
      ${name ? <h2>${name}</h2> : ''}
      ${info ? <div class="info-text">${info}</div> : ''}

      <div class="label-box">특징</div>
      <p>${
        featureText
          .split('\n')
          .map(f => - ${f})
          .join('<br>')
      }</p>

      <div class="info-inline">
        <div class="label-box">동물화</div>
        <div>${animal}</div>
      </div>

      <div class="info-inline">
        <div class="label-box">컬러팔레트</div>
        <div>
          ${colors.map(c => <span class="color-box" style="background-color:${c.trim()}"></span>).join('')}
        </div>
      </div>

      <div class="info-inline">
        <div class="label-box">이미지컬러</div>
        <div>${imageColor}</div>
      </div>

      <button class="delete-btn" onclick="this.closest('.card').remove()">🗑 삭제</button>
    ;

    // 카드 추가는 내부 스크롤 영역(cardWrapper)에 추가
    document.getElementById("cardWrapper").appendChild(card);

    clearInputs(); // 입력창 자동 초기화
  };

  reader.readAsDataURL(file);
}

function saveAllAsImage() {
  const target = document.getElementById("cardWrapper");

  // 삭제 버튼 숨기기
  const deleteButtons = target.querySelectorAll(".delete-btn");
  deleteButtons.forEach(btn => btn.style.display = "none");

  // 캡처 전 스타일 보존 및 최소화
  const originalStyle = {
    backgroundColor: target.style.backgroundColor,
    border: target.style.border,
    borderRadius: target.style.borderRadius,
    boxShadow: target.style.boxShadow,
    width: target.style.width,
  };

  target.style.backgroundColor = "#fff";
  target.style.border = "none";
  target.style.borderRadius = "0";
  target.style.boxShadow = "none";
  target.style.width = "auto"; // 콘텐츠 너비에 맞게 캡처

  html2canvas(target, {
    backgroundColor: null,
    useCORS: true,
    scale: 2
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "설정표.png";
    link.href = canvas.toDataURL();
    link.click();

    // 스타일 복구
    deleteButtons.forEach(btn => btn.style.display = "block");
    Object.assign(target.style, originalStyle);
  });
}


function clearInputs() {
  document.getElementById("copyright").value = "";
  document.getElementById("name").value = "";
  document.getElementById("info").value = "";
  document.getElementById("feature").value = "";
  document.getElementById("animal").value = "";
  document.getElementById("palette").value = "";
  document.getElementById("imageColor").value = "";
  document.getElementById("imageInput").value = "";
}

function clearAllCards() {
  const wrapper = document.getElementById("cardWrapper");

  if (!wrapper || wrapper.children.length === 0) {
    alert("삭제할 내용이 없습니다.");
    return;
  }

  if (confirm("모든 내용을 삭제하시겠습니까?")) {
    wrapper.innerHTML = "";
  }
}
