// gsap.to("#mario", {
//   x: 500,
//   y: 200,
//   scale: 3,
//   rotation: 360,
//   duration: 2
// })

gsap.to("#mario",
  {
    x: 400,
    ease: "back(2)",
    duration: 2
  }
)

gsap.to("#luigi",
  {
    x: 400,
    repeat: -1,
    yoyo: true,
    ease: "bounce",
    duration: 2
  }
)