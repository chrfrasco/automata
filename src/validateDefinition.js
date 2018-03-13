const { countOccurrences } = require("./utils");

/**
 * Validate a DFA definition object
 *
 * @param {{
 *   alphabet: string[]
 *   initialState: string
 *   acceptingStates: string[]
 *   states: any
 * }} def Definition to validate
 * @returns {{ valid: boolean, reason?: string }}
 */
module.exports = function validateDefinition(def) {
  if (!def.alphabet) {
    return {
      valid: false,
      reason: `definition must include an alphabet`
    };
  }

  if (!def.states) {
    return {
      valid: false,
      reason: `definition of states must at least be an empty object`
    };
  }

  if (!statesAreValid(def.states, def.alphabet)) {
    return {
      valid: false,
      reason: `some state definitions are invalid`
    };
  }

  return { valid: true };
};

/**
 * Check that every state is defined correctly
 *
 * @param {any} states
 * @param {string[]} alphabet
 */
function statesAreValid(states, alphabet) {
  return Object.values(states).map(
    state =>
      allSymbolsHandled(state, alphabet) && allStatesExists(state, states)
  );
}

/**
 * Check that a state is defined correctly in that it defines a transition
 * for each symbol in the alphabet
 *
 * @param {any} state
 * @param {string[]} alphabet
 */
function allSymbolsHandled(state, alphabet) {
  return alphabet.every(
    symbol => countOccurrences(symbol, Object.keys(state)) === 1
  );
}

function allStatesExists(state, states) {
  return Object.values(state).every(otherState => states[otherState] != null);
}
