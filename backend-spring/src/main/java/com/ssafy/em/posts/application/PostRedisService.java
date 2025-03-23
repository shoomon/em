package com.ssafy.em.posts.application;

import com.ssafy.em.posts.domain.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostRedisService {
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String POST_KEY = "post:";
    private static final long TTL_SECONDS = 60 * 60 * 24;


    public void savePostToRedis(Post post){

    }

    public void deletePostFromRedis(Post post){

    }
}
