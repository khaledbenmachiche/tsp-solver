let graph;
let mode = "V";
let canvas;

function setup() {
  backgroundColor = color(255,255,255);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(300, 35);
  canvas.style("z-index", "-1");
  canvas.style("border-radius", "15px");
  canvas.style("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
  graph = new Graph();
  setupButtons();
}

function draw() {
  background(color(255,255,255));
  graph.display();
}

function mouseClicked() {
  if (isInsideCanvas(mouseX, mouseY, canvas)) {
    const clickedVertex = graph.getClickedVertex();
    
    // Edge creation mode
    if (mode === "E") {
      if (clickedVertex !== undefined) {
        if (clickedVertex === graph.selectedVertices[0]) {
          clickedVertex.setSelected(false);
          graph.selectedVertices = [];
        } else if (clickedVertex !== graph.selectedVertices[0]) {
          clickedVertex.setSelected(true);
          graph.selectedVertices.push(clickedVertex);
        }
      }
      if (graph.selectedVertices.length === 2) {
        // Prompt the user for the edge value
        const value = prompt("Enter the value or cost of the edge:", "10");
        
        // Check if a value is entered and is a valid number
        if (value !== null && !isNaN(value) && value.trim() !== "") {
          graph.addEdge(
            graph.selectedVertices[0], 
            graph.selectedVertices[1], 
            parseFloat(value)
          );
        } else {
          alert("Invalid value! Please enter a valid number.");
        }

        // Clear the selected vertices after adding the edge
        graph.selectedVertices[0].setSelected(false);
        graph.selectedVertices[1].setSelected(false);
        graph.selectedVertices = [];
      }
    }

    // Vertex creation mode
    if (mode === "V") {
      graph.addVertex(mouseX, mouseY);
    }

    // Vertex deletion mode
    if (mode === "D") {
      graph.deleteVertex(clickedVertex);
    }
  }
}

function mousePressed() {
  for (const vertex of graph.vertices) {
    vertex.startDrag();
  }
}

function mouseReleased() {
  for (const vertex of graph.vertices) {
    vertex.stopDrag();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
