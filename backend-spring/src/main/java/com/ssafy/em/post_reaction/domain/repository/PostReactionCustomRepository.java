package com.ssafy.em.post_reaction.domain.repository;

import java.util.Map;

public interface PostReactionCustomRepository {
    Map<String, Long> getEmotionCount (int postId);
}
