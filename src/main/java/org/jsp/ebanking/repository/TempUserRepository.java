package org.jsp.ebanking.repository;

import org.jsp.ebanking.entity.TempUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TempUserRepository extends CrudRepository<TempUser, String> {
	
	

}
