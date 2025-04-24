# Travelling Salesman Problem Visualizer

This project is a web-based visualizer for solving the **Travelling Salesman Problem (TSP)** using three classic approaches:
- **Greedy (Glouton) Algorithm**
- **Dynamic Programming (Memoization)**
- **Branch and Bound**

It allows users to interactively create a graph by placing and connecting nodes, then solve the TSP and compare algorithm performance in real-time.

---

##  Project Structure

```
project/
│
├── index.html                    # Main HTML file (UI + canvas + results table)
├── sketch.js                     # Core logic and main loop for UI interaction
├── styles.css                    # UI styling
│
├── src/
│   ├── controls.js               # Handles UI button logic and interaction
│   ├── edge.js                   # Defines the Edge class
│   ├── vertex.js                 # Defines the Vertex class
│   ├── graph.js                  # Manages graph structure and utilities
│   ├── tsp_logic_glouton.js      # Greedy algorithm implementation
│   ├── tsp_logic_dp.js           # Dynamic Programming (Memoization) implementation
│   ├── tsp_logic_branch_and_bound.js # Branch and Bound implementation
│
└── README.md                     # Project documentation
```

---

##  Features

- **Graph Builder:** Add, connect, and delete vertices on an interactive canvas.
- **Three TSP Algorithms:**
  -  **Greedy**: Fast, simple heuristic (O(n²))
  -  **Dynamic Programming**: Accurate for small graphs (O(n² · 2ⁿ))
  -  **Branch and Bound**: Pruned backtracking (O(bⁿ))
- **Execution Time Comparison:** Benchmarks and shows time taken for each algorithm.
- **Result Display:** Cycle path, cost, and complexity shown in a sortable table.
- **Save Snapshot:** Download canvas as PNG.

---

##  Algorithms Explained

### Greedy (Glouton)
- Builds a solution step-by-step by choosing the smallest available edge.
- Time Complexity: `O(n²)`

### Dynamic Programming
- Uses memoization to avoid recomputation.
- Time Complexity: `O(n² * 2ⁿ)`

### Branch and Bound
- Backtracking with pruning using cost bounds.
- Time Complexity: `O(bⁿ)` (exponential in worst-case)

---

##  How to Use

1. Open `index.html` in a modern web browser.
2. Use the buttons to:
   -  Add vertices and edges
   -  Delete vertices
   -  Clear canvas
   -  Save as image
   -  Solve the TSP
3. Check the result table for:
   - Algorithm name
   - Tour path
   - Total cost
   - Execution time
   - Time complexity

---

## 🛠️ Technologies Used

- **JavaScript** (ES6)
- **p5.js** for canvas interaction
- **HTML/CSS** for layout and styling

---

##  Example Output

| Algorithm           | Cycle           | Cost | Time (ms) | Complexity  |
|---------------------|-----------------|------|-----------|-------------|
| Greedy              | 1 → 2 → 3 → 1   | 24   | 0.120     | O(n²)       |
| Dynamic Programming | 1 → 3 → 2 → 1   | 22   | 0.986     | O(n²·2ⁿ)    |
| Branch and Bound    | 1 → 2 → 3 → 1   | 22   | 0.422     | O(bⁿ)       |

---

## Notes

- Larger graphs may take significantly longer for DP and Branch & Bound.
- The greedy algorithm does **not** guarantee optimality.
- Performance timings are averaged over one run (changeable in code).

---

## License

MIT License. Feel free to use, modify, and share!

---
