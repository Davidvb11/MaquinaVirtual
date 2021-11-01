
package com.advs.WebApp.Web;

import com.advs.WebApp.Service.ServicesClientes;
import com.advs.WebApp.Model.Clientes;
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
@RequestMapping("/api/Client/")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class WebClientes {
    @Autowired
    private ServicesClientes servicios;
    @GetMapping("/all")
    public List<Clientes> getClientes(){
        return servicios.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Clientes> getClientes(@PathVariable("id") int id) {
        return servicios.getClientes(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Clientes save(@RequestBody Clientes clientes) {
        return servicios.save(clientes);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Clientes update(@RequestBody Clientes clientes) {
        return servicios.update(clientes);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return servicios.deleteClient(id);
    }
}