package com.learn.japanese.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DictionaryModel {
	
	public DictionaryModel() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long dictionaryId;
	private String englishWord;
	private String kanji;
	private String hiragana;
	private String englishpronunciation;
	private String details;
	private String onyomi;
	private String kunyomi;
	
	

	public String getOnyomi() {
		return onyomi;
	}
	public void setOnyomi(String onyomi) {
		this.onyomi = onyomi;
	}
	public String getKunyomi() {
		return kunyomi;
	}
	public void setKunyomi(String kunyomi) {
		this.kunyomi = kunyomi;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getKanji() {
		return kanji;
	}
	public void setKanji(String kanji) {
		this.kanji = kanji;
	}
	public String getHiragana() {
		return hiragana;
	}
	public void setHiragana(String hiragana) {
		this.hiragana = hiragana;
	}
	public String getEnglishpronunciation() {
		return englishpronunciation;
	}
	public void setEnglishpronunciation(String englishpronunciation) {
		this.englishpronunciation = englishpronunciation;
	}
	public Long getDictionaryId() {
		return dictionaryId;
	}
	public void setDictionaryId(Long dictionaryId) {
		this.dictionaryId = dictionaryId;
	}
	public String getEnglishWord() {
		return englishWord;
	}
	public void setEnglishWord(String englishWord) {
		this.englishWord = englishWord;
	}
}
