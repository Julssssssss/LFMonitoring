const actLogsModel = require("../Models/ActivityLogs")

const writeActLogs = async(Email, Activity, Details, oldData)=>{
    if(Activity === `edited an item`){
        const actLogs = new actLogsModel({
            Email: Email,
            Activity: Activity,
            Details: oldData,
            newDetails: Details
        })
        await actLogs.save()
        .then(res=>{
            console.log(`successfully logged: ${Activity}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else{
        const actLogs = new actLogsModel({
            Email: Email,
            Activity: Activity,
            Details:Details
        })
        await actLogs.save()
        .then(res=>{
            console.log(`successfully logged: ${Activity}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
module.exports = writeActLogs