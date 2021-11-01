
package com.advs.WebApp.Repository;

import com.advs.WebApp.Interface.InterfaceMsg;
import com.advs.WebApp.Model.Mensajes;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author David Vargas
 */
@Repository
public class RepositoryMsg {
    @Autowired
    private InterfaceMsg crud;
    
    public List<Mensajes> getAll(){
        return (List<Mensajes>) crud.findAll();
    }
    public Optional <Mensajes> getMensajes(int id){
        return crud.findById(id);
    }
    public Mensajes save(Mensajes mensajes){
        return crud.save(mensajes);
    }    
    public void delete(Mensajes mensajes){
        crud.delete(mensajes);
    }
}
