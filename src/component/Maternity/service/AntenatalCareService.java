package com.LPHSmartX.hospital.Maternity.service;

import java.util.List;

import com.LPHSmartX.hospital.Maternity.dto.AntenatalCareDTO;


public interface AntenatalCareService {
	 AntenatalCareDTO createAntenatalCare(AntenatalCareDTO antenatalCareDTO);
	    AntenatalCareDTO getAntenatalCareById(Long id);
	    List<AntenatalCareDTO> getAllAntenatalCares();
	    public AntenatalCareDTO updateAntenatalCare(Long id, AntenatalCareDTO antenatalCareDTO);
	    void deleteAntenatalCare(Long id);
}
