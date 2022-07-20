package br.com.sys.productapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"br.com.sys.productapi"})
@EntityScan("br.com.sys.productapi.modules.*")
@EnableJpaRepositories(basePackages = "br.com.sys.productapi.modules")
public class ProductApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(ProductApiApplication.class, args);


	}

}
