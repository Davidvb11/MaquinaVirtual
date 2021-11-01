function printSelect(){
	$.ajax({    
		url : 'http://localhost:8080/api/Category/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cat").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
			miSelect += '<option value='+ respuesta[i].id+'>'+respuesta[i].name+'</option>'
		}
		$("#cat").append(miSelect);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function motoGet(){
	$.ajax({    
		url : 'http://localhost:8080/api/Motorbike/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#motoResultado").empty();
        let miTabla = ''
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>'+
				'<td>'+ respuesta[i].id+ '</td>'+ 		
				'<td>'+ respuesta[i].name+ '</td>'+ 	
				'<td>'+ respuesta[i].brand+ '</td>'+		
				'<td>'+ respuesta[i].year+ '</td>'+
				'<td>'+ respuesta[i].description+ '</td>'+ 
				'<td>'+ respuesta[i].category.name+ '</td>'+
				'<td style="text-align:center"><input type ="radio" name="select" onclick="motoEdit('+respuesta[i].id+' )">'+
				'<td style="text-align:center"><button onclick="motoDelete('+respuesta[i].id+' )" class="btn btn-primary">Borrar</button>';
				printSelect();
			'</tr>';
		}
	    $("#motoResultado").html(miTabla);    
	},
	
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});	
}

function motoPost(){
	let selected = $("#cat").children(":selected").attr("value");
	if (selected > 0){
		let misDatos = {
			/*id: $("#id").val(),*/
			name: $("#name").val(),
			brand: $("#brand").val(),
			year: $("#year").val(),
			description: $("#description").val(),
			category:{id: selected}
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax({    
			url:'http://localhost:8080/api/Motorbike/save',
			type : 'POST',
			data: datosJson,
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Se ha creado el dato correctamente!");
				/*$("#id").val("");*/
				$("#name").val("");
				$("#brand").val("");
				$("#year").val("");
				$("#description").val("");
				$("#category").val("");
				motoGet();
				}
			}
		});
	}else{
		alert ("Debe escoger categoria");
	}
}

function motoEdit (id){
	$.ajax({    
		url : 'http://localhost:8080/api/Motorbike/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost:8080/api/Motorbike/"+id);
        let miTabla = '<table>';
			$("#id").val(respuesta.id);
			$("#id").attr("readonly",true);
			$("#name").val(respuesta.name);
			$("#brand").val(respuesta.brand);
			$("#year").val(respuesta.year);
			$("#description").val(respuesta.description);
			$("#cat").val(respuesta.category.id);
			$("#cat").attr("disabled",true);
			/*printSelect();*/
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
	});
}

function motoPut(){
    let selected = $("#cat").children(":selected").attr("value");
	let misDatos = {
		id: $("#id").val(),
		name: $("#name").val(),
		brand: $("#brand").val(),
		year: $("#year").val(),
		description: $("#description").val(),
		category:{id: selected}
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url : 'http://localhost:8080/api/Motorbike/update',
		data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Informacion actualizada con exito!");
				$("#id").attr("readonly", false);
				$("#name").val("");
				$("#brand").val("");
				$("#year").val("");
				$("#description").val("");
				$("#category").val("");
				motoGet();	
				}
			}
	});
}


function motoDelete(idMoto){
	let elemento={
		id:idMoto
	};
	let datosJson=JSON.stringify(elemento);
	$.ajax({    
		url : 'http://localhost:8080/api/Motorbike/'+idMoto,
		data: "{}",
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
			alert("El dato ha sido eliminado");
			motoGet();
		  },
		  
		  error: function(jqXHR, textStatus, errorThrown) {
				
		  }
  });
}