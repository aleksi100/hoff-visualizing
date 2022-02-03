const input = document.querySelector('.input');
const values_div = document.querySelector('.values');


let NODES = {};
class Node{
  constructor(letter, i){
    this.letter = letter.toString()
    this.freq = 1
    this.id = Math.random()
    this.x = (1+i)*60
    this.y = 200
    this.used = false
    this.left = 0
    this.right = 0
    this.debth = 0
  }
  show(i){
    console.log(this.debth)
    this.y += 60*this.debth
    this.x = i
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
    console.log(this.id)
    let elm = document.getElementById(this.id)
    
    values_div.removeChild(elm)
  }
}

function give_lowest(){
  let lowest = 1000
  let lowest_i = null
  for(i in NODES){
    if(NODES[i].freq<lowest && !NODES[i].used){
      lowest = NODES[i].freq;
      lowest_i = NODES[i].id
    }
  }
  
  return lowest_i // KEY
}
function make_tree(){
  let eka = give_lowest();
  NODES[eka].used = true
  let toka = give_lowest();
  if(toka == null) {
    
    NODES[eka].used = false
    return 1 // tree is complete
  }
  NODES[toka].used = true

  parent = new Node(NODES[eka].freq+NODES[toka].freq, Object.keys(NODES).length)
  parent.left = NODES[eka].id
  parent.right = NODES[toka].id
  NODES[parent.id] = parent
}

function show_all(node, i){
  console.log("node: ",node)
  NODES[node].show(i)
  if(NODES[node].left == 0) return
  show_all(NODES[node].left, i-60)
  show_all(NODES[node].right, i+60)
}





function set_debth(node, debth){
  
  // check
  NODES[node].debth = debth
  if(NODES[node].left == 0) return
  
  // left
  set_debth(NODES[node].left, debth+1)
  // right
  set_debth(NODES[node].right, debth+1)
}


input.addEventListener('input', updateValue);

function updateValue(e) {
  
  for(i in NODES){
    NODES[i].unShow();
  }
  NODES = {}
  for(let i=0;i<e.target.value.length;i++){
    let isFound = false
    for(j in NODES){
      if(NODES[j].letter == e.target.value[i]){
        isFound = true
        NODES[j].freq += 1;
      }
    }
    if(!isFound){
      let r = new Node(e.target.value[i], Object.keys(NODES).length)
      NODES[r.id] = r;
    }
    
  }
  if(Object.keys(NODES).length > 1){
    while(1){
      let i = make_tree()
      if(i == 1)break
    }
    for(i in NODES){
      if(!NODES[i].used ){
        
        set_debth(NODES[i].id, 0)
        show_all(NODES[i].id, 300)
        break
      }
    }
  }else{
    for(i in NODES){
      NODES[i].show(i*60+100)
    }
  }

  
}