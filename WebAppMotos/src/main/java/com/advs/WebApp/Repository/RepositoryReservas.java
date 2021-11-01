
package com.advs.WebApp.Repository;

import com.advs.WebApp.Report.ContadorClientes;
import com.advs.WebApp.Interface.InterfaceReservas;
import com.advs.WebApp.Model.Clientes;
import com.advs.WebApp.Model.Reservas;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author David Vargas
 */
@Repository
public class RepositoryReservas {
    @Autowired
    private InterfaceReservas crud;
    
    public List<Reservas> getAll(){
        return (List<Reservas>) crud.findAll();
    }
    public Optional <Reservas> getReservas(int id){
        return crud.findById(id);
    }
    public Reservas save(Reservas reservas){
        return crud.save(reservas);
    }
    public void delete(Reservas reservas){
        crud.delete(reservas);
    }    
    public List<Reservas> ReservacionStatusRepositorio (String status){
         return crud.findAllByStatus(status);
     }
     
     public List<Reservas> ReservacionTiempoRepositorio (Date a, Date b){
         return crud.findAllByStartDateAfterAndStartDateBefore(a, b);
     
     }
     
     public List<ContadorClientes> getClientesRepositorio(){
         List<ContadorClientes> res = new ArrayList<>();
         List<Object[]> report = crud.countTotalReservationsByClient();
         for(int i=0; i<report.size(); i++){
             res.add(new ContadorClientes((Long)report.get(i)[1],(Clientes) report.get(i)[0]));
         }
         return res;
     }

}
