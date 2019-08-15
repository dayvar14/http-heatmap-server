class Stopwatch {
    startTime = process.hrtime();
    endTime = process.hrtime();
    
    constructor(){
    }
    //Records start time
    start(){
        startTime = process.hrtime()
    }

    //Finds difference between start time and end time
    end(){
        endTime = process.hrtime(this.startTime);
    }

    //Returns time elapsed in ms
    time(){
        return endTime[1]/ 1000000;
    }
}

module.exports = Stopwatch;