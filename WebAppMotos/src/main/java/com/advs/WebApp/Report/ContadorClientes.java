package com.advs.WebApp.Report;

import com.advs.WebApp.Model.Clientes;


/**
 *
 * @author David Vargas
 */
public class ContadorClientes {
    private Long total;
    private Clientes client; 

    public ContadorClientes(Long total, Clientes client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Clientes getClient() {
        return client;
    }

    public void setClient(Clientes client) {
        this.client = client;
    }
       
}
