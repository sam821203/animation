var animation = gsap.timeline();

animation
  .to('#third', {
    duration: 2,
    x: 1150
  })
  .to('#four', {
    duration: 2,
    x: 1150,
  }, 1)
  .to('#fifth', {
    duration: 1,
    x: 1150
  }, "<0.5")