package com.ssafy.em.user.presentation;

import com.ssafy.em.common.annotation.Login;
import com.ssafy.em.user.application.UserService;
import com.ssafy.em.user.dto.response.GetUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @GetMapping
    @Override
    public ResponseEntity<GetUserResponse> getUser(@Login int loginId) {
        GetUserResponse response = userService.get(loginId);
        return ResponseEntity.ok().body(response);
    }
}
