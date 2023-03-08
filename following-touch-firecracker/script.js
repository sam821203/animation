const animationDuration = 1.4;
      const touchWrap = document.querySelector(".touch__wrap");
      
      document.addEventListener("DOMContentLoaded", buildTouchAnimate);

      function randomInRange (min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
      }

      function buildTouchAnimate() {
        document.addEventListener("touchmove", animateFirecrackerMove);
        document.addEventListener("touchend", animateFirecrackerEnd);
      }

      function removeAllChildNodes(parent) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        };
      };

      // touch move
      function animateFirecrackerMove(touches) {
        
        // 偵測不同手指
        [...touches.changedTouches].forEach((touch) => {

          const firecracker = document.createElement("div");

          firecracker.classList.add('sparkler');
          
          for (let count = 0; count < 10; count++) {
            firecracker.insertAdjacentHTML('beforeend', `
            <div class="sparkler__spark" style="
              --rotation: ${randomInRange(0, 360)}; 
              --delay: ${Math.random()}; 
              --speed: ${randomInRange(1, 10) / 10}; 
              --travel: ${randomInRange(100, 150)}; 
              --h: ${randomInRange(20, 60)}; 
              --s: ${randomInRange(50, 100)}; 
              --l: ${randomInRange(50, 100)};">
            </div>
          `);
          }
          
          // 偵測 X 與 Y 軸
          firecracker.style.top = `${touch.clientY}px`;
          firecracker.style.left = `${touch.clientX}px`;

          // 加上淡入淡出動畫
          firecracker.style.animation = `fade-out ${animationDuration}s ease-out forwards`;

          // 新增至頁面上
          touchWrap.appendChild(firecracker);
        });
      }

      // touch end
      function animateFirecrackerEnd() {
        const delayTime =  animationDuration * 2 * 1000;
        
        // 如果 opacity = 0，則刪除該節點
        setTimeout( function() {
          removeAllChildNodes(touchWrap);
        }, delayTime);
      };