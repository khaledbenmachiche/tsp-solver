class Graph {
  constructor() {
    this.vertices = [];
    this.edges = [];
    this.selectedVertices = [];
    this.vertexCounter = 1;
  }

  addVertex(x, y) {
    for (const vertex of this.vertices) {
      if (vertex.contains(mouseX, mouseY)) return;
    }
    const vertex = new Vertex(x, y, this.vertexCounter);
    this.vertices.push(vertex);
    this.vertexCounter++;
  }

  addEdge(vertex1, vertex2, value) {
    if (vertex1 !== vertex2) {
      const edge = new Edge(vertex1, vertex2, value);
      this.edges.push(edge);

      vertex1.adjacencyList.push(vertex2.number);
      vertex2.adjacencyList.push(vertex1.number);
      edge.setSelected(true);

      setTimeout(() => {
        vertex1.setSelected(false);
        vertex2.setSelected(false);
        edge.setSelected(false);
      }, 500);
      this.selectedVertices = [];
    }
  }

  getCostMatrix() {
    const n = this.vertices.length;
    const costMatrix = Array.from({ length: n }, () => Array(n).fill(Infinity));
    
    for (const edge of this.edges) {
      const v1Index = edge.vertex1.number - 1;
      const v2Index = edge.vertex2.number - 1;
      costMatrix[v1Index][v2Index] = edge.value;
      costMatrix[v2Index][v1Index] = edge.value;
    }

    for (let i = 0; i < n; i++) {
      costMatrix[i][i] = 0;
    }

    return costMatrix;
  }


  display() {
    for (const edge of this.edges) {
      edge.display();
    }

    for (const vertex of this.vertices) {
      vertex.display();
      vertex.drag();
    }
  }

  deleteVertex(vertexToDelete) {
    if (vertexToDelete === undefined) return;
    const vertexIndex = this.vertices.indexOf(vertexToDelete);

    for (const vertex of this.vertices) {
      vertex.adjacencyList = vertex.adjacencyList.filter((vNumber) => {
        return vNumber !== vertexToDelete.number;
      });
    }
    if (vertexIndex !== -1) {
      this.vertices.splice(vertexIndex, 1);
    }
    this.edges = this.edges.filter((edge) => {
      return edge.vertex1 !== vertexToDelete && edge.vertex2 !== vertexToDelete;
    });
  }

  getClickedVertex() {
    return this.vertices.find((vertex) => vertex.contains(mouseX, mouseY));
  }
}
