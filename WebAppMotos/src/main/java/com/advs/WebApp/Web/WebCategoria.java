
package com.advs.WebApp.Web;

import com.advs.WebApp.Service.ServicesCtgr;
import com.advs.WebApp.Model.Categorias;
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
@RequestMapping("/api/Category/")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class WebCategoria {
    @Autowired
    private ServicesCtgr servicios;
    @GetMapping("/all")
    public List<Categorias> getCategorias(){
        return servicios.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Categorias> getCategorias(@PathVariable("id") int id) {
        return servicios.getCategorias(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Categorias save(@RequestBody Categorias categorias) {
        return servicios.save(categorias);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Categorias update(@RequestBody Categorias categorias) {
        return servicios.update(categorias);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return servicios.deleteCtgr(id);
    }
}