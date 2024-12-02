function setupButtons() {
  let addVerticesButton = select("#add-vertex-btn");
  let addEdgesButton = select("#add-edge-btn");
  let solveTspButton = select("#resolution-pvc");
  let deleteVertexButton = select("#delete-vertex-btn");
  let effacerCanvaButton = select("#effacer-canvas-btn");
  let saveToImageButton = select("#save-img-button");
  addVerticesButton.mousePressed(addVertices);
  addEdgesButton.mousePressed(addEdges);
  solveTspButton.mousePressed(solveTSP);
  deleteVertexButton.mousePressed(deleteVertex);
  effacerCanvaButton.mousePressed(resetCanvas);
  saveToImageButton.mousePressed(saveCanvasAsPNG);
}

function resetCanvas() {
  graph = new Graph();
  resetSelection();
  mode = "V";
  document.body.style.cursor = "default";
  clearTable();
}

function saveCanvasAsPNG() {
  saveCanvas(canvas, 'graph-snapshot', 'png');
}


function resetSelection() {
  graph.selectedVertices = [];
  for (const vertex of graph.vertices) {
    vertex.setSelected(false);
    vertex.setIsAP(false);
  }
}

function addVertices() {
  document.body.style.cursor = "cell";
  mode = "V";
  resetSelection();
}

function addEdges() {
  document.body.style.cursor = "copy";
  mode = "E";
  resetSelection();
}

function deleteVertex() {
  document.body.style.cursor = "no-drop";
  mode = "D";
  resetSelection();
}

function measureExecutionTime(fn, args = [], iterations = 10) {
  let total = 0;
  for (let i = 0; i < iterations; i++) {
    const t1 = performance.now();
    fn(...args);
    const t2 = performance.now();
    total += t2 - t1;
  }
  return total / iterations;
}

function solveTSP() {
  document.body.style.cursor = "pointer";
  mode = "S";
  clearTable();
  function deepCopyGraph(graph) {
    const newGraph = new Graph();
  
    newGraph.vertices = graph.vertices.map(vertex => ({
      ...vertex,
    }));
    newGraph.edges = graph.edges.map(edge => ({
      ...edge,
    }));
  
    return newGraph;
  }
  const graphCopy = deepCopyGraph(graph);
  

  const greedyTime = measureExecutionTime(() => tspGreedySolver(graphCopy), [], 10);
  const greedyResult = tspGreedySolver(graphCopy);
  displayResults("Greedy Algorithm", greedyResult.cycle, greedyResult.totalCost, greedyTime, "O(n^2)");

  const bnbTime = measureExecutionTime(() => tspBranchAndBoundSolver(graphCopy.getCostMatrix()), [], 10);
  const bnbResult = tspBranchAndBoundSolver(graphCopy.getCostMatrix());
  displayResults("Branch and Bound", bnbResult.final_path, bnbResult.final_cost, bnbTime,"O(b^n)");

  const dynamicTime = measureExecutionTime(() => tspDynamicProgrammingSolver(graphCopy), [], 10);
  const dynamicResult = tspDynamicProgrammingSolver(graphCopy);
  displayResults("Backtracking", dynamicResult.optimalPath, dynamicResult.totalCost, dynamicTime,"O((n^2)*(2^n))");
}

function displayResults(methodName, cycle, cost, time,complexity) {
  const tableBody = document.getElementById("resultsTableBody");

  const row = document.createElement("tr");

  const methodCell = document.createElement("td");
  methodCell.textContent = methodName;
  methodCell.classList.add("border", "border-gray-300","text-black", "px-4", "py-2");
  row.appendChild(methodCell);

  const cycleCell = document.createElement("td");
  cycleCell.textContent = cycle.join(" → ");
  cycleCell.classList.add("border", "border-gray-300","text-black", "px-4", "py-2");
  row.appendChild(cycleCell);

  const costCell = document.createElement("td");
  costCell.textContent = cost !== null && cost !== Infinity ? cost : "N/A";
  costCell.classList.add("border", "border-gray-300","text-black", "px-4", "py-2");
  row.appendChild(costCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = `${time.toFixed(6)} ms`;
  timeCell.classList.add("border", "border-gray-300","text-black", "px-4", "py-2");
  row.appendChild(timeCell);

  const complexityCell = document.createElement("td");
  complexityCell.textContent = complexity;
  complexityCell.classList.add("border", "border-gray-300","text-black", "px-4", "py-2");
  row.appendChild(complexityCell);
  tableBody.appendChild(row);
}

function clearTable() {
  const tableBody = document.getElementById("resultsTableBody");
  tableBody.innerHTML = ""; 
}

function isInsideCanvas(x, y, canvas) {
  if (mouseX < 10 | mouseY < 10) return false;
  return true;
  if (x >= 0 && x <= canvas.width && y >= 75 && y <= canvas.height - 75)
    return true;
  else return false;
}
