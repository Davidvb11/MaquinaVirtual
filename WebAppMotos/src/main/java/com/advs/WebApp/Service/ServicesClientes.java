package com.advs.WebApp.Service;

import com.advs.WebApp.Repository.RepositoryClientes;
import com.advs.WebApp.Model.Clientes;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author David Vargas
 */
@Service
public class ServicesClientes {
    
    @Autowired
    private RepositoryClientes metodosCrud;
    
    public List<Clientes> getAll(){
        return metodosCrud.getAll();
    }
    public Optional <Clientes> getClientes(int id){
        return metodosCrud.getClientes(id);
    }
    public Clientes save(Clientes clientes){
        if(clientes.getIdClient()==null){
            return metodosCrud.save(clientes);
        }else{
            Optional <Clientes> evt=metodosCrud.getClientes(clientes.getIdClient());
            if(evt.isEmpty()){
                return metodosCrud.save(clientes);
            }else{
                return clientes;
            }
        }
        
    }
    public Clientes update(Clientes clientes){
        if(clientes.getIdClient()!=null){
            Optional<Clientes> e=metodosCrud.getClientes(clientes.getIdClient());
            if(!e.isEmpty()){
                if(clientes.getName()!=null){
                    e.get().setName(clientes.getName());
                }
                if(clientes.getEmail()!=null){
                    e.get().setEmail(clientes.getEmail());
                }
                if(clientes.getPassword()!=null){
                    e.get().setPassword(clientes.getPassword());
                }
                if(clientes.getAge()!=null){
                    e.get().setAge(clientes.getAge());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return clientes;
            }
        }else{
            return clientes;
        }
    }


    public boolean deleteClient(int id) {
        Boolean aBoolean = getClientes(id).map(clientes -> {
            metodosCrud.delete(clientes);
            return true;
        }).orElse(false);
        return aBoolean;
    }    
}
