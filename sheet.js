let addsheetBtn= document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheets-list");
let sheetId = 0;
let firstSheet = document.querySelector(".sheet");
sheetListener(firstSheet);

addsheetBtn.addEventListener("click",function(e){
    sheetId++;
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    // sheetDiv.setAttribute("class","sheet active-sheet");
    sheetDiv.setAttribute("sheetId",sheetId);
    sheetDiv.innerText=` sheet ${sheetId+1}`;
    sheetList.append(sheetDiv);
    sheetListener(sheetDiv);
    initui();
    initDb();

})
function sheetListener(sheet){
  sheet.addEventListener("click",function(){
    if(sheet.classList.contains("active-sheet")){
        return;
    }
   initui();   
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    sheet.classList.add("active-sheet");
   

    let sheetId = sheet.getAttribute("sheetId");
    db = sheetsDB[sheetId].dbkey;
    visitedCells = sheetsDB[sheetId].visitedCells
    setUi();
  })
}
function setUi(){
    for(let i=0;i<visitedCells.length;i++){
      let {rowId,colId}=visitedCells[i];
      let cellobj = db[rowId][colId];
      let cell =document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`)
      cell.innerHTML=cellobj.value;
    }
}
function initui(){
    for(let i=0;i<100;i++){
        for(let j=0;j<26;j++){
            let cell = document.querySelector(`div[rowid="${i}"][colid="${j}"]`);
            cell.innerHTML = "";
        }
    }
    if(lastSelectedCell){
      lastSelectedCell.classList.remove("active-cell");
      document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col");
      document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");
      
    }
}