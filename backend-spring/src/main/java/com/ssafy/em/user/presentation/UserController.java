package com.ssafy.em.user.presentation;

import com.ssafy.em.common.annotation.LoginRequired;
import com.ssafy.em.user.application.UserService;
import com.ssafy.em.user.dto.request.TermAgreementRequest;
import com.ssafy.em.user.dto.response.GetUserResponse;
import com.ssafy.em.user.dto.response.TermAgreementResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @GetMapping
    @Override
    public ResponseEntity<GetUserResponse> getUser(@LoginRequired int loginId) {
        GetUserResponse response = userService.get(loginId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/terms")
    @Override
    public ResponseEntity<TermAgreementResponse> onboard(@LoginRequired int loginId,
                                        @Valid @RequestBody TermAgreementRequest request) {
        TermAgreementResponse response = userService.onboard(loginId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * 이용약관 Health Check API
     * - 특정 사용자가 필수 약관(개인정보, 위치 기반)에 동의했는지 확인합니다.
     */
    @GetMapping("/terms/health")
    @Override
    public ResponseEntity<TermAgreementResponse> healthCheckTerms(@LoginRequired int loginId) {
        TermAgreementResponse response = userService.checkTermAgreement(1);
        return ResponseEntity.ok(response);
    }
}
