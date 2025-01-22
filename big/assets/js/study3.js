(function () {
    var animationImg = document.querySelector(".bg-top>img");
    function animate(i) {
        var index = `00${i}`.slice(-3);
        requestAnimationFrame(function () {
            animationImg.src = `./assets/frames/${index}.png`;
            var nextIndex =i >= 298?40:++i;
            animate(nextIndex)
        })
    }
    animate(0);
})(window)