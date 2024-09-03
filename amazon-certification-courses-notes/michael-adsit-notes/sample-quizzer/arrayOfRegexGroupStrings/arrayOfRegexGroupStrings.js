
/**
 * given a string and regex this will scan
 * and give back an array of array of the specified group numbers 
 * (0 stands for full match, else match the capturing groups on regex101.com EMCAScript)
 * @param {string} string - The string to search
 * @param {RegExp} regex - An actual RegExp to run exec against
 * @param {[Number]} groupNumbers - Array of the capturing group numbers to put in.
 * @returns [[string, ...string], ...[..]] - Array of array of strings that are of the capturing group numbers
 */
const arrayOfRegexGroupStrings = (string, regex, groupNumbers) => {
    const toReturn = []

    let matches
    while ((matches = regex.exec(string)) !== null) {
        toReturn.push((groupNumbers.map((number) => {
            return matches[number]
        })))
    }
    return toReturn
}

module.exports = arrayOfRegexGroupStrings