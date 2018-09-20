class Option {
    constructor(val) {
        this._val = val;
    }
    ifPresent(fn) {
        this.map(fn);
    }
    ifNotPresent(fn) {
        if (!this._val) {
            return fn();
        }
    }
    map(fn, defaultValue) {
        if (this._val) {
            return fn(this._val);
        }
        return defaultValue || defaultValue == "" ? defaultValue : null;
    }
    optionMap(fn) {
        if (this._val) {
            return nullableOption(fn(this._val));
        }
        return emptyOption();
    }
    get value() {
        return this._val;
    }
    orElseGet(fn) {
        return this._val || fn();
    }
    orElse(another) {
        return this._val || another;
    }
    isPresent() {
        return this._val != null;
    }
    whenTrue(condition) {
        return {
            then: (fn) => {
                if(condition(this._val)){
                    return fn(this._val);
                }
            }
        }
    }
}

const outdent = (s, ...val) => {
    let currVal = 0;
    let qtdSpaces = 0;
    let foundFirst = false;
    return s.map(v => v + (currVal < val.length ? val[currVal++] : '')).join('').split('\n')
        .map(line => {
            let result = line;
            if (!foundFirst) {
                if (line.trim()) {
                    foundFirst = true;
                    while (line[qtdSpaces] == ' ') qtdSpaces++;
                } else {
                    return '';
                }
            }
            let countSpaces = qtdSpaces;
            while (result.startsWith(' ') && countSpaces > 0) {
                countSpaces--;
                result = result.substring(1);
            }
            return result;
        }).join('\n').trim();
}
const _first = (array) => array && array.length > 0 ? array[0] : null;
const optionOf = (val) => val ? new Option(val) : (() => {
    throw new Error('Value cannot be null')
})();
const nullableOption = (val) => new Option(val);
const emptyOption = () => new Option(null);
const firstOption = (array) => nullableOption(_first(array));
const isOption = (o) => o instanceof Option;
const getValue = (o) => isOption(o) ? o.value : o;

module.exports = {
    optionOf: optionOf,
    nullableOption: nullableOption,
    emptyOption: emptyOption,
    firstOption: firstOption,
    outdent: outdent,
    isOption: isOption,
    getValue: getValue
}