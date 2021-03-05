import React, { useState, useEffect } from 'react';
import './App.css';
import { API} from 'aws-amplify';
import { listTimes } from './graphql/queries';
import { createTime as createTimeMutation, deleteTime as deleteTimeMutation,updateTime as updateTimeMutation} from './graphql/mutations';

const initialDataState = { type:0 ,start:"",end:null}

function Main() {
  const [times, setTimes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [Datas, setData] = useState(initialDataState);
  const [ct,setContinue] = useState({state:false});


  useEffect(() => {
    fetchTimes();
  }, []);

  async function fetchTimes() {
    const apiData = await API.graphql({ query: listTimes }); 
    setTimes(apiData.data.listTimes.items);
    const nowLogs = apiData.data.listTimes.items.filter(time => time.end != null);
    setLogs(nowLogs);
    const even = (time) => time.end === null;
    if(apiData.data.listTimes.items.some(even)){
      setContinue({state:true});
    }
    else{
      setContinue({state:false});
    }
  }

  async function createTime() {
    let time;
    Datas.start =  String(Date.now());
    Datas.type = 0;
    await API.graphql({ query: createTimeMutation, variables: { input: Datas } });
    setData(initialDataState);
    fetchTimes();
  }

  async function updateTime() {
    const even = (time) => time.end == null;
    if(!times.some(even)){return;}
    let timedata = times.find(time => time.end == null)
    const id = timedata.id;
    const now = String(Date.now());
    console.log(timedata);
    await API.graphql({ query: updateTimeMutation, variables: { input: {id:id,end:now} }});
    setData(initialDataState);
    fetchTimes();  }

  async function deleteTime({ id }) {
    const newTimesArray = times.filter(time => time.id !== id);
    setTimes(newTimesArray);
    await API.graphql({ query: deleteTimeMutation, variables: { input: { id } }});
    buttonState(newTimesArray);
  }

let exportTime = (numStr) => {
    let etime = parseInt(numStr,10);
    let date = new Date(etime);
    return ("0"+String(date.getHours())).slice(-2)+":"+("0"+String(date.getMinutes())).slice(-2)+":"+("0"+String(date.getSeconds())).slice(-2)
}

const buttonState = (timedatas) =>{
  const even = (time) => time.end === null;
  if(timedatas.some(even)){
      setContinue({state:true});
      console.log("set true")
  }
  else{
      setContinue({state:false});
  }
  console.log(ct.state);
}

  return (
    <div className="App">
      <h1>Timer</h1>
      {((!ct.state) && <button onClick={createTime}>Start</button>)}
      {(ct.state && <button onClick={updateTime}>Stop</button>)}
      <div style={{marginBottom: 30}}>
        {
          logs.map(time => (
            <div key={time.id}>
              <h2>start:{exportTime(time.start)}</h2>
              <h2>end:{exportTime(time.end)}</h2>
              <button onClick={() => deleteTime(time)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Main;