function printSelect(){
	printMselect() ; 
	printCselect();
}

function printMselect(){
	$.ajax({    
		url : 'http://193.123.102.29/api/Motorbike/all',
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

function printCselect(){
	$.ajax({    
		url : 'http://193.123.102.29/api/Client/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cliente").empty();
		miSelect='<option idClient="" ></option>';
		for (i=0; i<respuesta.length; i++){
			miSelect += '<option value='+ respuesta[i].idClient+'>'+respuesta[i].name+'</option>'
		}
		$("#cliente").append(miSelect);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function rsvGet(){
	$.ajax({    
		url : 'http://193.123.102.29/api/Reservation/all',
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#rsvResultado").empty();
        let miTabla = ''
		for (i=0; i<respuesta.length; i++){
			var start = new Date(respuesta[i].startDate)
			var dev = new Date(respuesta[i].devolutionDate)
			miTabla += '<tr>'+
				'<td>'+ respuesta[i].idReservation+ '</td>'+		
				'<td>'+ start.getFullYear() + "-" + (start.getMonth()+1) + "-" + (start.getDate()+1) + '</td>'+
				'<td>'+ dev.getFullYear() + "-" + (dev.getMonth()+1) + "-" + (dev.getDate()+1) + '</td>'+
				'<td>'+ respuesta[i].status+ '</td>'+		
	        	'<td>'+ respuesta[i].motorbike.name+ '</td>'+
				'<td>'+ respuesta[i].client.name+ '</td>'+
				'<td style="text-align:center"><input type ="radio" name="select" onclick="rsvEdit('+respuesta[i].idReservation+' )">'+
				'<td style="text-align:center"><button onclick="rsvDelete('+respuesta[i].idReservation+' )" class="btn btn-primary">Borrar</button>';
				printSelect();
			'</tr>';
		}
	    $("#rsvResultado").html(miTabla);   
	},
	
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});	
}

function rsvPost(){
	let sMoto = $("#moto").children(":selected").attr("value");
	let sCliente = $("#cliente").children(":selected").attr("value");
	if (sMoto == undefined || sCliente == undefined){
		alert ("Debe escoger motocicleta y cliente");
	}else{
		var start = new Date()
		let misDatos = {
			/*idReservation: $("#idReservation").val(),*/
			startDate: $("#startDate").val(),
			devolutionDate: $("#devolutionDate").val(),
			motorbike:{id: sMoto},
			client:{idClient: sCliente}
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax({    
			url:'http://193.123.102.29/api/Reservation/save',
			type : 'POST',
			data: datosJson,
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Se ha creado el dato correctamente!");
				/*$("#idMessage").val("");*/
				$("#startDate").val("");
				$("#devolutionDate").val("");
				$("#sMoto").val("");
				$("#sClient").val("");
				rsvGet();	
				}
			}
		});
	}
}

function rsvEdit (id){
	$.ajax({    
		url : 'http://193.123.102.29/api/Reservation/'+id,
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://193.123.102.29/api/Reservation/"+id);
        let miTabla = '<table>';
			var start = new Date(respuesta.startDate)
			var dev = new Date(respuesta.devolutionDate)
			$("#idReservation").val(respuesta.idReservation);
			$("#idReservation").attr("readonly",true);
			$("#startDate").val(start.getFullYear() + "-" + (start.getMonth()+1) + "-" + (start.getDate()+1));
			$("#devolutionDate").val(dev.getFullYear() + "-" + (dev.getMonth()+1) + "-" + (dev.getDate()+1));
			$("#moto").val(respuesta.motorbike.id);
			$("#cliente").val(respuesta.client.idClient);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
	});
}

function rsvPut(){
    let sMoto = $("#moto").children(":selected").attr("value");
	let sCliente = $("#cliente").children(":selected").attr("value");
	let misDatos = {
		idReservation: $("#idReservation").val(),
		startDate: $("#startDate").val(),
		devolutionDate: $("#devolutionDate").val(),
		motorbike:{id: sMoto},
		client:{idClient: sCliente}
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
		url : 'http://193.123.102.29/api/Reservation/update',
		data: datosJson,
		type : 'PUT',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				alert("Informacion actualizada con exito!");
				$("#idReservation").attr("readonly", false);
				$("#startDate").val(),
				$("#devolutionDate").val(),
				$("#motorbike").val("");
				$("#client").val("");
				rsvGet();	
				}
			}
	});
}

function rsvDelete(idRsv){
	let elemento={
		id:idRsv
	};
	let datosJson=JSON.stringify(elemento);
	$.ajax({    
		url : 'http://193.123.102.29/api/Reservation/'+idRsv,
		data: "{}",
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
			alert("El dato ha sido eliminado");
			rsvGet();
		  },
		  
		  error: function(jqXHR, textStatus, errorThrown) {
				
		  }
  });
}

