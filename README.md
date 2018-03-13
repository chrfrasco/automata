# automatamata

> Javascript classes for working with DFA's and NFA's

## Installation

```
$ npm install automatamata
```

or

```
$ yarn add automatamata
```

## Contributing

First, get the package: 
```
$ git clone https://github.com/chrfrasco/automata
```

Run tests:

```
$ npm run test
```

Tests can also be run in watch mode by passing the `--watch` flag:

```
$ npm run test -- --watch
```

## API

### DFA _(Deterministic Finite Automata)_

The main attraction. Defined using a definition object, which has the following structure:

```js
const definition = {
  language: ["0", "1"], // an array of strings representing symbols in the language
  initialState: "a", // the starting state
  acceptingStates: ["b"], // an array of strings representing the accepting states
  states: {
    a: {
        "0": "a",
        "1": "b"
    },
    b: {
      "0": "b",
      "1": "b"
    }
  } // an object describing state transitions
}
```

`DFA` is constructed as follows:

```js
const dfa = new DFA(definition)
```

The definition object is validated when the dfa is constructed, and an error is thrown if it is invalid.

- `accepts` - true if the given string is accepted by the DFA
- `languageIsEmpty` - true if the language defined by the DFA is empty - that is, none of the accepting states are reachable from the starting state
- `toDiGraph` - construct a digraph from the DFA's state transitions

## Tasks

- [ ] Add `languageIsInfinite` method to `DFA`
- [ ] Add `NFA` class