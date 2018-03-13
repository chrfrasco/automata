const validateDefinition = require("../src/validateDefinition");

test("rejects a DFA missing an alphabet", () => {
  const definition = {
    states: {
      a: {
        0: "a",
        1: "b"
      },
      b: {
        0: "b",
        1: "a"
      }
    }
  };

  const { valid, reason } = validateDefinition(definition);
  expect(reason).toBeTruthy();
  expect(valid).toBe(false);
});

test("rejects a DFA with a state that does not handle all symbols", () => {
  const definition = {
    states: {
      a: {
        0: "a",
        1: "b"
      },
      b: {
        0: "b"
      }
    }
  };

  const { valid, reason } = validateDefinition(definition);
  expect(reason).toBeTruthy();
  expect(valid).toBe(false);
});

test("rejects a DFA with a state transitions to an non-existant state", () => {
  const definition = {
    states: {
      a: {
        0: "a",
        1: "b"
      },
      b: {
        0: "b",
        1: "c" // non-existant
      }
    }
  };

  const { valid, reason } = validateDefinition(definition);
  expect(reason).toBeTruthy();
  expect(valid).toBe(false);
});

test("accepts a valid DFA", () => {
  const definition = {
    alphabet: [0, 1],
    states: {
      a: {
        0: "a",
        1: "b"
      },
      b: {
        0: "b",
        1: "a"
      }
    }
  };

  const { valid, reason } = validateDefinition(definition);
  expect(reason).toBeUndefined();
  expect(valid).toBe(true);
});
