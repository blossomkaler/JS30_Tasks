const triggers = document.querySelectorAll('a');
  const highlight = document.createElement('span');
  highlight.classList.add('highlight');
  document.body.appendChild(highlight);

  function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
/* 
element.getBoundingClientRect() returns a DOMRect object providing information 
about the size of an element and its position relative to the viewport.

the returned value is a DOMRect object which is the smallest rectangle which contains the entire element, 
including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties 
describe the position and size of the overall rectangle in pixels. 
Properties other than width and height are relative to the top-left of the viewport.
*/

    console.log(linkCoords);
    const coords = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    };

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

  }

  triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
/* mouseenter event is fired at an Element when a pointing device (usually a mouse) 
is initially moved so that its hotspot is within the element at which the event was fired.  */

