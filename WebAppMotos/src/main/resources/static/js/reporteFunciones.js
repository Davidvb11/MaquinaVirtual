function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://193.123.102.29/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let miTabla = ''
    miTabla += '<tr>'+
        '<td style="text-align:center">'+respuesta.completed+'</td>'+
        '<td style="text-align:center">'+respuesta.cancelled+'</td>'+
        '</tr>';
    $("#resultadoStatus").html(miTabla);
}

function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://193.123.102.29/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let miTabla = ''
        for(i=0;i<respuesta.length;i++){
            var start = new Date(respuesta[i].startDate)
			var dev = new Date(respuesta[i].devolutionDate)
            miTabla += '<tr>'+
                '<td style="text-align:center">'+ respuesta[i].idReservation+ '</td>'+
                '<td style="text-align:center">'+ start.getFullYear() + "-" + (start.getMonth()+1) + "-" + (start.getDate()+1) + '</td>'+ 
			    '<td style="text-align:center">'+ dev.getFullYear() + "-" + (dev.getMonth()+1) + "-" + (dev.getDate()+1) + '</td>'+
                '<td style="text-align:center">'+respuesta[i].status+'</td>'+
            '</tr>';
        }
        $("#resultadoDate").html(miTabla);
    }


    function traerReporteClientes(){
        $.ajax({
            url:"http://193.123.102.29/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let miTabla = ''
        for(i=0;i<respuesta.length;i++){
            miTabla += '<tr>'+
                '<th>'+[i+1]+'</th>'+
                '<td>'+respuesta[i].client.name+'</td>'+
                '<td>'+respuesta[i].client.email+'</td>'+
                '<td style="text-align:center">'+respuesta[i].client.age+'</td>'+
                '<td style="text-align:center">'+respuesta[i].total+'</td>'+
            '</tr>';
        }
        $("#resultadoClientes").html(miTabla);
    }