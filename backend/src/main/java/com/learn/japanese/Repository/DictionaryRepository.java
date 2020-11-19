package com.learn.japanese.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.learn.japanese.model.DictionaryModel;





@Repository
@Transactional
public interface DictionaryRepository extends JpaRepository<DictionaryModel,Long>{
	
	@Query("select a from DictionaryModel a where englishWord like ?1%")
	List<DictionaryModel> findByName(String englishWord);

}


