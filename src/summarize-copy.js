import React, { useState, useEffect, useContext } from 'react';
import {UserTimes} from './Main'
function Summrize(){
    const initialState = { hour:0 ,minutes:0}
    const [dayTimes, setDayTimes] = useState(initialState);
    const [weekTimes,setWeekTimes] = useState(initialState);
    const times = useContext(UserTimes);
    useEffect(() => {
        summrizeTimes(times);
        console.log(times);
      }, []);
    
    function summrizeTimes(times){
        const now = Date.now();
        const nowDate = new Date(now); 
        const nowTime = nowDate.getHours()*3600000 + nowDate.getMinutes()*60000 + nowDate.getSeconds()*1000 + nowDate.getMilliseconds()
        const dayStart = now - nowTime;
        const weekStart = dayStart - 518400000;
        let day = 0;
        let week = 0;
        console.log("day:"+dayStart+"|week:"+weekStart);
        times.forEach(
            (time) => {
                console.log(time.start);
                if(time.end == null){
                    if(time.start < weekStart){
                        return;
                    }
                    if(time.start < dayStart){
                        week  = week + now - time.start;
                        return;
                    }
                    else{
                        day = day + time.end - time.start;
                        week  = week + now - time.start;
                        return;
                    }
                }
                if(time.start < weekStart){
                    return;
                }
                if(time.start < dayStart){
                    week  = week + time.end - time.start;
                    return;
                }
                else{
                    day = day + time.end - time.start;
                    week  = week + time.end - time.start;
                    return;
                }
            }

        )
        console.log(Math.floor(day/3800000));
        setDayTimes({hour:(Math.floor(day/3800000)),minutes:(Math.floor((day%3600000)/60000))});
        setWeekTimes({hour:(Math.floor(week/3800000)),minutes:(Math.floor((week%3600000)/60000))});
    } 

    return (
        <div>
            <h2>today : {dayTimes.hour}:{dayTimes.minutes}</h2>
            <h2>week : {weekTimes.hour}:{weekTimes.minutes}</h2>
        </div>
    )
}


export default Summrize;