const touchWrap = document.querySelector(".touch__wrap");

function buildTouchAnimate() {
  // Mobile
  // document.addEventListener("touchstart", addWillChange);
  // document.addEventListener("touchstart", firecrackerTouchStart);
  // document.addEventListener("touchmove", addWillChange);
  // document.addEventListener("touchmove", firecrackerTouchMove);
  // document.addEventListener("touchend", removeSparkle);

  // Web
  document.addEventListener("click", firecrackerMouseClick);
  document.addEventListener("mousemove", addWillChange);
  document.addEventListener("mousemove", firecrackerMouseMove);
}

// 產生範圍內的隨機數字
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

function updateFirecrackerPosition(el, identifier) {
  el.style.top = `${identifier.clientY}px`;
  el.style.left = `${identifier.clientX}px`;
}

// 預期 touchWrap 裡子層會發生改變
function addWillChange() {
  const childArray = Array.from(touchWrap.childNodes);

  childArray.forEach(function (el) {
    el.classList.add("js-willChange");
  });
}

// 生成火花動畫
function firecrackerAnimate(el, max, minTravel, maxTravel) {
  const animationDuration = 1.2;

  // 生成隨機
  for (let count = 0; count < max; count++) {
    el.insertAdjacentHTML(
      "beforeend",
      `
    <div class="sparkler__spark" style="
      --rotation: ${randomInRange(0, 360)}; 
      --delay: ${Math.random()}; 
      --speed: ${randomInRange(1, 10) / 10}; 
      --travel: ${randomInRange(minTravel, maxTravel)}; 
      --h: ${randomInRange(20, 60)}; 
      --s: ${randomInRange(50, 100)}; 
      --l: ${randomInRange(50, 100)};">
    </div>
  `
    );
  }

  // 加上淡入淡出動畫
  el.style.animation = `fade-out ${animationDuration}s ease-out forwards`;

  // 當該元素的動畫結束後，移除該元素
  el.addEventListener('animationend', function() {
    this.remove();
  });

  // 新增至頁面上
  touchWrap.appendChild(el);
}

// mouse click
function firecrackerMouseClick(click) {
  const firecracker = document.createElement("div");

  firecracker.classList.add("sparkler");
  // 生成火花
  firecrackerAnimate(firecracker, 80, 130, 180);

  // 偵測滑鼠 X / Y 軸移動位置
  updateFirecrackerPosition(firecracker, click);
}

// mouse move
function firecrackerMouseMove(mouse) {
  const firecracker = document.createElement("div");

  firecracker.classList.add("sparkler");

  // 生成火花
  firecrackerAnimate(firecracker, 40, 110, 160);

  // 偵測滑鼠 X / Y 軸移動位置
  updateFirecrackerPosition(firecracker, mouse);

  firecracker.style.transition = "all 0.5s linear 0s";
  firecracker.style.left = `${firecracker.offsetLeft - 10}px`;
  firecracker.style.top = `${firecracker.offsetTop - 10}px`;
  firecracker.style.opacity = 0;
}

// touch start
// function firecrackerTouchStart(touches) {
//   // 偵測不同手指
//   [...touches.changedTouches].forEach((touch) => {
//     const firecracker = document.createElement("div");

//     firecracker.classList.add("sparkler");

//     // 生成火花
//     firecrackerAnimate(firecracker, 40, 80, 140);

//     // 偵測並更新 X / Y 軸位置
//     updateFirecrackerPosition(firecracker, touch);
//   });
// }

// touch move
// function firecrackerTouchMove(touches) {
//   // 偵測不同手指
//   [...touches.changedTouches].forEach((touch) => {
//     const firecracker = document.createElement("div");

//     firecracker.classList.add("sparkler");

//     // 生成火花
//     firecrackerAnimate(firecracker, 20, 50, 120);

//     // 偵測並更新 X / Y 軸位置
//     updateFirecrackerPosition(firecracker, touch);
//   });
// }

document.addEventListener("DOMContentLoaded", buildTouchAnimate);
