package com.learn.japanese.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.hateoas.config.EnableHypermediaSupport.HypermediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learn.japanese.Service.DictionaryService;
import com.learn.japanese.model.DictionaryModel;
import com.learn.japanese.utils.ObjectNotFoundException;
import com.learn.japanese.utils.ServerErrorException;



@RequestMapping(value = "/learn")
@EnableHypermediaSupport(type = HypermediaType.HAL)
@RestController
@CrossOrigin
public class DictionaryController {
	
	@Autowired
	private DictionaryService dictionaryService;

	@RequestMapping(method = RequestMethod.GET, value = "/lists")
	public List<DictionaryModel> getList() {
		return dictionaryService.getAllwordList();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/list")
	public void addNewWord(@RequestBody DictionaryModel dictionaryModel) {
		try {
			dictionaryService.addNewWord(dictionaryModel);
		} catch (Exception ex) {
			throw new ServerErrorException(ex.getMessage());
		}
	}
	
	@RequestMapping(value = "/list/{dictionaryId}")
	public ResponseEntity<DictionaryModel> getWordById(@PathVariable Long dictionaryId) {
		DictionaryModel dictionaryModel = dictionaryService.getwordAccordingId(dictionaryId);
		if ( dictionaryModel == null)
			throw new ObjectNotFoundException(" Word not found of id-" + dictionaryId);
		return  new ResponseEntity<>(dictionaryModel,HttpStatus.OK);
	}
	
	
	@RequestMapping(method = RequestMethod.PUT, value = "/list/{dictionaryId}")
	public ResponseEntity<DictionaryModel> updateWordList(@RequestBody DictionaryModel dictionaryModel, @PathVariable Long dictionaryId){
		try {
			DictionaryModel dictionaryModels =  dictionaryService.updateWordAccordingId(dictionaryModel, dictionaryId);
			return  new ResponseEntity<>(dictionaryModels,HttpStatus.OK);
		} catch (Exception ex) {
			throw new ServerErrorException(ex.getMessage());
		}
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/list/{dictionaryId}")
	public void deleteWord(@PathVariable Long dictionaryId) {
		try {
			dictionaryService.deleteWordAccordingId(dictionaryId);
		} catch (Exception ex) {
			throw new ServerErrorException(ex.getMessage());
		}
	}
	
	@RequestMapping(value = "/searchByWord")
	public ResponseEntity<List<DictionaryModel>> searchWord(@RequestParam String englishWord) {
		List<DictionaryModel> dictionaryModel = dictionaryService.searchEnglishWord(englishWord);
		return new ResponseEntity<>(dictionaryModel,HttpStatus.OK);
	}

}
