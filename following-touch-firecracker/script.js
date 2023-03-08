const touchWrap = document.querySelector(".touch__wrap");

function buildTouchAnimate() {
  // Mobile
  document.addEventListener("touchstart", addWillChange);
  document.addEventListener("touchstart", firecrackerTouchStart);
  document.addEventListener("touchmove", addWillChange);
  document.addEventListener("touchmove", firecrackerTouchMove);
  document.addEventListener("touchend", removeSparkle);

  // Web
  document.addEventListener("click", firecrackerMouseClick);
  document.addEventListener("mousemove", addWillChange);
  document.addEventListener("mousemove", firecrackerMouseMove);
  document.addEventListener("mousemove", firecrackerMouseMoveStop);

  // 每 2 秒檢查一次
  // var generateSparkle = setInterval(removeSparkle, 2000);
  // clearInterval
  // touchend 時，就把所有的點清空
}
// 預期 touchWrap 裡子層會發生改變
function addWillChange() {
  const childArray = Array.from(touchWrap.childNodes);

  childArray.forEach( function(el) {
    el.classList.add("js-willChange");
  })
}

// 當 CSS 動畫結束後清除 will-change 屬性
function removeWillChange() {
  const childArray = Array.from(touchWrap.childNodes);

  childArray.forEach( function(el) {
    el.classList.remove("js-willChange");
  })
}

// 當滑鼠停止滑動時，清除掉 will-change
function firecrackerMouseMoveStop () {
  let timer;
  let delayTime = 250;

  clearTimeout(timer);
  timer = setTimeout(removeSparkle(), delayTime);
}

// 產生範圍內的隨機數字
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

// 當 touchEnd 時，清除 touchWrap 裡的所有子元素
function removeSparkle() {
  const currentSparkleCount = touchWrap.children.length;
  while (touchWrap.firstChild && currentSparkleCount >= 50) {
    touchWrap.removeChild(touchWrap.firstChild);
  };
}

function removeSparkleWithNumber() {
  let maxLength = 60;
  const childArray = Array.from(touchWrap.childNodes);

  // 檢查 touchWrap 裡的 child nodes 數量
  // 超過 maxLength，就刪除前面一半數量的元素
  if (childArray.length > maxLength) {
    let newChildArray = childArray.splice(0, maxLength / 2);
    
    newChildArray.forEach(function (el) {
      el.remove();
    });
  }
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

  // 新增至頁面上
  touchWrap.appendChild(el);
}

function updateFirecrackerPosition(el, identifier) {
  el.style.top = `${identifier.clientY}px`;
  el.style.left = `${identifier.clientX}px`;
}

// touch start
function firecrackerTouchStart(touches) {
  // 偵測不同手指
  [...touches.changedTouches].forEach((touch) => {
    const firecracker = document.createElement("div");

    firecracker.classList.add("sparkler");

    // 生成火花
    firecrackerAnimate(firecracker, 40, 80, 140);

    // 偵測並更新 X / Y 軸位置
    updateFirecrackerPosition(firecracker, touch);
  });
}

// touch move
function firecrackerTouchMove(touches) {
  // 偵測不同手指
  [...touches.changedTouches].forEach((touch) => {
    const firecracker = document.createElement("div");

    firecracker.classList.add("sparkler");

    // 生成火花
    firecrackerAnimate(firecracker, 20, 50, 120);

    // 偵測並更新 X / Y 軸位置
    updateFirecrackerPosition(firecracker, touch);
  });
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

export let initTouchFirecracker = document.addEventListener("DOMContentLoaded", buildTouchAnimate);
