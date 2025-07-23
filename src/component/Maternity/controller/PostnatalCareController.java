package com.LPHSmartX.hospital.Maternity.controller;
/*------------------Sufiyan_Shaikh_PostnatalCareController_08_10_2024_Start---------------------------*/

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.PostnatalCareDTO;
import com.LPHSmartX.hospital.Maternity.service.PostnatalCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(value = "*")
@RestController
@RequestMapping("/api/postnatal-care")
public class PostnatalCareController {

    @Autowired
    private PostnatalCareService postnatalCareService;

    @PostMapping
    public ResponseEntity<PostnatalCareDTO> createPostnatalCare(@RequestBody PostnatalCareDTO postnatalCareDTO) {
        PostnatalCareDTO createdPostnatalCare = postnatalCareService.createPostnatalCare(postnatalCareDTO);
        return ResponseEntity.ok(createdPostnatalCare);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostnatalCareDTO> getPostnatalCareById(@PathVariable Long id) {
        PostnatalCareDTO postnatalCare = postnatalCareService.getPostnatalCareById(id);
        return postnatalCare != null ? ResponseEntity.ok(postnatalCare) : ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<PostnatalCareDTO> updatePostnatalCare(@PathVariable Long id, @RequestBody PostnatalCareDTO postnatalCareDTO) {
        PostnatalCareDTO updatedPostnatalCare = postnatalCareService.updatePostnatalCare(id, postnatalCareDTO);
        return updatedPostnatalCare != null ? ResponseEntity.ok(updatedPostnatalCare) : ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<List<PostnatalCareDTO>> getAllPostnatalCares() {
        List<PostnatalCareDTO> postnatalCareList = postnatalCareService.getAllPostnatalCares();
        return ResponseEntity.ok(postnatalCareList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostnatalCare(@PathVariable Long id) {
        postnatalCareService.deletePostnatalCare(id);
        return ResponseEntity.noContent().build();
    }
}
/*------------------Sufiyan_Shaikh_PostnatalCareController_08_10_2024_End---------------------------*/
