// 背景飄落
// ================================
function initFallingBackground() {
  // if(!checkAnimationClass()){
  // };
  new FallingImages();
  checkAnimationClass();
} 

const rootStyles = window.getComputedStyle(document.documentElement);

function FallingImages() {
  // 檢查是否有 random__layer，如果沒有則不執行
  if (document.querySelector(".falling-random .random__block")) {

  const imgNum = Number(rootStyles.getPropertyValue("--number")) || 10;
    console.log(this);
    this.num = imgNum;
    this.init();
  }
}

FallingImages.prototype.init = function () {

  this.image = document.createElement("div");
  this.image.classList.add('falling-random-image');

  for (let i = 0; i < this.num; i++) {
    this.clone(i);
  }
};

FallingImages.prototype.clone = function (i) {
  const myContainer = document.querySelector(".random__layer");
  const imageClone = this.image.cloneNode(true);
  const imageStyle = imageClone.style;
  const regex = /[+-]?\d+(\.\d+)?/g;

  // 取得 :root 裡的變數屬性值
  // 最大尺寸
  const fSize = Number(rootStyles.getPropertyValue("--size")) || 22;
  // 最小尺寸
  const fSizeMin = Number(rootStyles.getPropertyValue("--size-min")) || 12;
  const animeDuration = Number(rootStyles.getPropertyValue("--time")) || 8;

  imageStyle.left = 100 * Math.random() + "%";
  imageStyle.width = Math.random() + 0.8 + "em";
  imageStyle.height = imageStyle.width;
  imageStyle.fontSize = fSize * Math.random() + fSizeMin + "px";
  imageStyle.animationDelay = 8 * Math.random() + "s";
  imageStyle.animationDuration = animeDuration * Math.random() + 6 + "s";

  // 根據圖片大小會判斷該圖片 blur 程度
  const blurValue = 2 - parseFloat(imageStyle.width.match(regex) * 2);

  // imageClone.classList.add("is-rotateY");

  // if (i % 3 == 0) {
  //   imageClone.classList.add("is-rotateX");
  // } else if (i % 5 == 0) {
  //   imageClone.classList.add("is-rotateY");
  // } else if (i % 2 == 0) {
  //   imageClone.classList.add("is-rotateZ");
  // }

  myContainer.appendChild(imageClone);

  imageClone.addEventListener("animationend", () => {
    imageClone.remove();
    this.clone(i);
  });
};

// 判斷 bg__container 裡有甚麼 class
function checkAnimationClass() {
  const bgContainer = document.querySelector(".bg__container");
  const fallingLayer = document.querySelector(".bg__container .falling__layer");
  const hasRandomFalling = bgContainer.classList.contains('falling-random');
  const classLength = bgContainer.classList.length;

  // 判斷是否沒有添加 class 
  if (classLength === 1){ 
    bgContainer.classList.remove('bg__container');
  } else {
    bgContainer.classList.add('active');
  }

  // 判斷是否有添加圖片隨機動畫 
  // if (hasRandomFalling) {
  //   fallingLayer.remove();
  //   return false;
  // } 
}

document.addEventListener("DOMContentLoaded", initFallingBackground);