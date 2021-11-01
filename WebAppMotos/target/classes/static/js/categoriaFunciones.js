function ctgrGet(){
	$.ajax({    
		url : 'http://localhost:8080/api/Category/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#ctgrResultado").empty();
        let miTabla = '<table>'
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>'+
				'<td>'+ respuesta[i].id+ '</td>'+ 		
				'<td>'+ respuesta[i].name+ '</td>'+
				'<td>'+ respuesta[i].description+ '</td>'+
				'<td style="text-align:center"><input type ="radio" name="select" onclick="ctgrEdit('+respuesta[i].id+' )">'+
				'<td style="text-align:center"><button onclick="ctgrDelete('+respuesta[i].id+' )" class="btn btn-primary">Borrar</button>';
			'</tr>';
		}
	    $("#ctgrResultado").html(miTabla);    
	},
	
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});	
}

function ctgrPost(){
	let misDatos = {
		/*id: $("#id").val(),*/
		name: $("#name").val(),
		description: $("#description").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url:'http://localhost:8080/api/Category/save',
		type : 'POST',
		data: datosJson,
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
	statusCode : {
		201 :  function() {
			alert("Se ha creado el dato correctamente!");
			/*$("#id").val("");*/
			$("#name").val("");
			$("#description").val("");
			ctgrGet();	
			}
		}
	});
}

function ctgrEdit (id){
	$.ajax({    
		url : 'http://localhost:8080/api/Category/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost:8080/api/Category/"+id);
        let miTabla = '<table>';
			$("#id").val(respuesta.id);
			$("#id").attr("readonly",true);
			$("#name").val(respuesta.name);
			$("#description").val(respuesta.description);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
	});
}

function ctgrPut(){
	let misDatos = {
		id: $("#id").val(),
		name: $("#name").val(),
		description: $("#description").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url : 'http://localhost:8080/api/Category/update',
		data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Informacion actualizada con exito!");
				$("#id").attr("readonly", false);
				$("#name").val("");
				$("#description").val("");
				ctgrGet();	
				}
			}
	});
}


function ctgrDelete(idCtgr){
	let elemento={
		id:idCtgr
	};
	let datosJson=JSON.stringify(elemento);
	$.ajax({    
		url : 'http://localhost:8080/api/Category/'+idCtgr,
		data: "{}",
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
			alert("El dato ha sido eliminado");
			ctgrGet();
		  },
		  
		  error: function(jqXHR, textStatus, errorThrown) {
				
		  }
  });
}
