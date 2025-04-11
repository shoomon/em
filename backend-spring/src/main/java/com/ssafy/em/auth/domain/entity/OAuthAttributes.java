package com.ssafy.em.auth.domain.entity;

import com.ssafy.em.user.domain.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;     // OAuth2 반환하는 유저 정보
    private String nameAttributesKey;
    private String email;
    private String nickname;
    private String profileImageUrl;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributesKey, String nickname, String email, String profileImageUrl) {
        this.attributes = attributes;
        this.nameAttributesKey = nameAttributesKey;
        this.nickname = nickname;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
    }

    public static OAuthAttributes of(String socialName, Map<String, Object> attributes) {
        if("kakao".equals(socialName)) {
            return ofKakao("id", attributes);
        }

        return null;
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        String email = (String) kakaoAccount.get("email");
        String nickname = (String) kakaoProfile.get("nickname");
        String profileImage = (String) kakaoProfile.get("profile_image_url");

        return OAuthAttributes.builder()
                .email(email)
                .nickname(nickname)
                .profileImageUrl(profileImage)
                .nameAttributesKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .provider(Provider.KAKAO)
                .socialId(email)
                .username(nickname)
                .profileImageUrl(profileImageUrl)
                .build();
    }

}

