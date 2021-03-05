import React, { useState, useEffect } from 'react';
import './App.css';
import { API, DataStore} from 'aws-amplify';
import { listTimes } from './graphql/queries';
import { createTime as createTimeMutation }from './graphql/mutations';

const initialFormState = { type:0 ,start:0,end:-1}

function Start() {
  const [times, setTimes] = useState([]);
  const [Datas, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTimes();
  }, []);

  async function fetchTimes() {
    const apiData = await API.graphql({ query: listTimes });
    setTimes(apiData.data.listTimes.items);
  }

  async function createTime() {
    Datas.start =  Date.now();
    await API.graphql({ query: createTimeMutation, variables: { input: Datas } });
    setTimes([ ...times, Datas ]);
    setFormData(initialFormState);
  }

  return (
    <div className="Start">
      <button onClick={createTime}>Start</button>
    </div>
  );
}

export default Start;