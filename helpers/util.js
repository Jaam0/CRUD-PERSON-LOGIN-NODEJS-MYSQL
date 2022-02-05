const exceljs = require('exceljs');

const data = [
    {
        id:1,
        first_name:'Jessie Alvarez'
    }
];

const createExcel = (data) =>{
    const workbook = new exceljs.Workbook();
    const fileName = `Mydata.xlsx`;
    const sheet = workbook.addWorksheet('Data');
    
    const reColums = [
        {   header: 'Id', key: 'id'    },
        {   header: 'First Name', key: 'first_name'}
    ];

    sheet.columns = reColums;

    sheet.addRows(data);
    workbook.xlsx.writeFile(fileName)
    .then((e) =>{
        console.log('It was created successfully!!');
    })
    .catch(()=> {
        console.log('Something happen saving the EXCEL file')
    });
};

createExcel(data);
