// The time complexity of the Branch and Bound algorithm for TSP is O(b^n)
// b is the number of branches at each node (typically 2, as we choose either to visit a city or not)
// n is the number of cities This is because the algorithm explores a tree-like search space with b^n nodes, and each node requires a constant amount of time to process.

function tspBranchAndBoundSolver(adj) {
  const N = adj.length;

  function firstMin(adj, i) {
      let min = Number.MAX_SAFE_INTEGER;
      for (let k = 0; k < N; k++) {
          if (adj[i][k] < min && i !== k) {
              min = adj[i][k];
          }
      }
      return min;
  }

  function secondMin(adj, i) {
      let first = Number.MAX_SAFE_INTEGER;
      let second = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < N; j++) {
          if (i === j) continue;

          if (adj[i][j] <= first) {
              second = first;
              first = adj[i][j];
          } else if (adj[i][j] <= second) {
              second = adj[i][j];
          }
      }
      return second;
  }

  function copyToFinal(curr_path) {
      return [...curr_path, curr_path[0]];
  }

  function TSPRec(adj, curr_bound, curr_weight, level, curr_path, visited, state) {
      if (level === N) {
          const lastToStart = adj[curr_path[level - 1]][curr_path[0]];
          if (lastToStart !== 0) {
              const curr_res = curr_weight + lastToStart;
              if (curr_res < state.final_res) {
                  state.final_res = curr_res;
                  state.final_path = copyToFinal(curr_path);
              }
          }
          return;
      }

      for (let i = 0; i < N; i++) {
          if (adj[curr_path[level - 1]][i] !== 0 && !visited[i]) {
              const tempBound = curr_bound;
              curr_weight += adj[curr_path[level - 1]][i];

              if (level === 1) {
                  curr_bound -= (firstMin(adj, curr_path[level - 1]) + firstMin(adj, i)) / 2;
              } else {
                  curr_bound -= (secondMin(adj, curr_path[level - 1]) + firstMin(adj, i)) / 2;
              }

              if (curr_bound + curr_weight < state.final_res) {
                  curr_path[level] = i;
                  visited[i] = true;

                  TSPRec(adj, curr_bound, curr_weight, level + 1, curr_path, visited, state);
              }

              curr_weight -= adj[curr_path[level - 1]][i];
              curr_bound = tempBound;
              visited[i] = false;
              curr_path[level] = -1; // Reset the current path position to avoid stale values
          }
      }
  }

  function solveTSP(adj) {
      const state = { final_res: Number.MAX_SAFE_INTEGER, final_path: [] };

      const visited = Array(N).fill(false);
      const curr_path = Array(N).fill(-1);

      let curr_bound = 0;

      for (let i = 0; i < N; i++) {
          curr_bound += firstMin(adj, i) + secondMin(adj, i);
      }

      curr_bound = Math.ceil(curr_bound / 2);

      visited[0] = true;
      curr_path[0] = 0;

      TSPRec(adj, curr_bound, 0, 1, curr_path, visited, state);

      return {
          final_cost: state.final_res,
          final_path: state.final_path,
      };
  }

  return solveTSP(adj);
}