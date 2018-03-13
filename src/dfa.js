const validateDefinition = require("./validateDefinition");
const { DiGraph } = require("./digraph");
const { requiredParameter } = require("./utils");

const DFA = (() => {
  /**
   *
   * @param {{
   *   alphabet: string[]
   *   initialState: string
   *   acceptingStates: string[]
   *   states: any
   * }} definition
   * @constructor
   */
  function DFA(definition = requiredParameter("definition")) {
    const { valid, reason } = validateDefinition(definition);
    if (!valid) {
      throw new Error(`Invalid DFA definition: ${reason}`);
    }

    Object.assign(this, definition);
    this.alphabet = definition.alphabet;
    this.initialState = definition.initialState;
    this.acceptingStates = definition.acceptingStates;
    this.states = definition.states;
  }

  /**
   * Determine if the given string is accepted by the DFA
   *
   * @param {string} string
   * @returns {boolean}
   */
  DFA.prototype.accepts = function accepts(string) {
    let state = this.initialState;
    for (const symbol of string) {
      state = this.states[state][symbol];
    }
    return this.acceptingStates.includes(state);
  };

  /**
   * Determine if the language defined by the DFA is empty - that is,
   * none of the accepting states are reachable from the starting state
   *
   * @returns {boolean}
   */
  DFA.prototype.languageIsEmpty = function languageIsEmpty() {
    if (this.acceptingStates.length === 0) {
      return true;
    }

    const stateDigraph = this.toDiGraph();
    const from = this.initialState;
    const to = this.acceptingStates;
    return !stateDigraph.pathsExist({ to, from });
  };

  /**
   * Construct a digraph from the DFA's state transitions
   * 
   * @returns {DiGraph}
   */
  DFA.prototype.toDiGraph = function toDiGraph() {
    const diGraph = new DiGraph();
    for (const [fromState, transitions] of Object.entries(this.states)) {
      for (const toState of Object.values(transitions)) {
        diGraph.insert(fromState, toState);
      }
    }
    return diGraph;
  };

  return DFA;
})();

module.exports = DFA;
