
package com.advs.WebApp.Web;

import com.advs.WebApp.Report.ContadorClientes;
import com.advs.WebApp.Service.ServicesReservas;
import com.advs.WebApp.Model.Reservas;
import com.advs.WebApp.Report.StatusReservas;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author David Vargas
 */
@RestController
@RequestMapping("/api/Reservation/")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class WebReservas {
    @Autowired
    private ServicesReservas servicios;
    @GetMapping("/all")
    public List<Reservas> getReservas(){
        return servicios.getAll();
    }
   
    @GetMapping("/{id}")
    public Optional<Reservas> getReservas(@PathVariable("id") int id) {
        return servicios.getReservas(id);
    }
   
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservas save(@RequestBody Reservas reservas) {
        return servicios.save(reservas);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservas update(@RequestBody Reservas mensajes) {
        return servicios.update(mensajes);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return servicios.deleteReservas(id);
    }
    
    @GetMapping("/report-status")
    public StatusReservas getReserva(){
        return servicios.reporteStatusServicio();
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
     public List<Reservas> getReservasTiempo (@PathVariable("dateOne")String dateOne, @PathVariable("dateTwo")String dateTwo ){
         return servicios.reporteTiempoServicio(dateOne, dateTwo);
     }
     
     @GetMapping("/report-clients")
     public List<ContadorClientes> getClientes(){
         return servicios.reporteClientesServicio();
     }

}