// https://github.com/mozilla/pdf.js/issues/5283
// https://github.com/jlegewie/pdf.js/tree/extract-v4.2
// https://lists.w3.org/Archives/Public/public-openannotation/2014Sep/0001.html
// https://github.com/jlegewie/pdf.js/blob/extract-v4.2/src/getPDFAnnotations.js

function initPdfJs()
{
  pdfjs = require('pdfjs-dist');
  //worker = require('pdfjs-dist/build/pdf.worker');
  global.PDFJS.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';
  process.stdout.write(pdfjs.version + '\n');
}

function loadPdfText(file)
{
  function processAnnotationData(annots)
  {
    for (var i = 0; i < annots.length; i++) {
      annot = annots[i];
      if (annot.subtype == 'Text')
      {
        process.stdout.write("annot: [" + annot.contents + "]\n");
      }
      else {
        process.stdout.write(annot.subtype + ": [" + annot.contents + "]\n");
        process.stdout.write(annot.subtype + ": [" + Object.keys(annot.rect) + "]\n");
      }
    }
  }
  function processTextContent(textCont)
  {
    //process.stdout.write("textCont \n");
    var strings = textCont.items.map(function (item) {
         return item.str;
       });
       process.stdout.write(strings.join(' ') + "\n");
  }

  function getPage(page)
  {
    process.stdout.write('page ' + page.pageNumber + '\n');
    //page.getTextContent().then(processTextContent);
    page.getAnnotations().then(processAnnotationData);
  }

  global.PDFJS.getDocument(file).then(function loadPDF(doc) {
      process.stdout.write('Pages: ' + doc.numPages + '\n');

      for (i = 0; i < doc.numPages; i += 1) {
          doc.getPage(i + 1).then(getPage);
      }
  });
}

initPdfJs();
loadPdfText('./machine_self1.pdf');
