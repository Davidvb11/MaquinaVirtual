
package com.advs.WebApp.Web;

import com.advs.WebApp.Service.ServicesMsg;
import com.advs.WebApp.Model.Mensajes;
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
@RequestMapping("/api/Message/")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class WebMsg {
    @Autowired
    private ServicesMsg servicios;
    @GetMapping("/all")
    public List<Mensajes> getMensajes(){
        return servicios.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Mensajes> getMensajes(@PathVariable("id") int id) {
        return servicios.getMensajes(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Mensajes save(@RequestBody Mensajes mensajes) {
        return servicios.save(mensajes);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Mensajes update(@RequestBody Mensajes mensajes) {
        return servicios.update(mensajes);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return servicios.deleteMsg(id);
    }
}