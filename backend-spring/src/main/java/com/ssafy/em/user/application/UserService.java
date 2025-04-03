package com.ssafy.em.user.application;

import com.ssafy.em.term.domain.TermRepository;
import com.ssafy.em.term.domain.entity.Term;
import com.ssafy.em.term.domain.entity.TermType;
import com.ssafy.em.term.exception.TermErrorCode;
import com.ssafy.em.term.exception.TermException;
import com.ssafy.em.user.domain.UserRepository;
import com.ssafy.em.user.domain.entity.User;
import com.ssafy.em.user.domain.entity.UserTermAgreement;
import com.ssafy.em.user.domain.entity.UserTermAgreementRepository;
import com.ssafy.em.user.dto.request.TermAgreementRequest;
import com.ssafy.em.user.dto.response.GetUserResponse;
import com.ssafy.em.user.dto.response.TermAgreementResponse;
import com.ssafy.em.user.exception.UserErrorCode;
import com.ssafy.em.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TermRepository termRepository;
    private final UserTermAgreementRepository userTermAgreementRepository;

    public GetUserResponse get(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException.UserNotFoundException(UserErrorCode.NOT_FOUND));
        return GetUserResponse.from(user);
    }

    @Transactional
    public TermAgreementResponse onboard(int userId, TermAgreementRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException.UserNotFoundException(UserErrorCode.NOT_FOUND));

        // 개인정보 처리 동의
        Term personal = termRepository.findByType(TermType.PERSONAL)
                .orElseThrow(() -> new TermException.TermNotFoundException(TermErrorCode.NOT_FOUND));

        UserTermAgreement personalAgreement = UserTermAgreement.builder()
                .user(user)
                .term(personal)
                .build();

        userTermAgreementRepository.save(personalAgreement);

        // 위치 기반 동의
        Term location = termRepository.findByType(TermType.LOCATION)
                .orElseThrow(() -> new TermException.TermNotFoundException(TermErrorCode.NOT_FOUND));

        UserTermAgreement locationAgreement = UserTermAgreement.builder()
                .user(user)
                .term(location)
                .build();

        userTermAgreementRepository.save(locationAgreement);

        // 마켓팅 활용 수집 및 이용 동의
        Term marketing = null;
        if(request.isAllowingMarketing()) {
            marketing = termRepository.findByType(TermType.MARKETING)
                    .orElseThrow(() -> new TermException.TermNotFoundException(TermErrorCode.NOT_FOUND));

            UserTermAgreement marketingAgreement = UserTermAgreement.builder()
                    .user(user)
                    .term(marketing)
                    .build();

            userTermAgreementRepository.save(marketingAgreement);
        }

        return new TermAgreementResponse(true);
    }

    /**
     * health-check 용: 사용자가 필수 약관(개인정보, 위치 기반)에 동의했는지 확인
     * (두 필수 약관 모두 동의되었으면 true를 반환)
     */
    public TermAgreementResponse checkTermAgreement(int userId) {
        boolean hasPersonalAgreement = userTermAgreementRepository.existsByUserIdAndTerm_Type(userId, TermType.PERSONAL);
        boolean hasLocationAgreement = userTermAgreementRepository.existsByUserIdAndTerm_Type(userId, TermType.LOCATION);

        return new TermAgreementResponse(hasPersonalAgreement && hasLocationAgreement);
    }
}
