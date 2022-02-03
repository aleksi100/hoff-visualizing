const input = document.querySelector('.input');
const values_div = document.querySelector('.values');


let NODES = [];
class Node{
  constructor(letter, i){
    this.letter = letter,
    this.freq = 1,
    this.id = Math.random()
    console.log(i)
    this.x = (1+i)*60
    this.y = 200
  }
  show(){
    var div = document.createElement("div")
    var l = document.createElement("p");

    l.textContent = this.letter
    
    div.appendChild(l);
    div.setAttribute("id", this.id)
    div.style.top = this.y+"px";
    div.style.left = this.x+"px";
    values_div.appendChild(div);
  }
  unShow(){
    let elm = document.getElementById(this.id)
    values_div.removeChild(elm)
  }
}







input.addEventListener('input', updateValue);

function updateValue(e) {
  for(let i=0;i<NODES.length;i++){
    NODES[i].unShow();
  }
  NODES = []
  for(let i=0;i<e.target.value.length;i++){
    let isFound = false
    for(let j=0;j<NODES.length;j++){
      if(NODES[j].letter == e.target.value[i]){
        isFound = true
        NODES[j].freq += 1;
      }
    }
    if(!isFound){
      let r = new Node(e.target.value[i], NODES.length)
      r.show()
      NODES.push(r);
    }
    
  }
  
}