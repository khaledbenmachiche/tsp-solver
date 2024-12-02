// Using Top-Down DP (Memoization) – O(n*n*2^n) Time and O(n*2^n) Space

function tspDynamicProgrammingSolver(graph) {
	const cost = graph.getCostMatrix();
	const n = cost.length;
	const visited = new Array(n).fill(false);
	visited[0] = true;

	let ans = [Number.MAX_VALUE]; 
	let path = [0];
	let finalPath = [[]];

	totalCost(cost, visited, 0, n, 1, 0, ans, path, finalPath);

	const result = {
			optimalPath: finalPath[0],
			totalCost: ans[0],
			branchCosts: finalPath[0].map((node, index) => {
					if (index < finalPath[0].length - 1) {
							return {
									from: node,
									to: finalPath[0][index + 1],
									cost: cost[node][finalPath[0][index + 1]],
							};
					}
					return null;
			}).filter(Boolean),
	};

	return result;
}

function totalCost(cost, visited, currPos, n, count, costSoFar, ans, path, finalPath) {
	if (count === n && cost[currPos][0] !== -1) {
			const totalCost = costSoFar + cost[currPos][0];
			if (totalCost < ans[0]) {
					ans[0] = totalCost;
					finalPath[0] = [...path, 0];
			}
			return;
	}

	for (let i = 0; i < n; i++) {
			if (!visited[i] && cost[currPos][i] !== -1) {
					visited[i] = true;
					path.push(i);
					totalCost(cost, visited, i, n, count + 1, costSoFar + cost[currPos][i], ans, path, finalPath);
					visited[i] = false;
					path.pop();
			}
	}
}