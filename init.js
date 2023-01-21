let cellsContentDiv = document.querySelector(".cells-content");

function initCells(){
    let cellsContent="<div class ='top-left-cell'> </div>";
        cellsContent+="<div class='top-row'> ";
        for(let i=0 ;i<26;i++){
            cellsContent+=`<div class = 'top-row-cells' trid='${i}'> ${String.fromCharCode(65+i)} </div> `
        }
        cellsContent+="</div>";
        cellsContent +="<div class ='left-col'>"
        for(let i=0 ;i<100; i++){
          cellsContent+=`<div class = 'left-col-cells' lcid='${i}' >${i+1}</div>`;
        }
        cellsContent+="</div>"
        cellsContent+="<div class='cellbox' >"
     for(let row=0 ;row<100 ;row++ ){
    cellsContent += "<div class = 'rows'>";
    for(let col = 0 ;col<26 ;col++){
        cellsContent+=`<div class ='cell'  rowid='${row}' colid='${col}' contentEditable></div> `
    }
    cellsContent+="</div>"
}
cellsContent+="</div>"
cellsContentDiv.innerHTML = cellsContent;
}
initCells();
// store cell(ui) in 2d array
let sheetsDB = [];
let db;  //database of active sheet
let visitedCells;

function initDb(){
 let newSheetDB =[];
  //push rows
  for(let i =0 ;i<100; i++){
    
    let row=[];
    //push col in each rows
    for(let j =0 ;j<26;j++){
        let name =String.fromCharCode(65+j)+(i+1)+"";
        
        let cellObj={
            name: name,
            value : "",
            formula: "",
            children:[],
            parent:[],
            visited:false,
            fontStyle:{bold:false,italic:false,underline:false} 
                 }
        row.push(cellObj);
    }
    newSheetDB.push(row);
  }
  visitedCells=[];
  db= newSheetDB;
  sheetsDB.push({dbkey:newSheetDB,visitedCells:visitedCells});
  console.log(sheetsDB)  
}

initDb()

