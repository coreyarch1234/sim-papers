/* convert string into array of sentence permutation arrays
i.e. "Biomedical applications of Raman and infrared spectroscopy to diagnose tissues" =>
[...["Biomedical", "applications", "of", "Raman"],["Biomedical", "applications", "of", "Raman", "and", "infrared"]... ]
*/
import { getSentenceVector } from "./getSentenceVector";

//TODO: Compute reverse direction
export const getSentencePermutationsVector = (sentence) => {
    const sentenceVector = getSentenceVector(sentence);
    
    if (sentence.length > 3) {
        let outputVector = [];
        for (var i = 0; i < sentenceVector.length - 3; i++) {
            outputVector.push(sentenceVector.slice(0, i + 3))
        }
        return outputVector
    }
    return sentenceVector;
}
