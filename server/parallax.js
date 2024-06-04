const simpleParallax = require('simple-parallax-js');
window.addEventListener("scroll", function() {
    let scrollValue = this.scrollY;
    const targets = this.document.querySelectorAll('.paralax'); 
    var rate = scrollValue * 0.85;

    targets.forEach(target => {
    
        target.style.backgroundPositionY = rate+"px";
    });
});


