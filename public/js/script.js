//DataTable
const ShowData = ()=>{
    $(document).ready( function () {
        $('#example').DataTable({
            responsive:true
        });
    } );
};

//Jquery Button Update or edit
const changeActionUpdate = (id) => {
    $('form').attr('action', '../person/update');
    $('#exampleModalLabel').text('Edit person');
    $(document).ready(function(){
        $.get(`http://localhost:4000/person/${id}`, function(data, status){
           $('#id').val(data.rows.ID);
           $('#first_name').val(data.rows.FIRST_NAME);
           $('#last_name').val(data.rows.LAST_NAME);
           $('#gender').val(data.rows.GENDER);
           $('#age').val(data.rows.AGE);
           $('#nationality').val(data.rows.NATIONALITY);
           $('#status').val(data.rows.STATUS);
        });
    });
   
};

//Jquery Button Add or create new row
const changeActionSave = () => {
    $('form').attr('action', '../person/save');
    $('#exampleModalLabel').text('New person');
    $('#first_name').val('');
    $('#last_name').val('');
    $('#gender').val('- None -');
    $('#age').val(0);
    $('#nationality').val('- None -');
    $('#status').val('- None -');
};

//SweetAlert2
const confirmar = (id)=>{
    Swal.fire({
               title: '¿Estás seguro que deseas eliminar?',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: `Confirmar`,
              }).then((result) => {
                   if (result.isConfirmed) {
                      window.location = '/person/delete/'+id; 
                    }     
              });
};

//Loarding data for DrownDownList from an api
const dropDownData = () =>{
    $(document).ready(function(){
        $.get(`https://restcountries.com/v2/all`, function(data, status){
           var myhtml ='<option selected>- None -</option>';
           jQuery.each(data,(i,v)=>{
                myhtml += '<option value="' + v.name.toUpperCase() + '">' + v.name.toUpperCase() + '</option>';
           });

           $('#nationality').html(myhtml);
        });
    });
};

ShowData();
dropDownData();
