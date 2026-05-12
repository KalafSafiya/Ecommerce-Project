package vau.ac.lk.ecommerce_app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import vau.ac.lk.ecommerce_app.services.userService;

@SpringBootApplication
public class EcommerceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceAppApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedAdmin(userService userService) {
		return args -> userService.createDefaultAdminIfMissing();
	}

}
