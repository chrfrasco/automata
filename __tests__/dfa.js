const DFA = require("../src/dfa");

test("throws an error with an invalid definition", () => {
  expect(() => new DFA()).toThrow();
  expect(() => new DFA({})).toThrow();
});

test("should accept strings in the language of the dfa", () => {
  const def = {
    alphabet: ["0", "1"],
    initialState: "a",
    acceptingStates: ["a"],
    states: {
      a: {
        "0": "a",
        "1": "b"
      },
      b: {
        "0": "b",
        "1": "b"
      }
    }
  };
  const dfa = new DFA(def);
  expect(dfa.accepts("")).toBeTruthy();
  expect(dfa.accepts("000")).toBeTruthy();
});

test("should reject strings outside the language", () => {
  const def = {
    alphabet: ["0", "1"],
    initialState: "a",
    acceptingStates: ["a"],
    states: {
      a: {
        "0": "a",
        "1": "b"
      },
      b: {
        "0": "b",
        "1": "b"
      }
    }
  };
  const dfa = new DFA(def);
  expect(dfa.accepts("001")).toBe(false);
});

test("to digraph", () => {
  const def = {
    alphabet: ["0", "1"],
    initialState: "a",
    acceptingStates: ["a"],
    states: {
      a: {
        "0": "a",
        "1": "b"
      },
      b: {
        "0": "b",
        "1": "b"
      }
    }
  };
  const digraph = {
    a: ["a", "b"],
    b: ["b"]
  };
  const dfa = new DFA(def);
  expect(dfa.toDiGraph().edges).toEqual(digraph);
});

describe("dfa.languageIsEmpty", () => {
  it("is true when dfa has no accepting states", () => {
    const def = {
      alphabet: [],
      acceptingStates: [],
      states: {}
    };
    const dfa = new DFA(def);
    expect(dfa.languageIsEmpty()).toBeTruthy();
  });

  it("is false when some input is valid", () => {
    const def = {
      alphabet: ["0", "1"],
      initialState: "a",
      acceptingStates: ["a"],
      states: {
        a: {
          "0": "a",
          "1": "b"
        },
        b: {
          "0": "b",
          "1": "b"
        }
      }
    };
    const dfa = new DFA(def);
    expect(dfa.languageIsEmpty()).toBe(false);
  });
});
