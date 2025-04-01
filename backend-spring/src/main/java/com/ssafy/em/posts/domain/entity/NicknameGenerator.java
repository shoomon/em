package com.ssafy.em.posts.domain.entity;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Getter
public enum NicknameGenerator {
    ANGER(Arrays.asList("분노하는 ", "짜증내는 ", "울부짖는 ")),
    SURPRISE(Arrays.asList("당황하는 ", "깜짝 놀란 ", "허둥대는 ")),
    JOY(Arrays.asList("행복해하는 ", "환희에 찬 ", "즐거워하는 ")),
    TRUST(Arrays.asList("확신에 찬 ", "굳게 믿는 ", "의심 없는 ")),
    SADNESS(Arrays.asList("슬퍼하는 ", "눈물짓는 ", "우울해하는 ")),
    ANTICIPATION(Arrays.asList("기대에 부푼 ", "설레는 ", "간절히 바라는 ")),
    FEAR(Arrays.asList("공포에 떠는 ", "겁에 질린 ", "오싹해하는 ")),
    DISGUST(Arrays.asList("혐오스러워하는 ", "구역질나는 ", "역겨워하는 "));

    private final List<String> expressions;

    NicknameGenerator(List<String> expressions) {
        this.expressions = expressions;
    }

    public static String getNickname(String emotion, String animal) {
        // 전달된 감정을 대문자로 변환하여 enum 상수를 조회
        NicknameGenerator generator = NicknameGenerator.valueOf(emotion.toUpperCase());
        List<String> expressions = generator.getExpressions();
        // 랜덤하게 3개 중 하나를 선택하여 반환
        Random random = new Random();
        int index = random.nextInt(expressions.size());
        return expressions.get(index) + animal;
    }
}
