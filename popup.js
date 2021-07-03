class PopUp {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.box = createElement('textarea', ''); // create textarea to correspond with PopUp object

    this.cancel = createButton('cancel');

    this.show = false;
    this.boxHide();

    this.configure();

  }

  configure() { // change properties like position and aesthetics
    this.box.style('font-size', '35px');
    this.box.style('resize', 'none');
    this.box.style('padding', '25px');
    this.box.style('font-family', 'Georgia');
    this.box.style('border', 'none');
    this.box.size(this.width, this.height);
    this.box.position(this.x - (this.width/2),this.y - (this.height/2));

    //this.boxShow(); // THIS IS TEMPORARY
    this.cancel.style('font-family', 'Georgia');
    this.cancel.style('font-size', '20px');
    this.cancel.style('border-radius', '40px');
    this.cancel.style('padding', '10px');
    this.cancel.style('border', 'none');
    this.cancel.position(30, 30);


  }

  hoverBorder() {
    this.cancel.style('border', '3px solid #555555');
    //this.button.position(windowWidth - 160, windowHeight - 160);
  }

  hoverBorderOff() {
    this.cancel.style('border', 'none');
  }

  correctPosition(x,y) {
    this.setX(x);
    this.setY(y);
    this.box.position(x - (this.width/2), y - (this.height/2));
  }

  resetValue() {
    this.box.value('');
  }

  boxShow() {
    this.cancel.show();

    this.box.show(); // should be shown when user clicks a button
    this.show = true;
  }

  boxHide() {
    this.cancel.hide();

    this.box.hide();
    this.show = false; // the popup should start out as NOT shown
  }

  getStatus() {
    return this.show;
  }

  getWritten() {
    return this.box.value();
  }

  getCancelButton() {
    return this.cancel;
  }

  // mousePressedCancel() {
  //   this.box.mousePressed(this.boxHide);
  // }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }


}
