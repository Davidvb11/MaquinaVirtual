package com.advs.WebApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = {"Model", "Web"} )
@SpringBootApplication
public class WebAppApplication {

	public static void main2(String[] args) {
		SpringApplication.run(WebAppApplication.class, args);
	}

}
