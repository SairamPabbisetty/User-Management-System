
$('#add_user').submit(event=>{
    alert("Data inserted successfully")
})

$('#update_user').submit((event)=>{
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, (n, i)=>{
        data[n['name']] = n['value']
    })  

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done((response)=>{
        alert("Data updated successfully")
    })
})

if(window.location.pathname == '/') {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(()=>{
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("Delete this record ?")) {
            $.ajax(request).done(function(response){
                alert("Data deleted successfully")
                location.reload() 
            })
        }
    })
}
