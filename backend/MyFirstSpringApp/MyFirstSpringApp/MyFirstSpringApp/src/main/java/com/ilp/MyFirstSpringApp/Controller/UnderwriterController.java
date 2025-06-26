package com.ilp.MyFirstSpringApp.Controller;

import com.ilp.MyFirstSpringApp.entity.Underwriter;
import com.ilp.MyFirstSpringApp.repository.UnderwriterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/underwriters")
@CrossOrigin(origins = "http://localhost:4200")
public class UnderwriterController {

    @Autowired
    private UnderwriterRepository underwriterRepo;

    @PostMapping
    public Underwriter addUnderwriter(@RequestBody Underwriter underwriter){
        return underwriterRepo.save(underwriter);
    }

    @GetMapping
    public List<Underwriter> getAllUnderwriters(){
        return underwriterRepo.findAll();
    }
}
