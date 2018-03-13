const DiGraph = (() => {
  function DiGraph() {
    this.edges = {};
  }

  DiGraph.prototype.insert = function insert(from, to) {
    if (this.edges[from] && !this.edges[from].includes(to)) {
      this.edges[from].push(to);
    } else {
      this.edges[from] = [to];
    }

    return this;
  };

  DiGraph.prototype.pathsExist = function pathsExist(params) {
    let { to, from } = params;
    if (!Array.isArray(to)) {
      to = [to];
    }

    const seen = new Set();
    const stack = [from];

    while (stack.length > 0) {
      const next = stack.pop();
      if (to.includes(next)) {
        return true;
      } else if (!seen.has(next)) {
        seen.add(next);

        if (this.edges[next]) {
          stack.push(...this.edges[next]);
        }
      }
    }

    return false;
  };

  DiGraph.prototype.cycles = function cycles(start) {
    const seen = new Set();
    const stack = [start];
    const cycles = [];
    let currentPath = [];

    while (stack.length > 0) {
      const next = stack.pop();

      if (seen.has(next)) {
        cycles.push(currentPath);
        currentPath = [];
      } else {
        currentPath.push(next);
        seen.add(next);

        if (this.edges[next]) {
          stack.push(...this.edges[next]);
        }
      }
    }

    return cycles;
  };

  return DiGraph;
})();

module.exports.DiGraph = DiGraph;
