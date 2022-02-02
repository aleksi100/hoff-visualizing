const input = document.querySelector('.input');
const values_div = document.querySelector('.values');


let NODES = [];
class Node{
  constructor(letter, freq, i){
    this.letter = letter,
    this.freq = freq,
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
    let r = new Node(e.target.value[i], 1, i)
    r.show()
    NODES.push(r);
  }
  
}