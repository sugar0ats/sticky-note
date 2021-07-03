class Note { // does it matter if the file name and class name are different/not identical?
  constructor(x, y, textStuff, date) { // each note will have an x coordinate, a y coordinate, text, and a date.

    this.x = x; // will i need to track the x and y coordinates in the constructor?
    this.y = y;

    this.textStuff = textStuff;
    this.date = date;

    this.width = 200; // create instance variables for these properties?
    this.height = 100;

    this.distanceX = 300;
    this.distanceY = 150;

    this.displayed = false;

    this.rectangle = rect(this.x, this.y, this.width, this.height, 10);
    this.displayedText = text(this.formatText(), this.x + (this.width/2), this.y + (this.height/2));
    this.displayedDate = text(this.date, this.x + 20, this.y + this.height - 15);

    //this.show = true;

    this.background;
    this.clickedDisplayedText;

  }

  /*
  just some getter/setter methods!
  */

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getDistanceX() {
    return this.distanceX;
  }

  getDistanceY() {
    return this.distanceY;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  draw(x, y) { // stylize the notes

    //if (this.show) {
    this.setX(x); // use this keyword to call functions from this class
    this.setY(y);

    fill(255,255,255);

    this.rectangle = rect(x, y, this.width, this.height, 10);
    //this.rectangle.style('outline-style', 'none');

    noStroke();
    fill(0,0,0);
    textSize(25); // subject to change
    textAlign(CENTER);
    this.displayedText = text(this.formatText(), x + (this.width/2), y + (this.height/2));

    textSize(11);
    textAlign(LEFT);
    this.displayedDate = text(this.date, x + 20, y + this.height - 15);

  }

  display() {
    if (this.displayed) {

      //tint(255, 128);
      //tint(0, 153, 204, 126);
      //rect(0, 0, windowWidth, windowHeight);


      fill(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
      this.background = rect(0, 0, windowWidth, windowHeight); // background of displayed note


      textSize(25);
      fill(0,0,0);
      text("On " + this.date + ", you said:", 97, 198);

      strokeWeight(3);
      stroke(51);
      fill(255,255,255);
      //tint(255);
      text("On " + this.date + ", you said:", 100, 200);

      noStroke();
      textSize(40);
      this.clickedDisplayedText = text(this.textStuff, 100, 300, windowWidth - 100);

      //this.formatDisplayedText();

      //this.hideBox();

    }

  }

  formatDisplayedText() {
    let textLineMax = 25;
    //let count = 0;
    for (i=0; i < this.textStuff.length; i++) {
      let copy = this.textStuff
      if (i % textLineMax == 0) {
        text(copy.substring(i, i+textLineMax), 100, 300 + (i * 30))
        //count ++;
      }
    }
    print("number of lines shown: " + count);
    print(this.textStuff);
  }

  hideBox() {
    if (this.rectangle != null) {
      this.rectangle.hide();
      this.displayedText.hide();
      this.displayedDate.hide();
    }

  }

  showBox() {
    if (this.rectangle != null) {
      this.rectangle.show();
      this.displayedText.show();
      this.displayedDate.show();
    }
  }

  getDisplayed() {
    return this.displayed;
  }

  // resizeDisplayBG() {
  //   fill(5,5,5, 220);
  //   rect(0, 0, windowWidth, windowHeight);
  // }

  displayToggle() {
    this.displayed = (this.displayed ? false : true);
  }

  formatText() { // if the string is too long, create a new display string to draw
    let maxDisplaySize = 15; // if the string is larger than 15 characters
    if (this.textStuff.length > maxDisplaySize) {
      return this.textStuff.slice(0, maxDisplaySize) + "..."; // add cool lookin' ellipses at the end
    } else {
      return this.textStuff;
    }
  }


  
}
