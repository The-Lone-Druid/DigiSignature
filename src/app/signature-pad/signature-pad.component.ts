import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit {
  canvasDraw: any;
  canvasCreate: any;
  textBox: any;
  fonts: any;

  constructor() { }

  ngOnInit(): void { 
    this.initSignaturePad();
  }

  initSignaturePad() {

    // Draw signature
    this.canvasDraw = new fabric.Canvas('signaturePad', {
      isDrawingMode: true,
    })

    // Create Signature
    this.textBox = new fabric.Textbox('Click to edit', {
      fontFamily: 'Pacifico',
      width: 200,
      fontSize: 24,
      editable: true,
      fontWeight: 600,
    });
    this.fonts = ["Pacifico", "Dancing Script", "Great Vibes", "WindSong"];

    this.canvasCreate = new fabric.Canvas('signatureCreatePad');
    this.canvasCreate.add(this.textBox).setActiveObject(this.textBox);

  }

  loadAndUse(font: any) {
    this.canvasCreate.getActiveObject().set("fontFamily", font);
    this.canvasCreate.requestRenderAll();
  }

  setFontFamily(event: any) {
    this.loadAndUse(event.target.value);
  }

  clearCanvas() {
    this.canvasDraw.clear();
  }

}
