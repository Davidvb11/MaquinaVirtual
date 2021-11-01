
package com.advs.WebApp.Repository;

import com.advs.WebApp.Interface.InterfaceClientes;
import com.advs.WebApp.Model.Clientes;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author David Vargas
 */
@Repository
public class RepositoryClientes {
    @Autowired
    private InterfaceClientes crud;
    
    public List<Clientes> getAll(){
        return (List<Clientes>) crud.findAll();
    }
    public Optional <Clientes> getClientes(int id){
        return crud.findById(id);
    }
    public Clientes save(Clientes clientes){
        return crud.save(clientes);
    }
    public void delete(Clientes clientes){
        crud.delete(clientes);
    }    
}
