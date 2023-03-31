  const hero = document.querySelector('.hero');
  const text = hero.querySelector('h1');
  const walk = 500; // 500px

  function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    //offsetX property returns the relative horizontal coordinate of the mouse pointer when a mouse event occurs. 
    /*offsetY read-only property of the MouseEvent interface provides the offset in the Y coordinate of the mouse 
    pointer between that event and the padding edge of the target node.*/

    if (this !== e.target) {
      x = x + e.target.offsetLeft;      //returns the no. of px that the upper left corner of the current element is offset to the left within the HTMLElement.offsetParent node.
      y = y + e.target.offsetTop;             //offsetTop property returns the top position (in pixels) relative to the parent. 
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
      ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
      ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
      ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
      ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;

  }

  hero.addEventListener('mousemove', shadow);