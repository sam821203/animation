// html setup
const pupilsNodeLists = document.querySelectorAll('.pupil');
const pupilsArr = Array.from(pupilsNodeLists);

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
}
// 設定 input 的範圍值
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// output setup
let output = {
  x: {
    start: -75,
    end: 75,
    current: 0,
  },
  y: {
    start: -75,
    end: 75,
    current: 0,
  }
}
// 設定 output 的範圍值
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

const handleMouseMove = (event) => {
  // mouseX input
  input.mouseX.current = event.clientX;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

  // mouseY input
  input.mouseY.current = event.clientY;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
  
  // output x
  output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
  // output x inverse
  output.x.opposite = output.x.end - (input.mouseX.fraction * output.x.range);

  // output y
  output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
  // output y inverse
  output.y.opposite = output.y.end - (input.mouseY.fraction * output.y.range);

  // apply output to html
  pupilsArr.forEach((pupil, i) => {

    if (i === 0) {
      pupil.style.transform = `translate(${output.x.current}px, ${output.y.current}px)`;
    } else {
      pupil.style.transform = `translate(${output.x.opposite}px, ${output.y.opposite}px)`;
    }
  })

  // 控制在 0 ~ 1 之間
  // if (input.mouseX.fraction > 1) input.mouseX.fraction = 1;
  // if (input.mouseX.fraction < 0) input.mouseX.fraction = 0;

  // console.log('fraction X: ', input.mouseX.fraction);
  // console.log('fraction Y: ', input.mouseY.fraction);
  console.log('output X: ', output.x.current);
}

const handleResize = () => {
  input.mouseX.end = window.innerWidth;
  input.mouseY.end = window.innerHeight;

  // 當 end 的值更新時，也需要重新計算 range 的值
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

// fraction value
window.addEventListener('mousemove', handleMouseMove)

// 監聽 resize 時的 window 寬度
window.addEventListener('resize', handleResize);