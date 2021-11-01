
package com.advs.WebApp.Interface;

import com.advs.WebApp.Model.Mensajes;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author David Vargas
 */
public interface InterfaceMsg extends CrudRepository<Mensajes,Integer>{
    
}
