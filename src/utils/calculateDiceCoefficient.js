// calculate the dice coefficient number (between 0 and 1) to 2 decimal places

export const calculateDiceCoefficient = (trainingSentence, testSentence) => {
    trainingSentence = trainingSentence.split(' ')
    testSentence = testSentence.split(' ')
    const trainingSentenceLength = trainingSentence.length
    const testSentenceLength = testSentence.length
    console.log(`trainingSentenceLength: ${trainingSentenceLength}`)
    console.log(`testSentenceLength: ${testSentenceLength}`)

    console.log(trainingSentence)
    let commonWordCount = 0;
    let wordFreq = {}

    if (trainingSentenceLength && testSentenceLength) {
        for (let word of trainingSentence) {
            if (testSentence.includes(word)) {
                if (wordFreq.hasOwnProperty(word)) {
                    wordFreq[word] += 1
                } else {
                    wordFreq[word] = 1
                }
            }
        }
        console.log(`wordFreq:`)
        console.log(Object.values(wordFreq).length)
        commonWordCount = Object.values(wordFreq).length
        return ((2 * commonWordCount) / (trainingSentenceLength + testSentenceLength)).toFixed(2);
    }
}
