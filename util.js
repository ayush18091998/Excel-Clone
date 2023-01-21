function solver (formula,selfcellObject){
    //spces in formula comps
    let formulaComps = formula.split(" ");
    for(let i=0;i<formulaComps.length;i++){
        let component = formulaComps[i];
        //comps-> A1,B5,5,3,+,-
        if(component[0]>="A" &&  component[0]<="Z"){
            let {rowId,colId}= getIDByAddress(component);
            let cellObj = db[rowId][colId];// cellobj  of parent
            if(selfcellObject){
              cellObj.children.push(selfcellObject.name);
              selfcellObject.parent.push(cellObj.name);
            }
            console.log(cellObj);
            let value = cellObj.value;
             formula=formula.replace(component,value);
        } 
    }
  let computedValue=  eval(formula);
  return computedValue;
}

function updateDescendents(ParentObject){
  let childs = ParentObject.children;
  for(let i=0 ;i<childs.length ;i++){
    let {rowId,colId}= getIDByAddress(childs[i]);
    let childcellobject = db[rowId][colId];
    
    let formula= childcellobject.formula;
    let computedValue= solver(formula);
    
    let cellUI = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
    cellUI.textContent = computedValue;

    childcellobject.value=computedValue;
    updateDescendents(childcellobject);
  }
  
}
function removeFormula(cellobj){
  for(let i=0 ;i<cellobj.parent.length;i++){
    let parentName = cellobj.parent[i];
    let {rowId,colId}= getIDByAddress(parentName);
    let ParentObject = db[rowId][colId];
  let updatedList =  ParentObject.children.filter(function(child){
      return child!=cellobj.name;
    })
    ParentObject.children=updatedList;

  }
  cellobj.parent=[];
}

function getRowIdColIdFromElement(element){
    let rowId  = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId,
        colId
    }
  }
function getIDByAddress(address){
    // address -> G2,B1
   let colId = address.charCodeAt(0)-65;
   let rowId = Number(address.substring(1))-1;
   return {rowId,colId};
}