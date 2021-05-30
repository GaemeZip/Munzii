// const createMemo = (req,res)=>{
//     res.send('hi')
// }

const getMemo = (req,res)=>{
    res.send('g')
}

const updateMemo = (req,res)=>{
    res.send('u')
}

const deleteMemo = (req,res)=>{
    res.send('d')
}

module.exports = {
    // createMemo,
    getMemo,
    updateMemo,
    deleteMemo
}