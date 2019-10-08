/*
InsertSorted uses QuickSort logic to insert new values into their correct position in a list
This function uses "Generics" to help keep type logic consistent
*/
function InsertSorted<T>(list: T[], elementToInsert: T, scoreFunction: (val: T) => number = (val: unknown) => <number>val) {

	//If empty list, append and return
	if (list.length < 1) {
		list.push(elementToInsert)
		return list;
	}

	//Find boundary values
	let minimumIndex = 0;
	let minimumValue = scoreFunction(list[minimumIndex]);
	let maximumIndex = list.length - 1;
	let maximumValue = scoreFunction(list[maximumIndex]);

	//Get "score" of "elementToInsert"
	let suspect = scoreFunction(elementToInsert);

	//If "elementToInsert" is less than smallest current value, prepend and return
	if (suspect < minimumValue) {
		list.unshift(elementToInsert);
		return list;
	}
	//If "elementToInsert" is greater than largest current value, append and return
	if (suspect > maximumValue) {
		list.push(elementToInsert);
		return list;
	}

	let pivotIndex: number;
	let pivot: number;

	//While there is a search area remaining
	while (maximumIndex - minimumIndex > 1) {

		//Place pivot in the middle of search area
		pivotIndex = Math.floor((maximumIndex - minimumIndex) / 2) + minimumIndex;
		pivot = scoreFunction(list[pivotIndex]);

		//If pivot is equal to suspect, set boundary to single element and shortcircuit
		if (pivot == suspect) {
			maximumIndex = minimumIndex = pivotIndex;
			minimumValue = maximumValue = pivot;
			break;
		}
		//If pivot is "below" suspect, set new minimum boundary and shortcircuit
		if (pivot < suspect) {
			minimumIndex = pivotIndex;
			minimumValue = pivot;
			continue;
		}
		//If pivot is "above" suspect, set new maximum boundary and shortcircuit
		if (pivot > suspect) {
			maximumIndex = pivotIndex;
			maximumValue = pivot;
			continue;
		}

	}

	//Insert before max index
	list.splice(maximumIndex, 0, elementToInsert);

	//return result
	return list;
}