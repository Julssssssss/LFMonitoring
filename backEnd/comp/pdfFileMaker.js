const {jsPDF} = require('jspdf')
require('jspdf-autotable');

const makePdf = async(Type, Data)=>{
    try{
        const doc = jsPDF();
        doc.setFontSize(18)
        doc.text('History Logs', 105, 10, {align: 'center'})
        const startX =10
        const startY = 20
        let header = null
        let bodyData =  null
        if(Type === 'Logs'){ 
            const tableData = Data[0].map(elem => {
                return [
                    elem._id.toString(),
                    elem.Email,
                    elem.Activity,
                    elem.Details,
                    elem.Date.toISOString().split('T')[0]
                ];
            })
            console.log(tableData)
            header = [['_id', 'Email', 'Activity', 'Details', 'Date']]
            bodyData = tableData
        }
        else if(Type === 'Archive'){
            header = [['_id', 'itemId', 'itemImages', 'nameItem', 'desc', 'found', 'surrenderedBy', 'postedBy', 'datePosted', 'claimedBy', 'dateClaimed']]
        }

        doc.autoTable({
            startY,
            head: header, 
            body: bodyData,
            startY,
            theme:'grid',
            columnStyles: {0: {cellWidth: 20}}
        })
        return doc.output()
    }    
    catch(err){
        console.log(err)
    }
}
module.exports = makePdf