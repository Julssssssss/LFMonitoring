const {jsPDF} = require('jspdf')
require('jspdf-autotable');

//set date to string
const dateAndTime = (isoData)=>{
    const UTCTime = isoData.getTime() //get timestamp into miliseconds
    const manilaDate = new Date(UTCTime + (8 * 60) * 60 * 1000) // 8 * 60 = minutes 
    const formattedDate = manilaDate.toISOString().split('T')[0]
    const formattedTime = manilaDate.toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    const dateAndTimeString = formattedDate +" "+ formattedTime
    return dateAndTimeString
  }

const fixObjectFormat = (objData)=>{
    console.log(objData)
    if(objData === 'NA'){
        return `NA`
    }
    else{
        //console.log(objData)
        if('updatedItem' in objData && 'oldItemData' in objData){ //for edited Items
            const {updatedItem, oldItemData} = objData
            //console.log(oldItemData)
            //console.log(nameItem)
            const updObjToString = ()=>{
                const {_id, nameItem, desc, found, surrenderedBy, postedBy, datePosted} = updatedItem
                return (
                    `UPDATED : \nId : ${_id} \nName Item : ${nameItem} \nDescription : ${desc} \nFound By : ${found} \nSurrendered by : ${surrenderedBy} \nPosted By : ${postedBy} \nDate Posted : ${datePosted} \n\n`
                )
            }
            const oldObjToString =()=>{ 
                const {_id, nameItem, desc, found, surrenderedBy, postedBy, datePosted} = oldItemData
                return (
                    `OLD : \nId : ${_id} \nName Item : ${nameItem} \nDescription : ${desc} \nFound By : ${found} \nSurrendered by : ${surrenderedBy} \nPosted By : ${postedBy} \nDate Posted : ${datePosted} \n\n`
                )
            }
            const combString  = oldObjToString() + updObjToString()
            //console.log(combString)
            return combString
        }
        else if ('to' in objData){ //for sending Email
            //console.log('sended Email', objData)
            //delete objData.__v
            const objToString = JSON.stringify(objData).replace(/,/g, '\n').replace(/["\[\]{}]/g, '').replace(/:/g, ' : ')
            return objToString
        }
        else if('Email' in objData){ //for request
            delete objData.__v
            const {_id, itemId, nameItem, Email, haveBeenEmailed, dateRequested} = objData
            const objToString = (
                `Id : ${_id} \nItem ID : ${itemId} \nName Item : ${nameItem} \nEmail : ${Email} \nhave Been Emailed : ${haveBeenEmailed} \nDate Requested : ${dateRequested}`
            )
            return objToString
        }
        else if('nameItem' in objData){ //for items
            const {_id, url, nameItem, desc, found, surrenderedBy, postedBy, datePosted} = objData
            const objToString = (
                `Id : ${_id} \nImage Path : ${url} \nName Item : ${nameItem} \nDescription : ${desc} \nFound By : ${found} \nSurrendered by : ${surrenderedBy} \nPosted By : ${postedBy} \nDate Posted : ${datePosted}`
            )
            return objToString
        }
        else{
            //delete objData.__v
            //const objToString = JSON.stringify(objData).replace(/,/g, '\n').replace(/["\[\]{}]/g, '').replace(/:/g, ' : ')
            
            const objToString = JSON.stringify(objData).replace(/,/g, '\n').replace(/["\[\]{}]/g, '')
            return objToString
        }
    }
}

const makePdf = async(Type, Data)=>{
    try{
        const doc = new jsPDF('l', 'pt'); 
        doc.setFontSize(18)
        let format = null



        if(Type === 'Logs'){  //LOGSSSSS MA GGGGG
            doc.text('History Logs', 400, 30, {align: 'center'})
            const tableData = Data[0].map(elem => {
                return [
                    elem._id.toString(),
                    elem.Email,
                    elem.Activity,
                    fixObjectFormat(elem.Details),
                    dateAndTime(elem.Date)
                ];
            })

            //console.log(tableData)
            const header = [['Id', 'Email', 'Activity', 'Details', 'Date']]

            format = {
                head: header, 
                body: tableData,
                theme:'grid',
                margin:{
                    left: 35, 
                    right: 35
                },
                columnStyles: {
                    0: {cellWidth: 80},
                    1: {cellWidth: 80},
                    2: {cellWidth: 160},
                    //3: {cellWidth: 50},
                    4: {cellWidth: 80}
                }
            }
        }
        else if(Type === 'Archive'){  ////ARCHIVE MYYYYY NNNN
            doc.text('Archive Datas', 400, 30, {align: 'center'})
            const header = [['Id', 'Item Id', 'Name of Items', 'Desccriptions', 'Found at', 'Surrendered By', 'Posted By', 'Date Posted', 'Claimed By', 'Date Approved']]
            const tableData = Data[0].map(elem => {
                return [
                    elem._id.toString(),
                    elem.itemId,
                    elem.nameItem,
                    elem.desc,
                    elem.found,
                    elem.surrenderedBy,
                    elem.postedBy,
                    dateAndTime(elem.datePosted),
                    elem.claimedBy,
                    dateAndTime(elem.dateClaimed),
                ];
            })

            format = {
                head: header, 
                body: tableData,
                theme:'grid',
                margin:{
                    left: 30,
                    right: 30
                },
                columnStyles: {
                    0: {cellWidth: 65},
                    1: {cellWidth: 65},
                    2: {cellWidth: 80},
                    //3: {cellWidth: 70},
                    4: {cellWidth: 80},
                    5: {cellWidth: 80},
                    6: {cellWidth: 70},
                    7: {cellWidth: 65},
                    8: {cellWidth: 60},
                    9: {cellWidth: 60},
                }
            }
        }
        else if(Type === `unclaimed items`){
            doc.text('Unclaimed Items', 400, 30, {align: 'center'})
            const tableData = Data[0].map(elem => {
                return [
                    elem._id.toString(),
                    elem.desc,
                    elem.nameItem,
                    elem.found, 
                    elem.surrenderedBy,
                    elem.postedBy,
                    dateAndTime(elem.datePosted)
                ];
            })

            //console.log(tableData)
            const header = [['Id', 'Description of Item', 'Item Name', 'Found at', 'Surredered By', 'Posted By', 'Date Posted']]

            format = {
                head: header, 
                body: tableData,
                theme:'grid',
                margin:{
                    left: 35, 
                    right: 35
                },
                columnStyles: {
                    0: {cellWidth: 90},
                    //1: {cellWidth: 120},
                    2: {cellWidth: 120},
                    3: {cellWidth: 120},
                    4: {cellWidth: 120},
                    5: {cellWidth: 120},
                    6: {cellWidth: 60},
                }
            }
        }

        doc.autoTable(format)
        return doc.output()
    }    
    catch(err){
        console.log(err)
    }
}
module.exports = makePdf