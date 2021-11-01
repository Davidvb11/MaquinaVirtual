
package com.advs.WebApp.Interface;

import com.advs.WebApp.Model.Clientes;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author David Vargas
 */
public interface InterfaceClientes extends CrudRepository<Clientes,Integer>{
    
}
