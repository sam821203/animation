// html setup
const itemsNodeLists = document.querySelectorAll('.parallax__item');
const itemsArr = Array.from(itemsNodeLists);
const entireHTML = document.documentElement;

// input setup
let input = {
  mouseX: {
    start: 0,
    end: window.innerWidth,
    current: 0,
  },
  mouseY: {
    start: 0,
    end: window.innerHeight,
    current: 0,
  },
  scrollY: {
    start: 0,
    end: entireHTML.scrollHeight - window.innerHeight,
    current: 0,
  },
}
// 設定 input 的範圍值
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;
input.scrollY.range = input.scrollY.end - input.scrollY.start;

// output setup
let output = {
  x: {
    start: -150,
    end: 150,
    current: 0,
  },
  y: {
    start: -150,
    end: 150,
    current: 0,
  },
  zIndex: {
    range: 10000,
  },
  scale: {
    start: 1,
    end: 0.1,
  },
  blur: {
    startingDepth: 0.2,
    range: 10,
  }
}
// 設定 output 的範圍值
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;
output.scale.range = output.scale.end - output.scale.start

let mouse = {
  // 讓元素的初始位置在視窗中間
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.5,
} 

const updateInputs = () => {
  // mouseX input
  input.mouseX.current = mouse.x;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

  // mouseY input
  input.mouseY.current = mouse.y;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

  // scrollY input
  input.scrollY.current = entireHTML.scrollTop;
  input.scrollY.fraction = (input.scrollY.current - input.scrollY.start) / input.scrollY.range;
}

const updateOutputs = () => {
  // output x and y
  // output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
  // output.x.opposite = output.x.end - (input.mouseX.fraction * output.x.range);
  // output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);
  // output.y.opposite = output.y.end - (input.mouseY.fraction * output.y.range);

  // scroll y
  output.y.current = output.y.end - (input.scrollY.fraction * output.y.range);
}

const updateEachItem = () => {
  // apply output to html
  itemsArr.forEach((item, i) => {
    const depth = parseFloat(item.dataset.depth, 10);
    let itemOutput = {
      x: output.x.current - (output.x.current * depth),
      y: output.y.current - (output.y.current * depth),
      zIndex: output.zIndex.range - (output.zIndex.range * depth),
      scale: output.scale.start + (output.scale.range * depth),
      blur: (depth - output.blur.startingDepth) * output.blur.range,
    };

    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = `scale(${itemOutput.scale}) translate(${itemOutput.x}px, ${itemOutput.y}px)`;
    item.style.filter = `blur(${itemOutput.blur}px)`;
  })
}

const handleMouseMove = (event) => {

  // 將滑鼠的位置儲存到 mouse 物件中
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  updateInputs();
  updateOutputs();
  updateEachItem();

  // 控制在 0 ~ 1 之間
  // if (input.mouseX.fraction > 1) input.mouseX.fraction = 1;
  // if (input.mouseX.fraction < 0) input.mouseX.fraction = 0;
}

const handleScroll = () => {
  updateInputs();
  updateOutputs();
  updateEachItem();
  // const scrollMax = entireHTML.scrollHeight - window.innerHeight;
}

const handleResize = () => {
  input.mouseX.end = window.innerWidth;
  input.mouseY.end = window.innerHeight;
  input.scrollY.end = entireHTML.scrollHeight - window.innerHeight;

  // 當 end 的值更新時，也需要重新計算 range 的值
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
  input.scrollY.range = input.scrollY.end - input.scrollY.start;
}

// mousemove event
// window.addEventListener('mousemove', handleMouseMove)

// scroll event
document.addEventListener('scroll', handleScroll);

// 監聽 resize 時的 window 寬度
window.addEventListener('resize', handleResize);

updateInputs();
updateOutputs();
updateEachItem();
