package com.ssafy.em.term.application;

import com.ssafy.em.term.domain.TermRepository;
import com.ssafy.em.term.domain.entity.Term;
import com.ssafy.em.term.dto.response.GetTermResponse;
import com.ssafy.em.term.exception.TermErrorCode;
import com.ssafy.em.term.exception.TermException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TermService {

    private final TermRepository termRepository;

    public GetTermResponse get(Integer termId) {
        Term term = termRepository.findById(termId)
                .orElseThrow(() -> new TermException.TermNotFoundException(TermErrorCode.NOT_FOUND));

        return GetTermResponse.from(term);
    }

    public List<GetTermResponse> getList() {
        List<Term> terms = termRepository.findAll();

        return terms.stream()
                .map(GetTermResponse::from)
                .toList();
    }
}
