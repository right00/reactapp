 export function Summarize(times){
        const now = Date.now();
        const nowDate = new Date(now); 
        const nowTime = nowDate.getHours()*3600000 + nowDate.getMinutes()*60000 + nowDate.getSeconds()*1000 + nowDate.getMilliseconds()
        const dayStart = now - nowTime;
        const weekStart = dayStart - 518400000;
        let day = 0;
        let week = 0;
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
                        day = day + now - time.start;
                        week  = week + now - time.start;
                        return;
                    }
                }
                if(time.start < weekStart){
                    return;
                }
                if(time.start < dayStart){
                    week  += time.end - time.start;
                    return;
                }
                else{
                    day += time.end - time.start;
                    week  +=  time.end - time.start;
                    return;
                }
            }

        )
        console.log(Math.floor(day/3600000));
        const dayTimes={hour:(Math.floor(day/3600000)),minutes:(Math.floor((day%3600000)/60000))};
        const weekTimes={hour:(Math.floor(week/3600000)),minutes:(Math.floor((week%3600000)/60000))};
        return{day:dayTimes,week:weekTimes};
    } 

