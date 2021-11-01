
package com.advs.WebApp.Web;

import com.advs.WebApp.Service.ServicesMotos;
import com.advs.WebApp.Model.Motos;
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
@RequestMapping("/api/Motorbike")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class WebMotos {
    
    @Autowired
    private ServicesMotos servicios;
    
    @GetMapping("/all")
    public List<Motos> getMotos(){
        return servicios.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Motos> getMotos(@PathVariable("id") int id) {
        return servicios.getMotos(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Motos save(@RequestBody Motos motos) {
        return servicios.save(motos);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Motos update(@RequestBody Motos motos) {
        return servicios.update(motos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return servicios.deleteMotos(id);
    }
}
