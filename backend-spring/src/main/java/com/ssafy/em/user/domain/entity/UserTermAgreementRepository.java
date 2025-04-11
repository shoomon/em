package com.ssafy.em.user.domain.entity;

import com.ssafy.em.term.domain.entity.TermType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTermAgreementRepository extends JpaRepository<UserTermAgreement, Integer> {

    boolean existsByUserIdAndTerm_Type(Integer userId, TermType type);
}
