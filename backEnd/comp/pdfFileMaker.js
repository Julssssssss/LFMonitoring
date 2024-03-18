const {jsPDF} = require('jspdf')
require('jspdf-autotable');

const dateAndTime = (isoData)=>{
    const Date = isoData.toISOString().split('T')[0]
    const Time = isoData.toTimeString().split(' ')[0]
    const dateAndTime = Date +" "+ Time
    //console.log('dateAndTime', dateAndTime)
    return dateAndTime
}

const fixObjectFormat = (objData)=>{
    if(objData === 'NA'){
        return `NA`
    }
    else{
       const stringObj = JSON.stringify(objData).split(',').join('\n')
       return stringObj
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
            const header = [['_id', 'Email', 'Activity', 'Details', 'Date']]

            format = {
                head: header, 
                body: tableData,
                theme:'grid',
                margin:{
                    left: 35, 
                    right: 35
                },
                columnStyles: {
                    0: {cellWidth: 60},
                    1: {cellWidth: 60},
                    2: {cellWidth: 120},
                    //3: {cellWidth: 50},
                    4: {cellWidth: 60}
                }
            }
        }
        else if(Type === 'Archive'){  ////ARCHIVE MYYYYY NNNN
            doc.text('Archive Datas', 400, 30, {align: 'center'})
            const header = [['_id', 'Item Id', 'Item Images', 'Name of Items', 'Desccriptions', 'Found at', 'Surrendered By', 'Posted By', 'Date Posted', 'Claimed By', 'Date Approved']]
            const tableData = Data[0].map(elem => {
                return [
                    elem._id.toString(),
                    elem.itemId,
                    elem.itemImages,
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
                    //2: {cellWidth: 90},
                    3: {cellWidth: 70},
                    4: {cellWidth: 80},
                    5: {cellWidth: 80},
                    6: {cellWidth: 70},
                    7: {cellWidth: 65},
                    8: {cellWidth: 60},
                    9: {cellWidth: 65},
                    10: {cellWidth: 60}
                }
            }
        }
        else if(Type === `unclaimed items`){
            doc.text('Unclaimed Items', 400, 30, {align: 'center'})
            const tableData = Data[0].map(elem => {
                return [
                    elem._id.toString(),
                    fixObjectFormat(elem.url),
                    elem.nameItem,
                    elem.found, 
                    elem.surrenderedBy,
                    elem.postedBy,
                    dateAndTime(elem.datePosted)
                ];
            })

            //console.log(tableData)
            const header = [['_id', 'Images', 'Item Name', 'Found at', 'Surredered By', 'Posted By', 'Date Posted']]

            format = {
                head: header, 
                body: tableData,
                theme:'grid',
                margin:{
                    left: 35, 
                    right: 35
                },
                columnStyles: {
                    0: {cellWidth: 60},
                    //1: {cellWidth: 120},
                    2: {cellWidth: 60},
                    3: {cellWidth: 60},
                    4: {cellWidth: 60},
                    5: {cellWidth: 60},
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