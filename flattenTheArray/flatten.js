/**
 * @param {Array} - Array to be flattened
 * @param {Array} - Accumulator. Empty by default
 * @return {Array} - The flattened array
 */
export const flatten = (arrMain) => {
    try {
        if (!Array.isArray(arrMain)) {
            throw new Error("The first parameter must be an array");
        }

        const flattenInside = (arr, acc = []) => {
                arr.forEach((item) => {
                    if (Array.isArray(item)) {
                        flattenInside(item, acc);
                    } else if (typeof item === 'number') {
                        acc.push(item);
                    } else {
                        throw new Error("Every element inside the array must be a number or an array of numbers");
                    }
                });
            return acc;
        }
        return flattenInside(arrMain);
    } catch (err) {
        // In a more complex environment this must be sent to the logger and handled properly
        return `${err}`;
    }
}
