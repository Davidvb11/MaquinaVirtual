
package com.advs.WebApp.Service;

import com.advs.WebApp.Report.ContadorClientes;
import com.advs.WebApp.Repository.RepositoryReservas;
import com.advs.WebApp.Model.Reservas;
import com.advs.WebApp.Report.StatusReservas;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author David Vargas
 * @version 1.1
 */
@Service
public class ServicesReservas {
    /**
     * creación de variable de tipo Repositorio con la anotación
     */
    @Autowired
    private RepositoryReservas metodosCrud;
    
    /**
     * metodo para obtener todos los datos de la tabla reservaciones
     * @return List de clase Reservas
     */
    public List<Reservas> getAll(){
        return metodosCrud.getAll();
    }
    
    /**
     * metodo para obtener dato de la tabla reservaciones por Id
     * @param id
     * @return Optional de clase Reservas
     */
    public Optional <Reservas> getReservas(int id){
        return metodosCrud.getReservas(id);
    }
    
    /**
     * metodo para registrar valores en la tabla reservaciones
     * @param reservas
     * @return valor de calse Reservas
     */
    public Reservas save(Reservas reservas){
        if(reservas.getIdReservation()==null){
            return metodosCrud.save(reservas);
        }else{
            Optional <Reservas> evt=metodosCrud.getReservas(reservas.getIdReservation());
            if(evt.isEmpty()){
                return metodosCrud.save(reservas);
            }else{
                return reservas;
            }
        }
        
    }    
    
    /**
     * metodo para actualizar un dato de la tabla Reservaciones
     * @param reservas
     * @return valor de calse Reservas
     */
    public Reservas update(Reservas reservas){
        if(reservas.getIdReservation()!=null){
            Optional<Reservas> e=metodosCrud.getReservas(reservas.getIdReservation());
            if(!e.isEmpty()){
                if(reservas.getStartDate()!=null){
                    e.get().setStartDate(reservas.getStartDate());
                }
                if(reservas.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservas.getDevolutionDate());
                }
                if(reservas.getStatus()!=null){
                    e.get().setStatus(reservas.getStatus());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return reservas;
            }
        }else{
            return reservas;
        }
    }

    /**
     * metodo para borrar un dato de la tabla Reservaciones por Id
     * @param id
     * @return boolean
     */
    public boolean deleteReservas(int id) {
        Boolean aBoolean = getReservas(id).map(reservas -> {
            metodosCrud.delete(reservas);
            return true;
        }).orElse(false);
        return aBoolean;
    }    
    
    /**
     * Metodo para adquirir status
     * @return StatusReservas
     */
    public StatusReservas reporteStatusServicio (){
        List<Reservas>completed= metodosCrud.ReservacionStatusRepositorio("completed");
        List<Reservas>cancelled= metodosCrud.ReservacionStatusRepositorio("cancelled");
        
        return new StatusReservas(completed.size(), cancelled.size() );
    }

    /**
     * Metodo para el reporte de tiempo
     * @param datoA
     * @param datoB
     * @return ListaReservaciones
     */
    public List<Reservas> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
             datoUno = parser.parse(datoA);
             datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return metodosCrud.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }
    
    /**
     * metodo para reporte de clientes
     * @return listaClientes
     */
    public List<ContadorClientes> reporteClientesServicio(){
            return metodosCrud.getClientesRepositorio();
        }

}
