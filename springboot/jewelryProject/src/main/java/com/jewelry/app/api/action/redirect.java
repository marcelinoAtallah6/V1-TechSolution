package com.jewelry.app.api.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.jewelry.app.api.service.jewelryService;

@RestController
public class redirect{
	
    @GetMapping("/storeItems")
    public RedirectView redirectToHome() {
        return new RedirectView("/"); // Redirect to the root URL
    }

	
}
