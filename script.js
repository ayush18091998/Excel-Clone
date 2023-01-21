let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells =document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

cellsContentDiv.addEventListener("scroll",function(e){
    let scrollFromTop = e.target.scrollTop;
    let scrollFromLeft = e.target.scrollLeft;
    topRow.style.top=scrollFromTop+"px";
    leftCol.style.left = scrollFromLeft+"px";
    topLeftCell.style.top = scrollFromTop+"px";
    topLeftCell.style.left = scrollFromLeft+"px";
})
let rowId,colId;
for(let i=0 ;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(e){
       if(lastSelectedCell){
         lastSelectedCell.classList.remove("active-cell");
         document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col");
         document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");
         
       }
      rowId = Number(e.target.getAttribute("rowid"));
      colId = Number(e.target.getAttribute("colid"));
      e.target.classList.add("active-cell");
      document.querySelector(`div[trid='${colId}']`).classList.add("active-row-col")
      document.querySelector(`div[lcid='${rowId}']`).classList.add("active-row-col");

       let address = String.fromCharCode(65+colId)+(rowId+1)+"";
       let cellObject =db[rowId][colId];
   //    console.log(address);
     addressInput.value=address;
     formulaInput.value= cellObject.formula;
     cellObject.fontStyle["bold"]?document.querySelector(".bold").classList.add("active-font-style"):document.querySelector(".bold").classList.remove("active-font-style");
     cellObject.fontStyle["italic"]?document.querySelector(".italic").classList.add("active-font-style"):document.querySelector(".italic").classList.remove("active-font-style");
     cellObject.fontStyle["underline"]?document.querySelector(".underline").classList.add("active-font-style"):document.querySelector(".underline").classList.remove("active-font-style");
     
})
allCells[i].addEventListener("blur",function(e){
  lastSelectedCell=e.target;
  let cellValue = e.target.textContent;
  let {rowId,colId} = getRowIdColIdFromElement(e.target);
  let cellObject = db[rowId][colId];
  if(cellObject.value == cellValue){
      return;
  }
  
  cellObject.value = cellValue;
  console.log("After UPdate", db[rowId][colId]);
  updateDescendents(cellObject);
  if(cellObject.visited){
    return;
  }
  cellObject.visited=true;
  visitedCells.push({"rowId":rowId,"colId":colId});
})
allCells[i].addEventListener("keydown",function(e){
   if(e.key == "Backspace"){
     let cell = e.target;
     let {rowId,colId}= getRowIdColIdFromElement(cell);
     let cellObj = db[rowId][colId];
     if(cellObj.formula){
     // update db
   
     cellObj.formula = "";
    // update ui
     formulaInput.value="";
     cell.textContent=""
     
     removeFormula(cellObj);

     }
   }
  
})
}
  
formulaInput.addEventListener("blur",function(e){
  let formula = formulaInput.value;
  //console.log(formula)
  if(formula){
 //update db
 let {rowId,colId}=getRowIdColIdFromElement(lastSelectedCell);
 let cellObject= db[rowId][colId];
 if(cellObject.formula){
   removeFormula(cellObject);
 }
 let computedValue =  solver(formula,cellObject);
cellObject.value=computedValue;
cellObject.formula=formula;
 //update ui
lastSelectedCell.textContent=computedValue;
updateDescendents(cellObject);
  }
})

