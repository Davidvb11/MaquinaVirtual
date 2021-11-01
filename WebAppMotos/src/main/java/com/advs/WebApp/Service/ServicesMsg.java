
package com.advs.WebApp.Service;

import com.advs.WebApp.Repository.RepositoryMsg;
import com.advs.WebApp.Model.Mensajes;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author David Vargas
 */
@Service
public class ServicesMsg {
    @Autowired
    private RepositoryMsg metodosCrud;
    
    public List<Mensajes> getAll(){
        return metodosCrud.getAll();
    }
    public Optional <Mensajes> getMensajes(int id){
        return metodosCrud.getMensajes(id);
    }
    public Mensajes save(Mensajes mensajes){
        if(mensajes.getIdMessage()==null){
            return metodosCrud.save(mensajes);
        }else{
            Optional <Mensajes> evt=metodosCrud.getMensajes(mensajes.getIdMessage());
            if(evt.isEmpty()){
                return metodosCrud.save(mensajes);
            }else{
                return mensajes;
            }
        }
        
    }    
    public Mensajes update(Mensajes mensajes){
        if(mensajes.getIdMessage()!=null){
            Optional<Mensajes> e=metodosCrud.getMensajes(mensajes.getIdMessage());
            if(!e.isEmpty()){
                if(mensajes.getMessageText()!=null){
                    e.get().setMessageText(mensajes.getMessageText());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return mensajes;
            }
        }else{
            return mensajes;
        }
    }


    public boolean deleteMsg(int id) {
        Boolean aBoolean = getMensajes(id).map(mensajes -> {
            metodosCrud.delete(mensajes);
            return true;
        }).orElse(false);
        return aBoolean;
    }    
}
