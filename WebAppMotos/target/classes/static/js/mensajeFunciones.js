function printSelect(){
	$.ajax({    
		url : 'http://localhost:8080/api/Motorbike/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#moto").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
			miSelect += '<option value='+ respuesta[i].id+'>'+respuesta[i].name+'</option>'
		}
		$("#moto").append(miSelect);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function msjGet(){
	$.ajax({    
		url : 'http://localhost:8080/api/Message/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#msjResultado").empty();
		let miTabla = ''
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>'+
				'<td>'+ respuesta[i].idMessage+ '</td>'+ 		
				'<td>'+ respuesta[i].messageText+ '</td>'+ 	
				'<td>'+ respuesta[i].motorbike.name+ '</td>'+
				'<td style="text-align:center"><input type ="radio" name="select" onclick="msjEdit('+respuesta[i].idMessage+' )">'+
				'<td style="text-align:center"><button onclick="msjDelete('+respuesta[i].idMessage+' )" class="btn btn-primary">Borrar</button>';
				printSelect();
			'</tr>';
		}
	    $("#msjResultado").html(miTabla);

        
	},
	
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});	
}

function msjPost(){
	let selected = $("#moto").children(":selected").attr("value");
	if (selected > 0){
		let misDatos = {
			/*idMessage: $("#idMessage").val(),*/
			messageText: $("#messageText").val(),
			motorbike:{id: selected}
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax({    
			url:'http://localhost:8080/api/Message/save',
			type : 'POST',
			data: datosJson,
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Se ha creado el dato correctamente!");
				$("#idMessage").val("");
				$("#messageText").val("");
				$("#motorbike").val("");
				msjGet();	
				}
			}
		});
	}else{
		alert ("Debe escoger motocicleta");
	}
}

function msjEdit (id){
	$.ajax({    
		url : 'http://localhost:8080/api/Message/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost:8080/api/Message/"+id);
        let miTabla = '<table>';
			$("#idMessage").val(respuesta.idMessage);
			$("#idMessage").attr("readonly",true);
			$("#messageText").val(respuesta.messageText);
			$("#moto").val(respuesta.motorbike.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
	});
}

function msjPut(){
    let selected = $("#moto").children(":selected").attr("value");
	let misDatos = {
		idMessage: $("#idMessage").val(),
		messageText: $("#messageText").val(),
		motorbike:{id: selected}
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url : 'http://localhost:8080/api/Message/update',
		data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Informacion actualizada con exito!");
				$("#idMessage").attr("readonly", false);
				$("#messageText").val("");
				$("#motorbike").val("");
				msjGet();	
				}
			}
	});
}


function msjDelete(idMsj){
	let elemento={
		id:idMsj
	};
	let datosJson=JSON.stringify(elemento);
	$.ajax({    
		url : 'http://localhost:8080/api/Message/'+idMsj,
		data: "{}",
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
			alert("El dato ha sido eliminado");
			msjGet();
		  },
		  
		  error: function(jqXHR, textStatus, errorThrown) {
				
		  }
  });
}