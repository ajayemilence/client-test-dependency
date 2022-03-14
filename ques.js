const SortingResult = (taskArray, dependencyArray) => {
    let result = [];
    let cyclic = 0;

    // conditions for empty task and dependency
    if (taskArray.length <= 0 && dependencyArray.length <= 0) {
        return result;
    }
    // condition if dependency is empty and return the result
    else if (taskArray.length > 0 && dependencyArray.length === 0) {
        return result = taskArray;
    }
    else if (taskArray.length > 0 && dependencyArray.length > 0) {
        let matchArrKey = [];
        // loop of task and check it in dependency Array
        taskArray.map((task) => {
            let check = false;
            // loop of dependices and distrubute the string 
            dependencyArray.map((curDepen) => {
                let dependent = curDepen.substr(0, 1); // first letter of string
                let dependentOn = curDepen.substr(-1, 1);// last letter of string

                if (task === dependent) {
                    check = true;
                    // checks and swap they keys of dependencies 
                    let dependArray = matchArrKey.filter(x => x.key === dependent);
                    if (dependArray.length <= 0) {
                        let dependArray = matchArrKey.filter(x => x.key === dependentOn);
                        // if the keys are repeating then cylic dependency check
                        if (dependArray.length > 0) {
                            result = [];
                            cyclic = 1;
                            return result = "Error - this is a cyclic dependency";
                        }
                        // push the dependent which are not repeating
                        else {
                            matchArrKey.push({ "key": dependent, "value": dependentOn });
                        }
                    }

                }
            })
            // if the task key is not persent in dependent side
            if (!check) {
                // multiple dependinces for same variable
                let dependArraySecond = matchArrKey.filter(x => x.value === task);
                let dependArraythird = []
                dependArraythird = matchArrKey.filter(obj => obj.value === taskArray[taskArray.length - 1]);
                if (dependArraythird.length !== 0) {
                    missArraythird = matchArrKey.filter(obj => {
                        if (result[result.length - 1] === obj.key) {
                            if (!result.includes(obj.value)) {
                                // result.push(obj.value);
                                result.splice( result.length - 1, 0, obj.value )
                            }
                        }
                        obj.value === result[result.length - 1]
                    });
                    console.log(missArraythird, missArraythird)
                }

                if (dependArraySecond.length > 0) {
                    result.push(dependArraySecond[0].value);
                    let key = dependArraySecond[0].key;
                    // match and filter the key in depencency array
                    let Dependent = matchArrKey.filter(x => x.value === key);
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

        // if task key has not assigned to any dependencies
        if(cyclic == 0){
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