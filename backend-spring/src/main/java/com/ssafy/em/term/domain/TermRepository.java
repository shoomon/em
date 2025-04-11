package com.ssafy.em.term.domain;

import com.ssafy.em.term.domain.entity.Term;
import com.ssafy.em.term.domain.entity.TermType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TermRepository extends JpaRepository<Term, Integer> {

    Optional<Term> findByType(TermType type);
}
