let bold=document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

bold.addEventListener("click",function(){
    setFontStyle("bold",bold);
})
italic.addEventListener("click",function(){
    setFontStyle("italic",italic);
})
underline.addEventListener("click",function(){
    setFontStyle("underline",underline);
})

function setFontStyle(styleName,element){
    if(lastSelectedCell){
        let {rowId,colId}= getRowIdColIdFromElement(lastSelectedCell);
        let cellobj = db[rowId][colId];
        if(cellobj.fontStyle[styleName]){
            element.classList.remove("active-font-style");
            if(styleName=="bold"){
                lastSelectedCell.style.fontWeight = "normal";
            }
            else if(styleName=="italic"){
                lastSelectedCell.style.fontStyle = "normal";
            }
            else{
                lastSelectedCell.style.textDecoration = "none";
            }
        }
        else{
            if(styleName=="bold"){
                lastSelectedCell.style.fontWeight = "bold";
            }
           else if(styleName=="italic"){
                lastSelectedCell.style.fontStyle = "italic";
            }
            else{
                lastSelectedCell.style.textDecoration = "underline";
            }
            element.classList.add("active-font-style");
        }
      cellobj.fontStyle[styleName]=!cellobj.fontStyle[styleName]  ;      
    }
}