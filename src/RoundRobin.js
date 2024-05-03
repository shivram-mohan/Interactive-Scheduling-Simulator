function RoundRobin(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    const timeQuantum = 2; 

    let n = processes.length;
    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    let currentTime = 0;
    let processStats = []; 
    let remainingBurstTime = []; 
    for (let i = 0; i < n; i++) {
        remainingBurstTime.push(parseInt(processes[i].burstTime));
    }

    while (true) {
        let allProcessesDone = true;

        for (let i = 0; i < n; i++) {
            let burstTime = remainingBurstTime[i];

            if (burstTime > 0) {
                allProcessesDone = false;

                let executeTime = Math.min(timeQuantum, burstTime);

                if (currentTime < processes[i].arrivalTime) {
                    totalWaitingTime += processes[i].arrivalTime - currentTime;
                    currentTime = processes[i].arrivalTime;
                }

                remainingBurstTime[i] -= executeTime;
                currentTime += executeTime;

                if (remainingBurstTime[i] === 0) {
                    let turnaroundTime = currentTime - processes[i].arrivalTime; 
                    totalTurnaroundTime += turnaroundTime;

                    let waitingTime = turnaroundTime - processes[i].burstTime;
                    totalWaitingTime += waitingTime;

                    processStats.push({
                        processId: i + 1,
                        arrivalTime: processes[i].arrivalTime,
                        burstTime: processes[i].burstTime,
                        waitingTime,
                        turnaroundTime
                    });
                }
            }
        }

        if (allProcessesDone) break;
    }

    let avgTurnaroundTime = totalTurnaroundTime / n;
    let avgWaitingTime = totalWaitingTime / n;

    return { avgTurnaroundTime, avgWaitingTime, processStats };
}

export default RoundRobin;
