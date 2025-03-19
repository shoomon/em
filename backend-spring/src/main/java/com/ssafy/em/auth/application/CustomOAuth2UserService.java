package com.ssafy.em.auth.application;

import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.auth.domain.entity.OAuthAttributes;
import com.ssafy.em.user.domain.User;
import com.ssafy.em.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // application.yml에 설정된 OAuth2 정보를 이용해 사용자 정보 조회
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest);

        // OAuth2User의 원본 attribute를 가져옴
        Map<String, Object> originAttributes = oAuth2User.getAttributes();

        // 현재 서비스의 OAuth2 provider id (예: kakao)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // OAuthAttributes: OAuth2User의 attribute를 해당 서비스에 맞게 변환하는 헬퍼 클래스
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, originAttributes);

        // 사용자 정보 DB 저장 또는 업데이트
        User user = saveOrUpdate(attributes);

        // OAuth2CustomUser에 사용자 id와 email을 함께 전달
        return new OAuth2CustomUser(user.getId(), registrationId, originAttributes, List.of(), user.getSocialId());
    }

    /**
     * 기존 회원이면 닉네임, 프로필 이미지를 업데이트하고,
     * 존재하지 않으면 새로 User 엔티티를 생성하여 저장합니다.
     */
    private User saveOrUpdate(OAuthAttributes authAttributes) {
        // authAttributes.getEmail()을 기준으로 사용자 조회 (소셜 로그인의 경우 email이 고유 식별자로 활용)
        User user = userRepository.findBySocialId(authAttributes.getEmail())
                .map(entity -> entity.update(authAttributes.getNickname(), authAttributes.getProfileImageUrl()))
                .orElse(authAttributes.toEntity());

        return userRepository.save(user);
    }
}
