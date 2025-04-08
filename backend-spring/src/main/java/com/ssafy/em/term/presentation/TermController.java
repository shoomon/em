package com.ssafy.em.term.presentation;

import com.ssafy.em.common.annotation.LoginRequired;
import com.ssafy.em.term.application.TermService;
import com.ssafy.em.term.dto.response.GetTermResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/terms")
@RequiredArgsConstructor
public class TermController implements TermControllerDocs {

    private final TermService termService;

    @GetMapping
    @Override
    public ResponseEntity<List<GetTermResponse>> getTerms(@LoginRequired int loginId) {
        List<GetTermResponse> responses = termService.getList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<GetTermResponse> getTerm(
            @LoginRequired int loginId,
            @PathVariable("id") Integer termId) {
        GetTermResponse response = termService.get(termId);
        return ResponseEntity.ok(response);
    }
}
