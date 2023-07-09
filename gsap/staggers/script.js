window.addEventListener("load", function (e) {
  gsap.to(".container img",
    {
      y: -100,
      stagger: {
        amount: 0.4,
        // each: 0.1,
        from: "edges"
      }
    }
  )
})