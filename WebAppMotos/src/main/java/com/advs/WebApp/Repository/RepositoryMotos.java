
package com.advs.WebApp.Repository;

import com.advs.WebApp.Interface.InterfaceMotos;
import com.advs.WebApp.Model.Motos;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author David Vargas
 */
@Repository
public class RepositoryMotos {
    @Autowired
    private InterfaceMotos crud;
    
    public List<Motos> getAll(){
        return (List<Motos>) crud.findAll();
    }
    public Optional <Motos> getMotos(int id){
        return crud.findById(id);
    }
    public Motos save(Motos motos){
        return crud.save(motos);
    }
    public void delete(Motos motos){
        crud.delete(motos);
    }    
}
