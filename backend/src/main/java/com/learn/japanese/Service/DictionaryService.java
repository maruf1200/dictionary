package com.learn.japanese.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.japanese.Repository.DictionaryRepository;
import com.learn.japanese.model.DictionaryModel;
import com.learn.japanese.utils.ServerErrorException;




@Service
public class DictionaryService {
	
	@Autowired
	private DictionaryRepository dictionaryRepository;

	
	public List<DictionaryModel> getAllwordList() {
		List<DictionaryModel> list = (List<DictionaryModel>) dictionaryRepository.findAll();
		return list;
	}
	
	
	
	public DictionaryModel addNewWord(DictionaryModel dictionaryModel) {
		try {
			return dictionaryRepository.save(dictionaryModel);
		} catch (Exception e) {
			throw new ServerErrorException(e.getMessage());
		}
	}

	
	public DictionaryModel getwordAccordingId (Long dictionaryId) {
		DictionaryModel dictionaryModel = null;
		try {
			dictionaryModel = dictionaryRepository.findById(dictionaryId).get();
		} catch (Exception e) {
			throw new ServerErrorException(e.getMessage());
		}
		return dictionaryModel;
	}
	
	public DictionaryModel updateWordAccordingId(DictionaryModel dictionaryModel, Long dictionaryId){		
		try {
			dictionaryModel.setDictionaryId(dictionaryId);
			return dictionaryRepository.save(dictionaryModel);
		} catch (Exception e) {
			throw new ServerErrorException(e.getMessage());
		}
	}
	
	public void deleteWordAccordingId(Long dictionaryId) {
		try {
			dictionaryRepository.deleteById(dictionaryId);
		} catch (Exception e) {
			throw new ServerErrorException(e.getMessage());
		}
	}
	
	public List<DictionaryModel> searchEnglishWord(String englishWord) {
		List<DictionaryModel> list = (List<DictionaryModel>) dictionaryRepository.findByName(englishWord);
		return list;
	}
}
