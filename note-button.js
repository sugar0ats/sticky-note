class NoteButton {
  constructor(title) {
    this.title = title;
    this.button = createButton(this.title);
    this.show = true;

    this.configure();
  }

  configure() {
    this.button.style('padding', '23px');
    this.button.style('border-radius', '50px');
    this.button.style('font-size', '25px');
    this.button.style('font-family', 'Georgia');
    this.button.style('border', '0px solid #444444');

    this.button.position(windowWidth - 150, windowHeight - 150);

  }

  hoverBorder() {
    this.button.style('border', '3px solid #555555');
    //this.button.position(windowWidth - 160, windowHeight - 160);
  }

  hoverBorderOff() {
    this.button.style('border', 'none');
  }

  correctPosition(x,y) {
    this.button.position(x - 150,y - 150);
  }

  showButton() {
    this.show = true;
    this.button.show();
  }

  hideButton() {
    this.show = false;
    this.button.hide();
  }

  getButton() {
    return this.button;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }
}
