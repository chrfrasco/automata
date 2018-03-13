const { DiGraph } = require("../src/digraph");

test("can insert edges", () => {
  const d = new DiGraph();
  d.insert("a", "b");
  d.insert("a", "c");
  expect(d.edges).toEqual({ a: ["b", "c"] });
});

test("can enumerate a single cycle", () => {
  const d = new DiGraph();
  d.insert("a", "b");
  d.insert("b", "c");
  d.insert("c", "a");
  expect(d.cycles("a")).toEqual([["a", "b", "c"]]);
});

test("can enumerate two cycles", () => {
  const d = new DiGraph();
  d.insert("a", "b");
  d.insert("b", "c");
  d.insert("c", "a");
  d.insert("a", "d");
  d.insert("d", "c");
  expect(d.cycles("a")).toEqual([["a", "b", "c"], ["a", "d", "c"]]);
});
