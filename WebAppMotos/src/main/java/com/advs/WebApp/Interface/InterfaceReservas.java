
package com.advs.WebApp.Interface;

import com.advs.WebApp.Model.Reservas;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author David Vargas
 */
public interface InterfaceReservas extends CrudRepository<Reservas,Integer>{
    public List<Reservas> findAllByStatus (String status); 
    
    public List<Reservas> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);
    
    // SELECT clientid, COUNT(*) AS total FROM reservacion group by clientid order by desc;
    @Query ("SELECT c.client, COUNT(c.client) from Reservas AS c group by c.client order by COUNT(c.client)DESC")
    public List<Object[]> countTotalReservationsByClient();
   
}
