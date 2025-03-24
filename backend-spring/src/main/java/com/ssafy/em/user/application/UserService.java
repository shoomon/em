package com.ssafy.em.user.application;

import com.ssafy.em.user.domain.UserRepository;
import com.ssafy.em.user.domain.entity.User;
import com.ssafy.em.user.dto.response.GetUserResponse;
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

    public GetUserResponse get(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException.UserNotFoundException(UserErrorCode.NOT_FOUND));
        return GetUserResponse.from(user);
    }
}
