function clienteGet(){
	$.ajax({    
		url : 'http://localhost:8080/api/Client/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#clienteResultado").empty();
		let miTabla = ''
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>'+
				'<td>'+ respuesta[i].idClient+ '</td>'+ 		
				'<td>'+ respuesta[i].name+ '</td>'+ 	
				'<td>'+ respuesta[i].email+ '</td>'+		
				'<td>'+ respuesta[i].password+ '</td>'+
				'<td>'+ respuesta[i].age+ '</td>'+ 
				'<td style="text-align:center"><input type ="radio" name="select" onclick="clienteEdit('+respuesta[i].idClient+' )">'+
				'<td style="text-align:center"><button onclick="clienteDelete('+respuesta[i].idClient+' )" class="btn btn-primary">Borrar</button>';
			'</tr>';
		}
	    $("#motoResultado").html(miTabla);   
	},
	
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});	
}

function clientePost(){
	let misDatos = {
		/*id: $("#id").val(),*/
		name: $("#name").val(),
		email: $("#email").val(),
		password: $("#password").val(),
		age: $("#age").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url:'http://localhost:8080/api/Client/save',
		type : 'POST',
		data: datosJson,
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
	statusCode : {
		201 :  function() {
			alert("Se ha creado el dato correctamente!");
			/*$("#id").val("");*/
			$("#name").val("");
			$("#email").val("");
			$("#password").val("");
			$("#age").val("");
			clienteGet();	
			}
		}
	});
}

function clienteEdit (id){
	$.ajax({    
		url : 'http://localhost:8080/api/Client/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost:8080/api/Client/"+id);
        let miTabla = '<table>';
			$("#idClient").val(respuesta.idClient);
			$("#idClient").attr("readonly",true);
			$("#name").val(respuesta.name);
			$("#email").val(respuesta.email);
			$("#password").val(respuesta.password);
			$("#age").val(respuesta.age);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
	});
}

function clientePut(){
	let misDatos = {
		idClient: $("#idClient").val(),
		name: $("#name").val(),
		email: $("#email").val(),
		password: $("#password").val(),
		age: $("#age").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url : 'http://localhost:8080/api/Client/update',
		data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Informacion actualizada con exito!");
				$("#idClient").attr("readonly", false);
				$("#name").val("");
				$("#email").val("");
				$("#password").val("");
				$("#age").val("");
				clienteGet();	
				}
			}
	});
}


function clienteDelete(idcliente){
	let elemento={
		id:idcliente
	};
	let datosJson=JSON.stringify(elemento);
	$.ajax({    
		url : 'http://localhost:8080/api/Client/'+idcliente,
		data: "{}",
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
			alert("El dato ha sido eliminado");
			clienteGet();
		  },
		  
		  error: function(jqXHR, textStatus, errorThrown) {
				
		  }
  });
}
