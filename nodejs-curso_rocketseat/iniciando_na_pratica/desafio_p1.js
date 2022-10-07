function getFlagValue(flag) {
    index = process.argv.indexOf(flag)
    return process.argv[index+1]
}

module.exports = getFlagValue