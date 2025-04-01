package com.ssafy.em.user.dto.response;

import com.ssafy.em.user.domain.entity.User;
import lombok.Builder;

@Builder
public record GetUserResponse(
        int userId,
        String provider,
        String socialId,
        String username,
        String profileImageUrl
) {

    public static GetUserResponse from(User user) {
        return GetUserResponse.builder()
                .userId(user.getId())
                .provider(user.getProvider().name())
                .socialId(user.getSocialId())
                .username(user.getUsername())
                .profileImageUrl(user.getProfileImageUrl())
                .build();
    }
}
