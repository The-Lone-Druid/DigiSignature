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

  saveSignature(type: string) {
    if (type == 'draw') {
      var image = this.canvasDraw.toDataURL("image/png", 1.0);  // here is the most important part because if you dont replace you will get a DOM 18 exception.      
    } else if (type == 'create'){
      var image = this.canvasCreate.toDataURL("image/png", 1.0);
    }
    var a = document.createElement('a');
    a.href = image;
    a.download = 'signature.png';
    document.body.appendChild(a);
    a.click();
  }

}
