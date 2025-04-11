package com.ssafy.em.term.dto.response;

import com.ssafy.em.term.domain.entity.Term;
import lombok.Builder;

@Builder
public record GetTermResponse(
        int termId,
        String title,
        String content
) {

    public static GetTermResponse from(Term term) {
        return GetTermResponse.builder()
                .termId(term.getId())
                .title(term.getTitle())
                .content(term.getContent())
                .build();
    }
}
