const userName = document.getElementById("name");
var ref = document.getElementById('reflection');
const submitBtn = document.getElementById("submitBtn");
const canvas = document.getElementById("canvas");  


const ctx = canvas.getContext ("2d");

// Simple form of text rendering Beer ce ae



const { PDFDocument, rgb } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  const descr =capitalize(ref.value);

 
  if (val.trim() !== "" && userName.checkValidity()) { //check if the text is empty or not
    
    generatePDF(val, descr);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name, desc) => {
  const existingPdfBytes = await fetch("./innovation club Certificate.pdf").then((res) =>
    res.arrayBuffer()
  );


  const pdfDoc = await PDFDocument.load(existingPdfBytes); /* Load a PDFDocument from the existing PDF bytes */
  pdfDoc.registerFontkit(fontkit);


   const fontBytes = await fetch("./DancingScript-Medium.ttf").then((res) => /*get font */
    res.arrayBuffer()
  );


  const SanChezFont = await pdfDoc.embedFont(fontBytes);/* Embed our custom font in the document */


  const pages = pdfDoc.getPages();
  const firstPage = pages[0];/* Get the first page of the document*/


  firstPage.ctx.drawText(name, {/* Draw a string of text diagonally across the first page */
    x:220 ,
    y: 280,
    size: 58,
    font: SanChezFont,
    color: rgb (0,0,0),
  });

  firstPage.ctx.drawText(desc, {
    x: 90,
    y :220,
    size : 18,
    font: SanChezFont,
    color: rgb (0,0,0)
  });


  const pdfBytes = await pdfDoc.save();
   // Serialize the PDFDocument to bytes (a Uint8Array)

  

  var file = new File(
    [pdfBytes],
    "innovation club Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};
