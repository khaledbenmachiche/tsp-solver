// Time complexity of Kruskal’s algorithm for MST: O(|E|log|V|), where |E| is the number of edges and |V| is the number of vertices.
// Time complexity of the Glouton algorithm: O(n^2)
function tspGreedySolver(graph) {
	const tsp = graph.getCostMatrix();
	let n = tsp.length;
	let edges = [];

	for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++) {
					if (tsp[i][j] !== -1) {
							edges.push(new EdgeTmp(i, j, tsp[i][j]));
					}
			}
	}

	edges.sort((a, b) => a.weight - b.weight);

	let parent = Array.from({ length: n }, (_, i) => i);
	let rank = Array(n).fill(0);
	let degree = Array(n).fill(0);
	let result = [];
	let edgeCount = 0;

	function find(parent, i) {
			if (parent[i] === i) return i;
			return parent[i] = find(parent, parent[i]);
	}

	function union(parent, rank, x, y) {
			let rootX = find(parent, x);
			let rootY = find(parent, y);

			if (rank[rootX] < rank[rootY]) {
					parent[rootX] = rootY;
			} else if (rank[rootX] > rank[rootY]) {
					parent[rootY] = rootX;
			} else {
					parent[rootY] = rootX;
					rank[rootX]++;
			}
	}

	for (let edge of edges) {
			if (edgeCount === n - 1) break;

			let { source, dest, weight } = edge;
			let rootSource = find(parent, source);
			let rootDest = find(parent, dest);

			if (rootSource !== rootDest && degree[source] < 2 && degree[dest] < 2) {
					union(parent, rank, rootSource, rootDest);
					result.push(edge);
					degree[source]++;
					degree[dest]++;
					edgeCount++;
			}
	}

	let nodesWithDegreeOne = [];
	for (let i = 0; i < n; i++) {
			if (degree[i] === 1) {
					nodesWithDegreeOne.push(i);
			}
	}

	if (nodesWithDegreeOne.length !== 2) {
			console.error("Cannot close the cycle: invalid graph structure.");
			return null;
	}

	let [node1, node2] = nodesWithDegreeOne;
	let closingEdge = edges.find(
			(edge) =>
					(edge.source === node1 && edge.dest === node2) ||
					(edge.source === node2 && edge.dest === node1)
	);

	if (!closingEdge) {
			console.error("Cannot close the cycle: no edge between final nodes.");
			return null;
	}

	result.push(closingEdge);
	degree[node1]++;
	degree[node2]++;

	let adjList = Array.from({ length: n }, () => []);
	for (let edge of result) {
			adjList[edge.source].push(edge.dest);
			adjList[edge.dest].push(edge.source);
	}

	let cycle = [];
	let visited = Array(n).fill(false);
	function dfs(node) {
			cycle.push(node);
			visited[node] = true;

			for (let neighbor of adjList[node]) {
					if (!visited[neighbor]) {
							dfs(neighbor);
					}
			}
	}

	dfs(0);
	cycle.push(cycle[0]);

	let totalCost = result.reduce((acc, edge) => acc + edge.weight, 0);

	return { cycle, totalCost }; 
}

class EdgeTmp {
	constructor(source, dest, weight) {
			this.source = source;
			this.dest = dest;
			this.weight = weight;
	}
}