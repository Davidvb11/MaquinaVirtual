
package com.advs.WebApp.Service;

import com.advs.WebApp.Repository.RepositoryCtgr;
import com.advs.WebApp.Model.Categorias;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author David Vargas
 */
@Service
public class ServicesCtgr {
    @Autowired
    private RepositoryCtgr metodosCrud;
    
    public List<Categorias> getAll(){
        return metodosCrud.getAll();
    }
    public Optional <Categorias> getCategorias(int id){
        return metodosCrud.getCategorias(id);
    }
    public Categorias save(Categorias categorias){
        if(categorias.getId()==null){
            return metodosCrud.save(categorias);
        }else{
            Optional <Categorias> evt=metodosCrud.getCategorias(categorias.getId());
            if(evt.isEmpty()){
                return metodosCrud.save(categorias);
            }else{
                return categorias;
            }
        }
        
    }    
    public Categorias update(Categorias categorias){
        if(categorias.getId()!=null){
            Optional<Categorias> e=metodosCrud.getCategorias(categorias.getId());
            if(!e.isEmpty()){
                if(categorias.getName()!=null){
                    e.get().setName(categorias.getName());
                }
                if(categorias.getDescription()!=null){
                    e.get().setDescription(categorias.getDescription());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return categorias;
            }
        }else{
            return categorias;
        }
    }


    public boolean deleteCtgr(int id) {
        Boolean aBoolean = getCategorias(id).map(categorias -> {
            metodosCrud.delete(categorias);
            return true;
        }).orElse(false);
        return aBoolean;
    }    
}
