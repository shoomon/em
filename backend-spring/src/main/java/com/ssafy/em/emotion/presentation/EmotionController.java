package com.ssafy.em.emotion.presentation;

import com.ssafy.em.emotion.application.EmotionService;
import com.ssafy.em.emotion.dto.request.CreateEmotionRequest;
import com.ssafy.em.emotion.dto.response.GetEmotionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/emotions")
@RequiredArgsConstructor
public class EmotionController implements EmotionControllerDocs {

    private final EmotionService emotionService;

    @PostMapping
    @Override
    public ResponseEntity<Void> createEmotion(@Valid @RequestBody CreateEmotionRequest request) {
        int emotionId = emotionService.create(request);
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/emotions/{id}").buildAndExpand(emotionId).toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    @Override
    public ResponseEntity<List<GetEmotionResponse>> getEmotions() {
        List<GetEmotionResponse> emotions = emotionService.getList();
        return ResponseEntity.ok(emotions);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<GetEmotionResponse> getEmotion(@PathVariable("id") int emotionId) {
        GetEmotionResponse response = emotionService.get(emotionId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Void> deleteEmotion(@PathVariable("id") int emotionId) {
        emotionService.delete(emotionId);
        return ResponseEntity.noContent().build();
    }
}
