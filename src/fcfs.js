function FCFS(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let n = processes.length;
    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    let currentTime = 0;
    let processStats = []; 

    for (let i = 0; i < n; i++) {
        let arrivalTime = parseInt(processes[i].arrivalTime);
        let burstTime = parseInt(processes[i].burstTime);

        let waitingTime = Math.max(0, currentTime - arrivalTime);
        totalWaitingTime += waitingTime;

        let turnaroundTime = waitingTime + burstTime;
        totalTurnaroundTime += turnaroundTime;

        currentTime += burstTime;

        processStats.push({
            processId: i + 1,
            arrivalTime,
            burstTime,
            waitingTime,
            turnaroundTime
        });
    }

    let avgTurnaroundTime = totalTurnaroundTime / n;
    let avgWaitingTime = totalWaitingTime / n;

    return { avgTurnaroundTime, avgWaitingTime, processStats };
}

export default FCFS;