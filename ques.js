const SortingResult = (taskArray, dependencyArray) => {
    let result = [];

    if (taskArray.length <= 0 && dependencyArray.length <= 0) {
        return result;
    }
    else if (taskArray.length > 0 && dependencyArray.length === 0) {
        return result = taskArray;
    }
    else if (taskArray.length > 0 && dependencyArray.length > 0) {
        let matchArrKey = [];
        cyclic = 0;
        // loop of task and check it in dependency Array
        taskArray.map((task) => {
            let check = false;
            // loop of dependices and distrubute the string 
            dependencyArray.map((curDepen) => {
                let dependent = curDepen.substr(0, 1); // first letter of string
                let dependentOn = curDepen.substr(-1, 1);// last letter of string

                if (task === dependent) {
                    check = true;
                    // filter the  keys with values and  dependencies 
                    let dependArray = matchArrKey.filter(obj => obj.key === dependentOn);
                    if (dependArray.length > 0) {
                        result = [];
                        cyclic = 1;
                        return result = "Error - this is a cyclic dependency";
                    }
                    else {
                        matchArrKey.push({ "key": dependent, "value": dependentOn });
                        if (taskArray[taskArray.length - 1] == matchArrKey) {
                        }
                    }
                }
            })

            if (!check) {
                // if the depency of key is not there
                let dependArraythird = []
                let dependArraySecond = matchArrKey.filter(obj => obj.value === task);
                dependArraythird = matchArrKey.filter(obj => obj.value === taskArray[taskArray.length - 1]);
                if (dependArraythird.length !== 0) {
                    missArraythird = matchArrKey.filter(obj => {
                        if (result[result.length - 1] === obj.key) {
                            if (!result.includes(obj.value)) {
                                result.splice( result.length - 1, 0, obj.value )
                            }
                        }
                        obj.value === result[result.length - 1]
                    });
                    console.log(missArraythird, missArraythird)
                }

                if (dependArraySecond.length > 0) {
                    result.push(dependArraySecond[0].value);
                    // match and filter the key in depencency array
                    let key = dependArraySecond[0].key;
                    let Dependent = matchArrKey.filter(obj => obj.value === key);
                    if (Dependent.length > 0) {
                        result.push(Dependent[0].value);
                        result.push(Dependent[0].key);
                    }
                    else {
                        result.push(key);
                    }
                }
            }
        })
        if (cyclic == 0) {
            taskArray.map((task) => {
                if (!result.includes(task)) {
                    result.push(task)
                }
            });
        }
        return result;
    }
};

module.exports = SortingResult;