package com.ssafy.em.emotion.presentation;

import com.ssafy.em.emotion.application.EmotionService;
import com.ssafy.em.emotion.dto.request.CreateEmotionRequest;
import com.ssafy.em.emotion.dto.response.GetEmotionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/emotions")
@RequiredArgsConstructor
public class EmotionController {

    private final EmotionService emotionService;

    @PostMapping
    public ResponseEntity<Void> createEmotion(@Valid @RequestBody CreateEmotionRequest request) {
        int emotionId = emotionService.create(request);
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/emotions/{id}").buildAndExpand(emotionId).toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetEmotionResponse> getEmotion(@PathVariable("id") int emotionId) {
        GetEmotionResponse response = emotionService.get(emotionId);
        return ResponseEntity.ok(response);
    }
}
