class Edge {
  constructor(vertex1, vertex2, value) {
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.value = value;
    this.selected = true;
  }

  display() {
    if (this.selected) {
      stroke("#0000FF");
    } else {
      stroke("#0000FF");
    }
    line(
      this.vertex1.position.x,
      this.vertex1.position.y,
      this.vertex2.position.x,
      this.vertex2.position.y
    );

    const midX = (this.vertex1.position.x + this.vertex2.position.x) / 2;
    const midY = (this.vertex1.position.y + this.vertex2.position.y) / 2;

    const dx = this.vertex2.position.x - this.vertex1.position.x;
    const dy = this.vertex2.position.y - this.vertex1.position.y;
    const length = Math.sqrt(dx * dx + dy * dy); 
    const offsetX = -dy / length * 10; 
    const offsetY = dx / length * 10;  

    fill("#000000"); 
    noStroke();
    textSize(12);
    text(this.value, midX + offsetX, midY + offsetY);
  }

  setSelected(selected) {
    this.selected = selected;
  }
}
