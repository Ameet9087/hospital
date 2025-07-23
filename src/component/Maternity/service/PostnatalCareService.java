package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.PostnatalCareDTO;


public interface PostnatalCareService {
	PostnatalCareDTO createPostnatalCare(PostnatalCareDTO postnatalCareDTO);
    PostnatalCareDTO getPostnatalCareById(Long id);
    List<PostnatalCareDTO> getAllPostnatalCares();
    void deletePostnatalCare(Long id);
    public PostnatalCareDTO updatePostnatalCare(Long id, PostnatalCareDTO postnatalCareDTO);
}
