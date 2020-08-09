	function arrayInArray(arrayA, arrayB){
	    prizes = [[1, 3], [1, 4]],
	    includes = arrayB.some(a => arrayA.every((v, i) => v === a[i]));

		return includes;
	}
	