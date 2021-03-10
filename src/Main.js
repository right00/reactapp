import React, { useState, useEffect } from 'react';
import './Main.css';
import { API} from 'aws-amplify';
import { listTimes } from './graphql/queries';
import { createTime as createTimeMutation, deleteTime as deleteTimeMutation,updateTime as updateTimeMutation} from './graphql/mutations';
import {Summarize} from './Summarize';

function Main() {
  const initialDataState = { type:0 ,start:"",end:null}
  const initialSummarizeState = {day:{hour:0,minutes:0},week:{hour:0,minutes:0}}
  const [times, setTimes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [Datas, setData] = useState(initialDataState);
  const [ct,setContinue] = useState({state:false});
  const [summarize,setSummarize] = useState(initialSummarizeState);
  const [isModal,setModal] = useState(false);
  const [modalTime,setModalTime] =  useState({type:0 ,start:"0",end:"0"})


  useEffect(() => {
    fetchTimes();
  }, []);

  async function fetchTimes() {
    const apiData = await API.graphql({ query: listTimes }); 
    setTimes(apiData.data.listTimes.items);
    const nowLogs = apiData.data.listTimes.items.filter(time => time.end != null).sort((a,b) => (b.start - a.start));
    setLogs(nowLogs);
    const even = (time) => time.end === null;
    if(apiData.data.listTimes.items.some(even)){
      setContinue({state:true});
    }
    else{
      setContinue({state:false});
    };
    setSummarize(Summarize(apiData.data.listTimes.items));
    
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
    fetchTimes();
  }


const exportTime = (numStr) => {
    let etime = parseInt(numStr,10);
    let date = new Date(etime);
    console.log(String(date.getFullYear()+100)+"-"+("0"+String(date.getMonth())).slice(-2)+"-"+("0"+String(date.getDate())).slice(-2)+" | "+("0"+String(date.getHours())).slice(-2)+":"+("0"+String(date.getMinutes())).slice(-2)+":"+("0"+String(date.getSeconds())).slice(-2));
    return (String(date.getFullYear())+"-"+("0"+String(date.getMonth())).slice(-2)+"-"+("0"+String(date.getDate())).slice(-2)+" | "+("0"+String(date.getHours())).slice(-2)+":"+("0"+String(date.getMinutes())).slice(-2)+":"+("0"+String(date.getSeconds())).slice(-2));
}

const exportContinueTime = (numStart,numEnd) =>{
  const etime = parseInt(numEnd,10) - parseInt(numStart,10);
  const h = Math.floor(etime/3600000);
  const m = Math.floor(Math.floor((etime%3600000)/60000));
  const s = Math.floor(Math.floor((etime%3600000%60000)/1000));
  if(h<10){
    return("0"+h+":"+("0"+String(m)).slice(-2)+":"+("0"+String(s)).slice(-2));
  }
  return(h+":"+("0"+String(m)).slice(-2)+":"+("0"+String(s)).slice(-2));
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

const summrizeBox=(title,inDate) => {
    return(
      <div className="summrizeBox">
        <h1>{title}</h1>
        <h2>{("0"+inDate.hour).slice(-2)}:{("0"+inDate.minutes).slice(-2)}</h2>
      </div>
        )};
const openModal=(time)=>{
  setModalTime(time);
  setModal(true);
}

const closeModal=()=>{
  setModal(false);
}

  return (
    <div className="Main">
      <div className="brBox"　style={{marginBottom:70}}></div>
      {((!ct.state) && <button className ="button" style ={{backgroundColor:"blue"}}onClick={createTime}>Start</button>)}
      {(ct.state && <button className ="button" style ={{backgroundColor:"red"}} onClick={updateTime}>Stop</button>)}
      <div className="brBox"　style={{marginBottom:70}}></div>
      <div crassName="TopContentsBox">
      {summrizeBox("Day",summarize.day)}
      {summrizeBox("Week",summarize.week)}
      </div>
      <div className="brBox"　style={{marginBottom:70}}></div>
      <div style={{marginBottom: 30}}>
        {
          logs.map(time => (
            <div className="TimeListBox" key={time.id}>
              <div className="TimeBox">
                <h1>TIME:{exportContinueTime(time.start,time.end)}</h1>
              <button className="DetailsButton" onClick={() => openModal(time)}>詳細</button>
              <button className="DeleteButton" onClick={() => deleteTime(time)}>削除</button>
              </div>
            </div>
          ))
        }
      </div>
      {isModal &&
      <div className="Modal">
        <div className="ModalInner">
        <h1>TIME:{exportContinueTime(modalTime.start,modalTime.end)}</h1>
        <h1>START:{exportTime(modalTime.start)}</h1>
        <h1>END:　{exportTime(modalTime.end)}</h1>
        <button className="CloseButton" onClick={() => closeModal()}>閉じる</button>
        </div>
      </div>
      }
    </div>
  );
}

export default Main;

