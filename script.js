const input = document.querySelector('.input');
const values_div = document.querySelector('.values');


let NODES = {};
let max_debth = 0;
class Node{
  constructor(letter, i){
    this.letter = letter.toString()
    this.freq = 1
    this.id = Math.random()
    this.x = (1+i)*60
    this.y = 100
    this.used = false
    this.left = 0
    this.right = 0
    this.debth = 0
  }
  show(){
    
    
    var div = document.createElement("div")
    var l = document.createElement("p");
    l.textContent = this.letter
    div.appendChild(l);
    div.setAttribute("id", this.id)

    if(this.left != 0){
      div.setAttribute("class", "node")
    }else{
      div.setAttribute("class", "letter")
    }
    div.style.top = this.y+"px";
    div.style.left = this.x+"px";
    values_div.appendChild(div);
  }
  unShow(){
    
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
  let freq = NODES[eka].freq+NODES[toka].freq
  parent = new Node(freq, Object.keys(NODES).length)
  parent.left = NODES[eka].id
  parent.right = NODES[toka].id
  parent.freq = freq
  NODES[parent.id] = parent
}

function show_all(node, i){
  let nd = NODES[node].debth
  let gap = max_debth-nd


  NODES[node].x = i
  NODES[node].y += 70*nd
  NODES[node].show()
  if(NODES[node].left == 0) return
  show_all(NODES[node].left, i-50*gap)
  show_all(NODES[node].right, i+50*gap)
}





function set_debth(node, debth){
  max_debth = Math.max(max_debth, debth)
  console.log(max_debth)
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
  max_debth = 0
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
      NODES[i].show()
    }
  }

  
}