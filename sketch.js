let renderer;


let notes = []; // var vs. let: var is function scope, let is block scope

let noteButton;
let writeBox;
let testNote;

let startX = 75;
let startY = 175;
let width = 200;
let height = 100;

let currentPage = 1;

let displayedNote = null;

const backgroundColor = [78, 128, 88]

//test:
let dimensions;
let totalNotesDisplayed;
let startingNoteInd;


function setup() {
  renderer = createCanvas(windowWidth-20, windowHeight-20); // create p5 canvas with window dimensions at creation of webpage


  noteButton = new NoteButton('new');
  noteButton.getButton().mousePressed(showPopUp);
  noteButton.getButton().mouseOver(() => {
    noteButton.hoverBorder();
  });
  noteButton.getButton().mouseOut(() => {
    noteButton.hoverBorderOff();
  })

  writeBox = new PopUp(windowWidth/2, windowHeight/2, windowWidth/2, 400); // new popup, should be shown with the click of a button
  writeBox.getCancelButton().mousePressed(hidePopUp);
  //writeBox.mousePressedCancel();
  writeBox.getCancelButton().mouseOver(() => {
    writeBox.hoverBorder();
  });
  writeBox.getCancelButton().mouseOut(() => {
    writeBox.hoverBorderOff();
  })

  testNote = new Note(startX, startY, "i like water!", getCurrentDate()); // just a test note meant to test the Note class. is TEMPORARY
  notes.push(testNote);

  noStroke(); // start with all notes no border

}

function draw() {
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]); // clear the background each frame

  stroke(51);
  strokeWeight(3);
  fill(0,0,0, 200);
  textFont("Georgia", 50);
  textAlign(LEFT);
  text("Welcome back. How are you feeling today?", 50, 100); // title text, placeholder with cheesy quote ;)

  textSize(50)
  fill(255, 255, 255)
  text("Welcome back. How are you feeling today?", 54, 103);
  noStroke();

  //testNote.draw(100, 200); // placeholder, testing out draw function in Note class

  //mouseHover();

  dimensions = calculateNoteArraySize(); // find width / height of note array based on current window height + width

  totalNotesDisplayed = dimensions[0] * dimensions[1];

  startingNoteInd = totalNotesDisplayed * (currentPage - 1); // takes current 'page' displayed


  if (displayedNote == null) {
    if (!writeBox.getStatus()) {
      let noteY;
      for (i=startingNoteInd; i<notes.length && i < startingNoteInd + totalNotesDisplayed; i++) {
        noteY = i-startingNoteInd;
        noStroke();
        //print(i);
        mouseHover(i);

        notes[i].draw(startX + ((i%dimensions[0]) * notes[i].getDistanceX()), startY + (Math.floor(noteY/dimensions[0]) * notes[i].getDistanceY()));
        //noteY++;

      }

      fill(255, 255, 255);
      textSize(40);
      text(currentPage, 30, windowHeight - 60); // draw current page # on bottom left of screen

    } else {
      fill(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
      rect(0, 0, windowWidth, windowHeight); // background of displayed note
    }

  } else {
    displayedNote.display();

  }

}

function keyPressed() {

  if (keyCode == ENTER || keyCode == RETURN) { // if the enter or return key is pressed AND the box is shown:
    if (writeBox.getStatus()) {
      notes.push(new Note(0, 0, writeBox.getWritten(), getCurrentDate())); // add a new note to the notes array with the passed value in writeBox
      writeBox.boxHide(); // hide the box
      writeBox.resetValue();

      noteButton.showButton();
      // create note, display it, add it to the notes array
    }

    if (displayedNote != null && displayedNote.getDisplayed()) {
      displayedNote.displayToggle();
      displayedNote = null;

      noteButton.showButton();
    }


  } else if (keyCode == RIGHT_ARROW && currentPage * totalNotesDisplayed < notes.length) {
    currentPage++;
  } else if (keyCode == LEFT_ARROW && currentPage != 1) {
    currentPage--;
  }

}

function mouseHover(a) {
  //for (a=0; a<notes.length; a++) {
  if (between(mouseX, notes[a].getX(), notes[a].getX() + notes[a].getWidth()) &&
      between(mouseY, notes[a].getY(), notes[a].getY() + notes[a].getHeight()) &&
      (displayedNote == null) &&
      (!writeBox.getStatus())) {

    strokeWeight(3);
    stroke(51);
    //cursor('grab');
    //print('mouse hovered over note');

  }

  //}
}

function mousePressed() {

  //console.log("mouse pressed");

  for (i=0; i<notes.length; i++) {
    if (between(mouseX, notes[i].getX(), notes[i].getX() + notes[i].getWidth()) &&
        between(mouseY, notes[i].getY(), notes[i].getY() + notes[i].getHeight()) &&
        (displayedNote == null) &&
        (!writeBox.getStatus()) &&
      between(i, startingNoteInd, startingNoteInd + totalNotesDisplayed)) {

          console.log("note " + i + " should be displayed.");
          notes[i].displayToggle();
          displayedNote = notes[i];

          noteButton.hideButton();

    }

  }
}

function windowResized() { // whenever the window is resized, this function is called.
  resizeCanvas(windowWidth - 20, windowHeight - 20);
  writeBox.correctPosition(windowWidth/2, windowHeight/2);
  noteButton.correctPosition(windowWidth, windowHeight);
  currentPage = 1;

}

/*

NOTE: below are more functions for stuff not applicable to the Note, PopUp, and NoteButton classes

should i move these to another file to keep everything cleaner?
*/

function mouseClickedNote() {
  for (i = 0; i < notes.length; i++) {
    notes[i].mousePressed();
  }
}

function mouseClickedDisplay(note) { // assuming that the note is a Note object
  //console.log("note " + i + " should be displayed.");
  note.displayToggle();
  displayedNote = note;

  noteButton.hideButton();
}

function hidePopUp() { // only takes popups D:<<<<<<
  if (writeBox.getStatus()) { // only if the writeBox is shown
    writeBox.boxHide();
    writeBox.resetValue();

    noteButton.showButton();

    //writeBox.showToggle();
  }

}

function showPopUp() { // move this into NoteButton class? wouldn't that cause a lot of scope issues?
  if (!writeBox.getStatus()) { // only if the writeBox is hidden
    writeBox.boxShow();

    noteButton.hideButton();
  }

}

function calculateNoteArraySize() {
  let columns = Math.floor((windowWidth -  width - (startX) - 25) / width);
  let rows = Math.floor((windowHeight - width - (startY)) / height);

  return [columns, rows];

}

function getCurrentDate() {
  const d = new Date();
  return numberToMonth(d.getMonth()) + " " + d.getDate() + ", " + d.getFullYear();
}

function numberToMonth(num) {
  switch (num) {
    case 0:
      return "January";
      break;
    case 1:
      return "February";
      break;
    case 2:
      return "March";
      break;
    case 3:
      return "April";
      break;
    case 4:
      return "May";
      break;
    case 5:
      return "June";
      break;
    case 6:
      return "July";
      break;
    case 7:
      return "August";
      break;
    case 8:
      return "September";
      break;
    case 9:
      return "October";
      break;
    case 10:
      return "November";
      break;
    case 11:
      return "December";
      break;

  }
}

function between(a, b, c) { // "a" is greater than "b" and less than "c"
  return a <= c && a >= b;
}
