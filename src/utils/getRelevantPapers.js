// Train Document Set:
// d1: The sky is blue.
// d2: The sun is bright.
// Test Document Set:
// d3: The sun in the sky is bright.
// d4: We can see the shining sun, the bright sun.
import {calculateDiceCoefficient} from "./calculateDiceCoefficient";
export const getRelevantPapers = () => {

    const originalSentence = 'infrared spectroscopy to diagnose tissues';
    let diceCoefficientArray = [];
    let resultPaperArray = []
    // use getSentencePermutationsVector to get array of all vectors

    // call each vector in scholar.py api call to get array of title objects

    // create vectorSpacePaperMap that contains [title, simNumber = null, vectorSpace] as key
    let vectorSpacePaperMap = new Map();

    vectorSpacePaperMap.set(
        'Biomedical applications of Raman and infrared spectroscopy to diagnose tissues',
     {
        title: 'Biomedical applications of Raman and infrared spectroscopy to diagnose tissues',
        url: 'http://downloads.hindawi.com/journals/spectroscopy/2006/738186.pdf',
        diceCoefficient: null,
        vectorSpace: null
    })

    vectorSpacePaperMap.set(
        'Method of detecting the presence of anomalies in biological tissues and cells in natural and cultured form by infrared spectroscopy',
     {
        title: 'Method of detecting the presence of anomalies in biological tissues and cells in natural and cultured form by infrared spectroscopy',
        url: 'http://scholar.google.com/https://patents.google.com/patent/US5038039A/en',
        diceCoefficient: null,
        vectorSpace: null
      })

    console.log('vectorSpacePaperMap')
    console.log(vectorSpacePaperMap)
    // loop through vectorSpacePaperMap and getVectorSpace by getting frequency of each word in originalSentence in each title in vectorSpacePaperMap
    // add each vectorSpace in [title, simNumber = null, vectorSpace] in vectorSpacePaperMap

    const getVectorSpace = (trainingSentence, testSentence) => {
        trainingSentence = trainingSentence.split(' ')
        console.log(`test sentence BEFORE: ${testSentence}`)
        testSentence = testSentence.split(' ')
        console.log(`trainingSentence: ${trainingSentence}`)
        console.log(`testSentence: ${testSentence}`)
        let vectorSpace = [];
        let wordFreq = {}
        for (let word of trainingSentence) {
            if (testSentence.includes(word)) {
                if (wordFreq.hasOwnProperty(word)) {
                    wordFreq[word] += 1
                } else {
                    wordFreq[word] = 1
                }
            } else {
                wordFreq[word] = 0
            }
        }
        console.log('wordFreq')
        console.log(wordFreq)
        // create vectorSpace, keep order
        return trainingSentence.map((word) => {
            return wordFreq[word]
        })
    }
    console.log(getVectorSpace('infrared spectroscopy to diagnose tissues', 'Method of detecting the presence of anomalies in biological  and cells in natural and cultured form by infrared spectroscopy'))
    const setVectorSpace = (original, getVS) => {
        console.log([...vectorSpacePaperMap.entries()])
        for (let [title, value] of [...vectorSpacePaperMap.entries()]) {
            console.log('title')
            console.log(title)
            console.log('***')
            console.log(value)
            console.log(`origina: ${original}`)
            console.log(getVS(original, title))
            console.log(vectorSpacePaperMap)
            console.log(vectorSpacePaperMap.get(title))
            console.log((vectorSpacePaperMap.get(title))['vectorSpace'])
            vectorSpacePaperMap.get(title)['vectorSpace'] = getVS(original, title)
        }
        console.log('vectorSpacePaperMap')
        console.log(vectorSpacePaperMap)
    }

    setVectorSpace(originalSentence, (trainingSentence, testSentence) => {
        trainingSentence = trainingSentence.split(' ')
        console.log(`test sentence BEFORE: ${testSentence}`)
        testSentence = testSentence.split(' ')
        console.log(`trainingSentence: ${trainingSentence}`)
        console.log(`testSentence: ${testSentence}`)
        let vectorSpace = [];
        let wordFreq = {}
        for (let word of trainingSentence) {
            if (testSentence.includes(word)) {
                if (wordFreq.hasOwnProperty(word)) {
                    wordFreq[word] += 1
                } else {
                    wordFreq[word] = 1
                }
            } else {
                wordFreq[word] = 0
            }
        }
        console.log('wordFreq')
        console.log(wordFreq)
        // create vectorSpace, keep order
        return trainingSentence.map((word) => {
            return wordFreq[word]
        })
    })

    console.log('DICE COEFFICIENT')
    console.log(calculateDiceCoefficient('The sky is blue', 'The sun in the sky is bright'))

    // loop through vectorSpacePaperMap and apply dice coefficience function on vectorSpace in [title, simNumber = null, vectorSpace] and title and fill the simNumber

    const setDiceCoefficient = (originalSentence) => {
        for (let [title, value] of [...vectorSpacePaperMap.entries()]) {
            console.log(`originalSentence: ${originalSentence}`)
            console.log(`title: ${title}`)
            vectorSpacePaperMap.get(title)['diceCoefficient'] = calculateDiceCoefficient(originalSentence, title)
        }

    }

    setDiceCoefficient(originalSentence)

    console.log('NOW vectorSpacePaperMap is:')
    console.log(vectorSpacePaperMap)

    // loop through vectorSpacePaperMap again and search for first 5 simNumbers and add whole titleInfo objects in resultPaperArray

    const setResultArray = () => {
        var sortable = [];
        for (let [title, value] of [...vectorSpacePaperMap.entries()]) {
          sortable.push([vectorSpacePaperMap.get(title), vectorSpacePaperMap.get(title)['diceCoefficient']]);
        }

        sortable.sort(function(a, b) {
          return a[1] - b[1];
        });
        console.log('SORTED VERSION')
        console.log(sortable)
        resultPaperArray = sortable.map((paperArr) => {
          return paperArr[0]
        })
        console.log('resultPaperArray')
        console.log(resultPaperArray)
    }

    setResultArray()

    console.log('NOW resultPaperArray is:')
    console.log(resultPaperArray)

    // now use this for the UI 

}
