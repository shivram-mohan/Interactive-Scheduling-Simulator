import React, { useState } from 'react';
import FCFS from './fcfs';
import SJF from './SJF';
import PriorityScheduling from './PriorityScheduling';
import RoundRobin from './RoundRobin'; 

const algorithms = {
  FCFS: FCFS,
  SJF: SJF,
  Priority: PriorityScheduling,
  RoundRobin: RoundRobin, 
};

const Main = () => {
  const [selectedAlgorithm1, setSelectedAlgorithm1] = useState('FCFS');
  const [selectedAlgorithm2, setSelectedAlgorithm2] = useState('SJF');
  const [algorithm1Processes, setAlgorithm1Processes] = useState([{ arrivalTime: '', burstTime: '' }]);
  const [algorithm2Processes, setAlgorithm2Processes] = useState([{ arrivalTime: '', burstTime: '' }]);
  const [algorithm1Results, setAlgorithm1Results] = useState({ avgTurnaroundTime: 0, avgWaitingTime: 0, processStats: [] });
  const [algorithm2Results, setAlgorithm2Results] = useState({ avgTurnaroundTime: 0, avgWaitingTime: 0, processStats: [] });

  const handleAlgorithm1Submit = (e) => {
    e.preventDefault();
    const selectedAlgo = algorithms[selectedAlgorithm1]; 
    const result = selectedAlgo(algorithm1Processes);
    setAlgorithm1Results(result);
  };

  const handleAlgorithm2Submit = (e) => {
    e.preventDefault();
    const selectedAlgo = algorithms[selectedAlgorithm2]; 
    const result = selectedAlgo(algorithm2Processes);
    setAlgorithm2Results(result);
  };

  const handleAddProcess1 = (e) => {
    e.preventDefault();
    setAlgorithm1Processes([...algorithm1Processes, { arrivalTime: '', burstTime: '' }]);
  };

  const handleAddProcess2 = (e) => {
    e.preventDefault();
    setAlgorithm2Processes([...algorithm2Processes, { arrivalTime: '', burstTime: '' }]);
  };

  const handleChange = (index, key, value, algorithm) => {
    if (algorithm === 'algorithm1') {
      const updatedProcesses = [...algorithm1Processes];
      updatedProcesses[index][key] = value;
      setAlgorithm1Processes(updatedProcesses);
    } else if (algorithm === 'algorithm2') {
      const updatedProcesses = [...algorithm2Processes];
      updatedProcesses[index][key] = value;
      setAlgorithm2Processes(updatedProcesses);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>

      {/* Algorithm Selection */}
      <h2>Select Algorithms to Compare</h2>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
        
        <select value={selectedAlgorithm1} onChange={(e) => setSelectedAlgorithm1(e.target.value)} style={{marginRight:"20px", padding:"5px", borderRadius:"10px",borderWidth:"2px"}}>
          {Object.keys(algorithms).map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>
        <select value={selectedAlgorithm2} onChange={(e) => setSelectedAlgorithm2(e.target.value)} style={{marginRight:"20px", padding:"5px", borderRadius:"10px",borderWidth:"2px"}}>
          {Object.keys(algorithms).map((algo) => (
            <option key={algo} value={algo} disabled={algo === selectedAlgorithm1}>
              {algo}
            </option>
          ))}
        </select>
      </div>
      


      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>

      {/* Algorithm 1 */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{selectedAlgorithm1} Scheduling</h1>

        <form onSubmit={handleAlgorithm1Submit}>
          {algorithm1Processes.map((process, index) => (
            <div key={index}>
              <label style={{fontFamily:"sans-serif", fontWeight:"bold", padding:"10px"}}>
                Arrival Time:
                <input
                  type="number"
                  value={process.arrivalTime}
                  onChange={(e) => handleChange(index, 'arrivalTime', e.target.value, 'algorithm1')}
                  required
                  style={{margin:"5px", borderRadius:"7px"}}
                />
              </label>
              
              <label style={{fontFamily:"sans-serif", fontWeight:"bold", padding:"10px"}}>
                Burst Time:
                <input
                  type="number"
                  value={process.burstTime}
                  onChange={(e) => handleChange(index, 'burstTime', e.target.value, 'algorithm1')}
                  required
                  style={{margin:"5px", borderRadius:"7px"}}
                />
                </label>
                {selectedAlgorithm1=="Priority" && <label style={{fontFamily:"sans-serif", fontWeight:"bold", padding:"10px"}}>
                Priority:
                <input
                  type="number"
                  value={process.priority}
                  onChange={(e) => handleChange(index, 'priority', e.target.value, 'algorithm1')}
                  required
                  style={{margin:"5px", borderRadius:"7px"}}
                />
              </label>}
                </div>
                ))}
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", padding:"20px"}}>
                <button type="button" onClick={handleAddProcess1} style={{ outline: 0, border: 0, backgroundColor:"#27292b" , cursor:'pointer' , fontSize: 16, color: "white", padding: "10px 20px", borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10 }}>Add</button>
                <button type="submit" style={{ outline: 0, border: 0, backgroundColor:"#27292b" , cursor:'pointer' , fontSize: 16, color: "white", padding: "10px 20px", borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10 }}>Submit</button>
                </div>
                </form>

                {algorithm1Results.processStats.length > 0 && (
                <div>
                <h2>{selectedAlgorithm1} Process Statistics:</h2>
                <table>
                <thead>
                    <tr>
                    <th style={{paddingRight:"20px"}}>Process</th>
                    <th style={{paddingRight:"20px"}}>Arrival Time</th>
                    <th style={{paddingRight:"20px"}}>Burst Time</th>
                    <th style={{paddingRight:"20px"}}>Waiting Time</th>
                    <th style={{paddingRight:"20px"}}>Turnaround Time</th>
                    </tr>
                </thead>
                <tbody>
                    {algorithm1Results.processStats.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.processId}</td>
                        <td>{stat.arrivalTime}</td>
                        <td>{stat.burstTime}</td>
                        <td>{stat.waitingTime}</td>
                        <td>{stat.turnaroundTime}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <p>Average Turnaround Time: {algorithm1Results.avgTurnaroundTime}</p>
                <p>Average Waiting Time: {algorithm1Results.avgWaitingTime}</p>
                </div>
                )}
                </div>

                {/* Algorithm 2 */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>{selectedAlgorithm2} Scheduling</h1>

                <form onSubmit={handleAlgorithm2Submit}>
                {algorithm2Processes.map((process, index) => (
                <div key={index}>
                <label style={{fontFamily:"sans-serif", fontWeight:"bold", padding:"10px"}}>
                    Arrival Time:
                    <input
                    type="number"
                    value={process.arrivalTime}
                    onChange={(e) => handleChange(index, 'arrivalTime', e.target.value, 'algorithm2')}
                    required
                    style={{margin:"5px", borderRadius:"7px"}}
                    />
                </label>
                <label style={{fontFamily:"sans-serif", fontWeight:"bold", padding:"10px"}}>
                    Burst Time:
                    <input
                    type="number"
                    value={process.burstTime}
                    onChange={(e) => handleChange(index, 'burstTime', e.target.value, 'algorithm2')}
                    required
                    style={{margin:"5px", borderRadius:"7px"}}
                    />
                </label>
                {selectedAlgorithm2=="Priority" && <label style={{fontFamily:"sans-serif", fontWeight:"bold", padding:"10px"}}>
                Priority:
                <input
                  type="number"
                  value={process.priority}
                  onChange={(e) => handleChange(index, 'priority', e.target.value, 'algorithm1')}
                  required
                  style={{margin:"5px", borderRadius:"7px"}}
                />
              </label>}
                </div>
                ))}
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", padding:"20px"}}>
                <button type="button" onClick={handleAddProcess2} style={{ outline: 0, border: 0, backgroundColor:"#27292b" , cursor:'pointer' , fontSize: 16, color: "white", padding: "10px 20px", borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10 }}>Add</button>
                <button type="submit" style={{ outline: 0, border: 0, backgroundColor:"#27292b" , cursor:'pointer' , fontSize: 16, color: "white", padding: "10px 20px", borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10 }}>Submit</button>
                </div>
                </form>

                {algorithm2Results.processStats.length > 0 && (
                <div style={{fontFamily:"sans-serif"}}>
                <h2>{selectedAlgorithm2} Process Statistics:</h2>
                <table >
                <thead >
                    <tr>
                    <th style={{paddingRight:"20px"}}>Process</th>
                    <th style={{paddingRight:"20px"}}>Arrival Time</th>
                    <th style={{paddingRight:"20px"}}>Burst Time</th>
                    <th style={{paddingRight:"20px"}}>Waiting Time</th>
                    <th style={{paddingRight:"20px"}}>Turnaround Time</th>
                    </tr>
                </thead>
                <tbody>
                    {algorithm2Results.processStats.map((stat, index) => (
                    <tr key={index}>
                        <td>{stat.processId}</td>
                        <td>{stat.arrivalTime}</td>
                        <td>{stat.burstTime}</td>
                        <td>{stat.waitingTime}</td>
                        <td>{stat.turnaroundTime}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <p>Average Turnaround Time: {algorithm2Results.avgTurnaroundTime}</p>
                <p>Average Waiting Time: {algorithm2Results.avgWaitingTime}</p>
            </div>
                )}
            </div>
            </div>
        </div>
);
};

export default Main;
